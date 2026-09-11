import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { TOPICS } from "@/data/topics";
import { cn } from "@/lib/utils";

export function TopicCarousel() {
  const { t, i18n } = useTranslation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();

  const scrollToIndex = useCallback((idx: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const items = scroller.querySelectorAll<HTMLElement>("[data-topic-card]");
    const target = items[idx];
    if (!target) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset =
      target.offsetLeft - (scrollerRect.width - targetRect.width) / 2;
    scroller.scrollTo({ left: offset, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const items =
          scroller.querySelectorAll<HTMLElement>("[data-topic-card]");
        const scrollerRect = scroller.getBoundingClientRect();
        const center = scrollerRect.left + scrollerRect.width / 2;
        let bestIdx = 0;
        let bestDist = Infinity;
        items.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const c = r.left + r.width / 2;
          const d = Math.abs(c - center);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        setActiveIndex(bestIdx);
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goNext = () =>
    scrollToIndex(Math.min(TOPICS.length - 1, activeIndex + 1));

  return (
    <section
      id="topics"
      className="relative w-full scroll-mt-20 py-20 sm:py-28"
      aria-labelledby="topics-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--neon)]">
            {t("topics.swipeHint")}
          </span>
          <h2
            id="topics-heading"
            className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl"
          >
            {t("topics.sectionTitle")}
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            {t("topics.sectionSubtitle")}
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="snap-x-carousel no-scrollbar flex gap-5 overflow-x-auto px-[calc(50%-140px)] py-6 sm:px-[calc(50%-160px)]"
            role="listbox"
            aria-label={t("topics.sectionTitle")}
          >
            {TOPICS.map((topic, idx) => {
              const Icon = topic.icon;
              const isActive = idx === activeIndex;
              const isNeon = topic.accent === "neon";
              return (
                <button
                  type="button"
                  key={topic.slug}
                  data-topic-card
                  data-active={isActive}
                  onClick={() => {
                    if (isActive)
                      navigate({
                        to: "/topic/$slug",
                        params: { slug: topic.slug },
                      });
                    else scrollToIndex(idx);
                  }}
                  aria-label={t(`topics.${topic.i18nKey}.title`)}
                  className={cn(
                    "snap-item group relative flex h-[380px] w-[280px] shrink-0 flex-col items-center justify-between rounded-3xl border p-6 text-center transition-all duration-500 sm:h-[420px] sm:w-[320px]",
                    "bg-card/70 backdrop-blur-xl",
                    isActive
                      ? "border-[color:var(--neon)]/40 scale-100 opacity-100 shadow-[var(--shadow-card)]"
                      : "border-border/50 scale-[0.92] opacity-55 hover:opacity-80",
                  )}
                  style={
                    isActive
                      ? {
                          boxShadow: isNeon
                            ? "0 30px 80px -30px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.87 0.22 155 / 0.25), 0 0 60px -10px oklch(0.87 0.22 155 / 0.35)"
                            : "0 30px 80px -30px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.6 0.25 292 / 0.3), 0 0 60px -10px oklch(0.6 0.25 292 / 0.4)",
                        }
                      : undefined
                  }
                >
                  {}
                  <div className="relative mt-4">
                    <div
                      className={cn(
                        "absolute inset-0 -m-4 rounded-full blur-2xl transition-opacity duration-500",
                        isActive ? "opacity-70" : "opacity-0",
                      )}
                      style={{
                        background: isNeon
                          ? "radial-gradient(circle, var(--neon), transparent 65%)"
                          : "radial-gradient(circle, var(--violet), transparent 65%)",
                      }}
                      aria-hidden
                    />
                    <div
                      className={cn(
                        "relative grid size-24 place-items-center rounded-full border transition-all duration-500 sm:size-28",
                        isNeon
                          ? "border-[color:var(--neon)]/50 bg-[color:var(--neon)]/5 text-[color:var(--neon)]"
                          : "border-[color:var(--violet)]/50 bg-[color:var(--violet)]/10 text-[color:var(--violet)]",
                      )}
                    >
                      <Icon className="size-11 sm:size-12" strokeWidth={1.6} />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 px-2">
                    <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                      {t(`topics.${topic.i18nKey}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`topics.${topic.i18nKey}.description`)}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.24em] transition",
                      isActive
                        ? isNeon
                          ? "text-[color:var(--neon)]"
                          : "text-[color:var(--violet)]"
                        : "text-muted-foreground",
                    )}
                  >
                    {t("topics.startLearning")}
                    <ArrowRight
                      className={cn(
                        "size-3.5 transition-transform",
                        isRTL && "rotate-180",
                        "group-hover:translate-x-0.5",
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {}
          <div
            className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-e from-background to-transparent"
            style={{
              background:
                "linear-gradient(to right, var(--background), transparent)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 end-0 w-16"
            style={{
              background:
                "linear-gradient(to left, var(--background), transparent)",
            }}
            aria-hidden
          />

          {}
          <button
            type="button"
            onClick={isRTL ? goNext : goPrev}
            aria-label={t("topics.prevLabel")}
            className="absolute start-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-card/80 p-3 text-foreground backdrop-blur-xl transition hover:border-[color:var(--neon)]/50 hover:text-[color:var(--neon)] sm:block"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={isRTL ? goPrev : goNext}
            aria-label={t("topics.nextLabel")}
            className="absolute end-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-card/80 p-3 text-foreground backdrop-blur-xl transition hover:border-[color:var(--neon)]/50 hover:text-[color:var(--neon)] sm:block"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {}
        <div className="mt-6 flex justify-center gap-2">
          {TOPICS.map((topic, idx) => (
            <button
              key={topic.slug}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={t("topics.goToLabel", {
                topic: t(`topics.${topic.i18nKey}.title`),
              })}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === activeIndex
                  ? "w-8 bg-[color:var(--neon)] shadow-[0_0_10px_var(--neon)]"
                  : "w-1.5 bg-muted hover:bg-muted-foreground/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
