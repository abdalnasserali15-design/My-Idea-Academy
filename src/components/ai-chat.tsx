import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { TOPICS } from "@/data/topics";
import i18n from "@/i18n/config";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { SpeakButton } from "@/components/speak-button";

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function useCurrentTopic() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const match = pathname.match(/^\/topic\/([^/]+)/);
  const topic = match ? TOPICS.find((t) => t.slug === match[1]) : undefined;
  if (!topic) return { topicSlug: undefined, topicTitle: undefined };
  return {
    topicSlug: topic.slug,
    topicTitle: i18n.t(`topics.${topic.i18nKey}.title`),
  };
}

export function AiChat() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { topicSlug, topicTitle } = useCurrentTopic();
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [open]);

  const transport = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ topicSlug }),
      headers: authHeaders,
    }),
  );

  useEffect(() => {
    transport.current = new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ topicSlug }),
      headers: authHeaders,
    });
  }, [topicSlug]);

  const { messages, sendMessage, status } = useChat({
    transport: transport.current,
    onError: (error) => {
      if (error.message.includes("401")) {
        toast.info(t("aiChat.signInToast"));
      } else if (error.message.includes("429")) {
        toast.error(t("aiChat.limitReachedToast"));
      } else {
        toast.error(t("aiChat.unavailableToast"));
      }
    },
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    void sendMessage({ text });
    setInput("");
  };

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("aiChat.openLabel")}
          className="fixed end-5 bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+1.25rem)] z-40 grid size-14 place-items-center rounded-full bg-[image:var(--gradient-neon)] text-[color:var(--neon-foreground)] shadow-[var(--glow-neon)] transition hover:scale-105"
        >
          <MessageCircle className="size-6" />
        </button>
      ) : (
        <div className="fixed inset-x-3 bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+0.75rem)] z-40 sm:inset-x-auto sm:end-5 sm:bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+1.25rem)] sm:w-[380px]">
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-chat-title"
            tabIndex={-1}
            className="flex h-[70vh] max-h-[560px] flex-col overflow-hidden rounded-3xl border border-border bg-card/95 shadow-[var(--shadow-card)] backdrop-blur-xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-[image:var(--gradient-neon)] text-[color:var(--neon-foreground)]">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p
                    id="ai-chat-title"
                    className="text-sm font-semibold text-foreground"
                  >
                    IdeaMentor
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    {topicTitle
                      ? t("aiChat.topicLabel", { topic: topicTitle })
                      : t("aiChat.askAnything")}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("certificate.closeLabel")}
                className="grid size-8 place-items-center rounded-full text-foreground/70 transition hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                  <Sparkles className="size-6 text-[color:var(--neon)]" />
                  <p>{t("aiChat.welcomeMessage")}</p>
                  <p className="text-xs">
                    {topicTitle
                      ? t("aiChat.askAboutTopic", { topic: topicTitle })
                      : t("aiChat.pickTopicPrompt")}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((m, idx) => {
                    const text = m.parts
                      .map((p) => (p.type === "text" ? p.text : ""))
                      .join("");
                    const isUser = m.role === "user";
                    const isStreamingThis =
                      busy && !isUser && idx === messages.length - 1;
                    return (
                      <div
                        key={m.id}
                        className={cn(
                          "flex max-w-[85%] flex-col gap-1",
                          isUser ? "ms-auto items-end" : "me-auto items-start",
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                            isUser
                              ? "bg-[color:var(--neon)]/15 text-foreground"
                              : "border border-border bg-muted/60 text-foreground",
                          )}
                        >
                          {text ||
                            (busy && idx === messages.length - 1 ? "…" : "")}
                        </div>
                        {!isUser && text && !isStreamingThis ? (
                          <SpeakButton text={text} />
                        ) : null}
                      </div>
                    );
                  })}
                  {busy ? (
                    <div className="me-auto inline-flex items-center gap-1.5 rounded-2xl border border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                      <Loader2 className="size-3 animate-spin" />{" "}
                      {t("aiChat.thinking")}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <form onSubmit={submit} className="border-t border-border/60 p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/60 px-3 py-1.5 focus-within:border-[color:var(--neon)]/60">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("aiChat.inputPlaceholder")}
                  aria-label={t("aiChat.inputPlaceholder")}
                  className="flex-1 bg-transparent py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label={t("aiChat.sendLabel")}
                  className="grid size-8 place-items-center rounded-full bg-[image:var(--gradient-neon)] text-[color:var(--neon-foreground)] transition disabled:opacity-40"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
