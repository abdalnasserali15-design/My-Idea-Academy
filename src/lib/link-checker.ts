export type CheckId =
  | "ipHost"
  | "userinfo"
  | "punycode"
  | "subdomains"
  | "shortener"
  | "https"
  | "tld"
  | "brand";

export interface CheckResult {
  id: CheckId;
  flagged: boolean;
  params: Record<string, string | number>;
}

export interface UrlAnalysis {
  valid: boolean;
  protocol?: string;
  hostname?: string;
  path?: string;
  checks: CheckResult[];
}

const COMPOUND_TLDS = new Set([
  "co.uk",
  "org.uk",
  "ac.uk",
  "gov.uk",
  "co.jp",
  "co.kr",
  "co.in",
  "co.il",
  "com.au",
  "com.br",
  "com.tr",
  "com.mx",
  "co.nz",
  "co.za",
  "com.eg",
]);

export function registrableDomain(hostname: string): string {
  const labels = hostname.split(".");
  if (labels.length >= 3) {
    const lastTwo = labels.slice(-2).join(".");
    if (COMPOUND_TLDS.has(lastTwo)) return labels.slice(-3).join(".");
  }
  return labels.slice(-2).join(".");
}

const SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "goo.gl",
  "ow.ly",
  "is.gd",
  "buff.ly",
  "rebrand.ly",
  "cutt.ly",
];

const WATCH_TLDS = new Set([
  "tk",
  "ml",
  "ga",
  "cf",
  "gq",
  "xyz",
  "top",
  "work",
  "click",
  "link",
  "zip",
  "review",
  "country",
  "kim",
  "cricket",
  "science",
  "party",
  "gdn",
]);

const BRANDS: Record<string, string> = {
  paypal: "paypal.com",
  google: "google.com",
  amazon: "amazon.com",
  microsoft: "microsoft.com",
  apple: "apple.com",
  netflix: "netflix.com",
  facebook: "facebook.com",
  instagram: "instagram.com",
  whatsapp: "whatsapp.com",
  bankofamerica: "bankofamerica.com",
};

export function analyzeUrl(input: string): UrlAnalysis {
  let str = input.trim();
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(str)) str = `https://${str}`;

  let url: URL;
  try {
    url = new URL(str);
  } catch {
    return { valid: false, checks: [] };
  }

  const hostname = url.hostname;
  const labels = hostname.split(".");
  const checks: CheckResult[] = [];

  const isIp =
    /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || hostname.includes(":");
  checks.push({ id: "ipHost", flagged: isIp, params: {} });

  const hasUserinfo = url.username.length > 0 || url.password.length > 0;
  checks.push({
    id: "userinfo",
    flagged: hasUserinfo,
    params: { username: url.username, hostname },
  });

  const isPunycode = hostname.includes("xn--");
  checks.push({ id: "punycode", flagged: isPunycode, params: {} });

  const excessiveSubdomains = labels.length > 4;
  checks.push({
    id: "subdomains",
    flagged: excessiveSubdomains,
    params: { count: labels.length },
  });

  const isShortener = SHORTENERS.some(
    (s) => hostname === s || hostname.endsWith(`.${s}`),
  );
  checks.push({ id: "shortener", flagged: isShortener, params: {} });

  const isHttp = url.protocol === "http:";
  checks.push({ id: "https", flagged: isHttp, params: {} });

  const tld = labels[labels.length - 1]?.toLowerCase() ?? "";
  checks.push({ id: "tld", flagged: WATCH_TLDS.has(tld), params: { tld } });

  const registrable = registrableDomain(hostname);
  const registrableCore = registrable.split(".")[0];
  const searchText = `${url.username} ${hostname}`.toLowerCase();
  let brandHit: string | null = null;
  for (const brand of Object.keys(BRANDS)) {
    const brandCore = BRANDS[brand].split(".")[0];

    if (searchText.includes(brand) && registrableCore !== brandCore) {
      brandHit = brand;
      break;
    }
  }
  checks.push({
    id: "brand",
    flagged: brandHit !== null,
    params: brandHit
      ? { brand: brandHit, officialDomain: BRANDS[brandHit] }
      : {},
  });

  return {
    valid: true,
    protocol: url.protocol.replace(":", ""),
    hostname,
    path: `${url.pathname}${url.search}` || "/",
    checks,
  };
}

export type CheckTier = "clean" | "mixed" | "risky" | null;

export interface ScoreInput {
  flaggedCount: number;
  totalChecks: number;
  redirectTier: CheckTier;
  domainAgeTier: CheckTier;
}

function tierFactor(tier: CheckTier): number {
  if (tier === "clean") return 1;
  if (tier === "mixed") return 0.5;
  return 0;
}

export function computeSafetyScore(input: ScoreInput): number {
  const structural =
    25 * ((input.totalChecks - input.flaggedCount) / input.totalChecks);
  const perCheckMax = 32.5;
  const redirect =
    input.redirectTier !== null
      ? perCheckMax * tierFactor(input.redirectTier)
      : 0;
  const domainAge =
    input.domainAgeTier !== null
      ? perCheckMax * tierFactor(input.domainAgeTier)
      : 0;
  return Math.max(
    0,
    Math.min(90, Math.round(structural + redirect + domainAge)),
  );
}

export function tierFromRedirectChain(
  startHostname: string,
  chain: { url: string; status: number }[],
): CheckTier {
  if (chain.length === 0) return "risky";
  const hops = chain.length - 1;
  let finalHostname: string;
  try {
    finalHostname = new URL(chain[chain.length - 1].url).hostname;
  } catch {
    return "risky";
  }
  if (hops === 0 && finalHostname === startHostname) return "clean";
  if (hops <= 2) return "mixed";
  return "risky";
}

export function tierFromDomainAgeDays(ageDays: number | null): CheckTier {
  if (ageDays === null) return "mixed";
  if (ageDays >= 365) return "clean";
  if (ageDays >= 30) return "mixed";
  return "risky";
}
