import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  Check,
  X,
  Trophy,
  RotateCw,
  Award,
  Loader2,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";

import {
  getQuizQuestions,
  checkQuizAnswer,
  submitQuizAttempt,
} from "@/lib/quiz-actions";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { CertificateModal } from "@/components/certificate-modal";

interface Props {
  topicSlug: string;
  onClose: () => void;
}

interface Reveal {
  correct: boolean;
  correctIndex: number;
  explanation: string;
}

export function QuizRunner({ topicSlug, onClose }: Props) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [checking, setChecking] = useState(false);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [recipientName, setRecipientName] = useState<string>("");
  const [certId, setCertId] = useState<string | null>(null);
  const [finalPercentage, setFinalPercentage] = useState<number | null>(null);
  const [finalPassed, setFinalPassed] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

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

  const { data: questions, isLoading } = useQuery({
    queryKey: ["quiz-questions", topicSlug],
    queryFn: () => getQuizQuestions({ data: topicSlug }),
    enabled: !!user,
  });

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
          {t("quiz.signInTitle")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("quiz.signInSubtitle")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/auth" })}
            className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-5 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
          >
            <LogIn className="size-4" /> {t("auth.signInButton")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {t("quiz.backToLessons")}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !questions) {
    return (
      <div className="rounded-2xl border border-border bg-card/70 p-10 text-center text-sm text-muted-foreground">
        <Loader2 className="mx-auto mb-2 size-5 animate-spin" />{" "}
        {t("quiz.loadingQuiz")}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card/70 p-6 text-center text-sm text-muted-foreground">
        {t("quiz.noQuizAvailable")}
      </div>
    );
  }

  const q = questions[current];
  const percentage =
    finalPercentage ?? Math.round((score / questions.length) * 100);
  const passed = finalPassed ?? percentage >= 70;

  const pick = async (idx: number) => {
    if (reveal || checking) return;
    setSelected(idx);
    setChecking(true);
    try {
      const result = await checkQuizAnswer({
        data: { topicSlug, questionIndex: current, selectedIndex: idx },
      });
      setReveal(result);
      setAnswers((a) => [...a, idx]);
      if (result.correct) setScore((s) => s + 1);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.toLowerCase().includes("unauthorized")) {
        toast.info(t("quiz.sessionExpired"));
        setUser(null);
      } else if (message.toLowerCase().includes("limit reached")) {
        toast.error(message);
      } else {
        toast.error(t("quiz.answerCheckFailed"));
      }
      setSelected(null);
    } finally {
      setChecking(false);
    }
  };

  const next = async () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setReveal(null);
      return;
    }
    setFinished(true);
    setSaving(true);
    try {
      const result = await submitQuizAttempt({ data: { topicSlug, answers } });
      setFinalPercentage(result.percentage);
      setFinalPassed(result.passed);
      setRecipientName(result.recipientName);
      setCertId(result.certId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.toLowerCase().includes("unauthorized")) {
        toast.info(t("quiz.signInToSave"));
      } else {
        toast.error(message || t("quiz.saveFailed"));
      }
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setReveal(null);
    setAnswers([]);
    setScore(0);
    setFinished(false);
    setFinalPercentage(null);
    setFinalPassed(null);
    setCertId(null);
  };

  if (finished) {
    return (
      <>
        <div className="rounded-3xl border border-border bg-card/80 p-7 text-center shadow-[var(--shadow-card)] backdrop-blur-xl">
          <div
            className={cn(
              "mx-auto mb-4 grid size-20 place-items-center rounded-full",
              passed
                ? "bg-[color:var(--neon)]/15 text-[color:var(--neon)] glow-neon"
                : "bg-[color:var(--violet)]/15 text-[color:var(--violet)]",
            )}
          >
            {passed ? (
              <Trophy className="size-10" />
            ) : (
              <RotateCw className="size-10" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            {passed ? t("quiz.congratulations") : t("quiz.almostThere")}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("quiz.scoreLine", {
              score,
              total: questions.length,
              percentage,
            })}
          </p>
          {saving ? (
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />{" "}
              {t("quiz.savingAttempt")}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {passed && recipientName ? (
              <button
                type="button"
                onClick={() => setShowCert(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-5 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
              >
                <Award className="size-4" /> {t("quiz.viewCertificate")}
              </button>
            ) : null}
            {!passed ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <RotateCw className="size-4" /> {t("quiz.tryAgain")}
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              {t("quiz.backToLessons")}
            </button>
            {!recipientName && passed ? (
              <button
                type="button"
                onClick={() => navigate({ to: "/auth" })}
                className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--neon)]/50 px-5 py-2.5 text-sm font-medium text-[color:var(--neon)] transition hover:bg-[color:var(--neon)]/10"
              >
                {t("quiz.signInToClaim")}
              </button>
            ) : null}
          </div>
        </div>
        {showCert ? (
          <CertificateModal
            open={showCert}
            onClose={() => setShowCert(false)}
            recipientName={recipientName}
            topicSlug={topicSlug}
            score={percentage}
            certId={certId}
          />
        ) : null}
      </>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7">
      <div className="mb-4 flex items-center justify-between text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">
        <span>
          {t("quiz.questionCounter", {
            current: current + 1,
            total: questions.length,
          })}
        </span>
        <span className="text-[color:var(--neon)]">
          {t("quiz.scoreCounter", { score })}
        </span>
      </div>
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-[image:var(--gradient-neon)] transition-all"
          style={{
            width: `${((current + (reveal ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>

      <h3 className="mb-5 text-lg font-semibold text-foreground sm:text-xl">
        {q.question}
      </h3>

      <div className="space-y-2.5">
        {q.options.map((opt, idx) => {
          const isSelected = idx === selected;
          const isCorrect = reveal ? idx === reveal.correctIndex : false;
          const showRight = !!reveal && isCorrect;
          const showWrong = !!reveal && isSelected && !isCorrect;
          return (
            <button
              type="button"
              key={idx}
              onClick={() => pick(idx)}
              disabled={!!reveal || checking}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-start text-sm transition",
                !reveal &&
                  "border-border bg-background/60 hover:border-[color:var(--neon)]/40 hover:bg-muted",
                showRight &&
                  "border-[color:var(--neon)]/60 bg-[color:var(--neon)]/10 text-foreground",
                showWrong &&
                  "border-destructive/60 bg-destructive/10 text-foreground",
                reveal && !isSelected && !isCorrect && "opacity-60",
              )}
            >
              <span>{opt}</span>
              {isSelected && checking ? (
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              ) : null}
              {showRight ? (
                <Check className="size-4 text-[color:var(--neon)]" />
              ) : null}
              {showWrong ? <X className="size-4 text-destructive" /> : null}
            </button>
          );
        })}
      </div>

      {reveal ? (
        <div className="mt-5 rounded-xl border border-border/60 bg-muted/40 p-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {t("quiz.explanationLabel")}{" "}
          </span>
          {reveal.explanation}
        </div>
      ) : null}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={next}
          disabled={!reveal}
          className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-5 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95 disabled:opacity-40"
        >
          {current + 1 === questions.length ? t("quiz.finish") : t("quiz.next")}
        </button>
      </div>
    </div>
  );
}
