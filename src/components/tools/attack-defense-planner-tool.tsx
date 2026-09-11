import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  LogIn,
  Loader2,
  Sparkles,
  ShieldCheck,
  Search,
  Zap,
  RotateCw,
  ArrowLeft,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { ATTACK_SCENARIOS } from "@/data/attack-scenarios";

const MAX_CONTEXT_LENGTH = 300;

type Severity = "low" | "medium" | "high" | "critical";
type Section = "prevention" | "detection" | "response" | "recovery";

interface Plan {
  summary: string;
  severity: Severity;
  prevention: string[];
  detection: string[];
  response: string[];
  recovery: string[];
}

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const SEVERITY_STYLES: Record<Severity, string> = {
  low: "border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)]",
  medium:
    "border-[color:var(--chart-4)]/40 bg-[color:var(--chart-4)]/10 text-[color:var(--chart-4)]",
  high: "border-[color:var(--chart-5)]/40 bg-[color:var(--chart-5)]/10 text-[color:var(--chart-5)]",
  critical: "border-destructive/40 bg-destructive/10 text-destructive",
};

const SECTIONS: Section[] = ["prevention", "detection", "response", "recovery"];
const SECTION_ICONS: Record<Section, typeof ShieldCheck> = {
  prevention: ShieldCheck,
  detection: Search,
  response: Zap,
  recovery: RotateCw,
};

export function AttackDefensePlannerTool() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [scenarioSlug, setScenarioSlug] = useState<string | null>(null);
  const [context, setContext] = useState("");
  const [busy, setBusy] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleGenerate() {
    if (!scenarioSlug) return;
    setBusy(true);
    try {
      const headers = await authHeaders();
      const res = await fetch("/api/attack-defense-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          scenarioSlug,
          context,
          language: i18n.language,
        }),
      });
      if (res.status === 401) {
        toast.info(t("tools.attackPlanner.signInTitle"));
        return;
      }
      if (res.status === 429) {
        toast.error(t("tools.attackPlanner.limitReached"));
        return;
      }
      if (!res.ok) {
        toast.error(t("tools.attackPlanner.failed"));
        return;
      }
      setPlan((await res.json()) as Plan);
    } catch {
      toast.error(t("tools.attackPlanner.failed"));
    } finally {
      setBusy(false);
    }
  }

  function handleReset() {
    setPlan(null);
    setScenarioSlug(null);
    setContext("");
  }

  if (!authChecked) {
    return (
      <div className="rounded-2xl border border-border bg-card/70 p-10 text-center text-sm text-muted-foreground">
        <Loader2 className="mx-auto mb-2 size-5 animate-spin" />{" "}
        {t("quiz.loading")}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border border-border bg-card/80 p-7 text-center shadow-[var(--shadow-card)] backdrop-blur-xl">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-[color:var(--neon)]/15 text-[color:var(--neon)]">
          <LogIn className="size-7" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          {t("tools.attackPlanner.signInTitle")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("tools.attackPlanner.signInSubtitle")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/auth" })}
            className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-5 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
          >
            <LogIn className="size-4" /> {t("auth.signInButton")}
          </button>
        </div>
      </div>
    );
  }

  if (plan) {
    return (
      <div>
        <span className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {t("tools.attackPlanner.severityLabel")}
        </span>
        <div
          className={cn(
            "mb-5 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
            SEVERITY_STYLES[plan.severity],
          )}
        >
          {t(`tools.attackPlanner.severity.${plan.severity}`)}
        </div>

        <p className="mb-6 text-sm leading-relaxed text-foreground">
          {plan.summary}
        </p>

        {SECTIONS.map((section) => {
          const Icon = SECTION_ICONS[section];
          return (
            <div key={section} className="mb-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <Icon className="size-3.5" />
                {t(`tools.attackPlanner.sections.${section}`)}
              </div>
              <ul className="space-y-1.5">
                {plan[section].map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 rounded-xl border border-border bg-muted/30 p-3 text-sm"
                  >
                    <span className="text-[color:var(--neon)]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <p className="mb-6 text-xs text-muted-foreground">
          {t("tools.attackPlanner.disclaimer")}
        </p>

        <button
          type="button"
          onClick={handleReset}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          {t("tools.attackPlanner.changeScenarioButton")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {t("tools.attackPlanner.scenarioPickerLabel")}
      </label>
      <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {ATTACK_SCENARIOS.map((scenario) => {
          const Icon = scenario.icon;
          const selected = scenarioSlug === scenario.slug;
          return (
            <button
              key={scenario.slug}
              type="button"
              onClick={() => setScenarioSlug(scenario.slug)}
              className={cn(
                "flex items-start gap-2.5 rounded-xl border p-3 text-left transition",
                selected
                  ? "border-[color:var(--neon)]/60 bg-[color:var(--neon)]/10"
                  : "border-border hover:bg-muted",
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  selected
                    ? "text-[color:var(--neon)]"
                    : "text-muted-foreground",
                )}
              />
              <div>
                <div
                  className={cn(
                    "text-sm font-medium",
                    selected && "text-[color:var(--neon)]",
                  )}
                >
                  {t(`tools.attackPlanner.scenarios.${scenario.i18nKey}.title`)}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {t(
                    `tools.attackPlanner.scenarios.${scenario.i18nKey}.description`,
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {scenarioSlug ? (
        <>
          <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.attackPlanner.contextLabel")}
          </label>
          <textarea
            value={context}
            onChange={(e) =>
              setContext(e.target.value.slice(0, MAX_CONTEXT_LENGTH))
            }
            placeholder={t("tools.attackPlanner.contextPlaceholder")}
            rows={3}
            maxLength={MAX_CONTEXT_LENGTH}
            className="mb-1.5 w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon)]"
          />
          <p className="mb-5 text-right text-xs text-muted-foreground">
            {t("tools.attackPlanner.contextHint", {
              count: context.length,
              max: MAX_CONTEXT_LENGTH,
            })}
          </p>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--neon)] py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {busy
              ? t("tools.attackPlanner.generating")
              : t("tools.attackPlanner.generateButton")}
          </button>
        </>
      ) : null}
    </div>
  );
}
