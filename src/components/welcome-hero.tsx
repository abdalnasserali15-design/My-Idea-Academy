import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WelcomeHeroProps {
  onGetStarted: () => void;
}

export function WelcomeHero({ onGetStarted }: WelcomeHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5">
      {}
      <div
        className="pointer-events-none absolute inset-0 bg-grid animate-grid-drift"
        aria-hidden
      />

      {}
      <div
        className="pointer-events-none absolute -top-40 start-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--violet) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 end-[-10%] h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--neon) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--neon)]/30 bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--neon)] backdrop-blur-xl"
        >
          <span className="size-1.5 rounded-full bg-[color:var(--neon)] shadow-[0_0_10px_var(--neon)]" />
          {t("welcome.kicker")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-gradient-neon animate-neon-pulse text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          {t("welcome.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg"
        >
          {t("welcome.subtitle")}
        </motion.p>

        <motion.button
          type="button"
          onClick={onGetStarted}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-neon)] px-7 py-3.5 text-sm font-semibold text-[color:var(--neon-foreground)] shadow-[0_0_40px_-6px_var(--neon)] transition hover:shadow-[0_0_50px_-4px_var(--neon)]"
        >
          <span>{t("welcome.cta")}</span>
          <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pointer-events-none absolute inset-x-0 -bottom-24 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-muted-foreground/60"
        >
          <span>{t("welcome.scroll")}</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-6 w-px bg-gradient-to-b from-transparent via-[color:var(--neon)]/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
