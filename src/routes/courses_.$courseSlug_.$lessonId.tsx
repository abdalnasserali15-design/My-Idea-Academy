import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import {
  getLessonDetail,
  pickLocale,
  recordLessonProgress,
} from "@/lib/courses-data";
import { SiteHeader } from "@/components/site-header";
import { LessonMarkdown } from "@/components/lesson-markdown";
import { LessonQuickCheck } from "@/components/lesson-quick-check";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses_/$courseSlug_/$lessonId")({
  loader: async ({ params }) => {
    const lesson = await getLessonDetail(params.courseSlug, params.lessonId);
    if (!lesson) throw notFound();
    return { lesson, courseSlug: params.courseSlug };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${pickLocale(loaderData.lesson.title, "en")} — My Idea Academy`
          : "Lesson — My Idea Academy",
      },
    ],
  }),
  component: LessonViewerPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Lesson not found.</p>
        <Link
          to="/courses"
          className="mt-3 inline-block text-sm text-[color:var(--neon)] underline"
        >
          Back to courses
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Failed to load this lesson.
      </p>
    </div>
  ),
});

function LessonViewerPage() {
  const { lesson, courseSlug } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const locale = i18n.language;

  useEffect(() => {
    recordLessonProgress(lesson.course.id, lesson.id);
  }, [lesson.course.id, lesson.id]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-3xl px-5 pb-24 pt-24 sm:px-6 sm:pt-28"
      >
        <Link
          to="/courses/$courseSlug"
          params={{ courseSlug }}
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className={cn("size-3.5", isRTL && "rotate-180")} />{" "}
          {pickLocale(lesson.course.title, locale)}
        </Link>

        <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--neon)]">
          {pickLocale(lesson.unit.title, locale)}
        </p>
        <h1 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl">
          {pickLocale(lesson.title, locale)}
        </h1>

        <LessonMarkdown content={pickLocale(lesson.body, locale)} />

        <LessonQuickCheck questions={lesson.quickCheck} />

        <nav className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6">
          {lesson.prevLesson ? (
            <Link
              to="/courses/$courseSlug/$lessonId"
              params={{ courseSlug, lessonId: lesson.prevLesson.id }}
              className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              {isRTL ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
              <span className="max-w-[10rem] truncate sm:max-w-xs">
                {pickLocale(lesson.prevLesson.title, locale)}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {lesson.nextLesson ? (
            <Link
              to="/courses/$courseSlug/$lessonId"
              params={{ courseSlug, lessonId: lesson.nextLesson.id }}
              className="flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-4 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
            >
              <span className="max-w-[10rem] truncate sm:max-w-xs">
                {pickLocale(lesson.nextLesson.title, locale)}
              </span>
              {isRTL ? (
                <ChevronLeft className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </Link>
          ) : (
            <Link
              to="/courses/$courseSlug"
              params={{ courseSlug }}
              className="flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-4 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
            >
              {t("courses.backToCourse")}
              <ArrowRight className={cn("size-4", isRTL && "rotate-180")} />
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
