import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { TOPICS } from "@/data/topics";
import { getLessons } from "@/data/lessons";
import { getPublishedCoursesByTopic, pickLocale } from "@/lib/courses-data";
import { SiteHeader } from "@/components/site-header";
import { QuizRunner } from "@/components/quiz-runner";
import { SpeakButton } from "@/components/speak-button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/topic/$slug")({
  loader: async ({ params }) => {
    const topic = TOPICS.find((t) => t.slug === params.slug);
    if (!topic) throw notFound();
    const courses = await getPublishedCoursesByTopic(topic.slug);
    return { slug: topic.slug, courses };
  },
  head: ({ loaderData }) => {
    const slug = loaderData?.slug;
    const title = slug
      ? `${slug.replace(/-/g, " ")} — My Idea Academy`
      : "Track — My Idea Academy";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `Learn ${slug ?? "topics"} on My Idea Academy — lessons and an interactive quiz.`,
        },
      ],
    };
  },
  component: TopicPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Track not found.</p>
        <Link
          to="/"
          className="mt-3 inline-block text-sm text-[color:var(--neon)] underline"
        >
          Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Failed to load this topic.
      </p>
    </div>
  ),
});

function TopicPage() {
  const { slug, courses } = Route.useLoaderData();
  const topic = TOPICS.find((t) => t.slug === slug)!;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const lessons = useMemo(() => getLessons(topic.slug), [topic.slug]);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const Icon = topic.icon;
  const isNeon = topic.accent === "neon";
  const topicTitle = t(`topics.${topic.i18nKey}.title`);
  const topicDesc = t(`topics.${topic.i18nKey}.description`);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-4xl px-5 pb-20 pt-24 sm:px-6 sm:pt-28"
      >
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All topics
        </Link>

        <header className="mb-10 flex items-start gap-5">
          <div
            className={cn(
              "grid size-16 shrink-0 place-items-center rounded-2xl border",
              isNeon
                ? "border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)] glow-neon"
                : "border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)] glow-violet",
            )}
          >
            <Icon className="size-8" strokeWidth={1.6} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              {topicTitle}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {topicDesc}
            </p>
          </div>
        </header>

        {showQuiz ? (
          <QuizRunner
            topicSlug={topic.slug}
            onClose={() => setShowQuiz(false)}
          />
        ) : (
          <>
            {courses.length > 0 ? (
              <section aria-labelledby="courses-heading" className="mb-10">
                <h2
                  id="courses-heading"
                  className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground"
                >
                  <GraduationCap
                    className={cn(
                      "size-5",
                      isNeon
                        ? "text-[color:var(--neon)]"
                        : "text-[color:var(--violet)]",
                    )}
                  />{" "}
                  {t("courses.pageTitle")}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      to="/courses/$courseSlug"
                      params={{ courseSlug: course.slug }}
                      className={cn(
                        "group flex items-center justify-between gap-3 rounded-2xl border bg-card/60 p-4 text-start transition",
                        isNeon
                          ? "border-border hover:border-[color:var(--neon)]/40 hover:bg-card/80"
                          : "border-border hover:border-[color:var(--violet)]/40 hover:bg-card/80",
                      )}
                    >
                      <span className="text-sm font-semibold text-foreground sm:text-base">
                        {pickLocale(course.title, i18n.language)}
                      </span>
                      <ArrowRight
                        className={cn(
                          "size-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100",
                          isRTL && "rotate-180",
                        )}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <section aria-labelledby="lessons-heading">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  id="lessons-heading"
                  className="flex items-center gap-2 text-xl font-semibold text-foreground"
                >
                  <BookOpen className="size-5 text-[color:var(--neon)]" />{" "}
                  Lessons
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {lessons.length} lessons
                </span>
              </div>
              <div className="grid gap-3">
                {lessons.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                    No lessons yet — check back soon.
                  </p>
                ) : (
                  lessons.map((lesson, idx) => {
                    const active = idx === activeLesson;
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "rounded-2xl border p-4 text-start transition",
                          active
                            ? "border-[color:var(--neon)]/50 bg-card/80 shadow-[var(--shadow-card)]"
                            : "border-border bg-card/50 hover:border-[color:var(--neon)]/30 hover:bg-card/70",
                        )}
                      >
                        {}
                        <button
                          type="button"
                          onClick={() => setActiveLesson(idx)}
                          className="flex w-full items-center gap-2 text-start"
                        >
                          <span
                            className={cn(
                              "grid size-6 shrink-0 place-items-center rounded-full font-mono text-[10px]",
                              active
                                ? "bg-[color:var(--neon)] text-[color:var(--neon-foreground)]"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {idx + 1}
                          </span>
                          <h3 className="text-sm font-semibold text-foreground sm:text-base">
                            {lesson.title}
                          </h3>
                        </button>
                        {active ? (
                          <div className="mt-2 flex items-start justify-between gap-3">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {lesson.body}
                            </p>
                            <SpeakButton text={lesson.body} />
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            <section className="mt-10 rounded-3xl border border-[color:var(--neon)]/25 bg-card/70 p-6 text-center shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-8">
              <CheckCircle2 className="mx-auto mb-3 size-9 text-[color:var(--neon)]" />
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                Ready to test yourself?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Score 70% or higher to earn a downloadable certificate.
              </p>
              <button
                type="button"
                onClick={() => setShowQuiz(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-6 py-3 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
              >
                <PlayCircle className="size-5" /> Start Quiz
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
