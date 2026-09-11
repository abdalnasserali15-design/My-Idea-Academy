import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  LifeBuoy,
  LogIn,
  LogOut,
  Mail,
  Settings,
  TriangleAlert,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/integrations/supabase/client";
import { buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({
    meta: [
      { title: "Account & Support - My Idea Academy" },
      {
        name: "description",
        content:
          "Manage your account and find answers to common questions about My Idea Academy.",
      },
    ],
  }),
});

const SUPPORT_EMAIL = "student.affairs.myidea.academy@gmail.com";

interface Profile {
  display_name: string | null;
  email: string | null;
}

function AccountPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [savingName, setSavingName] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);

  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);

  const isEmailPasswordUser = user?.app_metadata?.provider === "email";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    supabase
      .from("profiles")
      .select("display_name, email")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);

  useEffect(() => {
    setDisplayName(profile?.display_name ?? "");
  }, [profile]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  async function handleSaveName(e: FormEvent) {
    e.preventDefault();
    const trimmed = displayName.trim();
    if (!trimmed || !user) return;
    setSavingName(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: trimmed })
      .eq("id", user.id);
    setSavingName(false);
    if (error) {
      toast.error(t("account.nameUpdateFailed"));
      return;
    }
    toast.success(t("account.nameUpdated"));
    setProfile((p) => (p ? { ...p, display_name: trimmed } : p));
  }

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error(t("account.passwordTooShort"));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("account.passwordMismatch"));
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) {
      toast.error(t("account.passwordUpdateFailed"));
      return;
    }
    toast.success(t("account.passwordUpdated"));
    setNewPassword("");
    setConfirmPassword("");
  }

  async function handleChangeEmail(e: FormEvent) {
    e.preventDefault();
    const trimmed = newEmail.trim();
    if (!trimmed || !user) return;
    setSavingEmail(true);
    const { error } = await supabase.auth.updateUser({ email: trimmed });
    if (!error) {
      await supabase
        .from("profiles")
        .update({ email: trimmed })
        .eq("id", user.id);
    }
    setSavingEmail(false);
    if (error) {
      toast.error(t("account.emailUpdateFailed"));
      return;
    }
    toast.success(t("account.emailConfirmSent"));
    setNewEmail("");
  }

  async function handleDeleteAccount() {
    if (!user) return;
    setDeletingAccount(true);
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    const res = await fetch("/api/delete-account", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      setDeletingAccount(false);
      toast.error(t("account.deleteAccountFailed"));
      return;
    }
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  const faqItems = [
    { q: t("account.faqQ1"), a: t("account.faqA1") },
    { q: t("account.faqQ2"), a: t("account.faqA2") },
    { q: t("account.faqQ3"), a: t("account.faqA3") },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-2xl px-5 pb-16 pt-28"
      >
        <section>
          <h1 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <UserIcon className="size-4" />
            {t("account.profileHeading")}
          </h1>

          {!authChecked ? (
            <div className="mt-4 h-20 animate-pulse rounded-xl border border-border bg-card/40" />
          ) : user ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/60 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {profile?.display_name || user.email}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {t("account.signedInAs", { email: user.email })}
                </p>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <LogOut className="size-4" />
                {t("account.signOut")}
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/60 p-4">
              <p className="text-sm text-muted-foreground">
                {t("account.signInPrompt")}
              </p>
              <button
                type="button"
                onClick={() => navigate({ to: "/auth" })}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-4 py-2 text-sm font-semibold text-[color:var(--neon-foreground)] transition hover:opacity-95"
              >
                <LogIn className="size-4" />
                {t("account.signIn")}
              </button>
            </div>
          )}
        </section>

        {user ? (
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Settings className="size-4" />
              {t("account.settingsHeading")}
            </h2>

            <form
              onSubmit={handleSaveName}
              className="mt-4 flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card/60 p-4"
            >
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="display-name"
                  className="mb-1.5 block text-xs text-muted-foreground"
                >
                  {t("account.displayNameLabel")}
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value.slice(0, 50))}
                  placeholder={t("account.displayNamePlaceholder")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon)]"
                />
              </div>
              <button
                type="submit"
                disabled={savingName || !displayName.trim()}
                className="shrink-0 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-60"
              >
                {t("account.saveNameButton")}
              </button>
            </form>

            {isEmailPasswordUser ? (
              <>
                <form
                  onSubmit={handleChangePassword}
                  className="mt-3 rounded-xl border border-border bg-card/60 p-4"
                >
                  <p className="mb-3 text-xs font-medium text-foreground">
                    {t("account.passwordHeading")}
                  </p>
                  <div className="flex flex-wrap items-end gap-3">
                    <div className="min-w-[10rem] flex-1">
                      <label
                        htmlFor="new-password"
                        className="mb-1.5 block text-xs text-muted-foreground"
                      >
                        {t("account.newPasswordLabel")}
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon)]"
                      />
                    </div>
                    <div className="min-w-[10rem] flex-1">
                      <label
                        htmlFor="confirm-password"
                        className="mb-1.5 block text-xs text-muted-foreground"
                      >
                        {t("account.confirmPasswordLabel")}
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon)]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={
                        savingPassword || !newPassword || !confirmPassword
                      }
                      className="shrink-0 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-60"
                    >
                      {t("account.changePasswordButton")}
                    </button>
                  </div>
                </form>

                <form
                  onSubmit={handleChangeEmail}
                  className="mt-3 rounded-xl border border-border bg-card/60 p-4"
                >
                  <p className="mb-3 text-xs font-medium text-foreground">
                    {t("account.emailHeading")}
                  </p>
                  <div className="flex flex-wrap items-end gap-3">
                    <div className="min-w-[10rem] flex-1">
                      <label
                        htmlFor="new-email"
                        className="mb-1.5 block text-xs text-muted-foreground"
                      >
                        {t("account.newEmailLabel")}
                      </label>
                      <input
                        id="new-email"
                        type="email"
                        dir="ltr"
                        autoComplete="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder={user.email ?? ""}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-start text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon)]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={savingEmail || !newEmail.trim()}
                      className="shrink-0 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-60"
                    >
                      {t("account.changeEmailButton")}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">
                {t("account.oauthManagedNote")}
              </p>
            )}
          </section>
        ) : null}

        {user ? (
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-destructive">
              <TriangleAlert className="size-4" />
              {t("account.dangerZoneHeading")}
            </h2>
            <div className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
              <p className="text-sm font-medium text-foreground">
                {t("account.deleteAccountHeading")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("account.deleteAccountBody")}
              </p>

              <AlertDialog
                onOpenChange={(open) => !open && setDeleteConfirmText("")}
              >
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="mt-3 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/20"
                  >
                    {t("account.deleteAccountButton")}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("account.deleteConfirmTitle")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("account.deleteConfirmBody")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div>
                    <label
                      htmlFor="delete-confirm-email"
                      className="mb-1.5 block text-xs text-muted-foreground"
                    >
                      {t("account.deleteConfirmLabel", { email: user.email })}
                    </label>
                    <input
                      id="delete-confirm-email"
                      type="email"
                      dir="ltr"
                      autoComplete="off"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-start text-sm outline-none focus-visible:ring-2 focus-visible:ring-destructive"
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {t("account.cancelButton")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={
                        deletingAccount ||
                        deleteConfirmText.trim().toLowerCase() !==
                          (user.email ?? "").toLowerCase()
                      }
                      onClick={handleDeleteAccount}
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      {t("account.deleteAccountButton")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <LifeBuoy className="size-4" />
            {t("account.supportHeading")}
          </h2>

          <h3 className="mt-4 text-sm font-semibold text-foreground">
            {t("account.faqHeading")}
          </h3>
          <div className="mt-3 space-y-2">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-border bg-card/60 p-4"
              >
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground marker:content-none">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/60 p-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                {t("account.contactHeading")}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("account.contactBody")}
              </p>
            </div>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <Mail className="size-4" />
              {SUPPORT_EMAIL}
            </a>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {t("account.crisisNote")}{" "}
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2"
            >
              findahelpline.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
