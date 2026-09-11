export interface HibpResult {
  pwned: boolean;
  count: number;
}

async function sha1Hex(message: string): Promise<string> {
  const bytes = new TextEncoder().encode(message);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export async function checkPasswordBreach(
  password: string,
): Promise<HibpResult> {
  const hash = await sha1Hex(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`,
    {
      headers: { "Add-Padding": "true" },
    },
  );
  if (!response.ok) {
    throw new Error(`Have I Been Pwned request failed (${response.status})`);
  }

  const text = await response.text();
  for (const line of text.split("\n")) {
    const [lineSuffix, countStr] = line.trim().split(":");
    if (lineSuffix === suffix) {
      return { pwned: true, count: parseInt(countStr, 10) || 0 };
    }
  }
  return { pwned: false, count: 0 };
}
