import { describe, expect, it } from "vitest";

import {
  caesarAllShifts,
  caesarShift,
  decryptFile,
  decryptText,
  encryptFile,
  encryptText,
  vigenereDecrypt,
  vigenereEncrypt,
} from "./encryption-tools";

describe("encryptText / decryptText", () => {
  it("round-trips plain, empty, long, and multi-byte (Arabic/emoji) text", async () => {
    const passphrase = "correct horse battery staple";
    for (const text of [
      "hello world",
      "",
      "a".repeat(5000),
      "مرحبا 🔒🚀 نص عربي",
    ]) {
      const enc = await encryptText(text, passphrase);
      const dec = await decryptText(enc.ciphertextB64, passphrase);
      expect(dec.plaintext).toBe(text);
      expect(enc.saltHex).toHaveLength(32);
      expect(enc.ivHex).toHaveLength(24);
    }
  });

  it("rejects the wrong passphrase", async () => {
    const enc = await encryptText("secret message", "right-password");
    let threw = false;
    try {
      await decryptText(enc.ciphertextB64, "wrong-password");
    } catch {
      threw = true;
    }
    expect(threw).toBeTruthy();
  });

  it("rejects tampered ciphertext (AES-GCM authentication)", async () => {
    const enc = await encryptText("secret message", "right-password");
    const bytes = Uint8Array.from(atob(enc.ciphertextB64), (c) =>
      c.charCodeAt(0),
    );
    bytes[bytes.length - 1] ^= 0xff;
    let tampered = "";
    bytes.forEach((b) => (tampered += String.fromCharCode(b)));
    let threw = false;
    try {
      await decryptText(btoa(tampered), "right-password");
    } catch {
      threw = true;
    }
    expect(threw).toBeTruthy();
  });
});

describe("encryptFile / decryptFile", () => {
  it("round-trips file bytes and recovers the original filename", async () => {
    const original = new File(
      [new Uint8Array([1, 2, 3, 4, 250, 251, 252, 0, 10, 255])],
      "report.pdf",
      {
        type: "application/pdf",
      },
    );
    const enc = await encryptFile(original, "file-pass-123!");
    expect(enc.downloadName).toBe("report.pdf.enc");

    const encFile = new File([enc.blob], enc.downloadName);
    const dec = await decryptFile(encFile, "file-pass-123!");
    expect(dec.downloadName).toBe("report.pdf");

    const decBytes = new Uint8Array(await dec.blob.arrayBuffer());
    const origBytes = new Uint8Array(await original.arrayBuffer());
    expect(decBytes.length).toBe(origBytes.length);
    expect(Array.from(decBytes)).toEqual(Array.from(origBytes));
  });

  it("rejects a file that isn't validly formatted encrypted output", async () => {
    const garbage = new File([new Uint8Array([1, 2, 3])], "not-encrypted.txt");
    let threw = false;
    try {
      await decryptFile(garbage, "whatever");
    } catch {
      threw = true;
    }
    expect(threw).toBeTruthy();
  });
});

describe("caesarShift / caesarAllShifts", () => {
  it("shifts letters and preserves case, digits, and punctuation", () => {
    expect(caesarShift("Attack at dawn", 3)).toBe("Dwwdfn dw gdzq");
    expect(caesarShift("Hello, World! 123", 1)).toBe("Ifmmp, Xpsme! 123");
  });

  it("shift 0 and shift 26 are both the identity", () => {
    expect(caesarShift("Test Phrase", 0)).toBe("Test Phrase");
    expect(caesarShift("Test Phrase", 26)).toBe("Test Phrase");
  });

  it("a negative shift correctly reverses a positive one", () => {
    expect(caesarShift("Dwwdfn dw gdzq", -3)).toBe("Attack at dawn");
  });

  it("caesarAllShifts returns all 26 possibilities, and the correct one decodes", () => {
    const all = caesarAllShifts("Dwwdfn dw gdzq");
    expect(all).toHaveLength(26);

    expect(all[23].result).toBe("Attack at dawn");
  });
});

describe("vigenereEncrypt / vigenereDecrypt", () => {
  it("matches the classic textbook example (ATTACKATDAWN + LEMON)", () => {
    expect(vigenereEncrypt("ATTACKATDAWN", "LEMON")).toBe("LXFOPVEFRNHR");
    expect(vigenereDecrypt("LXFOPVEFRNHR", "LEMON")).toBe("ATTACKATDAWN");
  });

  it("round-trips text with mixed case, spaces, and punctuation", () => {
    for (const s of [
      "Attack at dawn!",
      "The Quick Brown Fox.",
      "a",
      "",
      "12345 !@#$%",
    ]) {
      expect(vigenereDecrypt(vigenereEncrypt(s, "keyword"), "keyword")).toBe(s);
    }
  });

  it("keyword case doesn't matter", () => {
    expect(vigenereEncrypt("HELLO", "key")).toBe(
      vigenereEncrypt("HELLO", "KEY"),
    );
  });

  it("a single-letter keyword behaves exactly like the matching Caesar shift", () => {
    expect(vigenereEncrypt("Attack at dawn", "D")).toBe(
      caesarShift("Attack at dawn", 3),
    );
  });

  it("an empty or non-alphabetic keyword leaves the text unchanged", () => {
    expect(vigenereEncrypt("Attack at dawn", "")).toBe("Attack at dawn");
    expect(vigenereEncrypt("Attack at dawn", "12345")).toBe("Attack at dawn");
  });
});
