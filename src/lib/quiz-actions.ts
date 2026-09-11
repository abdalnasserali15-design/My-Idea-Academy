import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getQuiz } from "@/data/quizzes";

const PASS_PCT = 70;

const DAILY_ANSWER_CHECK_LIMIT = 100;

export interface PublicQuizQuestion {
  question: string;
  options: string[];
}

export const getQuizQuestions = createServerFn({ method: "GET" })
  .validator((topicSlug: string) => topicSlug)
  .handler(async ({ data: topicSlug }): Promise<PublicQuizQuestion[]> => {
    return getQuiz(topicSlug).map(({ question, options }) => ({
      question,
      options,
    }));
  });

export const checkQuizAnswer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: unknown) =>
      data as {
        topicSlug: string;
        questionIndex: number;
        selectedIndex: number;
      },
  )
  .handler(async ({ data, context }) => {
    const userId = context.userId as string;

    const { supabaseAdmin } =
      await import("@/integrations/supabase/client.server");

    const { data: withinLimit, error: usageError } = await supabaseAdmin.rpc(
      "check_and_increment_quiz_check_usage",
      { p_user_id: userId, p_daily_limit: DAILY_ANSWER_CHECK_LIMIT },
    );
    if (usageError) throw new Error("Could not verify usage limits");
    if (!withinLimit) {
      throw new Error(
        "Daily answer-check limit reached, please try again tomorrow.",
      );
    }

    const quiz = getQuiz(data.topicSlug);
    const q = quiz[data.questionIndex];
    if (!q) throw new Error("Invalid question");
    return {
      correct: data.selectedIndex === q.correctIndex,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    };
  });

export const submitQuizAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: unknown) => data as { topicSlug: string; answers: number[] },
  )
  .handler(async ({ data, context }) => {
    const quiz = getQuiz(data.topicSlug);
    if (quiz.length === 0) throw new Error("Unknown topic");
    if (!Array.isArray(data.answers) || data.answers.length !== quiz.length) {
      throw new Error("Answer count does not match this quiz");
    }

    const score = quiz.reduce(
      (total, q, i) => total + (data.answers[i] === q.correctIndex ? 1 : 0),
      0,
    );
    const total = quiz.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= PASS_PCT;
    const userId = context.userId as string;

    const { supabaseAdmin } =
      await import("@/integrations/supabase/client.server");

    const { error: attemptError } = await supabaseAdmin
      .from("quiz_attempts")
      .insert({
        user_id: userId,
        topic_slug: data.topicSlug,
        score,
        total,
        percentage,
        passed,
      });
    if (attemptError) throw new Error(attemptError.message);

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("display_name, email")
      .eq("id", userId)
      .maybeSingle();

    const recipientName =
      profile?.display_name || profile?.email?.split("@")[0] || "Learner";
    let certId: string | null = null;

    if (passed) {
      const { data: cert, error: certError } = await supabaseAdmin
        .from("certificates")
        .upsert(
          {
            user_id: userId,
            topic_slug: data.topicSlug,
            recipient_name: recipientName,
            score: percentage,
          },
          { onConflict: "user_id,topic_slug" },
        )
        .select("id")
        .single();
      if (certError) throw new Error(certError.message);
      certId = cert.id;
    }

    return { score, total, percentage, passed, recipientName, certId };
  });
