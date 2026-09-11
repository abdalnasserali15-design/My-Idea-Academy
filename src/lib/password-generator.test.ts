import { describe, expect, it } from "vitest";

import { generateCharPassword, generatePassphrase } from "./password-generator";

const SYMBOL_CHARS = "!@#$%^&*()-_=+[]{}";
const AMBIGUOUS_CHARS = "l1IO0o";

describe("generateCharPassword", () => {
  it("returns null when no pool is selected", () => {
    expect(
      generateCharPassword({
        length: 16,
        upper: false,
        lower: false,
        number: false,
        symbol: false,
        avoidAmbiguous: false,
      }),
    ).toBe(null);
  });

  it("respects the requested length when length >= number of selected pools", () => {
    for (let i = 0; i < 50; i++) {
      const pw = generateCharPassword({
        length: 20,
        upper: true,
        lower: true,
        number: true,
        symbol: true,
        avoidAmbiguous: false,
      });
      expect(pw).not.toBe(null);
      expect(pw?.length).toBe(20);
    }
  });

  it("guarantees at least one character from every selected pool", () => {
    for (let i = 0; i < 200; i++) {
      const pw =
        generateCharPassword({
          length: 20,
          upper: true,
          lower: true,
          number: true,
          symbol: true,
          avoidAmbiguous: false,
        }) ?? "";
      expect(/[A-Z]/.test(pw)).toBe(true);
      expect(/[a-z]/.test(pw)).toBe(true);
      expect(/[0-9]/.test(pw)).toBe(true);
      expect([...pw].some((c) => SYMBOL_CHARS.includes(c))).toBe(true);
    }
  });

  it("still guarantees one of each pool when length is smaller than the pool count (output grows to fit)", () => {
    for (let i = 0; i < 200; i++) {
      const pw =
        generateCharPassword({
          length: 3,
          upper: true,
          lower: true,
          number: true,
          symbol: true,
          avoidAmbiguous: false,
        }) ?? "";
      expect(pw.length).toBe(4);
      expect(/[A-Z]/.test(pw)).toBe(true);
      expect(/[a-z]/.test(pw)).toBe(true);
      expect(/[0-9]/.test(pw)).toBe(true);
      expect([...pw].some((c) => SYMBOL_CHARS.includes(c))).toBe(true);
    }
  });

  it("only uses characters from the selected pools", () => {
    for (let i = 0; i < 50; i++) {
      const pw =
        generateCharPassword({
          length: 30,
          upper: false,
          lower: true,
          number: true,
          symbol: false,
          avoidAmbiguous: false,
        }) ?? "";
      expect(/^[a-z0-9]+$/.test(pw)).toBe(true);
    }
  });

  it("strips ambiguous characters when avoidAmbiguous is set", () => {
    for (let i = 0; i < 50; i++) {
      const pw =
        generateCharPassword({
          length: 40,
          upper: true,
          lower: true,
          number: true,
          symbol: false,
          avoidAmbiguous: true,
        }) ?? "";
      expect([...pw].some((c) => AMBIGUOUS_CHARS.includes(c))).toBe(false);
    }
  });

  it("produces different output across calls (uses real randomness)", () => {
    const opts = {
      length: 24,
      upper: true,
      lower: true,
      number: true,
      symbol: true,
      avoidAmbiguous: false,
    };
    const a = generateCharPassword(opts);
    const b = generateCharPassword(opts);
    expect(a).not.toBe(b);
  });
});

describe("generatePassphrase", () => {
  it("returns null when no separator is selected", () => {
    expect(
      generatePassphrase({
        wordCount: 4,
        separators: [],
        capitalize: false,
        addNumber: false,
      }),
    ).toBe(null);
  });

  it("returns null for wordCount 0 with no number added", () => {
    expect(
      generatePassphrase({
        wordCount: 0,
        separators: ["-"],
        capitalize: false,
        addNumber: false,
      }),
    ).toBe(null);
  });

  it("returns just the number for wordCount 0 with addNumber true", () => {
    const r = generatePassphrase({
      wordCount: 0,
      separators: ["-"],
      capitalize: false,
      addNumber: true,
    });
    expect(typeof r).toBe("string");
    expect(/^\d{2}$/.test(r ?? "")).toBe(true);
  });

  it("joins the requested number of words with a selected separator", () => {
    const r =
      generatePassphrase({
        wordCount: 4,
        separators: ["-"],
        capitalize: false,
        addNumber: false,
      }) ?? "";
    expect(r.split("-").length).toBe(4);
  });

  it("appends a two-digit number as an extra segment when addNumber is set", () => {
    const r =
      generatePassphrase({
        wordCount: 3,
        separators: ["-"],
        capitalize: false,
        addNumber: true,
      }) ?? "";
    const segments = r.split("-");
    expect(segments.length).toBe(4);
    expect(/^\d{2}$/.test(segments[segments.length - 1])).toBe(true);
  });

  it("capitalizes each word when capitalize is set", () => {
    const r =
      generatePassphrase({
        wordCount: 5,
        separators: ["-"],
        capitalize: true,
        addNumber: false,
      }) ?? "";
    for (const word of r.split("-")) {
      expect(word.charAt(0)).toBe(word.charAt(0).toUpperCase());
    }
  });

  it("only uses separators from the enabled list", () => {
    for (let i = 0; i < 50; i++) {
      const r =
        generatePassphrase({
          wordCount: 6,
          separators: ["-", "_"],
          capitalize: false,
          addNumber: false,
        }) ?? "";
      const others = [...r].filter((c) => !/[a-z0-9]/i.test(c));
      expect(others.every((c) => c === "-" || c === "_")).toBe(true);
    }
  });
});
