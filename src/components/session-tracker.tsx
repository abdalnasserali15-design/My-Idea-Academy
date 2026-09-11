import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
  addSessionTimeMs,
  BREAK_INTERVAL_MS,
  BREAK_REMINDER_CHANGED_EVENT,
  getBreakReminderEnabled,
  TIME_FLUSH_INTERVAL_MS,
} from "@/lib/session-time";

export function SessionTracker() {
  const { t } = useTranslation();
  const activeMsSinceReminderRef = useRef(0);

  useEffect(() => {
    const resetOnToggle = () => {
      activeMsSinceReminderRef.current = 0;
    };
    window.addEventListener(BREAK_REMINDER_CHANGED_EVENT, resetOnToggle);

    let lastTick = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTick;
      lastTick = now;
      if (document.visibilityState !== "visible") return;

      addSessionTimeMs(elapsed);

      if (!getBreakReminderEnabled()) {
        activeMsSinceReminderRef.current = 0;
        return;
      }
      activeMsSinceReminderRef.current += elapsed;
      if (activeMsSinceReminderRef.current >= BREAK_INTERVAL_MS) {
        activeMsSinceReminderRef.current = 0;
        toast(t("dashboard.breakReminderToast"));
      }
    }, TIME_FLUSH_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      window.removeEventListener(BREAK_REMINDER_CHANGED_EVENT, resetOnToggle);
    };
  }, [t]);

  return null;
}
