import { describe, expect, it } from "vitest";

import { parseAcceptLanguage } from "./detect-language";

describe("parseAcceptLanguage", () => {
  it("returns null for a missing header", () => {
    expect(parseAcceptLanguage(null)).toBe(null);
  });

  it("picks the highest-quality supported language, not the first-listed one", () => {
    expect(parseAcceptLanguage("fr;q=0.5, en;q=0.9")).toBe("en");
  });

  it("falls back to header order when no q values are given (default q=1 for all)", () => {
    expect(parseAcceptLanguage("fr, en")).toBe("fr");
  });

  it("picks the highest q among three candidates regardless of position", () => {
    expect(parseAcceptLanguage("tr;q=0.3, ar;q=0.95, fr;q=0.6")).toBe("ar");
  });

  it("keeps header order as a tiebreak when q values are equal", () => {
    expect(parseAcceptLanguage("es;q=0.8, it;q=0.8")).toBe("es");
  });

  it("treats q=0 as not acceptable and skips it", () => {
    expect(parseAcceptLanguage("en;q=0, fr;q=0.1")).toBe("fr");
  });

  it("strips the region subtag and still respects q", () => {
    expect(parseAcceptLanguage("fr-CA;q=0.4, en-US;q=0.9")).toBe("en");
  });

  it("skips unsupported languages even with a high q value", () => {
    expect(parseAcceptLanguage("de;q=0.99, tr;q=0.1")).toBe("tr");
  });

  it("returns null when nothing in the header is supported", () => {
    expect(parseAcceptLanguage("de;q=0.9, ja;q=0.8")).toBe(null);
  });

  it("treats a malformed q value as the default (1) instead of crashing", () => {
    expect(() =>
      parseAcceptLanguage("fr;q=notanumber, en;q=0.5"),
    ).not.toThrow();
    expect(parseAcceptLanguage("fr;q=notanumber, en;q=0.5")).toBe("fr");
  });
});
