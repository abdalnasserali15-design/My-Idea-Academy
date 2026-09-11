import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Laptop } from "lucide-react";

import { TOOLS, type ToolDef } from "@/data/tools";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools — My Idea Academy" },
      {
        name: "description",
        content: "Practical, interactive tools to sharpen what you learn.",
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const cyberTools = TOOLS.filter((tool) => tool.category === "cyber");
  const networkingTools = TOOLS.filter(
    (tool) => tool.category === "networking",
  );
  const topicTools = TOOLS.filter((tool) => tool.category === "topics");

  function renderToolCard(tool: ToolDef) {
    const Icon = tool.icon;
    const isNeon = tool.accent === "neon";
    return (
      <Link
        key={tool.slug}
        to="/tools/$slug"
        params={{ slug: tool.slug }}
        className={cn(
          "group flex flex-col gap-4 rounded-3xl border bg-card/70 p-6 text-start shadow-[var(--shadow-card)] backdrop-blur-xl transition hover:-translate-y-0.5",
          "border-border/60 hover:border-[color:var(--neon)]/40",
        )}
      >
        <div
          className={cn(
            "grid size-12 place-items-center rounded-xl border",
            isNeon
              ? "border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)]"
              : "border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)]",
          )}
        >
          <Icon className="size-6" strokeWidth={1.6} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {t(`tools.list.${tool.i18nKey}.title`)}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t(`tools.list.${tool.i18nKey}.description`)}
          </p>
        </div>
        <span
          className={cn(
            "mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.24em]",
            isNeon ? "text-[color:var(--neon)]" : "text-[color:var(--violet)]",
          )}
        >
          {t("tools.openTool")}
          <ArrowRight
            className={cn(
              "size-3.5 transition-transform",
              isRTL && "rotate-180",
              "group-hover:translate-x-0.5",
            )}
          />
        </span>
      </Link>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-5xl px-5 pb-20 pt-24 sm:px-6 sm:pt-28"
      >
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 grid size-14 place-items-center rounded-2xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)] glow-neon">
            <Laptop className="size-7" strokeWidth={1.6} />
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("tools.pageTitle")}
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
            {t("tools.pageSubtitle")}
          </p>
        </header>

        <section aria-labelledby="tools-group-cyber">
          <h2
            id="tools-group-cyber"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          >
            {t("tools.groups.cyber")}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cyberTools.map(renderToolCard)}
          </div>
        </section>

        {networkingTools.length > 0 ? (
          <>
            <div
              aria-hidden="true"
              className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--neon)]/50 to-transparent"
            />
            <section aria-labelledby="tools-group-networking">
              <h2
                id="tools-group-networking"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t("tools.groups.networking")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {networkingTools.map(renderToolCard)}
              </div>
            </section>
          </>
        ) : null}

        {topicTools.length > 0 ? (
          <>
            <div
              aria-hidden="true"
              className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--neon)]/50 to-transparent"
            />
            <section aria-labelledby="tools-group-topics">
              <h2
                id="tools-group-topics"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t("tools.groups.topics")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topicTools.map(renderToolCard)}
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
