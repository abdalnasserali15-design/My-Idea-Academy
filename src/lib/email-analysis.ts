export interface ParsedAddress {
  name: string;
  address: string;
}

export interface LinkInfo {
  url: string;
  isShortened: boolean;
  isIpBased: boolean;
}

interface HtmlLinkMismatch {
  href: string;
  displayText: string;
  hrefDomain: string;
}

export interface ReceivedHop {
  raw: string;
  from: string;
  by: string;
}

export type FindingId =
  | "authFail"
  | "replyToMismatch"
  | "linkTextMismatch"
  | "credentialRequest"
  | "riskyAttachment"
  | "unearnedReward"
  | "urgencyLanguage"
  | "genericGreeting"
  | "ipBasedLink"
  | "shortenedLink"
  | "noReceivedHeaders";

export interface Finding {
  id: FindingId;
  params?: Record<string, string>;
}

export interface EmailAnalysis {
  from: ParsedAddress | null;
  replyTo: ParsedAddress | null;
  subject: string;
  authResults: string | null;
  fromDomain: string | null;
  replyToDomain: string | null;
  authFail: boolean;
  replyToMismatch: boolean;
  links: LinkInfo[];
  findings: Finding[];
  score: number;
  route: ReceivedHop[];
}

const URGENCY_PHRASES = [
  "act now",
  "immediately",
  "urgent",
  "act fast",
  "expire",
  "suspend",
  "limited time",
  "within 24 hours",
  "act today",
  "final notice",
];
const CREDENTIAL_PHRASES = [
  "confirm your password",
  "verify your password",
  "update your payment",
  "enter your password",
  "confirm your identity",
  "verify your identity",
  "login details",
  "banking details",
  "social security",
];
const PRIZE_PHRASES = [
  "congratulations",
  "you've won",
  "you have won",
  "claim your prize",
  "free gift",
  "lottery",
  "cash prize",
];
const GENERIC_GREETINGS = [
  "dear customer",
  "dear user",
  "dear valued customer",
  "dear account holder",
  "dear sir/madam",
  "dear winner",
];
const SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "goo.gl",
  "t.co",
  "ow.ly",
  "is.gd",
  "buff.ly",
];
const RISKY_EXTENSIONS = [
  "exe",
  "scr",
  "bat",
  "cmd",
  "js",
  "jar",
  "vbs",
  "ps1",
  "pif",
  "msi",
  "hta",
];

function getHeader(headerLines: string[], name: string): string | null {
  const re = new RegExp(`^${name}:\\s*(.*)$`, "i");
  for (const line of headerLines) {
    const m = line.match(re);
    if (m) return m[1].trim();
  }
  return null;
}

function parseAddress(str: string | null): ParsedAddress | null {
  if (!str) return null;
  const m = str.match(/^(.*?)<([^>]+)>$/);
  if (m)
    return { name: m[1].trim().replace(/^"|"$/g, ""), address: m[2].trim() };
  return { name: "", address: str.trim() };
}

function domainOf(address: string | null | undefined): string | null {
  if (!address) return null;
  const at = address.lastIndexOf("@");
  return at > -1 ? address.slice(at + 1).toLowerCase() : null;
}

function extractUrlDomain(url: string): string | null {
  const m = url.match(/^https?:\/\/([^/]+)/i);
  return m ? m[1].toLowerCase().replace(/^www\./, "") : null;
}

function findMatches(text: string, phrases: string[]): string[] {
  const lower = text.toLowerCase();
  return phrases.filter((p) => lower.includes(p));
}

function extractLinks(text: string): string[] {
  const matches = text.match(/https?:\/\/[^\s)>"']+/gi) || [];
  const seen = new Set<string>();
  return matches.filter((u) => {
    if (seen.has(u)) return false;
    seen.add(u);
    return true;
  });
}

function findHtmlLinkMismatches(text: string): HtmlLinkMismatch[] {
  const re = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const mismatches: HtmlLinkMismatch[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const href = match[1];
    const displayText = match[2].replace(/<[^>]+>/g, "").trim();
    if (
      /^(https?:\/\/|www\.)/i.test(displayText) ||
      /\.[a-z]{2,}(\/|$)/i.test(displayText)
    ) {
      const hrefDomain = extractUrlDomain(href);
      const textDomain = extractUrlDomain(
        displayText.includes("://") ? displayText : `http://${displayText}`,
      );
      if (hrefDomain && textDomain && hrefDomain !== textDomain) {
        mismatches.push({ href, displayText, hrefDomain });
      }
    }
  }
  return mismatches;
}

function findAttachmentMentions(headerLines: string[], body: string): string[] {
  const findings: string[] = [];
  const fullHeaderText = headerLines.join(" ");
  const filenameRe = /filename\s*=\s*"?([^";\r\n]+)"?/gi;
  let m: RegExpExecArray | null;
  while ((m = filenameRe.exec(fullHeaderText)) !== null) {
    const ext = (m[1].split(".").pop() || "").toLowerCase();
    if (RISKY_EXTENSIONS.includes(ext)) findings.push(m[1]);
  }
  const bodyRe = new RegExp(
    `\\b([\\w-]+\\.(${RISKY_EXTENSIONS.join("|")}))\\b`,
    "gi",
  );
  while ((m = bodyRe.exec(body)) !== null) findings.push(m[1]);
  return [...new Set(findings)];
}

