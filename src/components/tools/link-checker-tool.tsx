import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  analyzeUrl,
  computeSafetyScore,
  tierFromDomainAgeDays,
  tierFromRedirectChain,
  type CheckTier,
  type UrlAnalysis,
} from "@/lib/link-checker";

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface RedirectHop {
  url: string;
  status: number;
}
interface DomainAge {
  registeredAt: string;
  ageDays: number;
}

export function LinkCheckerTool() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<UrlAnalysis | null>(null);
  const [serverBusy, setServerBusy] = useState(false);
  const [redirectChain, setRedirectChain] = useState<RedirectHop[] | null>(
    null,
  );
  const [domainAge, setDomainAge] = useState<DomainAge | null>(null);
  const [googleFlagged, setGoogleFlagged] = useState<boolean | null>(null);
  const [redirectTier, setRedirectTier] = useState<CheckTier>(null);
  const [domainAgeTier, setDomainAgeTier] = useState<CheckTier>(null);

  const flaggedCount = analysis?.checks.filter((c) => c.flagged).length ?? 0;
  const score = analysis?.valid
    ? computeSafetyScore({
        flaggedCount,
        totalChecks: analysis.checks.length,
        redirectTier,
        domainAgeTier,
      })
    : 0;
  const scoreTone: "good" | "mixed" | "bad" =
    score >= 70 ? "good" : score >= 25 ? "mixed" : "bad";

  function handleAnalyze() {
    setRedirectChain(null);
    setDomainAge(null);
    setGoogleFlagged(null);
    setRedirectTier(null);
    setDomainAgeTier(null);
    setAnalysis(analyzeUrl(input));
  }

  async function handleServerCheck() {
    if (!analysis?.valid) return;
    setServerBusy(true);
    try {
      const headers = await authHeaders();
      const res = await fetch("/api/check-link", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ url: input }),
      });
      if (res.status === 401) {
        toast.info(t("tools.linkChecker.server.signInPrompt"));
        return;
      }
      if (res.status === 429) {
        toast.error(t("tools.linkChecker.server.limitReached"));
        return;
      }
      if (!res.ok) {
        toast.error(t("tools.linkChecker.server.failed"));
        return;
      }
      const data = (await res.json()) as {
        redirectChain: RedirectHop[];
        domainAge: DomainAge | null;
        googleFlagged: boolean | null;
      };
      setRedirectChain(data.redirectChain);
      setDomainAge(data.domainAge);
      setGoogleFlagged(data.googleFlagged);
      setRedirectTier(
        tierFromRedirectChain(analysis.hostname ?? "", data.redirectChain),
      );
      setDomainAgeTier(tierFromDomainAgeDays(data.domainAge?.ageDays ?? null));
    } catch {
      toast.error(t("tools.linkChecker.server.failed"));
    } finally {
      setServerBusy(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {t("tools.linkChecker.urlLabel")}
      </label>
      <input
        dir="ltr"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("tools.linkChecker.urlPlaceholder")}
        className="mb-3 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon)]"
      />

      <button
        type="button"
        onClick={handleAnalyze}
        className="mb-6 w-full rounded-xl bg-[color:var(--neon)] py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
      >
        {t("tools.linkChecker.analyzeButton")}
      </button>

      {analysis && !analysis.valid ? (
        <p className="text-sm text-destructive">
          {t("tools.linkChecker.invalid")}
        </p>
      ) : null}

      {analysis?.valid ? (
        <div>
          <div
            className={cn(
              "mb-6 rounded-xl p-3.5",
              scoreTone === "good" && "bg-[color:var(--neon)]/10",
              scoreTone === "mixed" && "bg-[color:var(--chart-4)]/10",
              scoreTone === "bad" && "bg-destructive/10",
            )}
          >
            <div className="mb-1 flex items-baseline gap-2">
              <span
                className={cn(
                  "text-2xl font-semibold",
                  scoreTone === "good" && "text-[color:var(--neon)]",
                  scoreTone === "mixed" && "text-[color:var(--chart-4)]",
                  scoreTone === "bad" && "text-destructive",
                )}
              >
                {score}%
              </span>
              <span className="text-xs text-muted-foreground">
                {t("tools.linkChecker.scoreLabel")}
              </span>
            </div>
            <p
              className={cn(
                "text-sm font-medium",
                scoreTone === "good" && "text-[color:var(--neon)]",
                scoreTone === "mixed" && "text-[color:var(--chart-4)]",
                scoreTone === "bad" && "text-destructive",
              )}
            >
              {t(`tools.linkChecker.scoreTone.${scoreTone}`)}
            </p>
          </div>

          <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.linkChecker.breakdownLabel")}
          </label>
          <div
            dir="ltr"
            className="mb-6 rounded-xl border border-border bg-muted/30 p-3 text-left font-mono text-xs"
          >
            <div>
              <span className="text-muted-foreground">
                {t("tools.linkChecker.protocolLabel")}{" "}
              </span>
              {analysis.protocol}
            </div>
            <div className="break-all">
              <span className="text-muted-foreground">
                {t("tools.linkChecker.hostLabel")}{" "}
              </span>
              {analysis.hostname}
            </div>
            <div className="break-all">
              <span className="text-muted-foreground">
                {t("tools.linkChecker.pathLabel")}{" "}
              </span>
              {analysis.path}
            </div>
          </div>

          <label className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.linkChecker.checksLabel", {
              count: flaggedCount,
              total: analysis.checks.length,
            })}
          </label>
          <div className="mb-4">
            {analysis.checks.map((c) => (
              <div
                key={c.id}
                className="flex gap-2.5 border-b border-border py-2 text-xs last:border-0"
              >
                <span
                  className={cn(
                    "shrink-0",
                    c.flagged ? "text-destructive" : "text-muted-foreground",
                  )}
                >
                  {c.flagged ? "⚠" : "✓"}
                </span>
                <div>
                  <div
                    className={cn(
                      "mb-0.5 font-medium",
                      c.flagged && "text-destructive",
                    )}
                  >
                    {t(`tools.linkChecker.checks.${c.id}.label`)}
                  </div>
                  <div className="text-muted-foreground">
                    {t(
                      `tools.linkChecker.checks.${c.id}.${c.flagged ? "flagged" : "clean"}`,
                      c.params,
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mb-6 text-xs text-muted-foreground">
            {t("tools.linkChecker.disclaimer")}
          </p>

          <label className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.linkChecker.server.label")}
          </label>
          <button
            type="button"
            onClick={handleServerCheck}
            disabled={serverBusy}
            className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-60"
          >
            <Search className="size-4" />
            {serverBusy
              ? t("tools.linkChecker.server.checking")
              : t("tools.linkChecker.server.button")}
          </button>

          {redirectChain ? (
            <div
              dir="ltr"
              className="mb-2 rounded-xl border border-border bg-muted/30 p-3 text-left font-mono text-xs"
            >
              <div className="mb-1 text-muted-foreground">
                {t("tools.linkChecker.server.redirectLabel")}
              </div>
              {redirectChain.map((hop, i) => (
                <div key={i} className="break-all">
                  {hop.url}{" "}
                  <span className="text-muted-foreground">({hop.status})</span>
                </div>
              ))}
            </div>
          ) : null}

          {domainAge ? (
            <div
              dir="ltr"
              className="mb-2 rounded-xl border border-border bg-muted/30 p-3 text-left font-mono text-xs"
            >
              <div className="text-muted-foreground">
                {t("tools.linkChecker.server.domainAgeLabel")}
              </div>
              <div>
                {t("tools.linkChecker.server.daysOld", {
                  count: domainAge.ageDays,
                })}
              </div>
            </div>
          ) : redirectChain ? (
            <p className="mb-2 text-xs text-muted-foreground">
              {t("tools.linkChecker.server.domainAgeUnknown")}
            </p>
          ) : null}

          {googleFlagged !== null ? (
            <div
              dir="ltr"
              className={cn(
                "rounded-xl border p-3 text-left font-mono text-xs",
                googleFlagged
                  ? "border-destructive/40 bg-destructive/10"
                  : "border-border bg-muted/30",
              )}
            >
              <div
                className={cn(
                  googleFlagged ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {googleFlagged
                  ? t("tools.linkChecker.server.googleFlagged")
                  : t("tools.linkChecker.server.googleClean")}
              </div>
            </div>
          ) : redirectChain ? (
            <p className="text-xs text-muted-foreground">
              {t("tools.linkChecker.server.googleUnavailable")}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
