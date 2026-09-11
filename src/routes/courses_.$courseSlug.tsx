import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ListChecks,
  GraduationCap,
  Award,
} from "lucide-react";

import { getCourseOutline, pickLocale } from "@/lib/courses-data";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses_/$courseSlug")({
  loader: async ({ params }) => {
    const outline = await getCourseOutline(params.courseSlug);
    if (!outline) throw notFound();
    return outline;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${pickLocale(loaderData.course.title, "en")} — My Idea Academy`
          : "Course — My Idea Academy",
      },
    ],
  }),
  component: CourseDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Course not found.</p>
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
        Failed to load this course.
      </p>
    </div>
  ),
});

function CourseDetailPage() {
  const { course, units } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const totalLessons = units.reduce((n, u) => n + u.lessons.length, 0);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-3xl px-5 pb-20 pt-24 sm:px-6 sm:pt-28"
      >
        <Link
          to="/courses"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className={cn("size-3.5", isRTL && "rotate-180")} />{" "}
          {t("courses.allCourses")}
        </Link>

        <header className="mb-8 flex items-start gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)] glow-neon">
            <BookOpen className="size-7" strokeWidth={1.6} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {pickLocale(course.title, i18n.language)}
            </h1>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {t("courses.unitCount", { count: units.length })} ·{" "}
              {t("courses.lessonCount", { count: totalLessons })}
            </p>
          </div>
        </header>

        <div className="space-y-6">
          {units.map((unit, unitIdx) => (
            <section key={unit.id}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/80">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted font-mono text-[10px] text-foreground">
                  {unitIdx + 1}
                </span>
                {pickLocale(unit.title, i18n.language)}
              </h2>
              <div className="grid gap-2">
                {[...unit.lessons]
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((lesson) => (
                    <Link
                      key={lesson.id}
                      to="/courses/$courseSlug/$lessonId"
                      params={{ courseSlug: course.slug, lessonId: lesson.id }}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card/50 px-4 py-3 text-start transition hover:border-[color:var(--neon)]/30 hover:bg-card/70"
                    >
                      <span className="flex items-center gap-2.5 text-sm font-medium text-foreground sm:text-base">
                        <ListChecks className="size-4 shrink-0 text-muted-foreground" />
                        {pickLocale(lesson.title, i18n.language)}
                      </span>
                      <ArrowRight
                        className={cn(
                          "size-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100",
                          isRTL && "rotate-180",
                        )}
                      />
                    </Link>
                  ))}
                <Link
                  to="/courses/$courseSlug/unit-exam/$unitId"
                  params={{ courseSlug: course.slug, unitId: unit.id }}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-dashed border-[color:var(--neon)]/30 bg-transparent px-4 py-3 text-start transition hover:border-[color:var(--neon)]/60 hover:bg-card/40"
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium text-[color:var(--neon)]">
                    <GraduationCap className="size-4 shrink-0" />
                    {t("courses.exam.takeUnitExam")}
                  </span>
                  <ArrowRight
                    className={cn(
                      "size-4 shrink-0 text-[color:var(--neon)] opacity-0 transition group-hover:opacity-100",
                      isRTL && "rotate-180",
                    )}
                  />
                </Link>
              </div>
            </section>
          ))}
        </div>

        <Link
          to="/courses/$courseSlug/final-exam"
          params={{ courseSlug: course.slug }}
          className="group mt-8 flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--neon)]/40 bg-[image:var(--gradient-neon)]/10 p-5 text-start transition hover:border-[color:var(--neon)]/70"
        >
          <span className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)]">
              <Award className="size-5" strokeWidth={1.6} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground sm:text-base">
                {t("courses.exam.takeFinalExam")}
              </span>
              <span className="block text-xs text-muted-foreground">
                {t("courses.exam.finalExamHint")}
              </span>
            </span>
          </span>
          <ArrowRight
            className={cn(
              "size-4 shrink-0 text-[color:var(--neon)] opacity-0 transition group-hover:opacity-100",
              isRTL && "rotate-180",
            )}
          />
        </Link>
      </main>
    </div>
  );
}
