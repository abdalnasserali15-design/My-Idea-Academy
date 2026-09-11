import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { LocalizedText } from "@/lib/courses-data";

const DAILY_ANSWER_CHECK_LIMIT = 300;

const PASS_PCT = 70;

export const checkCourseAnswer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: unknown) => data as { questionId: string; selectedChoiceId: string },
  )
  .handler(async ({ data, context }) => {
    const userId = context.userId as string;

    const { supabaseAdmin } =
      await import("@/integrations/supabase/client.server");

    const { data: withinLimit, error: usageError } = await supabaseAdmin.rpc(
      "check_and_increment_course_check_usage",
      { p_user_id: userId, p_daily_limit: DAILY_ANSWER_CHECK_LIMIT },
    );
    if (usageError) throw new Error("Could not verify usage limits");
    if (!withinLimit) {
      throw new Error(
        "Daily answer-check limit reached, please try again tomorrow.",
      );
    }

    const { data: question, error: questionError } = await supabaseAdmin
      .from("assessment_questions")
      .select("correct_choice_id, hint")
      .eq("id", data.questionId)
      .single();
    if (questionError || !question) throw new Error("Invalid question");

    return {
      correct: data.selectedChoiceId === question.correct_choice_id,
      correctChoiceId: question.correct_choice_id,
      hint: question.hint as LocalizedText | null,
    };
  });

export const submitCourseExam = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(
    (data: unknown) =>
      data as {
        kind: "unit_exam" | "final_exam";
        courseId: string;
        unitId?: string;
        answers: { questionId: string; selectedChoiceId: string }[];
      },
  )
  .handler(async ({ data, context }) => {
    const userId = context.userId as string;

    const { supabaseAdmin } =
      await import("@/integrations/supabase/client.server");

    let query = supabaseAdmin
      .from("assessment_questions")
      .select("id, correct_choice_id")
      .eq("kind", data.kind);
    if (data.kind === "unit_exam") {
      if (!data.unitId) throw new Error("unitId is required for unit_exam");
      query = query.eq("unit_id", data.unitId);
    } else {
      query = query.eq("course_id", data.courseId).in(
        "id",
        data.answers.map((a) => a.questionId),
      );
    }
    const { data: questions, error: qError } = await query;
    if (qError) throw new Error(qError.message);
    if (!questions || questions.length === 0) {
      throw new Error("No questions found for this exam");
    }

    const answerMap = new Map(
      data.answers.map((a) => [a.questionId, a.selectedChoiceId]),
    );
    const perQuestion: Record<string, boolean> = {};
    let score = 0;
    for (const q of questions) {
      const correct = answerMap.get(q.id) === q.correct_choice_id;
      perQuestion[q.id] = correct;
      if (correct) score++;
    }
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= PASS_PCT;

    const { error: insertError } = await supabaseAdmin
      .from("course_exam_attempts")
      .insert({
        user_id: userId,
        course_id: data.courseId,
        unit_id: data.kind === "unit_exam" ? data.unitId : null,
        kind: data.kind,
        score,
        total,
        percentage,
        passed,
      });
    if (insertError) throw new Error(insertError.message);

    let certId: string | null = null;
    let recipientName: string | null = null;
    let learningSummary: string | null = null;
    if (data.kind === "final_exam" && passed) {
      const [{ data: profile }, { data: course }] = await Promise.all([
        supabaseAdmin
          .from("profiles")
          .select("display_name, email")
          .eq("id", userId)
          .maybeSingle(),
        supabaseAdmin
          .from("courses")
          .select("learning_summary")
          .eq("id", data.courseId)
          .maybeSingle(),
      ]);
      recipientName =
        profile?.display_name || profile?.email?.split("@")[0] || "Learner";

      learningSummary =
        (course?.learning_summary as LocalizedText | null)?.en ?? null;

      const { data: cert, error: certError } = await supabaseAdmin
        .from("certificates")
        .upsert(
          {
            user_id: userId,
            course_id: data.courseId,
            recipient_name: recipientName,
            score: percentage,
            learning_summary: learningSummary,
          },
          { onConflict: "user_id,course_id" },
        )
        .select("id")
        .single();
      if (certError) throw new Error(certError.message);
      certId = cert.id;
    }

    return {
      score,
      total,
      percentage,
      passed,
      perQuestion,
      certId,
      recipientName,
      learningSummary,
    };
  });
