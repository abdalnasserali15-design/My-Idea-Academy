import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

import { getFinalExam, pickLocale } from "@/lib/courses-data";
import { SiteHeader } from "@/components/site-header";
import { ExamRunner } from "@/components/exam-runner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses_/$courseSlug_/final-exam")({
  loader: async ({ params }) => {
    const exam = await getFinalExam(params.courseSlug);
    if (!exam) throw notFound();
    return { exam, courseSlug: params.courseSlug };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${pickLocale(loaderData.exam.course.title, "en")} Final Exam — My Idea Academy`
          : "Final Exam — My Idea Academy",
      },
    ],
  }),
  component: FinalExamPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          This final exam isn't available.
        </p>
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
      <p className="text-sm text-muted-foreground">Failed to load this exam.</p>
    </div>
  ),
});

function FinalExamPage() {
  const { exam, courseSlug } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-2xl px-5 pb-24 pt-24 sm:px-6 sm:pt-28"
      >
        <Link
          to="/courses/$courseSlug"
          params={{ courseSlug }}
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className={cn("size-3.5", isRTL && "rotate-180")} />{" "}
          {pickLocale(exam.course.title, i18n.language)}
        </Link>

        <h1 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
          {t("courses.exam.finalExamTitle")}
        </h1>

        <ExamRunner
          title={pickLocale(exam.course.title, i18n.language)}
          kind="final_exam"
          courseId={exam.course.id}
          questions={exam.questions}
          backTo={{ to: "/courses/$courseSlug", params: { courseSlug } }}
        />
      </main>
    </div>
  );
}
