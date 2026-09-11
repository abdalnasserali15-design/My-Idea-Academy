import { createFileRoute } from "@tanstack/react-router";

import { getAuthenticatedUserId } from "@/lib/verify-request-auth";
import { registrableDomain } from "@/lib/link-checker";
import { lookupDomainAge, type DomainAge } from "@/lib/rdap.server";

type CheckLinkRequestBody = { url?: unknown };

const DAILY_CHECK_LIMIT = 30;
const MAX_REDIRECT_HOPS = 5;
const FETCH_TIMEOUT_MS = 5000;

const PRIVATE_HOSTNAME_SUFFIXES = [".local", ".internal", ".localhost"];

function isPrivateOrReservedIpv4(a: number, b: number): boolean {
  if (a === 127) return true;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 169 && b === 254) return true;
  if (a === 0) return true;
  if (a >= 224) return true;
  return false;
}

function decodeEmbeddedIpv4(hexGroup: string): [number, number] {
  const n = parseInt(hexGroup, 16);
  return [(n >> 8) & 0xff, n & 0xff];
}

function isPrivateOrReservedIp(hostname: string): boolean {
  const ipv4 = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    return isPrivateOrReservedIpv4(Number(ipv4[1]), Number(ipv4[2]));
  }
  const v6 = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (v6 === "::1" || v6 === "::") return true;
  if (v6.startsWith("fc") || v6.startsWith("fd")) return true;
  if (v6.startsWith("fe80")) return true;

  const mapped = v6.match(/^::(?:ffff:)?([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (mapped) {
    const [a, b] = decodeEmbeddedIpv4(mapped[1]);
    return isPrivateOrReservedIpv4(a, b);
  }
  return false;
}

function isBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h === "0.0.0.0") return true;
  if (PRIVATE_HOSTNAME_SUFFIXES.some((suffix) => h.endsWith(suffix)))
    return true;
  return isPrivateOrReservedIp(h);
}

export interface RedirectHop {
  url: string;
  status: number;
}

async function followRedirectChain(startUrl: string): Promise<RedirectHop[]> {
  const chain: RedirectHop[] = [];
  let current = startUrl;

  for (let hop = 0; hop < MAX_REDIRECT_HOPS; hop++) {
    const parsed = new URL(current);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") break;
    if (isBlockedHost(parsed.hostname)) break;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(current, {
        method: "HEAD",
        redirect: "manual",
        signal: controller.signal,
      });
    } catch {
      break;
    } finally {
      clearTimeout(timeout);
    }

    chain.push({ url: current, status: response.status });

    const location =
      response.status >= 300 && response.status < 400
        ? response.headers.get("location")
        : null;
    if (!location) break;

    try {
      current = new URL(location, current).toString();
    } catch {
      break;
    }
  }

  return chain;
}

async function checkGoogleSafeBrowsing(
  targetUrl: string,
): Promise<boolean | null> {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          client: { clientId: "my-idea-platform", clientVersion: "1.0.0" },
          threatInfo: {
            threatTypes: [
              "MALWARE",
              "SOCIAL_ENGINEERING",
              "UNWANTED_SOFTWARE",
              "POTENTIALLY_HARMFUL_APPLICATION",
            ],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: targetUrl }],
          },
        }),
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { matches?: unknown[] };
    return Array.isArray(data.matches) && data.matches.length > 0;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export const Route = createFileRoute("/api/check-link")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const userId = await getAuthenticatedUserId(request);
        if (!userId) {
          return new Response("Sign in to use the server-side link checks.", {
            status: 401,
          });
        }

        const { supabaseAdmin } =
          await import("@/integrations/supabase/client.server");
        const { data: withinLimit, error: usageError } =
          await supabaseAdmin.rpc("check_and_increment_link_check_usage", {
            p_user_id: userId,
            p_daily_limit: DAILY_CHECK_LIMIT,
          });
        if (usageError) {
          return new Response("Could not verify usage limits", { status: 500 });
        }
        if (!withinLimit) {
          return new Response(
            "Daily check limit reached, please try again tomorrow.",
            { status: 429 },
          );
        }

        const { url } = (await request.json()) as CheckLinkRequestBody;
        if (typeof url !== "string" || !url) {
          return new Response("A url is required", { status: 400 });
        }

        let parsed: URL;
        try {
          parsed = new URL(url);
        } catch {
          return new Response("Not a valid URL", { status: 400 });
        }
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          return new Response("Only http/https URLs are supported", {
            status: 400,
          });
        }
        if (isBlockedHost(parsed.hostname)) {
          return new Response("This host cannot be checked", { status: 400 });
        }

        const [redirectChain, domainAge, googleFlagged] = await Promise.all([
          followRedirectChain(parsed.toString()).catch(
            () => [] as RedirectHop[],
          ),
          lookupDomainAge(registrableDomain(parsed.hostname)).catch(() => null),
          checkGoogleSafeBrowsing(parsed.toString()).catch(() => null),
        ]);

        return Response.json({ redirectChain, domainAge, googleFlagged });
      },
    },
  },
});
