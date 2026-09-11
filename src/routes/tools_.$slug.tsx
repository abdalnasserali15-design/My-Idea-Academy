import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home, Laptop } from "lucide-react";
import type { ComponentType } from "react";

import { TOOLS } from "@/data/tools";
import { SiteHeader } from "@/components/site-header";
import { PasswordStrengthTool } from "@/components/tools/password-strength-tool";
import { PhishingTrainer } from "@/components/tools/phishing-trainer";
import { EmailChecker } from "@/components/tools/email-checker";
import { HashTool } from "@/components/tools/hash-tool";
import { EncryptionTool } from "@/components/tools/encryption-tool";
import { LinkCheckerTool } from "@/components/tools/link-checker-tool";
import { NetworkDefenseTool } from "@/components/tools/network-defense-tool";
import { AttackDefensePlannerTool } from "@/components/tools/attack-defense-planner-tool";
import { AppPermissionsTool } from "@/components/tools/app-permissions-tool";
import { BitAsciiTool } from "@/components/tools/bit-ascii-tool";
import { cn } from "@/lib/utils";

const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "password-strength": PasswordStrengthTool,
  "phishing-awareness": PhishingTrainer,
  "email-checker": EmailChecker,
  "hash-toolkit": HashTool,
  "encryption-toolkit": EncryptionTool,
  "link-checker": LinkCheckerTool,
  "network-defense": NetworkDefenseTool,
  "attack-defense-planner": AttackDefensePlannerTool,
  "app-permissions": AppPermissionsTool,
  "bit-ascii": BitAsciiTool,
};

export const Route = createFileRoute("/tools_/$slug")({
  loader: ({ params }) => {
    const tool = TOOLS.find((tl) => tl.slug === params.slug);
    if (!tool) throw notFound();
    return { slug: tool.slug };
  },
  head: ({ loaderData }) => {
    const slug = loaderData?.slug;
    const title = slug
      ? `${slug.replace(/-/g, " ")} — Tools — My Idea Academy`
      : "Tools — My Idea Academy";
    return { meta: [{ title }] };
  },
  component: ToolDetailPage,
  notFoundComponent: ToolNotFound,
  errorComponent: ToolLoadError,
});

function ToolNotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">{t("tools.notFound")}</p>
        <Link
          to="/tools"
          className="mt-3 inline-block text-sm text-[color:var(--neon)] underline"
        >
          {t("tools.backToTools")}
        </Link>
      </div>
    </div>
  );
}

function ToolLoadError() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">{t("tools.loadError")}</p>
    </div>
  );
}

function ToolDetailPage() {
  const { slug } = Route.useLoaderData();
  const tool = TOOLS.find((tl) => tl.slug === slug)!;
  const { t } = useTranslation();
  const Icon = tool.icon;
  const ToolComponent = TOOL_COMPONENTS[tool.slug];
  const isNeon = tool.accent === "neon";

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-2xl px-5 pb-20 pt-24 sm:px-6 sm:pt-28"
      >
        <Link
          to="/tools"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> {t("tools.backToTools")}
        </Link>

        <header className="mb-8 flex items-start gap-4">
          <div
            className={cn(
              "grid size-14 shrink-0 place-items-center rounded-2xl border",
              isNeon
                ? "border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)] glow-neon"
                : "border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)] glow-violet",
            )}
          >
            <Icon className="size-7" strokeWidth={1.6} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t(`tools.list.${tool.i18nKey}.title`)}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
              {t(`tools.list.${tool.i18nKey}.description`)}
            </p>
          </div>
        </header>

        {ToolComponent ? <ToolComponent /> : null}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <Home className="size-4" />
            {t("tools.backHomeButton")}
          </Link>
          <Link
            to="/tools"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 px-4 py-2.5 text-sm font-medium text-[color:var(--neon)] transition hover:bg-[color:var(--neon)]/20"
          >
            <Laptop className="size-4" />
            {t("tools.pageTitle")}
          </Link>
        </div>
      </main>
    </div>
  );
}
