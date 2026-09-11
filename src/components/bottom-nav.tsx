import { Home, LayoutDashboard, Laptop, User } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export function BottomNav() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHomeActive = pathname === "/";
  const isDashboardActive = pathname.startsWith("/dashboard");
  const isToolsActive = pathname.startsWith("/tools");
  const isAccountActive = pathname.startsWith("/account");

  const tabClass = (active: boolean) =>
    cn(
      "flex flex-1 max-w-28 flex-col items-center justify-center gap-1 text-[11px] font-medium transition",
      active
        ? "text-[color:var(--neon)]"
        : "text-foreground/70 hover:text-foreground",
    );

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/80 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex h-[var(--bottom-nav-h)] max-w-6xl items-stretch justify-center">
        <Link
          to="/"
          aria-current={isHomeActive ? "page" : undefined}
          className={tabClass(isHomeActive)}
        >
          <Home className="size-5" />
          {t("nav.home")}
        </Link>
        <Link
          to="/dashboard"
          aria-current={isDashboardActive ? "page" : undefined}
          className={tabClass(isDashboardActive)}
        >
          <LayoutDashboard className="size-5" />
          {t("nav.dashboard")}
        </Link>
        <Link
          to="/tools"
          aria-current={isToolsActive ? "page" : undefined}
          className={tabClass(isToolsActive)}
        >
          <Laptop className="size-5" />
          {t("nav.tools")}
        </Link>
        <Link
          to="/account"
          aria-current={isAccountActive ? "page" : undefined}
          className={tabClass(isAccountActive)}
        >
          <User className="size-5" />
          {t("nav.account")}
        </Link>
      </div>
    </nav>
  );
}
