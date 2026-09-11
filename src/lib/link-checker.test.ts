import { describe, expect, it } from "vitest";

import {
  analyzeUrl,
  computeSafetyScore,
  registrableDomain,
  tierFromDomainAgeDays,
  tierFromRedirectChain,
} from "./link-checker";

describe("analyzeUrl", () => {
  it("flags nothing on a clean, legitimate-looking URL", () => {
    const a = analyzeUrl("https://www.google.com/search?q=test");
    expect(a.valid).toBeTruthy();
    expect(a.checks.filter((c) => c.flagged)).toHaveLength(0);
  });

  it("does NOT false-positive brand impersonation on a legitimate country-TLD domain", () => {
    const a = analyzeUrl("https://www.google.co.uk/");
    const brand = a.checks.find((c) => c.id === "brand")!;
    expect(brand.flagged).toBeFalsy();
  });

  it("flags a realistic phishing URL on subdomains, tld, https, and brand", () => {
    const a = analyzeUrl(
      "http://accounts.google.com.security-verify.tk/signin",
    );
    const byId = Object.fromEntries(a.checks.map((c) => [c.id, c]));
    expect(byId.subdomains.flagged).toBeTruthy();
    expect(byId.tld.flagged).toBeTruthy();
    expect(byId.https.flagged).toBeTruthy();
    expect(byId.brand.flagged).toBeTruthy();
    expect(byId.brand.params.brand).toBe("google");
    expect(byId.ipHost.flagged).toBeFalsy();
  });

  it("catches the '@' trick and reports the real host, not the decoy", () => {
    const a = analyzeUrl("http://paypal.com@evil-domain.test/login");
    const byId = Object.fromEntries(a.checks.map((c) => [c.id, c]));
    expect(byId.userinfo.flagged).toBeTruthy();
    expect(a.hostname).toBe("evil-domain.test");
    expect(byId.brand.flagged).toBeTruthy();
  });

  it("flags a raw IP address host", () => {
    const a = analyzeUrl("http://192.168.1.50/admin");
    const byId = Object.fromEntries(a.checks.map((c) => [c.id, c]));
    expect(byId.ipHost.flagged).toBeTruthy();
  });

  it("flags known URL shorteners", () => {
    const a = analyzeUrl("https://bit.ly/3xample");
    const byId = Object.fromEntries(a.checks.map((c) => [c.id, c]));
    expect(byId.shortener.flagged).toBeTruthy();
  });

  it("is invalid for malformed input", () => {
    expect(analyzeUrl("http://").valid).toBeFalsy();
  });

  it("leniently assumes https when no scheme is given", () => {
    const a = analyzeUrl("www.example.com/path");
    expect(a.protocol).toBe("https");
    expect(a.hostname).toBe("www.example.com");
  });
});

describe("registrableDomain", () => {
  it("handles a plain .com domain", () => {
    expect(registrableDomain("www.example.com")).toBe("example.com");
  });

  it("handles a known compound TLD like co.uk", () => {
    expect(registrableDomain("www.google.co.uk")).toBe("google.co.uk");
  });
});

describe("computeSafetyScore", () => {
  it("is exactly 25 when structurally clean but no server checks have run", () => {
    expect(
      computeSafetyScore({
        flaggedCount: 0,
        totalChecks: 8,
        redirectTier: null,
        domainAgeTier: null,
      }),
    ).toBe(25);
  });

  it("is exactly 90 (never 100) when everything, including server checks, is clean", () => {
    expect(
      computeSafetyScore({
        flaggedCount: 0,
        totalChecks: 8,
        redirectTier: "clean",
        domainAgeTier: "clean",
      }),
    ).toBe(90);
  });

  it("is 0 in the worst case", () => {
    expect(
      computeSafetyScore({
        flaggedCount: 8,
        totalChecks: 8,
        redirectTier: "risky",
        domainAgeTier: "risky",
      }),
    ).toBe(0);
  });

  it("never exceeds 90 or drops below 0, across every combination of inputs", () => {
    const tiers = ["clean", "mixed", "risky", null] as const;
    for (let flagged = 0; flagged <= 8; flagged++) {
      for (const rt of tiers) {
        for (const dt of tiers) {
          const score = computeSafetyScore({
            flaggedCount: flagged,
            totalChecks: 8,
            redirectTier: rt,
            domainAgeTier: dt,
          });
          expect(score).toBeLessThanOrEqual(90);
          expect(score).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });
});

describe("tierFromRedirectChain", () => {
  it("is clean for a same-host, zero-hop chain", () => {
    expect(
      tierFromRedirectChain("example.com", [
        { url: "https://example.com/", status: 200 },
      ]),
    ).toBe("clean");
  });

  it("is mixed for one hop to a different host", () => {
    const tier = tierFromRedirectChain("bit.ly", [
      { url: "https://bit.ly/x", status: 301 },
      { url: "https://example.com/page", status: 200 },
    ]);
    expect(tier).toBe("mixed");
  });

  it("is risky for a long hop chain", () => {
    const tier = tierFromRedirectChain("bit.ly", [
      { url: "https://bit.ly/x", status: 301 },
      { url: "https://hop2.example", status: 301 },
      { url: "https://hop3.example", status: 301 },
      { url: "https://final.example", status: 200 },
    ]);
    expect(tier).toBe("risky");
  });

  it("is risky for an empty chain (the check couldn't complete)", () => {
    expect(tierFromRedirectChain("example.com", [])).toBe("risky");
  });
});

describe("tierFromDomainAgeDays", () => {
  it("is clean for domains at least a year old", () => {
    expect(tierFromDomainAgeDays(365 * 8)).toBe("clean");
  });
  it("is mixed for domains between a month and a year old", () => {
    expect(tierFromDomainAgeDays(120)).toBe("mixed");
  });
  it("is risky for domains under a month old", () => {
    expect(tierFromDomainAgeDays(9)).toBe("risky");
  });
  it("is mixed (not over-penalized) when the age is unknown", () => {
    expect(tierFromDomainAgeDays(null)).toBe("mixed");
  });
});
