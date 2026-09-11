const PBKDF2_ITERATIONS = 600_000;
const SALT_BYTES = 16;
const IV_BYTES = 12;

export interface CryptoBreakdown {
  saltHex: string;
  ivHex: string;
  cipherBytes: number;
}

async function deriveKey(
  passphrase: string,
  salt: BufferSource,
): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export interface EncryptTextResult extends CryptoBreakdown {
  ciphertextB64: string;
}

export async function encryptText(
  plaintext: string,
  passphrase: string,
): Promise<EncryptTextResult> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(passphrase, salt);
  const cipherBuf = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext),
  );

  const combined = new Uint8Array(
    salt.length + iv.length + cipherBuf.byteLength,
  );
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(cipherBuf), salt.length + iv.length);

  return {
    ciphertextB64: bytesToBase64(combined),
    saltHex: bytesToHex(salt),
    ivHex: bytesToHex(iv),
    cipherBytes: cipherBuf.byteLength,
  };
}

export interface DecryptTextResult extends CryptoBreakdown {
  plaintext: string;
}

export async function decryptText(
  ciphertextB64: string,
  passphrase: string,
): Promise<DecryptTextResult> {
  const combined = base64ToBytes(ciphertextB64.trim());
  if (combined.length < SALT_BYTES + IV_BYTES) {
    throw new Error("Ciphertext is too short to contain a salt and IV.");
  }
  const salt = combined.slice(0, SALT_BYTES);
  const iv = combined.slice(SALT_BYTES, SALT_BYTES + IV_BYTES);
  const ciphertext = combined.slice(SALT_BYTES + IV_BYTES);
  const key = await deriveKey(passphrase, salt);
  const plainBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext,
  );

  return {
    plaintext: new TextDecoder().decode(plainBuf),
    saltHex: bytesToHex(salt),
    ivHex: bytesToHex(iv),
    cipherBytes: ciphertext.byteLength,
  };
}

export interface EncryptFileResult extends CryptoBreakdown {
  blob: Blob;
  downloadName: string;
}

export async function encryptFile(
  file: File,
  passphrase: string,
): Promise<EncryptFileResult> {
  const fileBuf = await file.arrayBuffer();
  const nameBytes = new TextEncoder().encode(file.name);
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(passphrase, salt);
  const cipherBuf = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    fileBuf,
  );

  const header = new Uint8Array(4);
  new DataView(header.buffer).setUint32(0, nameBytes.length, true);

  const combined = new Uint8Array(
    4 + nameBytes.length + SALT_BYTES + IV_BYTES + cipherBuf.byteLength,
  );
  let offset = 0;
  combined.set(header, offset);
  offset += 4;
  combined.set(nameBytes, offset);
  offset += nameBytes.length;
  combined.set(salt, offset);
  offset += SALT_BYTES;
  combined.set(iv, offset);
  offset += IV_BYTES;
  combined.set(new Uint8Array(cipherBuf), offset);

  return {
    blob: new Blob([combined], { type: "application/octet-stream" }),
    downloadName: `${file.name}.enc`,
    saltHex: bytesToHex(salt),
    ivHex: bytesToHex(iv),
    cipherBytes: cipherBuf.byteLength,
  };
}

export interface DecryptFileResult extends CryptoBreakdown {
  blob: Blob;
  downloadName: string;
}

export async function decryptFile(
  file: File,
  passphrase: string,
): Promise<DecryptFileResult> {
  const buf = new Uint8Array(await file.arrayBuffer());
  if (buf.length < 4)
    throw new Error(
      "File is too short to be a validly formatted encrypted file.",
    );
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const nameLen = dv.getUint32(0, true);

  let offset = 4;
  if (buf.length < offset + nameLen + SALT_BYTES + IV_BYTES) {
    throw new Error("File is not a validly formatted encrypted file.");
  }
  const downloadName = new TextDecoder().decode(
    buf.slice(offset, offset + nameLen),
  );
  offset += nameLen;
  const salt = buf.slice(offset, offset + SALT_BYTES);
  offset += SALT_BYTES;
  const iv = buf.slice(offset, offset + IV_BYTES);
  offset += IV_BYTES;
  const ciphertext = buf.slice(offset);

  const key = await deriveKey(passphrase, salt);
  const plainBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext,
  );

  return {
    blob: new Blob([plainBuf]),
    downloadName,
    saltHex: bytesToHex(salt),
    ivHex: bytesToHex(iv),
    cipherBytes: ciphertext.byteLength,
  };
}

export function caesarShift(text: string, shift: number): string {
  const s = ((shift % 26) + 26) % 26;
  return text.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + s) % 26) + base);
  });
}

export function caesarAllShifts(
  text: string,
): { shift: number; result: string }[] {
  return Array.from({ length: 26 }, (_, shift) => ({
    shift,
    result: caesarShift(text, shift),
  }));
}

function vigenereShift(
  text: string,
  keyword: string,
  direction: 1 | -1,
): string {
  const cleanKey = keyword.replace(/[^a-zA-Z]/g, "").toUpperCase();
  if (!cleanKey) return text;
  let keyIndex = 0;
  return text.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
    keyIndex += 1;
    const shifted =
      (((ch.charCodeAt(0) - base + direction * keyShift) % 26) + 26) % 26;
    return String.fromCharCode(shifted + base);
  });
}

export function vigenereEncrypt(text: string, keyword: string): string {
  return vigenereShift(text, keyword, 1);
}

export function vigenereDecrypt(text: string, keyword: string): string {
  return vigenereShift(text, keyword, -1);
}
