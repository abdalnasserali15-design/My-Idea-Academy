import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { supabase } from "@/integrations/supabase/client";

export type TtsStatus = "idle" | "loading" | "playing" | "error";
export type TtsErrorReason = "auth" | "limit" | "other";

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

let activeAudio: HTMLAudioElement | null = null;
let activeAudioUrl: string | null = null;
let onActiveAudioStopped: (() => void) | null = null;

function stopActiveAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  if (activeAudioUrl) {
    URL.revokeObjectURL(activeAudioUrl);
    activeAudioUrl = null;
  }
  onActiveAudioStopped?.();
  onActiveAudioStopped = null;
}

export function useTextToSpeech() {
  const { i18n } = useTranslation();
  const [status, setStatus] = useState<TtsStatus>("idle");
  const [errorReason, setErrorReason] = useState<TtsErrorReason | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;

      if (onActiveAudioStopped === stopSelf) stopActiveAudio();
    };
  }, []);

  function stopSelf() {
    if (mountedRef.current) setStatus("idle");
  }

  const stop = useCallback(() => {
    stopActiveAudio();
    setStatus("idle");
  }, []);

  const speak = useCallback(async (text: string) => {
    const wasPlayingSelf = onActiveAudioStopped === stopSelf;
    stopActiveAudio();
    if (wasPlayingSelf) {
      return;
    }

    setErrorReason(null);
    setStatus("loading");
    try {
      const headers = await authHeaders();
      const res = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ text, language: i18n.language }),
      });

      if (!mountedRef.current) return;

      if (res.status === 401) {
        setStatus("error");
        setErrorReason("auth");
        return;
      }
      if (res.status === 429) {
        setStatus("error");
        setErrorReason("limit");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setErrorReason("other");
        return;
      }

      const blob = await res.blob();
      if (!mountedRef.current) return;

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      activeAudio = audio;
      activeAudioUrl = url;
      onActiveAudioStopped = stopSelf;

      audio.onended = () => {
        if (activeAudio === audio) stopActiveAudio();
      };
      audio.onerror = () => {
        if (activeAudio === audio) stopActiveAudio();
        if (mountedRef.current) {
          setStatus("error");
          setErrorReason("other");
        }
      };

      await audio.play();
      if (mountedRef.current) setStatus("playing");
    } catch {
      if (mountedRef.current) {
        setStatus("error");
        setErrorReason("other");
      }
    }
  }, []);

  return { status, errorReason, speak, stop };
}
