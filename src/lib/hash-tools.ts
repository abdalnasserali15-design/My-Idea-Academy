export type HashAlgo = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
export const HASH_ALGOS: HashAlgo[] = [
  "MD5",
  "SHA-1",
  "SHA-256",
  "SHA-384",
  "SHA-512",
];

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function subtleDigestHex(
  algo: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512",
  text: string,
): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest(algo, bytes);
  return bytesToHex(new Uint8Array(digest));
}

export async function computeAllHashes(
  text: string,
): Promise<Record<HashAlgo, string>> {
  const [sha1, sha256, sha384, sha512] = await Promise.all([
    subtleDigestHex("SHA-1", text),
    subtleDigestHex("SHA-256", text),
    subtleDigestHex("SHA-384", text),
    subtleDigestHex("SHA-512", text),
  ]);
  return {
    MD5: md5Hex(text),
    "SHA-1": sha1,
    "SHA-256": sha256,
    "SHA-384": sha384,
    "SHA-512": sha512,
  };
}

const MD5_K = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
  0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
  0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
  0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
  0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
  0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
  0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
  0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
  0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
];
const MD5_S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
  9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
  16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15,
  21,
];

function rotl(x: number, c: number): number {
  return ((x << c) | (x >>> (32 - c))) >>> 0;
}

export function md5Hex(message: string): string {
  const msgBytes = new TextEncoder().encode(message);
  const bitLen = msgBytes.length * 8;

  const paddedLen = Math.ceil((msgBytes.length + 9) / 64) * 64;
  const buf = new Uint8Array(paddedLen);
  buf.set(msgBytes);
  buf[msgBytes.length] = 0x80;
  const view = new DataView(buf.buffer);

  view.setUint32(paddedLen - 8, bitLen >>> 0, true);
  view.setUint32(paddedLen - 4, Math.floor(bitLen / 0x100000000), true);

  let a0 = 0x67452301,
    b0 = 0xefcdab89,
    c0 = 0x98badcfe,
    d0 = 0x10325476;

  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    const M = new Array<number>(16);
    for (let i = 0; i < 16; i++) M[i] = view.getUint32(chunk + i * 4, true);

    let A = a0,
      B = b0,
      C = c0,
      D = d0;
    for (let i = 0; i < 64; i++) {
      let F: number, g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = (F + A + MD5_K[i] + M[g]) >>> 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, MD5_S[i])) >>> 0;
    }
    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  const out = new Uint8Array(16);
  const outView = new DataView(out.buffer);
  outView.setUint32(0, a0, true);
  outView.setUint32(4, b0, true);
  outView.setUint32(8, c0, true);
  outView.setUint32(12, d0, true);
  return bytesToHex(out);
}

export interface HashGuess {
  label: string;
  note: string;
}

export interface IdentifyResult {
  normalized: string;
  guesses: HashGuess[];
}

const HEX_LENGTH_GUESSES: Record<number, HashGuess[]> = {
  32: [
    {
      label: "MD5",
      note: "128-bit digest — the most common 32-hex-character hash.",
    },
    {
      label: "NTLM",
      note: "Windows password hash, same length as MD5 but a different algorithm.",
    },
  ],
  40: [
    { label: "SHA-1", note: "160-bit digest." },
    {
      label: "RIPEMD-160",
      note: "Same output length as SHA-1, far less common.",
    },
  ],
  56: [
    { label: "SHA-224", note: "224-bit digest." },
    {
      label: "SHA3-224",
      note: "Same length, from the newer Keccak-based SHA-3 family.",
    },
  ],
  64: [
    {
      label: "SHA-256",
      note: "256-bit digest — today's most common general-purpose hash.",
    },
    {
      label: "SHA3-256",
      note: "Same length, from the newer Keccak-based SHA-3 family.",
    },
  ],
  96: [
    { label: "SHA-384", note: "384-bit digest." },
    {
      label: "SHA3-384",
      note: "Same length, from the newer Keccak-based SHA-3 family.",
    },
  ],
  128: [
    { label: "SHA-512", note: "512-bit digest." },
    {
      label: "Whirlpool",
      note: "Same output length, rarely seen outside older systems.",
    },
  ],
};