function parseReceivedChain(headerLines: string[]): ReceivedHop[] {
  const received: string[] = [];
  let current = "";
  let inReceived = false;
  headerLines.forEach((line) => {
    if (/^Received:/i.test(line)) {
      if (current) received.push(current);
      current = line.replace(/^Received:\s*/i, "");
      inReceived = true;
    } else if (inReceived && /^\s/.test(line)) {
      current += ` ${line.trim()}`;
    } else {
      if (current) received.push(current);
      current = "";
      inReceived = false;
    }
  });
  if (current) received.push(current);
  return received.map((r) => {
    const fromMatch = r.match(/from\s+(\S+)/i);
    const byMatch = r.match(/by\s+(\S+)/i);
    return {
      raw: r,
      from: fromMatch?.[1] ?? "unknown host",
      by: byMatch?.[1] ?? "unknown host",
    };
  });
}

export function analyzeEmail(raw: string): EmailAnalysis {
  const lines = raw.split(/\r?\n/);
  let headerEnd = lines.findIndex((l) => l.trim() === "");
  if (headerEnd === -1) headerEnd = lines.length;
  const headerLines = lines.slice(0, headerEnd);
  const body = lines
    .slice(headerEnd + 1)
    .join("\n")
    .trim();

  const from = parseAddress(getHeader(headerLines, "From"));
  const replyTo = parseAddress(getHeader(headerLines, "Reply-To"));
  const subject = getHeader(headerLines, "Subject") || "";
  const authResults = getHeader(headerLines, "Authentication-Results");

  const fromDomain = domainOf(from?.address);
  const replyToDomain = domainOf(replyTo?.address);
  const replyToMismatch = !!(
    replyToDomain &&
    fromDomain &&
    replyToDomain !== fromDomain
  );
  const authFail = !!(
    authResults && /\b(spf|dkim|dmarc)\s*=\s*fail\b/i.test(authResults)
  );

  const fullText = `${subject} ${body}`;
  const urgency = findMatches(fullText, URGENCY_PHRASES);
  const credential = findMatches(fullText, CREDENTIAL_PHRASES);
  const prize = findMatches(fullText, PRIZE_PHRASES);
  const greeting = findMatches(fullText, GENERIC_GREETINGS);
  const links: LinkInfo[] = extractLinks(body).map((url) => ({
    url,
    isShortened: SHORTENERS.some((s) => url.includes(s)),
    isIpBased: /^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url),
  }));
  const htmlMismatches = findHtmlLinkMismatches(body);
  const attachments = findAttachmentMentions(headerLines, body);
  const route = parseReceivedChain(headerLines);

  const findings: Finding[] = [];
  let score = 0;

  if (authFail) {
    findings.push({ id: "authFail" });
    score += 30;
  }
  if (replyToMismatch) {
    findings.push({
      id: "replyToMismatch",
      params: {
        replyToDomain: replyToDomain ?? "",
        fromDomain: fromDomain ?? "",
      },
    });
    score += 20;
  }
  htmlMismatches.forEach((hm) => {
    findings.push({
      id: "linkTextMismatch",
      params: { displayText: hm.displayText, hrefDomain: hm.hrefDomain },
    });
    score += 30;
  });
  if (credential.length) {
    findings.push({
      id: "credentialRequest",
      params: { phrase: credential[0] },
    });
    score += 25;
  }
  attachments.forEach((fn) => {
    findings.push({ id: "riskyAttachment", params: { filename: fn } });
    score += 25;
  });
  if (prize.length) {
    findings.push({ id: "unearnedReward", params: { phrase: prize[0] } });
    score += 20;
  }
  if (urgency.length) {
    findings.push({ id: "urgencyLanguage", params: { phrase: urgency[0] } });
    score += Math.min(urgency.length * 10, 20);
  }
  if (greeting.length) {
    findings.push({ id: "genericGreeting", params: { phrase: greeting[0] } });
    score += 10;
  }
  links.forEach((l) => {
    if (l.isIpBased) {
      findings.push({ id: "ipBasedLink", params: { url: l.url } });
      score += 25;
    } else if (l.isShortened) {
      findings.push({ id: "shortenedLink", params: { url: l.url } });
      score += 15;
    }
  });
  if (route.length === 0) {
    findings.push({ id: "noReceivedHeaders" });
    score += 10;
  }
  score = Math.min(score, 100);

  return {
    from,
    replyTo,
    subject,
    authResults,
    fromDomain,
    replyToDomain,
    authFail,
    replyToMismatch,
    links,
    findings,
    score,
    route,
  };
}

export const EXAMPLE_EMAIL = `Received: from mail-relay-9.forwardnet.ru (unknown [185.23.44.109])
\tby mx.example.com with SMTP id a1b2c3; Mon, 01 Jan 2024 03:14:02 +0000
From: "NovaBank Security" <security@novabank-alerts-verify.com>
Reply-To: support@totally-different-domain.ru
Subject: Urgent: Your account will be suspended
Authentication-Results: spf=fail dkim=fail dmarc=fail
Content-Type: multipart/mixed; boundary="xyz"

Dear Customer,

We detected unusual activity on your account. You must verify your identity within 24 hours or your account will be suspended.

Please confirm your password using the link below:
<a href="http://bit.ly/novabank-verify-3xz">novabank.com/verify</a>

See the attached statement for details: statement_review.exe

Thank you,
NovaBank Security Team`;
