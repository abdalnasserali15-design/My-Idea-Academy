import { supabase } from "@/integrations/supabase/client";

export type LocalizedText = Record<string, string>;

export function pickLocale(text: LocalizedText, locale: string): string {
  return text[locale] ?? text.en ?? Object.values(text)[0] ?? "";
}

export interface CourseSummary {
  id: string;
  slug: string;
  title: LocalizedText;
  order_index: number;
  topic_slug: string | null;
}

export interface LessonRef {
  id: string;
  title: LocalizedText;
  order_index: number;
}

export interface UnitWithLessons {
  id: string;
  title: LocalizedText;
  order_index: number;
  lessons: LessonRef[];
}

export interface CourseOutline {
  course: CourseSummary;
  units: UnitWithLessons[];
}

export interface QuickCheckChoice {
  id: string;
  text: LocalizedText;
}

export interface QuickCheckQuestion {
  id: string;
  prompt: LocalizedText;
  choices: QuickCheckChoice[];
  hint: LocalizedText | null;
  order_index: number;
}

export interface LessonDetail {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  order_index: number;
  unit: { id: string; title: LocalizedText; order_index: number };
  course: CourseSummary;
  quickCheck: QuickCheckQuestion[];
  prevLesson: LessonRef | null;
  nextLesson: LessonRef | null;
}

export function flattenLessons(
  units: UnitWithLessons[],
): (LessonRef & { unitId: string })[] {
  return [...units]
    .sort((a, b) => a.order_index - b.order_index)
    .flatMap((unit) =>
      [...unit.lessons]
        .sort((a, b) => a.order_index - b.order_index)
        .map((lesson) => ({ ...lesson, unitId: unit.id })),
    );
}

export async function getPublishedCourses(): Promise<CourseSummary[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("id, slug, title, order_index, topic_slug")
    .order("order_index");
  if (error) throw error;

  return (data ?? []) as unknown as CourseSummary[];
}

export async function getPublishedCoursesByTopic(
  topicSlug: string,
): Promise<CourseSummary[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("id, slug, title, order_index, topic_slug")
    .eq("topic_slug", topicSlug)
    .order("order_index");
  if (error) throw error;
  return (data ?? []) as unknown as CourseSummary[];
}

export async function getCourseOutline(
  courseSlug: string,
): Promise<CourseOutline | null> {
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, slug, title, order_index, topic_slug")
    .eq("slug", courseSlug)
    .maybeSingle();
  if (courseError) throw courseError;
  if (!course) return null;

  const { data: units, error: unitsError } = await supabase
    .from("units")
    .select("id, title, order_index, lessons(id, title, order_index)")
    .eq("course_id", course.id)
    .order("order_index");
  if (unitsError) throw unitsError;

  return {
    course: course as unknown as CourseSummary,
    units: (units ?? []) as unknown as UnitWithLessons[],
  };
}

