import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  LogIn,
  Trophy,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

import { submitCourseExam } from "@/lib/course-actions";
import { pickLocale, type QuickCheckQuestion } from "@/lib/courses-data";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { CertificateModal } from "@/components/certificate-modal";

interface ExamRunnerProps {
  title: string;
  kind: "unit_exam" | "final_exam";
  courseId: string;
  unitId?: string;
  questions: QuickCheckQuestion[];
  backTo: { to: string; params?: Record<string, string> };
}

interface ExamResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  perQuestion: Record<string, boolean>;
  certId: string | null;
  recipientName: string | null;
  learningSummary: string | null;
}

export function ExamRunner({
  title,
  kind,
  courseId,
  unitId,
  questions,
  backTo,
}: ExamRunnerProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [certOpen, setCertOpen] = useState(false);

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

  if (!authChecked) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-border bg-card/60 p-8 text-center">
        <LogIn className="mx-auto mb-3 size-6 text-muted-foreground" />
        <p className="mb-4 text-sm text-muted-foreground">
          {t("courses.exam.signInPrompt")}
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: "/auth" })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
        >
          <LogIn className="size-4" /> {t("auth.signInButton")}
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        {t("courses.exam.noQuestions")}
      </p>
    );
  }

  const restart = () => {
    setIndex(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <div>
        <div className="rounded-2xl border border-[color:var(--neon)]/25 bg-card/70 p-8 text-center shadow-[var(--shadow-card)]">
          <Trophy
            className={cn(
              "mx-auto mb-3 size-9",
              result.passed
                ? "text-[color:var(--neon)]"
                : "text-muted-foreground",
            )}
          />
          <p className="text-3xl font-bold text-foreground">
            {result.percentage}%
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("courses.exam.scoreLine", {
              score: result.score,
              total: result.total,
            })}
          </p>
          <p
            className={cn(
              "mt-4 text-sm font-semibold",
              result.passed ? "text-[color:var(--neon)]" : "text-destructive",
            )}
          >
            {result.passed
              ? t("courses.exam.passed")
              : t("courses.exam.notPassed")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {!result.passed ? (
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <RotateCcw className="size-4" /> {t("courses.exam.retry")}
              </button>
            ) : null}
            {result.certId ? (
              <button
                type="button"
                onClick={() => setCertOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 px-4 py-2.5 text-sm font-semibold text-[color:var(--neon)] transition hover:bg-[color:var(--neon)]/20"
              >
                <Award className="size-4" /> {t("certificate.viewCertificate")}
              </button>
            ) : null}
            <Link
              to={backTo.to}
              params={backTo.params}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[image:var(--gradient-neon)] px-4 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
            >
              {t("courses.backToCourse")}
            </Link>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t("courses.exam.reviewHeading")}
          </h3>
          {questions.map((q, i) => {
            const correct = result.perQuestion[q.id];
            return (
              <div
                key={q.id}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-3.5"
              >
                {correct ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[color:var(--neon)]" />
                ) : (
                  <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                )}
                <span className="text-sm text-foreground">
                  <span className="me-1.5 text-muted-foreground">{i + 1}.</span>
                  {pickLocale(q.prompt, i18n.language)}
                </span>
              </div>
            );
          })}
        </div>

        {result.certId ? (
          <CertificateModal
            open={certOpen}
            onClose={() => setCertOpen(false)}
            recipientName={result.recipientName ?? "Learner"}
            courseTitle={title}
            learningSummary={result.learningSummary ?? undefined}
            score={result.percentage}
            certId={result.certId}
          />
        ) : null}
      </div>
    );
  }

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const currentAnswer = answers[question.id] ?? null;

  const selectChoice = (choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
  };

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const goNext = async () => {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitCourseExam({
        data: {
          kind,
          courseId,
          unitId,
          answers: Object.entries(answers).map(
            ([questionId, selectedChoiceId]) => ({
              questionId,
              selectedChoiceId,
            }),
          ),
        },
      });
      setResult(res);
    } catch {
      toast.error(t("courses.exam.submitFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="truncate font-medium text-foreground">{title}</span>
        <span className="shrink-0 font-mono">
          {t("quiz.questionCounter", {
            current: index + 1,
            total: questions.length,
          })}
        </span>
      </div>
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[image:var(--gradient-neon)] transition-all"
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
        <p className="mb-4 text-base font-semibold text-foreground">
          {pickLocale(question.prompt, i18n.language)}
        </p>
        <div className="space-y-2">
          {question.choices.map((choice) => {
            const isSelected = choice.id === currentAnswer;
            return (
              <button
                type="button"
                key={choice.id}
                onClick={() => selectChoice(choice.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-start text-sm transition",
                  isSelected
                    ? "border-[color:var(--neon)]/60 bg-[color:var(--neon)]/10 text-foreground"
                    : "border-border bg-background/60 hover:border-[color:var(--neon)]/40 hover:bg-muted",
                )}
              >
                <span>{pickLocale(choice.text, i18n.language)}</span>
                {isSelected ? (
                  <CheckCircle2 className="size-4 shrink-0 text-[color:var(--neon)]" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-3">
          {index > 0 ? (
            <button
              type="button"
              onClick={goPrev}
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              {isRTL ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
              {t("courses.exam.previous")}
            </button>
          ) : null}
          <button
            type="button"
            onClick={goNext}
            disabled={!currentAnswer || submitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : isLast ? (
              t("quiz.finish")
            ) : (
              t("quiz.next")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
