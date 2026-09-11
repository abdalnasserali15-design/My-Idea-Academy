import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import i18n, { initI18n, LANGUAGES } from "@/i18n/config";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n();
    setReady(true);

    const applyDir = () => {
      const lang = i18n.language?.split("-")[0] ?? "en";
      const entry = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
      const html = document.documentElement;
      html.setAttribute("dir", entry.dir);
      html.setAttribute("lang", entry.code);
    };

    applyDir();
    i18n.on("languageChanged", applyDir);
    return () => {
      i18n.off("languageChanged", applyDir);
    };
  }, []);

  if (!ready) return <>{children}</>;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