export async function getLessonDetail(
  courseSlug: string,
  lessonId: string,
): Promise<LessonDetail | null> {
  const outline = await getCourseOutline(courseSlug);
  if (!outline) return null;

  const flat = flattenLessons(outline.units);
  const idx = flat.findIndex((l) => l.id === lessonId);
  if (idx === -1) return null;

  const unit = outline.units.find((u) => u.id === flat[idx].unitId);
  if (!unit) return null;

  const [lessonResult, quickCheckResult] = await Promise.all([
    supabase
      .from("lessons")
      .select("id, title, body, order_index")
      .eq("id", lessonId)
      .single(),

    supabase
      .from("assessment_questions")
      .select("id, prompt, choices, hint, order_index")
      .eq("kind", "quick_check")
      .eq("lesson_id", lessonId)
      .order("order_index"),
  ]);
  if (lessonResult.error) throw lessonResult.error;
  if (quickCheckResult.error) throw quickCheckResult.error;
  if (!lessonResult.data) return null;

  return {
    ...(lessonResult.data as unknown as {
      id: string;
      title: LocalizedText;
      body: LocalizedText;
      order_index: number;
    }),
    unit: {
      id: unit.id,
      title: unit.title,
      order_index: unit.order_index,
    },
    course: outline.course,
    quickCheck: (quickCheckResult.data ??
      []) as unknown as QuickCheckQuestion[],
    prevLesson: idx > 0 ? flat[idx - 1] : null,
    nextLesson: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

export function resolveCourseMediaUrl(src: string): string {
  const prefix = "course-media:";
  if (!src.startsWith(prefix)) return src;
  const filename = src.slice(prefix.length);
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (!base) return src;
  return `${base}/storage/v1/object/public/course-media/${filename}`;
}

export interface ExamInfo {
  course: CourseSummary;
  unit: { id: string; title: LocalizedText } | null;
  questions: QuickCheckQuestion[];
}

export async function getUnitExam(
  courseSlug: string,
  unitId: string,
): Promise<ExamInfo | null> {
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, slug, title, order_index, topic_slug")
    .eq("slug", courseSlug)
    .maybeSingle();
  if (courseError) throw courseError;
  if (!course) return null;

  const { data: unit, error: unitError } = await supabase
    .from("units")
    .select("id, title")
    .eq("id", unitId)
    .eq("course_id", course.id)
    .maybeSingle();
  if (unitError) throw unitError;
  if (!unit) return null;

  const { data: questions, error: qError } = await supabase
    .from("assessment_questions")
    .select("id, prompt, choices, hint, order_index")
    .eq("kind", "unit_exam")
    .eq("unit_id", unitId)
    .order("order_index");
  if (qError) throw qError;

  return {
    course: course as unknown as CourseSummary,
    unit: unit as unknown as { id: string; title: LocalizedText },
    questions: (questions ?? []) as unknown as QuickCheckQuestion[],
  };
}

export async function getFinalExam(
  courseSlug: string,
): Promise<ExamInfo | null> {
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, slug, title, order_index, topic_slug")
    .eq("slug", courseSlug)
    .maybeSingle();
  if (courseError) throw courseError;
  if (!course) return null;

  const [standardResult, reserveResult] = await Promise.all([
    supabase
      .from("assessment_questions")
      .select("id, prompt, choices, hint, order_index")
      .eq("kind", "final_exam")
      .eq("course_id", course.id)
      .eq("is_reserve", false)
      .order("order_index"),
    supabase
      .from("assessment_questions")
      .select("id, prompt, choices, hint, order_index")
      .eq("kind", "final_exam")
      .eq("course_id", course.id)
      .eq("is_reserve", true)
      .order("order_index"),
  ]);
  if (standardResult.error) throw standardResult.error;
  if (reserveResult.error) throw reserveResult.error;

  let questions = (standardResult.data ??
    []) as unknown as QuickCheckQuestion[];
  const reserveQuestions = (reserveResult.data ??
    []) as unknown as QuickCheckQuestion[];

  if (reserveQuestions.length > 0) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { count } = await supabase
        .from("course_exam_attempts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .eq("kind", "final_exam");
      const isRetake = (count ?? 0) > 0;
      if (isRetake) {
        const dropCount = Math.min(reserveQuestions.length, questions.length);
        const dropIndices = new Set(
          questions
            .map((_, i) => i)
            .sort(() => Math.random() - 0.5)
            .slice(0, dropCount),
        );
        questions = [
          ...questions.filter((_, i) => !dropIndices.has(i)),
          ...reserveQuestions,
        ];
      }
    }
  }

  return {
    course: course as unknown as CourseSummary,
    unit: null,
    questions,
  };
}

export async function recordLessonProgress(
  courseId: string,
  lessonId: string,
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from("course_progress").upsert({
    user_id: user.id,
    course_id: courseId,
    last_lesson_id: lessonId,
    updated_at: new Date().toISOString(),
  });

  if (error) console.error("Failed to record lesson progress", error);
}

export interface InProgressCourse {
  course: CourseSummary;
  lastLessonId: string;
  lastLessonTitle: LocalizedText;
  completedCount: number;
  totalCount: number;
  updatedAt: string;
}

export async function getInProgressCourses(): Promise<InProgressCourse[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: rows, error } = await supabase
    .from("course_progress")
    .select(
      "course_id, last_lesson_id, updated_at, courses(id, slug, title, order_index, topic_slug), lessons(id, title)",
    )
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  if (!rows || rows.length === 0) return [];

  const results: InProgressCourse[] = [];
  for (const row of rows as unknown as {
    last_lesson_id: string;
    updated_at: string;
    courses: CourseSummary;
    lessons: { id: string; title: LocalizedText };
  }[]) {
    if (!row.courses) continue;
    const outline = await getCourseOutline(row.courses.slug);
    if (!outline) continue;
    const flat = flattenLessons(outline.units);
    const idx = flat.findIndex((l) => l.id === row.last_lesson_id);
    results.push({
      course: row.courses,
      lastLessonId: row.last_lesson_id,
      lastLessonTitle: row.lessons?.title ?? {},
      completedCount: idx + 1,
      totalCount: flat.length,
      updatedAt: row.updated_at,
    });
  }
  return results;
}
