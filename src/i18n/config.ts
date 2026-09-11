import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import ar from "./locales/ar";
import es from "./locales/es";
import tr from "./locales/tr";
import fr from "./locales/fr";
import nl from "./locales/nl";
import it from "./locales/it";

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" as const },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" as const },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" as const },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" as const },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" as const },
  { code: "nl", name: "Nederlands", flag: "🇳🇱", dir: "ltr" as const },
  { code: "it", name: "Italiano", flag: "🇮🇹", dir: "ltr" as const },
];

let initialized = false;

export function initI18n() {
  if (initialized) return i18n;
  initialized = true;
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ar: { translation: ar },
        es: { translation: es },
        tr: { translation: tr },
        fr: { translation: fr },
        nl: { translation: nl },
        it: { translation: it },
      },
      fallbackLng: "en",
      supportedLngs: LANGUAGES.map((l) => l.code),
      interpolation: { escapeValue: false },
      detection: {
        order: ["cookie", "localStorage", "navigator"],
        caches: ["cookie"],
        lookupCookie: "app.lang",
        lookupLocalStorage: "app.lang",
        cookieMinutes: 60 * 24 * 365,
      },
    });
  return i18n;
}

export default i18n;
