import { afterEach, describe, expect, it, vi } from "vitest";

import { lookupDomainAge } from "./rdap.server";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("lookupDomainAge", () => {
  it("computes ageDays from the registration event and requests the encoded URL", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-25T00:00:00Z"));

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          events: [
            { eventAction: "last changed", eventDate: "2025-01-01T00:00:00Z" },
            { eventAction: "registration", eventDate: "2020-01-01T00:00:00Z" },
          ],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await lookupDomainAge("exämple.com");

    const [calledUrl, calledInit] = fetchMock.mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(calledUrl).toBe(
      `https://rdap.org/domain/${encodeURIComponent("exämple.com")}`,
    );
    expect(calledInit.headers).toEqual({ Accept: "application/rdap+json" });

    expect(result).toEqual({
      registeredAt: "2020-01-01T00:00:00Z",
      ageDays: 2428,
    });
  });

  it("returns null when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 404 })),
    );
    await expect(lookupDomainAge("nope.example")).resolves.toBeNull();
  });

  it("returns null when there's no registration event", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            events: [{ eventAction: "transfer", eventDate: "2020-01-01" }],
          }),
          { status: 200 },
        ),
      ),
    );
    await expect(lookupDomainAge("no-reg-event.example")).resolves.toBeNull();
  });

  it("returns null when events is missing entirely", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(new Response(JSON.stringify({}), { status: 200 })),
    );
    await expect(lookupDomainAge("no-events.example")).resolves.toBeNull();
  });

  it("returns null when the registration eventDate isn't a valid date", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            events: [{ eventAction: "registration", eventDate: "not-a-date" }],
          }),
          { status: 200 },
        ),
      ),
    );
    await expect(lookupDomainAge("bad-date.example")).resolves.toBeNull();
  });

  it("returns null (never throws) when fetch itself rejects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down")),
    );
    await expect(lookupDomainAge("unreachable.example")).resolves.toBeNull();
  });

  it("returns null when the body isn't valid JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("not json", { status: 200 })),
    );
    await expect(lookupDomainAge("bad-json.example")).resolves.toBeNull();
  });

  it("aborts and resolves null if the request runs past the timeout", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        (_url: string, init?: RequestInit) =>
          new Promise((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(
                new DOMException("The operation was aborted.", "AbortError"),
              );
            });
          }),
      ),
    );

    const resultPromise = lookupDomainAge("slow.example");
    await vi.advanceTimersByTimeAsync(5000);

    await expect(resultPromise).resolves.toBeNull();
  });
});
