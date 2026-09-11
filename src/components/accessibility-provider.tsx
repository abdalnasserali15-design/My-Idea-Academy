import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useTextToSpeech } from "@/lib/use-text-to-speech";

export type FontScale = "normal" | "large" | "xlarge";

interface AccessibilityContextValue {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  keyboardNav: boolean;
  toggleKeyboardNav: () => void;
  isReading: boolean;
  isPreparingReading: boolean;
  toggleReadAloud: () => void;
  readAloudSupported: boolean;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  dyslexiaFont: boolean;
  toggleDyslexiaFont: () => void;
  largeTargets: boolean;
  toggleLargeTargets: () => void;
  linkUnderline: boolean;
  toggleLinkUnderline: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextValue | undefined
>(undefined);

const FONT_SCALE_KEY = "app.fontScale";
const CONTRAST_KEY = "app.highContrast";
const KEYBOARD_NAV_KEY = "app.keyboardNav";
const REDUCE_MOTION_KEY = "app.reduceMotion";
const DYSLEXIA_FONT_KEY = "app.dyslexiaFont";
const LARGE_TARGETS_KEY = "app.largeTargets";
const LINK_UNDERLINE_KEY = "app.linkUnderline";

const SCALE_CLASSES: Record<FontScale, string | null> = {
  normal: null,
  large: "text-scale-lg",
  xlarge: "text-scale-xl",
};

function readInitialFontScale(): FontScale {
  if (typeof window === "undefined") return "normal";
  const stored = window.localStorage.getItem(FONT_SCALE_KEY);
  if (stored === "large" || stored === "xlarge") return stored;
  return "normal";
}

function readInitialContrast(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONTRAST_KEY) === "true";
}

function readInitialKeyboardNav(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEYBOARD_NAV_KEY) === "true";
}

function readBoolean(key: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(key) === "true";
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [fontScale, setFontScaleState] = useState<FontScale>("normal");
  const [highContrast, setHighContrastState] = useState(false);
  const [keyboardNav, setKeyboardNavState] = useState(false);
  const [reduceMotion, setReduceMotionState] = useState(false);
  const [dyslexiaFont, setDyslexiaFontState] = useState(false);
  const [largeTargets, setLargeTargetsState] = useState(false);
  const [linkUnderline, setLinkUnderlineState] = useState(false);
  const {
    status: readAloudStatus,
    errorReason: readAloudErrorReason,
    speak: speakReadAloud,
  } = useTextToSpeech();

  const readAloudSupported = true;
  const isReading = readAloudStatus === "playing";
  const isPreparingReading = readAloudStatus === "loading";

  useEffect(() => {
    setFontScaleState(readInitialFontScale());
    setHighContrastState(readInitialContrast());
    setKeyboardNavState(readInitialKeyboardNav());
    setReduceMotionState(readBoolean(REDUCE_MOTION_KEY));
    setDyslexiaFontState(readBoolean(DYSLEXIA_FONT_KEY));
    setLargeTargetsState(readBoolean(LARGE_TARGETS_KEY));
    setLinkUnderlineState(readBoolean(LINK_UNDERLINE_KEY));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-scale-lg", "text-scale-xl");
    const cls = SCALE_CLASSES[fontScale];
    if (cls) root.classList.add(cls);
    window.localStorage.setItem(FONT_SCALE_KEY, fontScale);
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    window.localStorage.setItem(CONTRAST_KEY, String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle("keyboard-nav", keyboardNav);
    window.localStorage.setItem(KEYBOARD_NAV_KEY, String(keyboardNav));
  }, [keyboardNav]);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
    window.localStorage.setItem(REDUCE_MOTION_KEY, String(reduceMotion));
  }, [reduceMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle("dyslexia-font", dyslexiaFont);
    window.localStorage.setItem(DYSLEXIA_FONT_KEY, String(dyslexiaFont));
  }, [dyslexiaFont]);

  useEffect(() => {
    document.documentElement.classList.toggle("large-targets", largeTargets);
    window.localStorage.setItem(LARGE_TARGETS_KEY, String(largeTargets));
  }, [largeTargets]);

  useEffect(() => {
    document.documentElement.classList.toggle("link-underline", linkUnderline);
    window.localStorage.setItem(LINK_UNDERLINE_KEY, String(linkUnderline));
  }, [linkUnderline]);

  useEffect(() => {
    if (readAloudStatus !== "error") return;
    if (readAloudErrorReason === "auth") toast.info(t("tts.signInToast"));
    else if (readAloudErrorReason === "limit")
      toast.error(t("tts.limitReachedToast"));
    else toast.error(t("tts.unavailableToast"));
  }, [readAloudStatus, readAloudErrorReason, t]);

  const toggleReadAloud = () => {
    const target =
      document.getElementById("main-content") ?? document.querySelector("main");
    const text = target?.textContent?.replace(/\s+/g, " ").trim();
    if (!text) return;
    void speakReadAloud(text);
  };

  const value: AccessibilityContextValue = {
    fontScale,
    setFontScale: (scale) => setFontScaleState(scale),
    highContrast,
    toggleHighContrast: () => setHighContrastState((v) => !v),
    keyboardNav,
    toggleKeyboardNav: () => setKeyboardNavState((v) => !v),
    isReading,
    isPreparingReading,
    toggleReadAloud,
    readAloudSupported,
    reduceMotion,
    toggleReduceMotion: () => setReduceMotionState((v) => !v),
    dyslexiaFont,
    toggleDyslexiaFont: () => setDyslexiaFontState((v) => !v),
    largeTargets,
    toggleLargeTargets: () => setLargeTargetsState((v) => !v),
    linkUnderline,
    toggleLinkUnderline: () => setLinkUnderlineState((v) => !v),
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx)
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  return ctx;
}
