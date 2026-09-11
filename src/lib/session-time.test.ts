import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  BREAK_REMINDER_CHANGED_EVENT,
  addSessionTimeMs,
  formatDuration,
  getBreakReminderEnabled,
  getSessionTimeMs,
  setBreakReminderEnabled,
} from "./session-time";

class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  clear(): void {
    this.store.clear();
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  get length(): number {
    return this.store.size;
  }
}

describe("session-time (no window / SSR)", () => {
  it("all getters return safe defaults and setters no-op without throwing", () => {
    expect(getSessionTimeMs()).toBe(0);
    expect(getBreakReminderEnabled()).toBe(false);
    expect(() => addSessionTimeMs(5000)).not.toThrow();
    expect(() => setBreakReminderEnabled(true)).not.toThrow();
  });
});

describe("session-time (with window)", () => {
  let dispatched: Event[] = [];

  beforeEach(() => {
    dispatched = [];
    vi.stubGlobal("window", {
      sessionStorage: new MemoryStorage(),
      localStorage: new MemoryStorage(),
      dispatchEvent: (e: Event) => {
        dispatched.push(e);
        return true;
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts at 0 and accumulates across multiple addSessionTimeMs calls", () => {
    expect(getSessionTimeMs()).toBe(0);
    addSessionTimeMs(2000);
    addSessionTimeMs(3000);
    expect(getSessionTimeMs()).toBe(5000);
  });

  it("ignores zero or negative deltas", () => {
    addSessionTimeMs(1000);
    addSessionTimeMs(0);
    addSessionTimeMs(-500);
    expect(getSessionTimeMs()).toBe(1000);
  });

  it("falls back to 0 for a corrupted stored value", () => {
    window.sessionStorage.setItem("myidea:sessionTimeMs", "not-a-number");
    expect(getSessionTimeMs()).toBe(0);
  });

  it("defaults break reminder to false, and only the exact string 'true' counts as enabled", () => {
    expect(getBreakReminderEnabled()).toBe(false);
    window.localStorage.setItem("myidea:breakReminderEnabled", "false");
    expect(getBreakReminderEnabled()).toBe(false);
    window.localStorage.setItem("myidea:breakReminderEnabled", "TRUE");
    expect(getBreakReminderEnabled()).toBe(false);
    window.localStorage.setItem("myidea:breakReminderEnabled", "true");
    expect(getBreakReminderEnabled()).toBe(true);
  });

  it("setBreakReminderEnabled persists the value and dispatches the change event", () => {
    setBreakReminderEnabled(true);
    expect(window.localStorage.getItem("myidea:breakReminderEnabled")).toBe(
      "true",
    );
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0].type).toBe(BREAK_REMINDER_CHANGED_EVENT);

    setBreakReminderEnabled(false);
    expect(window.localStorage.getItem("myidea:breakReminderEnabled")).toBe(
      "false",
    );
    expect(dispatched).toHaveLength(2);
  });
});

describe("formatDuration", () => {
  const t = (key: string) => key;

  it("shows the 'less than a minute' string under 60s, including 0ms", () => {
    expect(formatDuration(0, t)).toBe("dashboard.lessThanAMinute");
    expect(formatDuration(59_999, t)).toBe("dashboard.lessThanAMinute");
  });

  it("shows minutes only once at least a full minute has elapsed", () => {
    expect(formatDuration(60_000, t)).toBe("1dashboard.minuteShort");
    expect(formatDuration(5 * 60_000, t)).toBe("5dashboard.minuteShort");
  });

  it("shows hours and minutes together once an hour has elapsed, even with 0 leftover minutes", () => {
    expect(formatDuration(60 * 60_000, t)).toBe(
      "1dashboard.hourShort 0dashboard.minuteShort",
    );
    expect(formatDuration((2 * 60 + 15) * 60_000, t)).toBe(
      "2dashboard.hourShort 15dashboard.minuteShort",
    );
  });
});
