import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ShieldCheck, ShieldX } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { TOPICS } from "@/data/topics";
import { pickLocale } from "@/lib/courses-data";

export const Route = createFileRoute("/verify/$certId")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .rpc("get_certificate_for_verification", { p_cert_id: params.certId })
      .maybeSingle();
    if (error || !data) throw notFound();
    return data;
  },
  head: () => ({
    meta: [{ title: "Verify Certificate — My Idea Academy" }],
  }),
  component: VerifyPage,
  notFoundComponent: NotFoundView,
});

function NotFoundView() {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center"
      >
        <ShieldX className="size-10 text-destructive" />
        <p className="text-sm text-muted-foreground">{t("verify.notFound")}</p>
        <Link to="/" className="text-sm text-[color:var(--neon)] underline">
          {t("verify.backHome")}
        </Link>
      </main>
    </div>
  );
}

function VerifyPage() {
  const { i18n } = useTranslation();
  const cert = Route.useLoaderData();

  const topic = TOPICS.find((tp) => tp.slug === cert.topic_slug);
  const title = cert.course_title
    ? pickLocale(cert.course_title as Record<string, string>, "en")
    : topic
      ? i18n.getFixedT("en")(`topics.${topic.i18nKey}.title`)
      : cert.topic_slug;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex max-w-lg flex-col items-center px-5 pb-20 pt-28 text-center"
      >
        <ShieldCheck className="size-12 text-[color:var(--neon)] glow-neon" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Certificate verified
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This certificate was genuinely issued by My Idea Academy.
        </p>

        <div className="mt-6 w-full rounded-2xl border border-border bg-card/70 p-6 text-start shadow-[var(--shadow-card)]">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Recipient</dt>
              <dd className="font-semibold text-foreground">
                {cert.recipient_name}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">
                {cert.course_title ? "Course" : "Track"}
              </dt>
              <dd className="font-semibold text-foreground">{title}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Score</dt>
              <dd className="font-semibold text-foreground">{cert.score}%</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Issued</dt>
              <dd className="font-semibold text-foreground">
                {new Date(cert.issued_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>
          </dl>

          {cert.learning_summary ? (
            <div className="mt-4 border-t border-border pt-4 text-start">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                What was learned
              </p>
              <p className="text-sm text-foreground">{cert.learning_summary}</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
