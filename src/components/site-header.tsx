import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Moon,
  Sun,
  Globe,
  Check,
  LogIn,
  LogOut,
  Accessibility,
  Contrast,
  Volume2,
  VolumeX,
  Keyboard,
  SpellCheck,
  Link2,
  MousePointerClick,
  Wind,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";

import { useTheme } from "@/components/theme-provider";
import {
  useAccessibility,
  type FontScale,
} from "@/components/accessibility-provider";
import { Logo } from "@/components/logo";
import { LANGUAGES } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const FONT_SCALES: { value: FontScale; label: string }[] = [
  { value: "normal", label: "A" },
  { value: "large", label: "A+" },
  { value: "xlarge", label: "A++" },
];

function A11yToggle({
  active,
  loading,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  loading?: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-pressed={active}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm transition disabled:opacity-70",
        active
          ? "border-[color:var(--neon)]/60 bg-[color:var(--neon)]/10 text-foreground"
          : "border-border text-foreground/70 hover:bg-muted hover:text-foreground",
      )}
    >
      <span className="flex items-center gap-2">
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Icon className="size-4" />
        )}
        {label}
      </span>
      {active ? <Check className="size-4 text-[color:var(--neon)]" /> : null}
    </button>
  );
}

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const {
    fontScale,
    setFontScale,
    highContrast,
    toggleHighContrast,
    keyboardNav,
    toggleKeyboardNav,
    isReading,
    isPreparingReading,
    toggleReadAloud,
    readAloudSupported,
    reduceMotion,
    toggleReduceMotion,
    dyslexiaFont,
    toggleDyslexiaFont,
    largeTargets,
    toggleLargeTargets,
    linkUnderline,
    toggleLinkUnderline,
  } = useAccessibility();
  const [openMenu, setOpenMenu] = useState<"lang" | "a11y" | null>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const a11yMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const currentLang = i18n.language?.split("-")[0] ?? "en";
  const current = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      const ref = openMenu === "lang" ? langMenuRef : a11yMenuRef;
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpenMenu(null);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [openMenu]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-1 sm:gap-3">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="size-9" />
            <span className="font-display text-sm font-bold tracking-[0.24em] text-foreground">
              {t("nav.brand")}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 p-1 backdrop-blur-xl">
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((v) => (v === "lang" ? null : "lang"))}
              aria-label={t("nav.language")}
              aria-expanded={openMenu === "lang"}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground"
            >
              <Globe className="size-4" />
              <span className="hidden sm:inline">{current.flag}</span>
              <span className="uppercase tracking-wider">{current.code}</span>
            </button>
            {openMenu === "lang" ? (
              <div className="absolute end-0 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-popover/95 p-1 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95">
                {LANGUAGES.map((l) => {
                  const active = l.code === currentLang;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        void i18n.changeLanguage(l.code);
                        setOpenMenu(null);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm transition",
                        active
                          ? "bg-muted text-foreground"
                          : "text-foreground/80 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span aria-hidden>{l.flag}</span>
                        <span>{l.name}</span>
                      </span>
                      {active ? (
                        <Check className="size-4 text-[color:var(--neon)]" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div ref={a11yMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((v) => (v === "a11y" ? null : "a11y"))}
              aria-label={t("a11y.optionsLabel")}
              aria-expanded={openMenu === "a11y"}
              className="grid size-8 place-items-center rounded-full text-foreground/80 transition hover:bg-muted hover:text-foreground"
            >
              <Accessibility className="size-4" />
            </button>
            {openMenu === "a11y" ? (
              <div className="absolute end-0 mt-2 w-64 max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-popover/95 p-3 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("a11y.textSize")}
                </p>
                <div className="mb-3 flex items-center gap-1">
                  {FONT_SCALES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setFontScale(s.value)}
                      aria-pressed={fontScale === s.value}
                      className={cn(
                        "flex-1 rounded-xl border px-2 py-1.5 text-sm font-semibold transition",
                        fontScale === s.value
                          ? "border-[color:var(--neon)]/60 bg-[color:var(--neon)]/10 text-foreground"
                          : "border-border text-foreground/70 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("a11y.visionReading")}
                </p>
                <div className="space-y-1.5">
                  <A11yToggle
                    active={highContrast}
                    onClick={toggleHighContrast}
                    icon={Contrast}
                    label={t("a11y.highContrast")}
                  />
                  <A11yToggle
                    active={dyslexiaFont}
                    onClick={toggleDyslexiaFont}
                    icon={SpellCheck}
                    label={t("a11y.dyslexiaFont")}
                  />
                  <A11yToggle
                    active={linkUnderline}
                    onClick={toggleLinkUnderline}
                    icon={Link2}
                    label={t("a11y.underlineLinks")}
                  />
                </div>

                <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("a11y.motorMotion")}
                </p>
                <div className="space-y-1.5">
                  <A11yToggle
                    active={largeTargets}
                    onClick={toggleLargeTargets}
                    icon={MousePointerClick}
                    label={t("a11y.largerTargets")}
                  />
                  <A11yToggle
                    active={reduceMotion}
                    onClick={toggleReduceMotion}
                    icon={Wind}
                    label={t("a11y.reduceMotion")}
                  />
                  <A11yToggle
                    active={keyboardNav}
                    onClick={toggleKeyboardNav}
                    icon={Keyboard}
                    label={t("a11y.keyboardNav")}
                  />
                </div>

                {readAloudSupported ? (
                  <>
                    <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("a11y.screenReading")}
                    </p>
                    <A11yToggle
                      active={isReading}
                      loading={isPreparingReading}
                      onClick={toggleReadAloud}
                      icon={isReading ? VolumeX : Volume2}
                      label={
                        isReading ? t("a11y.stopReading") : t("a11y.readAloud")
                      }
                    />
                  </>
                ) : null}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={t("nav.theme")}
            className="grid size-8 place-items-center rounded-full text-foreground/80 transition hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          {user ? (
            <button
              type="button"
              onClick={signOut}
              aria-label={t("account.signOut")}
              title={user.email ?? t("account.signedIn")}
              className="grid size-8 place-items-center rounded-full text-foreground/80 transition hover:bg-muted hover:text-foreground"
            >
              <LogOut className="size-4" />
            </button>
          ) : (
            <Link
              to="/auth"
              aria-label={t("account.signIn")}
              className="grid size-8 place-items-center rounded-full text-foreground/80 transition hover:bg-muted hover:text-foreground"
            >
              <LogIn className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
