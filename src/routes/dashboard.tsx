import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Award,
  CheckCircle2,
  Circle,
  Clock,
  GraduationCap,
  Loader2,
  LogIn,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { SiteHeader } from "@/components/site-header";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { TOPICS } from "@/data/topics";
import { cn } from "@/lib/utils";
import {
  getInProgressCourses,
  pickLocale,
  type InProgressCourse,
  type LocalizedText,
} from "@/lib/courses-data";
import {
  formatDuration,
  getBreakReminderEnabled,
  getSessionTimeMs,
  setBreakReminderEnabled,
  TIME_FLUSH_INTERVAL_MS,
} from "@/lib/session-time";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard - My Idea Academy" },
      {
        name: "description",
        content:
          "Track your progress, certificates, and learning activity on My Idea Academy.",
      },
    ],
  }),
});

interface Certificate {
  id: string;
  topic_slug: string | null;
  course_id: string | null;
  courses: { title: LocalizedText } | null;
  score: number;
  issued_at: string;
}

interface Profile {
  display_name: string | null;
  email: string | null;
}

function DashboardPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [attemptedSlugs, setAttemptedSlugs] = useState<Set<string>>(new Set());
  const [inProgressCourses, setInProgressCourses] = useState<
    InProgressCourse[]
  >([]);
  const [loadingData, setLoadingData] = useState(true);
  const [sessionTimeMs, setSessionTimeMs] = useState(0);
  const [breakReminderEnabled, setBreakReminderEnabledState] = useState(false);

  useEffect(() => {
    setSessionTimeMs(getSessionTimeMs());
    setBreakReminderEnabledState(getBreakReminderEnabled());
    const interval = setInterval(
      () => setSessionTimeMs(getSessionTimeMs()),
      TIME_FLUSH_INTERVAL_MS,
    );
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setLoadingData(true);

    Promise.all([
      supabase
        .from("profiles")
        .select("display_name, email")
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("certificates")
        .select("id, topic_slug, course_id, score, issued_at, courses(title)")
        .eq("user_id", user.id)
        .order("issued_at", { ascending: false }),
      supabase
        .from("quiz_attempts")
        .select("topic_slug")
        .eq("user_id", user.id),
      getInProgressCourses(),
    ]).then(([profileRes, certsRes, attemptsRes, inProgress]) => {
      if (cancelled) return;
      if (profileRes.data) setProfile(profileRes.data);
      if (certsRes.data)
        setCertificates(certsRes.data as unknown as Certificate[]);
      if (attemptsRes.data)
        setAttemptedSlugs(new Set(attemptsRes.data.map((a) => a.topic_slug)));
      setInProgressCourses(inProgress);
      setLoadingData(false);
    });

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!authChecked) {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <SiteHeader />
        <main className="grid min-h-[70vh] place-items-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <SiteHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto flex max-w-md flex-col items-center px-5 pb-20 pt-32 text-center"
        >
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-[color:var(--neon)]/15 text-[color:var(--neon)]">
            <LogIn className="size-7" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            {t("dashboard.signInTitle")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("dashboard.signInSubtitle")}
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/auth" })}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-5 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
          >
            <LogIn className="size-4" /> {t("dashboard.signIn")}
          </button>
        </main>
      </div>
    );
  }

  const certByTopic = new Map(certificates.map((c) => [c.topic_slug, c]));
  const displayName =
    profile?.display_name ||
    profile?.email?.split("@")[0] ||
    user.email?.split("@")[0] ||
    "";

  const handleToggleReminder = (checked: boolean) => {
    setBreakReminderEnabled(checked);
    setBreakReminderEnabledState(checked);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-3xl px-5 pb-16 pt-28"
      >
        <h1 className="text-2xl font-bold text-foreground">
          {t("dashboard.welcomeBack", { name: displayName })}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("dashboard.subtitle")}
        </p>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <GraduationCap className="size-4" />
            {t("dashboard.continueLearningHeading")}
          </h2>
          {loadingData ? (
            <div className="mt-4 flex justify-center py-8">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : inProgressCourses.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {t("dashboard.noInProgressCourses")}
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {inProgressCourses.map((entry) => {
                const percent = Math.round(
                  (entry.completedCount / Math.max(entry.totalCount, 1)) * 100,
                );
                return (
                  <Link
                    key={entry.course.id}
                    to="/courses/$courseSlug/$lessonId"
                    params={{
                      courseSlug: entry.course.slug,
                      lessonId: entry.lastLessonId,
                    }}
                    className="block rounded-xl border border-border bg-card/60 p-4 transition hover:border-[color:var(--neon)]/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {pickLocale(entry.course.title, i18n.language)}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {t("dashboard.continueFrom", {
                            lesson: pickLocale(
                              entry.lastLessonTitle,
                              i18n.language,
                            ),
                          })}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg bg-[image:var(--gradient-neon)] px-3.5 py-2 text-xs font-semibold text-[color:var(--neon-foreground)]">
                        {t("dashboard.continueButton")}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-[image:var(--gradient-neon)]"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                        {t("dashboard.lessonProgress", {
                          completed: entry.completedCount,
                          total: entry.totalCount,
                        })}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t("dashboard.progressHeading")}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TOPICS.map((topic) => {
              const cert = certByTopic.get(topic.slug);
              const attempted = attemptedSlugs.has(topic.slug);
              const Icon = topic.icon;

              return (
                <div
                  key={topic.slug}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-4"
                >
                  <div
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full border",
                      topic.accent === "neon"
                        ? "border-[color:var(--neon)]/40 text-[color:var(--neon)]"
                        : "border-[color:var(--violet)]/40 text-[color:var(--violet)]",
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {t(`topics.${topic.i18nKey}.title`)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cert
                        ? t("dashboard.statusPassed")
                        : attempted
                          ? t("dashboard.statusInProgress")
                          : t("dashboard.statusNotStarted")}
                    </p>
                  </div>
                  {cert ? (
                    <CheckCircle2 className="size-5 shrink-0 text-[color:var(--neon)]" />
                  ) : (
                    <Circle className="size-5 shrink-0 text-muted-foreground/40" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t("dashboard.certificatesHeading")}
          </h2>
          {loadingData ? (
            <div className="mt-4 flex justify-center py-8">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : certificates.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {t("dashboard.noCertificates")}
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {certificates.map((cert) => {
                const topic = TOPICS.find((tp) => tp.slug === cert.topic_slug);
                const title = cert.course_id
                  ? cert.courses
                    ? pickLocale(cert.courses.title, i18n.language)
                    : ""
                  : topic
                    ? t(`topics.${topic.i18nKey}.title`)
                    : cert.topic_slug;
                return (
                  <Link
                    key={cert.id}
                    to="/verify/$certId"
                    params={{ certId: cert.id }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-4 transition hover:border-[color:var(--neon)]/40"
                  >
                    <Award className="size-5 shrink-0 text-[color:var(--neon)]" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(cert.issued_at).toLocaleDateString(
                          i18n.language,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <Clock className="size-4" />
            {t("dashboard.timeOnPlatform")}
          </h2>
          <div className="mt-4 rounded-xl border border-border bg-card/60 p-4">
            <p className="text-2xl font-bold text-foreground">
              {formatDuration(sessionTimeMs, t)}
            </p>
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {t("dashboard.breakReminderLabel")}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("dashboard.breakReminderDescription")}
                </p>
              </div>
              <Switch
                checked={breakReminderEnabled}
                onCheckedChange={handleToggleReminder}
                aria-label={t("dashboard.breakReminderLabel")}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
