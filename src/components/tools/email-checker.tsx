import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  Scan,
  Clipboard,
  X,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  BadgeCheck,
  Info,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  analyzeEmail,
  EXAMPLE_EMAIL,
  type EmailAnalysis,
} from "@/lib/email-analysis";

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

type DomainTrustLevel = "established" | "new" | "unknown";
interface DomainTrustResult {
  trust: DomainTrustLevel;
  ageDays: number | null;
}

type RiskBand = "low" | "medium" | "high";

function bandFor(score: number): RiskBand {
  if (score >= 60) return "high";
  if (score >= 25) return "medium";
  return "low";
}

const BAND_ICON: Record<RiskBand, typeof ShieldCheck> = {
  low: ShieldCheck,
  medium: AlertTriangle,
  high: AlertOctagon,
};

const BAND_CLASS: Record<RiskBand, { text: string; bg: string }> = {
  low: { text: "text-[color:var(--neon)]", bg: "bg-[color:var(--neon)]/10" },
  medium: {
    text: "text-[color:var(--chart-4)]",
    bg: "bg-[color:var(--chart-4)]/10",
  },
  high: { text: "text-destructive", bg: "bg-destructive/10" },
};

export function EmailChecker() {
  const { t } = useTranslation();
  const [raw, setRaw] = useState("");
  const [analysis, setAnalysis] = useState<EmailAnalysis | null>(null);
  const [trust, setTrust] = useState<DomainTrustResult | null>(null);
  const [trustLoading, setTrustLoading] = useState(false);
  const [pasteHint, setPasteHint] = useState(false);

  function resetResults() {
    setAnalysis(null);
    setTrust(null);
  }

  function handleClear() {
    setRaw("");
    setPasteHint(false);
    resetResults();
  }

  function handleLoadExample() {
    setRaw(EXAMPLE_EMAIL);
    setPasteHint(false);
    resetResults();
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setRaw(text);
      setPasteHint(false);
      resetResults();
    } catch {
      setPasteHint(true);
    }
  }

  function handleAnalyze() {
    if (!raw.trim()) return;
    setAnalysis(analyzeEmail(raw));
    setTrust(null);
  }

  async function handleCheckTrust() {
    if (!analysis?.fromDomain || trustLoading) return;
    setTrustLoading(true);
    try {
      const headers = await authHeaders();
      const res = await fetch("/api/check-domain-trust", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ domain: analysis.fromDomain }),
      });
      if (res.status === 401) {
        toast.info(t("tools.emailChecker.trustSignInPrompt"));
        return;
      }
      if (res.status === 429) {
        toast.error(t("tools.emailChecker.trustLimitReached"));
        return;
      }
      if (!res.ok) {
        toast.error(t("tools.emailChecker.trustCheckFailed"));
        return;
      }
      const data = (await res.json()) as {
        domainAge: { ageDays: number } | null;
      };
      const ageDays = data.domainAge?.ageDays ?? null;
      const trustLevel: DomainTrustLevel =
        ageDays === null ? "unknown" : ageDays < 90 ? "new" : "established";
      setTrust({ trust: trustLevel, ageDays });
    } catch {
      toast.error(t("tools.emailChecker.trustCheckFailed"));
    } finally {
      setTrustLoading(false);
    }
  }

  const band = analysis ? bandFor(analysis.score) : null;
  const BandIcon = band ? BAND_ICON[band] : ShieldCheck;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor="email-raw-input"
          className="text-sm font-medium text-foreground"
        >
          {t("tools.emailChecker.inputLabel")}
        </label>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <button
          type="button"
          onClick={handlePaste}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          <Clipboard className="size-3.5" />
          {t("tools.emailChecker.pasteButton")}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          <X className="size-3.5" />
          {t("tools.emailChecker.clearButton")}
        </button>
        <button
          type="button"
          onClick={handleLoadExample}
          className="rounded-lg border border-border px-2 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          {t("tools.emailChecker.exampleButton")}
        </button>
      </div>

      <textarea
        id="email-raw-input"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={9}
        placeholder={t("tools.emailChecker.inputPlaceholder")}
        spellCheck={false}
        className="w-full rounded-xl border border-input bg-transparent p-3 font-mono text-xs leading-relaxed text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
      />
      {pasteHint ? (
        <p className="text-xs text-muted-foreground">
          {t("tools.emailChecker.pasteHint")}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleAnalyze}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 px-4 py-2.5 text-sm font-medium text-[color:var(--neon)] transition hover:bg-[color:var(--neon)]/20"
      >
        <Scan className="size-4" />
        {t("tools.emailChecker.analyzeButton")}
      </button>

      {analysis && band ? (
        <div className="space-y-4">
          <div
            className={cn(
              "flex items-center justify-between rounded-xl px-4 py-3",
              BAND_CLASS[band].bg,
            )}
          >
            <div className="flex items-center gap-2">
              <BandIcon className={cn("size-5", BAND_CLASS[band].text)} />
              <span
                className={cn("text-sm font-medium", BAND_CLASS[band].text)}
              >
                {t(`tools.emailChecker.riskBand.${band}`)}
              </span>
            </div>
            <span className={cn("font-mono text-sm", BAND_CLASS[band].text)}>
              {analysis.score} / 100
            </span>
          </div>

          <div>
            <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {t("tools.emailChecker.headerSummaryTitle")}
            </div>
            <div className="flex flex-col gap-1.5">
              {analysis.from ? (
                <div className="flex justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">
                    {t("tools.emailChecker.fromLabel")}
                  </span>
                  <span className="break-all font-mono text-xs text-foreground">
                    {analysis.from.name ? `${analysis.from.name} ` : ""}
                    {`<${analysis.from.address}>`}
                  </span>
                </div>
              ) : null}
              {analysis.replyTo ? (
                <div
                  className={cn(
                    "flex justify-between gap-3 rounded-lg px-3 py-2 text-sm",
                    analysis.replyToMismatch
                      ? "bg-destructive/10"
                      : "bg-muted/40",
                  )}
                >
                  <span
                    className={
                      analysis.replyToMismatch
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  >
                    {t("tools.emailChecker.replyToLabel")}
                  </span>
                  <span
                    className={cn(
                      "break-all font-mono text-xs",
                      analysis.replyToMismatch
                        ? "text-destructive"
                        : "text-foreground",
                    )}
                  >
                    {analysis.replyTo.address}
                  </span>
                </div>
              ) : null}
              {analysis.authResults ? (
                <div
                  className={cn(
                    "flex justify-between gap-3 rounded-lg px-3 py-2 text-sm",
                    analysis.authFail ? "bg-destructive/10" : "bg-muted/40",
                  )}
                >
                  <span
                    className={
                      analysis.authFail
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  >
                    {t("tools.emailChecker.authLabel")}
                  </span>
                  <span
                    className={cn(
                      "break-all font-mono text-xs",
                      analysis.authFail
                        ? "text-destructive"
                        : "text-foreground",
                    )}
                  >
                    {analysis.authResults}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCheckTrust}
              disabled={!analysis.fromDomain || trustLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-50"
            >
              <BadgeCheck className="size-4" />
              {trustLoading
                ? t("tools.emailChecker.trustChecking")
                : t("tools.emailChecker.trustButton")}
            </button>
            {trust ? (
              <div
                className={cn(
                  "mt-2 rounded-lg px-3.5 py-2.5 text-sm",
                  trust.trust === "new"
                    ? "bg-destructive/10 text-destructive"
                    : trust.trust === "established"
                      ? "bg-[color:var(--neon)]/10 text-[color:var(--neon)]"
                      : "bg-muted/40 text-muted-foreground",
                )}
              >
                {trust.ageDays !== null
                  ? t("tools.emailChecker.trustResultWithAge", {
                      domain: analysis.fromDomain,
                      days: trust.ageDays,
                    })
                  : t("tools.emailChecker.trustResultUnknown", {
                      domain: analysis.fromDomain,
                    })}
              </div>
            ) : null}
          </div>

          <div>
            <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {t("tools.emailChecker.findingsTitle")}
            </div>
            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
              {analysis.findings.length === 0 ? (
                <li className="bg-muted/30 px-3.5 py-2.5 text-sm text-muted-foreground">
                  {t("tools.emailChecker.noFindings")}
                </li>
              ) : (
                analysis.findings.map((f, i) => (
                  <li key={i} className="bg-muted/30 px-3.5 py-2.5 text-sm">
                    <div className="font-medium text-foreground">
                      {t(`tools.emailChecker.findings.${f.id}.label`)}
                    </div>
                    <div className="break-all text-muted-foreground">
                      {t(`tools.emailChecker.findings.${f.id}.text`, f.params)}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {analysis.route.length > 0 ? (
            <div>
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {t("tools.emailChecker.routeTitle")}
              </div>
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                {analysis.route
                  .slice()
                  .reverse()
                  .map((hop, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 bg-muted/30 px-3.5 py-2 font-mono text-xs text-muted-foreground"
                    >
                      <span className="text-muted-foreground/70">{i + 1}.</span>
                      <span className="break-all">
                        {hop.from} → {hop.by}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}

          {analysis.links.length > 0 ? (
            <div>
              <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {t("tools.emailChecker.linksTitle")}
              </div>
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                {analysis.links.map((l, i) => (
                  <li
                    key={i}
                    className="flex justify-between gap-3 bg-muted/30 px-3.5 py-2 font-mono text-xs"
                  >
                    <span className="break-all text-muted-foreground">
                      {l.url}
                    </span>
                    <span
                      className={cn(
                        "shrink-0",
                        l.isIpBased
                          ? "text-destructive"
                          : l.isShortened
                            ? "text-[color:var(--chart-4)]"
                            : "text-muted-foreground/70",
                      )}
                    >
                      {l.isIpBased
                        ? t("tools.emailChecker.linkTagIp")
                        : l.isShortened
                          ? t("tools.emailChecker.linkTagShortened")
                          : t("tools.emailChecker.linkTagStandard")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <span>{t("tools.emailChecker.privacyNote")}</span>
      </div>
    </div>
  );
}
