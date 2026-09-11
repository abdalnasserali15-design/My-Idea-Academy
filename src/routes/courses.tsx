import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BookOpen, ArrowRight } from "lucide-react";

import { getPublishedCourses, pickLocale } from "@/lib/courses-data";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses")({
  loader: async () => {
    const courses = await getPublishedCourses();
    return { courses };
  },
  head: () => ({
    meta: [
      { title: "Courses — My Idea Academy" },
      {
        name: "description",
        content:
          "Structured courses with units, lessons, quick checks, and exams.",
      },
    ],
  }),
  component: CoursesPage,
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">Failed to load courses.</p>
    </div>
  ),
});

function CoursesPage() {
  const { courses } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-4xl px-5 pb-20 pt-24 sm:px-6 sm:pt-28"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("courses.pageTitle")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {t("courses.pageSubtitle")}
          </p>
        </header>

        {courses.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            {t("courses.noneAvailable")}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.id}
                to="/courses/$courseSlug"
                params={{ courseSlug: course.slug }}
                className="group rounded-2xl border border-border bg-card/60 p-5 text-start transition hover:border-[color:var(--neon)]/40 hover:bg-card/80"
              >
                <div className="mb-3 grid size-11 place-items-center rounded-xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)]">
                  <BookOpen className="size-5" strokeWidth={1.6} />
                </div>
                <h2 className="text-base font-semibold text-foreground sm:text-lg">
                  {pickLocale(course.title, i18n.language)}
                </h2>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--neon)] opacity-0 transition group-hover:opacity-100">
                  {t("courses.startCourse")}
                  <ArrowRight
                    className={cn("size-3.5", isRTL && "rotate-180")}
                  />
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
