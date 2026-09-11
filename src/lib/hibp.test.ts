import { afterEach, describe, expect, it, vi } from "vitest";
import crypto from "node:crypto";

import { checkPasswordBreach } from "./hibp";

function sha1Hex(input: string): string {
  return crypto
    .createHash("sha1")
    .update(input, "utf8")
    .digest("hex")
    .toUpperCase();
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("checkPasswordBreach", () => {
  it("requests the correct 5-char uppercase hash prefix, with padding requested", async () => {
    const password = "correct horse battery staple";
    const expectedPrefix = sha1Hex(password).slice(0, 5);
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await checkPasswordBreach(password);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.pwnedpasswords.com/range/${expectedPrefix}`,
      { headers: { "Add-Padding": "true" } },
    );
  });

  it("returns pwned:true with the matching count when the suffix appears in the response", async () => {
    const password = "password123";
    const expectedSuffix = sha1Hex(password).slice(5);

    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(
            `ABCDE1234:5\r\n${expectedSuffix}:42\r\nFFFFFF9999:1\r\n`,
            { status: 200 },
          ),
        ),
    );

    await expect(checkPasswordBreach(password)).resolves.toEqual({
      pwned: true,
      count: 42,
    });
  });

  it("returns pwned:false when no line matches the suffix", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response("ABCDE1234:5\r\nFFFFFF9999:1\r\n", { status: 200 }),
        ),
    );

    await expect(checkPasswordBreach("some-safe-password")).resolves.toEqual({
      pwned: false,
      count: 0,
    });
  });

  it("falls back to count 0 when the count field isn't a valid number", async () => {
    const expectedSuffix = sha1Hex("weird-response-password").slice(5);
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(`${expectedSuffix}:not-a-number\r\n`, { status: 200 }),
        ),
    );

    await expect(
      checkPasswordBreach("weird-response-password"),
    ).resolves.toEqual({ pwned: true, count: 0 });
  });

  it("throws with the status code when the HIBP response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 503 })),
    );

    await expect(checkPasswordBreach("anything")).rejects.toThrow(
      "Have I Been Pwned request failed (503)",
    );
  });
});
