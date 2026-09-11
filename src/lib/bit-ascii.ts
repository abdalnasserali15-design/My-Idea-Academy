export function textToBinary(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, "0"))
    .join(" ");
}

export type BinaryDecodeResult =
  | { ok: true; text: string; byteCount: number }
  | {
      ok: false;
      reason: "empty" | "invalidChars" | "notMultipleOfEight" | "invalidUtf8";
    };

export function binaryToText(input: string): BinaryDecodeResult {
  const cleaned = input.replace(/\s+/g, "");
  if (cleaned.length === 0) return { ok: false, reason: "empty" };
  if (!/^[01]+$/.test(cleaned)) return { ok: false, reason: "invalidChars" };
  if (cleaned.length % 8 !== 0) {
    return { ok: false, reason: "notMultipleOfEight" };
  }

  const byteCount = cleaned.length / 8;
  const bytes = new Uint8Array(byteCount);
  for (let i = 0; i < byteCount; i++) {
    bytes[i] = parseInt(cleaned.slice(i * 8, i * 8 + 8), 2);
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return { ok: true, text, byteCount };
  } catch {
    return { ok: false, reason: "invalidUtf8" };
  }
}
