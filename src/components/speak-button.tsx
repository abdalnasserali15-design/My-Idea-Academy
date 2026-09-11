import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Volume2, Loader2 } from "lucide-react";

import { useTextToSpeech } from "@/lib/use-text-to-speech";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { t } = useTranslation();
  const { status, errorReason, speak } = useTextToSpeech();

  useEffect(() => {
    if (status !== "error") return;
    if (errorReason === "auth") toast.info(t("tts.signInToast"));
    else if (errorReason === "limit") toast.error(t("tts.limitReachedToast"));
    else toast.error(t("tts.unavailableToast"));
  }, [status, errorReason, t]);

  const isLoading = status === "loading";
  const isPlaying = status === "playing";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        void speak(text);
      }}
      disabled={isLoading}
      aria-label={isPlaying ? t("tts.stopLabel") : t("tts.listenLabel")}
      aria-pressed={isPlaying}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full border transition disabled:opacity-60",
        isPlaying
          ? "border-[color:var(--neon)]/60 bg-[color:var(--neon)]/15 text-[color:var(--neon)]"
          : "border-border text-muted-foreground hover:border-[color:var(--neon)]/40 hover:text-[color:var(--neon)]",
        className,
      )}
    >
      {isLoading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Volume2 className={cn("size-3.5", isPlaying && "animate-pulse")} />
      )}
    </button>
  );
}
