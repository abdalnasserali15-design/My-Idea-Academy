import { describe, expect, it } from "vitest";
import crypto from "node:crypto";

import {
  computeAllHashes,
  hashesMatch,
  identifyHash,
  md5Hex,
} from "./hash-tools";

describe("md5Hex", () => {
  it("matches the official RFC 1321 test vectors", () => {
    expect(md5Hex("")).toBe("d41d8cd98f00b204e9800998ecf8427e");
    expect(md5Hex("a")).toBe("0cc175b9c0f1b6a831c399e269772661");
    expect(md5Hex("abc")).toBe("900150983cd24fb0d6963f7d28e17f72");
    expect(md5Hex("message digest")).toBe("f96b697d7cb7938d525a2f31aaf161d0");
    expect(md5Hex("abcdefghijklmnopqrstuvwxyz")).toBe(
      "c3fcd3d76192e4007dfb496cca67e13b",
    );
    expect(
      md5Hex(
        "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
      ),
    ).toBe("57edf4a22be3c955ac49da2e2107b67a");
  });

  it("matches Node's built-in crypto across block-boundary lengths", () => {
    for (const len of [
      0, 1, 15, 16, 55, 56, 57, 63, 64, 65, 127, 128, 129, 1000,
    ]) {
      const input = "x".repeat(len);
      expect(md5Hex(input)).toBe(
        crypto.createHash("md5").update(input, "utf8").digest("hex"),
      );
    }
  });

  it("handles multi-byte UTF-8 (Arabic, Japanese, emoji) the same as Node's crypto", () => {
    for (const s of [
      "مرحبا بالعالم",
      "こんにちは世界",
      "🔥🚀✅ test",
      "Café — naïve",
    ]) {
      expect(md5Hex(s)).toBe(
        crypto.createHash("md5").update(s, "utf8").digest("hex"),
      );
    }
  });
});

describe("computeAllHashes", () => {
  it("returns MD5, SHA-1, SHA-256, SHA-384, and SHA-512 with correct lengths", async () => {
    const result = await computeAllHashes("hello world");
    expect(result.MD5).toHaveLength(32);
    expect(result["SHA-1"]).toHaveLength(40);
    expect(result["SHA-256"]).toHaveLength(64);
    expect(result["SHA-384"]).toHaveLength(96);
    expect(result["SHA-512"]).toHaveLength(128);
    expect(result.MD5).toBe(
      crypto.createHash("md5").update("hello world").digest("hex"),
    );
    expect(result["SHA-256"]).toBe(
      crypto.createHash("sha256").update("hello world").digest("hex"),
    );
  });

  it("the avalanche effect: a one-character change produces a completely different hash", async () => {
    const a = await computeAllHashes("hello world");
    const b = await computeAllHashes("hello worle");
    expect(a.MD5).not.toBe(b.MD5);
  });
});

describe("identifyHash", () => {
  it("recognizes bcrypt-formatted hashes regardless of length-based guessing", () => {
    const result = identifyHash(
      "$2b$12$KIXQ4y2Vr0J8N9O7P6Q5RuE1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T",
    );
    expect(result.guesses.some((g) => /bcrypt/i.test(g.label))).toBeTruthy();
  });

  it("recognizes Subresource Integrity (SRI) formatted hashes", () => {
    const result = identifyHash(
      "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    );
    expect(result.guesses.length).toBeGreaterThan(0);
  });

  it("a 64-hex-char string matches multiple possible algorithms (never claims uniqueness)", () => {
    const result = identifyHash("a".repeat(64));
    expect(result.guesses.length).toBeGreaterThan(1);
  });

  it("returns no guesses for input that isn't hex, base64, or a known prefixed format", () => {
    const result = identifyHash("not a hash at all, just some words");
    expect(result.guesses).toHaveLength(0);
  });

  it("returns no guesses for empty input", () => {
    const result = identifyHash("   ");
    expect(result.guesses).toHaveLength(0);
  });
});

describe("hashesMatch", () => {
  it("is case-insensitive", () => {
    expect(hashesMatch("ABC123", "abc123")).toBeTruthy();
  });

  it("ignores a 0x prefix", () => {
    expect(hashesMatch("0xabc123", "abc123")).toBeTruthy();
  });

  it("ignores surrounding whitespace", () => {
    expect(hashesMatch("  abc123  ", "abc123")).toBeTruthy();
  });

  it("returns false for genuinely different values", () => {
    expect(hashesMatch("abc123", "abc124")).toBeFalsy();
  });
});
