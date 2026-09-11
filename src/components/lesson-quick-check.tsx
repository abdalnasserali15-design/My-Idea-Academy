import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  X,
  Loader2,
  LogIn,
  Sparkles,
  Lightbulb,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

import { checkCourseAnswer } from "@/lib/course-actions";
import { pickLocale, type QuickCheckQuestion } from "@/lib/courses-data";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const REVEAL_SENTINEL = "__reveal__";

interface AnswerState {
  selectedChoiceId: string | null;
  checking: boolean;
  correct: boolean | null;
  correctChoiceId: string | null;
  gaveUp: boolean;
}

const EMPTY_ANSWER: AnswerState = {
  selectedChoiceId: null,
  checking: false,
  correct: null,
  correctChoiceId: null,
  gaveUp: false,
};

export function LessonQuickCheck({
  questions,
}: {
  questions: QuickCheckQuestion[];
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [hintsShown, setHintsShown] = useState<Set<string>>(new Set());

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

  if (questions.length === 0) return null;

  const answeredCount = Object.values(answers).filter(
    (a) => a.correct !== null,
  ).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const allAnswered = answeredCount === questions.length;

  const requireAuth = () => {
    if (!user) {
      navigate({ to: "/auth" });
      return true;
    }
    return false;
  };

  const check = async (
    question: QuickCheckQuestion,
    choiceId: string,
    gaveUp: boolean,
  ) => {
    const current = answers[question.id] ?? EMPTY_ANSWER;
    if (current.correct !== null || current.checking) return;
    if (requireAuth()) return;

    setAnswers((prev) => ({
      ...prev,
      [question.id]: {
        ...EMPTY_ANSWER,
        selectedChoiceId: gaveUp ? null : choiceId,
        checking: true,
      },
    }));
    try {
      const result = await checkCourseAnswer({
        data: { questionId: question.id, selectedChoiceId: choiceId },
      });
      setAnswers((prev) => ({
        ...prev,
        [question.id]: {
          selectedChoiceId: gaveUp ? null : choiceId,
          checking: false,
          correct: gaveUp ? null : result.correct,
          correctChoiceId: result.correctChoiceId,
          gaveUp,
        },
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.toLowerCase().includes("unauthorized")) {
        toast.info(t("courses.quickCheck.sessionExpired"));
        setUser(null);
      } else if (message.toLowerCase().includes("limit reached")) {
        toast.error(message);
      } else {
        toast.error(t("courses.quickCheck.checkFailed"));
      }
      setAnswers((prev) => ({ ...prev, [question.id]: EMPTY_ANSWER }));
    }
  };

  const toggleHint = (question: QuickCheckQuestion) => {
    if (requireAuth()) return;
    setHintsShown((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  };

  return (
    <section
      aria-labelledby="quick-check-heading"
      className="mt-10 rounded-3xl border border-[color:var(--neon)]/25 bg-card/70 p-6 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2
          id="quick-check-heading"
          className="flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl"
        >
          <Sparkles className="size-5 text-[color:var(--neon)]" />
          {t("courses.quickCheck.title")}
        </h2>
        {allAnswered ? (
          <span className="font-mono text-xs text-[color:var(--neon)]">
            {t("courses.quickCheck.scoreLine", {
              score: correctCount,
              total: questions.length,
            })}
          </span>
        ) : null}
      </div>

      {authChecked && !user ? (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
          <span>{t("courses.quickCheck.signInPrompt")}</span>
          <button
            type="button"
            onClick={() => navigate({ to: "/auth" })}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[image:var(--gradient-neon)] px-3.5 py-2 text-xs font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
          >
            <LogIn className="size-3.5" /> {t("auth.signInButton")}
          </button>
        </div>
      ) : null}

      <div className="space-y-5">
        {questions.map((q, i) => {
          const state = answers[q.id] ?? EMPTY_ANSWER;
          const revealed = state.correctChoiceId !== null;
          const hintVisible = hintsShown.has(q.id);
          return (
            <div
              key={q.id}
              className="rounded-2xl border border-border bg-background/40 p-4 sm:p-5"
            >
              <p className="mb-3 text-sm font-semibold text-foreground sm:text-base">
                <span className="text-muted-foreground">{i + 1}. </span>
                {pickLocale(q.prompt, i18n.language)}
              </p>
              <div className="space-y-2">
                {q.choices.map((choice) => {
                  const isSelected = choice.id === state.selectedChoiceId;
                  const isCorrectChoice =
                    revealed && choice.id === state.correctChoiceId;
                  const isWrongSelected =
                    revealed && isSelected && !isCorrectChoice;
                  return (
                    <button
                      type="button"
                      key={choice.id}
                      onClick={() => check(q, choice.id, false)}
                      disabled={revealed || state.checking}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-start text-sm transition",
                        !revealed &&
                          "border-border bg-background/60 hover:border-[color:var(--neon)]/40 hover:bg-muted",
                        isCorrectChoice &&
                          "border-[color:var(--neon)]/60 bg-[color:var(--neon)]/10 text-foreground",
                        isWrongSelected &&
                          "border-destructive/60 bg-destructive/10 text-foreground",
                        revealed &&
                          !isSelected &&
                          !isCorrectChoice &&
                          "opacity-60",
                      )}
                    >
                      <span>{pickLocale(choice.text, i18n.language)}</span>
                      {isSelected && state.checking ? (
                        <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                      ) : null}
                      {isCorrectChoice ? (
                        <Check className="size-4 shrink-0 text-[color:var(--neon)]" />
                      ) : null}
                      {isWrongSelected ? (
                        <X className="size-4 shrink-0 text-destructive" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {!revealed ? (
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  {q.hint ? (
                    <button
                      type="button"
                      onClick={() => toggleHint(q)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
                    >
                      <Lightbulb className="size-3.5" />
                      {t("courses.quickCheck.hintButton")}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => check(q, REVEAL_SENTINEL, true)}
                    disabled={state.checking}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    <Eye className="size-3.5" />
                    {t("courses.quickCheck.showAnswerButton")}
                  </button>
                </div>
              ) : null}

              {!revealed && hintVisible && q.hint ? (
                <div className="mt-3 rounded-lg border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground sm:text-sm">
                  {pickLocale(q.hint, i18n.language)}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
