import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { THEME_INIT_SCRIPT } from "../lib/theme-script";
import { ThemeProvider } from "@/components/theme-provider";
import { AccessibilityProvider } from "@/components/accessibility-provider";
import { I18nProvider } from "@/components/i18n-provider";
import { AiChat } from "@/components/ai-chat";
import { BottomNav } from "@/components/bottom-nav";
import { SessionTracker } from "@/components/session-tracker";
import { Toaster } from "@/components/ui/sonner";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/opendyslexic/400.css";

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {t("notFound.title")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("notFound.subtitle")}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("notFound.goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useTranslation();
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("errorPage.title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("errorPage.subtitle")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("errorPage.tryAgain")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("errorPage.goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    loader: async () => {
      if (typeof document !== "undefined") {
        return {
          lang: document.documentElement.lang || "en",
          dir: (document.documentElement.dir as "ltr" | "rtl") || "ltr",
        };
      }
      const { detectServerLangDir } = await import("@/lib/detect-language");
      return detectServerLangDir();
    },
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "google-site-verification", content: "y1IAJqtCM88T6a_rPMUko-iEs_kcGlgORWUOmXeMBIU" },
        { title: "My Idea Academy — Interactive Learning Platform" },
        {
          name: "description",
          content:
            "Learn Cybersecurity, AI, Web Development and more on My Idea Academy — an interactive multilingual learning platform with a neon-cyber aesthetic.",
        },
        { name: "author", content: "My Idea Academy" },
        {
          property: "og:title",
          content: "My Idea Academy — Interactive Learning Platform",
        },
        {
          property: "og:description",
          content:
            "Choose a topic and start learning: Cybersecurity, AI, Web Dev, Networking, Ethical Hacking, Data Science and Cloud.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  const { lang, dir } = Route.useLoaderData();

  return (
    <html
      lang={lang}
      dir={dir}
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        {}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { t } = useTranslation();
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AccessibilityProvider>
          <I18nProvider>
            <a href="#main-content" className="skip-link">
              {t("a11y.skipToContent")}
            </a>
            {}
            <div
              style={{
                paddingBottom:
                  "calc(var(--bottom-nav-h) + env(safe-area-inset-bottom))",
              }}
            >
              <Outlet />
            </div>
            <BottomNav />
            <AiChat />
            <SessionTracker />
            <Toaster />
          </I18nProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
