import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { LANGUAGES } from "@/i18n/config";

export interface LangDir {
  lang: string;
  dir: "ltr" | "rtl";
}

const DEFAULT: LangDir = { lang: "en", dir: "ltr" };
const SUPPORTED = new Set(LANGUAGES.map((l) => l.code));

const LANG_COOKIE = "app.lang";

function toLangDir(code: string): LangDir {
  const entry = LANGUAGES.find((l) => l.code === code);
  return entry ? { lang: entry.code, dir: entry.dir } : DEFAULT;
}

function parseCookieLang(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=([^;]+)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function parseAcceptLanguage(header: string | null): string | null {
  if (!header) return null;
  const entries = header
    .split(",")
    .map((part) => {
      const [rawCode, ...params] = part.trim().split(";");
      const qParam = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const q = qParam ? Number(qParam.slice(2)) : 1;
      return {
        code: rawCode.trim().split("-")[0],
        q: Number.isFinite(q) ? q : 1,
      };
    })

    .filter((entry) => entry.q > 0)

    .sort((a, b) => b.q - a.q);
  return entries.find((entry) => SUPPORTED.has(entry.code))?.code ?? null;
}

export const detectServerLangDir = createServerFn({ method: "GET" }).handler(
  async (): Promise<LangDir> => {
    const request = getRequest();
    const cookieLang = parseCookieLang(request.headers.get("cookie"));
    if (cookieLang && SUPPORTED.has(cookieLang)) return toLangDir(cookieLang);

    const acceptLang = parseAcceptLanguage(
      request.headers.get("accept-language"),
    );
    if (acceptLang) return toLangDir(acceptLang);

    return DEFAULT;
  },
);
