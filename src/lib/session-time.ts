const SESSION_TIME_KEY = "myidea:sessionTimeMs";
const BREAK_REMINDER_KEY = "myidea:breakReminderEnabled";

export const BREAK_REMINDER_CHANGED_EVENT = "myidea:break-reminder-changed";

export const BREAK_INTERVAL_MS = 20 * 60 * 1000;
export const TIME_FLUSH_INTERVAL_MS = 15_000;

function hasSessionStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined"
  );
}

function hasLocalStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function getSessionTimeMs(): number {
  if (!hasSessionStorage()) return 0;
  const raw = window.sessionStorage.getItem(SESSION_TIME_KEY);
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function addSessionTimeMs(deltaMs: number): void {
  if (!hasSessionStorage() || deltaMs <= 0) return;
  window.sessionStorage.setItem(
    SESSION_TIME_KEY,
    String(getSessionTimeMs() + deltaMs),
  );
}

export function getBreakReminderEnabled(): boolean {
  if (!hasLocalStorage()) return false;
  return window.localStorage.getItem(BREAK_REMINDER_KEY) === "true";
}

export function setBreakReminderEnabled(enabled: boolean): void {
  if (!hasLocalStorage()) return;
  window.localStorage.setItem(BREAK_REMINDER_KEY, String(enabled));
  window.dispatchEvent(new Event(BREAK_REMINDER_CHANGED_EVENT));
}

export function formatDuration(ms: number, t: (key: string) => string): string {
  const totalMinutes = Math.floor(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0)
    return `${hours}${t("dashboard.hourShort")} ${minutes}${t("dashboard.minuteShort")}`;
  if (minutes > 0) return `${minutes}${t("dashboard.minuteShort")}`;
  return t("dashboard.lessThanAMinute");
}