const BASE64_BYTE_LENGTH_GUESSES: Record<number, HashGuess[]> = {
  16: [
    {
      label: "MD5 (base64)",
      note: "16-byte digest, base64-encoded instead of hex.",
    },
  ],
  20: [
    {
      label: "SHA-1 (base64)",
      note: "20-byte digest, base64-encoded instead of hex.",
    },
  ],
  28: [
    {
      label: "SHA-224 (base64)",
      note: "28-byte digest, base64-encoded instead of hex.",
    },
  ],
  32: [
    {
      label: "SHA-256 (base64)",
      note: "32-byte digest, base64-encoded instead of hex.",
    },
  ],
  48: [
    {
      label: "SHA-384 (base64)",
      note: "48-byte digest, base64-encoded instead of hex.",
    },
  ],
  64: [
    {
      label: "SHA-512 (base64)",
      note: "64-byte digest, base64-encoded instead of hex.",
    },
  ],
};

function stripPrefix(s: string): string {
  return s.trim().replace(/^0x/i, "");
}

export function identifyHash(raw: string): IdentifyResult {
  const trimmed = raw.trim();
  if (!trimmed) return { normalized: "", guesses: [] };

  if (/^\$2[aby]?\$/.test(trimmed)) {
    return {
      normalized: trimmed,
      guesses: [
        {
          label: "bcrypt",
          note: 'Identified by its "$2a$/$2b$/$2y$" prefix. Includes a built-in salt and configurable cost factor.',
        },
      ],
    };
  }
  if (/^\$argon2(i|d|id)\$/.test(trimmed)) {
    return {
      normalized: trimmed,
      guesses: [
        {
          label: "Argon2",
          note: 'Identified by its "$argon2...$" prefix — the current recommended password hash.',
        },
      ],
    };
  }
  if (/^\$6\$/.test(trimmed)) {
    return {
      normalized: trimmed,
      guesses: [
        {
          label: "SHA-512 crypt (Unix)",
          note: 'Identified by its "$6$" prefix, used in /etc/shadow.',
        },
      ],
    };
  }
  if (/^\$1\$/.test(trimmed)) {
    return {
      normalized: trimmed,
      guesses: [
        {
          label: "MD5 crypt (Unix, legacy)",
          note: 'Identified by its "$1$" prefix — considered weak today.',
        },
      ],
    };
  }
  const sriMatch = /^(sha256|sha384|sha512)-([A-Za-z0-9+/]+=*)$/.exec(trimmed);
  if (sriMatch) {
    return {
      normalized: trimmed,
      guesses: [
        {
          label: `Subresource Integrity (${sriMatch[1].toUpperCase()})`,
          note: 'The "algorithm-base64" format used in HTML <script integrity="..."> tags.',
        },
      ],
    };
  }

  const normalized = stripPrefix(trimmed);

  if (/^[0-9a-f]+$/i.test(normalized)) {
    return { normalized, guesses: HEX_LENGTH_GUESSES[normalized.length] ?? [] };
  }

  if (/^[A-Za-z0-9+/]+=*$/.test(normalized) && normalized.length % 4 === 0) {
    try {
      const decodedLength = atob(normalized).length;
      const guesses = BASE64_BYTE_LENGTH_GUESSES[decodedLength];
      if (guesses) return { normalized, guesses };
    } catch (e) {
      void e;
    }
  }

  return { normalized, guesses: [] };
}

export function hashesMatch(a: string, b: string): boolean {
  const clean = (s: string) => stripPrefix(s).toLowerCase();
  const cleanA = clean(a);
  return cleanA.length > 0 && cleanA === clean(b);
}
