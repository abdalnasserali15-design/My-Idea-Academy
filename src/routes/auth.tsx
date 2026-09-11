import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — My Idea Academy" },
      {
        name: "description",
        content:
          "Sign in or create an account to track your progress and earn certificates on My Idea Academy.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) navigate({ to: "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") navigate({ to: "/" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success(t("auth.toastAccountCreated"));
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success(t("auth.toastWelcomeBack"));
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t("auth.toastGenericError"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t("auth.toastGoogleFailed"),
      );
      setLoading(false);
    }
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid animate-grid-drift opacity-40"
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card/70 p-7 shadow-[var(--shadow-card)] backdrop-blur-xl">
        <div className="mb-6 flex flex-col items-center gap-3">
          <Link to="/" className="grid size-12 place-items-center">
            <Logo className="size-12" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "signin" ? t("auth.signInTitle") : t("auth.signUpTitle")}
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            {mode === "signin"
              ? t("auth.signInSubtitle")
              : t("auth.signUpSubtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-50"
        >
          <GoogleIcon />
          {t("auth.continueWithGoogle")}
        </button>

        <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          {t("auth.orDivider")}
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" ? (
            <div>
              <label htmlFor="auth-name" className="sr-only">
                {t("auth.namePlaceholder")}
              </label>
              <input
                id="auth-name"
                type="text"
                placeholder={t("auth.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-[color:var(--neon)]/60"
              />
            </div>
          ) : null}
          <div>
            <label htmlFor="auth-email" className="sr-only">
              {t("auth.emailPlaceholder")}
            </label>
            <input
              id="auth-email"
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-[color:var(--neon)]/60"
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="sr-only">
              {t("auth.passwordPlaceholder")}
            </label>
            <input
              id="auth-password"
              type="password"
              placeholder={t("auth.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-[color:var(--neon)]/60"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-4 py-2.5 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95 disabled:opacity-50",
            )}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            {mode === "signin"
              ? t("auth.signInButton")
              : t("auth.signUpButton")}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          {mode === "signin" ? t("auth.newHere") : t("auth.alreadyHaveAccount")}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-semibold text-[color:var(--neon)] hover:underline"
          >
            {mode === "signin"
              ? t("auth.createAccountLink")
              : t("auth.signInLink")}
          </button>
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
