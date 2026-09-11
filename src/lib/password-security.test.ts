import { describe, expect, it } from "vitest";

import { analyzePassword, passwordSimilarity } from "./password-security";

describe("analyzePassword", () => {
  it("treats an empty password as the weakest possible (level 0)", () => {
    const a = analyzePassword("");
    expect(a.length).toBe(0);
    expect(a.level).toBe(0);
  });

  it("flags a well-known common password even though it isn't short", () => {
    const common = analyzePassword("password");
    expect(common.isCommon).toBeTruthy();
    expect(common.level).toBeLessThanOrEqual(1);
    expect(common.crackOfflineFast).toBe("instant");
  });

  it("does not flag a password that merely resembles common ones but isn't in the list", () => {
    const a = analyzePassword("Xk4$purple-mailbox!");
    expect(a.isCommon).toBeFalsy();
  });

  it("correctly detects each character class", () => {
    const a = analyzePassword("Abc123!@");
    expect(a.hasLower).toBeTruthy();
    expect(a.hasUpper).toBeTruthy();
    expect(a.hasNumber).toBeTruthy();
    expect(a.hasSymbol).toBeTruthy();
  });

  it("a long, high-entropy password scores at or near the top", () => {
    const a = analyzePassword("xQ7$vK9!mR2#pL5&wT8@zN4^bY6*");
    expect(a.isCommon).toBeFalsy();
    expect(a.level).toBe(4);
    expect(a.entropyBits).toBeGreaterThan(100);
  });

  it("a longer password with more character classes never scores lower than a shorter, simpler prefix of it", () => {
    const shorter = analyzePassword("Xk9mPq2r");
    const longer = analyzePassword("Xk9mPq2r$Tz5!Wv8#");
    expect(longer.level).toBeGreaterThanOrEqual(shorter.level);
  });

  it("a password built from a common word behind leetspeak substitution is still caught", () => {
    const a = analyzePassword("p@ssw0rd");
    expect(a.leetCommon).toBeTruthy();
    expect(a.crackOfflineFast).toBe("instant");
  });

  it("crack-time buckets get strictly easier as the attacker's guess rate goes up, for the same password", () => {
    const a = analyzePassword("Tr7$kLm2Qz9!Nx4Wv");
    const order = [
      "instant",
      "seconds",
      "minutes",
      "hours",
      "days",
      "months",
      "years",
      "centuries",
    ];
    const onlineIdx = order.indexOf(a.crackOnline);
    const offlineFastIdx = order.indexOf(a.crackOfflineFast);
    const offlineSlowIdx = order.indexOf(a.crackOfflineSlow);

    expect(onlineIdx).toBeGreaterThanOrEqual(offlineFastIdx);
    expect(offlineSlowIdx).toBeGreaterThanOrEqual(offlineFastIdx);
  });
});

describe("passwordSimilarity", () => {
  it("is 1 (or very close) for identical strings", () => {
    expect(passwordSimilarity("hunter2", "hunter2")).toBeGreaterThanOrEqual(
      0.99,
    );
  });

  it("is low for completely different strings", () => {
    expect(passwordSimilarity("hunter2", "xk9mPq2r$Tz5")).toBeLessThan(0.5);
  });

  it("is higher for a small edit (one character changed) than for a totally different password", () => {
    const smallEdit = passwordSimilarity("hunter22", "hunter23");
    const totallyDifferent = passwordSimilarity("hunter22", "xk9mPq2r$Tz5");
    expect(smallEdit).toBeGreaterThan(totallyDifferent);
  });
});
