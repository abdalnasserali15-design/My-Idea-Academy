import { describe, expect, it } from "vitest";

import { analyzeEmail, EXAMPLE_EMAIL } from "./email-analysis";

describe("analyzeEmail — the bundled phishing example", () => {
  it("scores it at the maximum (100) with every expected finding", () => {
    const a = analyzeEmail(EXAMPLE_EMAIL);
    expect(a.score).toBe(100);
    expect(a.authFail).toBeTruthy();
    expect(a.replyToMismatch).toBeTruthy();
    expect(a.fromDomain).toBe("novabank-alerts-verify.com");
    expect(a.replyToDomain).toBe("totally-different-domain.ru");
  });

  it("catches the HTML link/display-text mismatch specifically", () => {
    const a = analyzeEmail(EXAMPLE_EMAIL);
    expect(a.findings.some((f) => f.id === "linkTextMismatch")).toBeTruthy();
  });

  it("flags the shortened link but not as IP-based", () => {
    const a = analyzeEmail(EXAMPLE_EMAIL);
    expect(a.links).toHaveLength(1);
    expect(a.links[0].isShortened).toBeTruthy();
    expect(a.links[0].isIpBased).toBeFalsy();
  });

  it("parses exactly one Received hop", () => {
    const a = analyzeEmail(EXAMPLE_EMAIL);
    expect(a.route).toHaveLength(1);
    expect(a.route[0].from).toBe("mail-relay-9.forwardnet.ru");
    expect(a.route[0].by).toBe("mx.example.com");
  });
});

describe("analyzeEmail — a clean, ordinary email", () => {
  const clean = [
    "Received: from mail.acme-corp.com (mail.acme-corp.com [203.0.113.10])",
    "\tby mx.example.com with ESMTPS id z9y8x7; Tue, 02 Jan 2024 10:00:00 +0000",
    'From: "Dana at Acme" <dana@acme-corp.com>',
    "Subject: Notes from today's sync",
    "Authentication-Results: spf=pass dkim=pass dmarc=pass",
    "",
    "Hi Sam,",
    "",
    "Thanks for the call earlier — I've attached the updated roadmap.pdf.",
    "Let me know if Thursday at 2pm still works for the follow-up.",
    "",
    "Dana",
  ].join("\n");

  it("scores low with no major findings", () => {
    const a = analyzeEmail(clean);
    expect(a.score).toBeLessThan(25);
    expect(a.authFail).toBeFalsy();
    expect(a.replyToMismatch).toBeFalsy();
  });
});

describe("analyzeEmail — individual signals", () => {
  function withBody(headers: string, body: string): string {
    return `${headers}\n\n${body}`;
  }

  it("flags a raw-IP link", () => {
    const a = analyzeEmail(
      withBody(
        "From: a@b.com\nSubject: hi",
        "Click http://192.0.2.5/login now",
      ),
    );
    expect(a.links[0].isIpBased).toBeTruthy();
    expect(a.findings.some((f) => f.id === "ipBasedLink")).toBeTruthy();
  });

  it("flags a risky attachment mentioned in the body even without a header", () => {
    const a = analyzeEmail(
      withBody(
        "From: a@b.com\nSubject: hi",
        "See invoice_details.exe for more.",
      ),
    );
    expect(a.findings.some((f) => f.id === "riskyAttachment")).toBeTruthy();
  });

  it("flags prize / advance-fee language", () => {
    const a = analyzeEmail(
      withBody(
        "From: a@b.com\nSubject: hi",
        "Congratulations! You've won a cash prize.",
      ),
    );
    expect(a.findings.some((f) => f.id === "unearnedReward")).toBeTruthy();
  });

  it("flags a generic greeting", () => {
    const a = analyzeEmail(
      withBody(
        "From: a@b.com\nSubject: hi",
        "Dear Valued Customer, please review your account.",
      ),
    );
    expect(a.findings.some((f) => f.id === "genericGreeting")).toBeTruthy();
  });

  it("flags missing Received headers", () => {
    const a = analyzeEmail(
      withBody("From: a@b.com\nSubject: hi", "Hello there."),
    );
    expect(a.route).toHaveLength(0);
    expect(a.findings.some((f) => f.id === "noReceivedHeaders")).toBeTruthy();
  });

  it("does not flag Reply-To when it matches the From domain", () => {
    const a = analyzeEmail(
      withBody("From: a@acme.com\nReply-To: b@acme.com\nSubject: hi", "Hello."),
    );
    expect(a.replyToMismatch).toBeFalsy();
  });

  it("caps the score at 100 even with many overlapping signals", () => {
    const spam = withBody(
      "From: a@fake-bank-alerts.ru\nReply-To: b@another-domain.cn\nSubject: URGENT ACT NOW\nAuthentication-Results: spf=fail dkim=fail dmarc=fail",
      "Congratulations you've won! Act now, immediately confirm your password and verify your identity or your account will be suspended. Dear Customer, see refund_form.exe. Click http://198.51.100.7/claim",
    );
    const a = analyzeEmail(spam);
    expect(a.score).toBeLessThanOrEqual(100);
    expect(a.score).toBeGreaterThanOrEqual(90);
  });

  it("handles an email with no blank line separating headers from body without crashing", () => {
    const a = analyzeEmail("From: a@b.com\nSubject: hi there");
    expect(a.subject).toBe("hi there");
    expect(a.score).toBeGreaterThanOrEqual(0);
  });

  it("handles a completely empty string without crashing", () => {
    const a = analyzeEmail("");
    expect(a.from).toBeNull();
    expect(a.score).toBeGreaterThanOrEqual(0);
  });
});
