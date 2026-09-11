import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, X, ShieldQuestion } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  APP_SCENARIOS,
  TIP_KEYS,
  type PermissionKey,
} from "@/data/app-permission-scenarios";

type Mode = "answering" | "revealed";

export function AppPermissionsTool() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [denied, setDenied] = useState<Set<PermissionKey>>(new Set());
  const [mode, setMode] = useState<Mode>("answering");
  const [correctCount, setCorrectCount] = useState(0);
  const [judgedCount, setJudgedCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const app = APP_SCENARIOS[currentIndex];
  const isLast = currentIndex === APP_SCENARIOS.length - 1;
  const Icon = app.icon;

  function toggleDeny(key: PermissionKey) {
    if (mode !== "answering") return;
    setDenied((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleCheck() {
    if (mode !== "answering") return;
    let correct = 0;
    for (const perm of app.permissions) {
      const userDenied = denied.has(perm.key);
      if (userDenied === !perm.justified) correct++;
    }
    setCorrectCount((c) => c + correct);
    setJudgedCount((c) => c + app.permissions.length);
    setMode("revealed");
  }

  function handleNext() {
    if (currentIndex + 1 >= APP_SCENARIOS.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setDenied(new Set());
    setMode("answering");
  }

  function handleRestart() {
    setCurrentIndex(0);
    setDenied(new Set());
    setMode("answering");
    setCorrectCount(0);
    setJudgedCount(0);
    setFinished(false);
  }

  if (finished) {
    const pct =
      judgedCount > 0 ? Math.round((correctCount / judgedCount) * 100) : 0;
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-border bg-card/70 p-6 text-center shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-8">
          <div className="text-3xl font-semibold text-foreground">
            {correctCount} / {judgedCount}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {t("tools.appPermissions.finalScoreCaption", { pct })}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.appPermissions.tipsTitle")}
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
            {TIP_KEYS.map((key) => (
              <li
                key={key}
                className="flex items-start gap-2 bg-muted/30 px-3.5 py-2.5 text-sm text-muted-foreground"
              >
                <ShieldQuestion className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />
                {t(`tools.appPermissions.tips.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="w-full rounded-xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 px-4 py-2.5 text-sm font-medium text-[color:var(--neon)] transition hover:bg-[color:var(--neon)]/20"
        >
          {t("tools.appPermissions.tryAgainButton")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {t("tools.appPermissions.progressLabel", {
            current: currentIndex + 1,
            total: APP_SCENARIOS.length,
          })}
        </span>
        <span className="text-sm font-medium text-foreground">
          {t("tools.appPermissions.scoreLabel", {
            score: correctCount,
            total: judgedCount,
          })}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        {t("tools.appPermissions.instructionLabel")}
      </p>

      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)]">
            <Icon className="size-5" strokeWidth={1.6} />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {t(`tools.appPermissions.apps.${app.i18nKey}.name`)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t(`tools.appPermissions.apps.${app.i18nKey}.description`)}
            </div>
          </div>
        </div>

        <ul className="divide-y divide-border">
          {app.permissions.map((perm) => {
            const isDenied = denied.has(perm.key);
            const isCorrect = isDenied === !perm.justified;
            return (
              <li
                key={perm.key}
                className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2">
                  {mode === "revealed" ? (
                    isCorrect ? (
                      <Check className="size-4 shrink-0 text-[color:var(--neon)]" />
                    ) : (
                      <X className="size-4 shrink-0 text-destructive" />
                    )
                  ) : null}
                  <span className="text-sm text-foreground">
                    {t(`tools.appPermissions.permissions.${perm.key}`)}
                  </span>
                </div>

                {mode === "answering" ? (
                  <div className="flex overflow-hidden rounded-lg border border-border text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => isDenied && toggleDeny(perm.key)}
                      className={cn(
                        "px-3 py-1.5 transition-colors",
                        !isDenied
                          ? "bg-[color:var(--neon)]/15 text-[color:var(--neon)]"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {t("tools.appPermissions.allowLabel")}
                    </button>
                    <button
                      type="button"
                      onClick={() => !isDenied && toggleDeny(perm.key)}
                      className={cn(
                        "border-s border-border px-3 py-1.5 transition-colors",
                        isDenied
                          ? "bg-destructive/15 text-destructive"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {t("tools.appPermissions.denyLabel")}
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {perm.justified
                      ? t("tools.appPermissions.justifiedNote")
                      : t(`tools.appPermissions.reasons.${perm.reasonKey}`)}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {mode === "answering" ? (
        <button
          type="button"
          onClick={handleCheck}
          className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          {t("tools.appPermissions.checkButton")}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 px-4 py-2.5 text-sm font-medium text-[color:var(--neon)] transition hover:bg-[color:var(--neon)]/20"
        >
          {isLast
            ? t("tools.appPermissions.finishButton")
            : t("tools.appPermissions.nextButton")}
        </button>
      )}
    </div>
  );
}
