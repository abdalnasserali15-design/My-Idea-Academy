import { createFileRoute } from "@tanstack/react-router";

import { getAuthenticatedUserId } from "@/lib/verify-request-auth";
import { lookupDomainAge } from "@/lib/rdap.server";

type CheckDomainTrustRequestBody = { domain?: unknown };

const DAILY_CHECK_LIMIT = 30;

export const Route = createFileRoute("/api/check-domain-trust")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const userId = await getAuthenticatedUserId(request);
        if (!userId) {
          return new Response("Sign in to use the domain trust check.", {
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

        const { domain } =
          (await request.json()) as CheckDomainTrustRequestBody;
        if (typeof domain !== "string" || !domain) {
          return new Response("A domain is required", { status: 400 });
        }

        const domainAge = await lookupDomainAge(domain).catch(() => null);
        return Response.json({ domainAge });
      },
    },
  },
});
