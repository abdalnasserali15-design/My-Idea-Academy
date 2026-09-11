import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Copy, Download, FileCheck, Search, ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { analyzePassword, type StrengthLevel } from "@/lib/password-security";
import {
  caesarAllShifts,
  caesarShift,
  decryptFile,
  decryptText,
  encryptFile,
  encryptText,
  vigenereDecrypt,
  vigenereEncrypt,
  type CryptoBreakdown,
} from "@/lib/encryption-tools";

const LEVEL_META: Record<
  StrengthLevel,
  { key: string; barClass: string; textClass: string; segments: number }
> = {
  0: {
    key: "veryWeak",
    barClass: "bg-destructive",
    textClass: "text-destructive",
    segments: 1,
  },
  1: {
    key: "weak",
    barClass: "bg-[color:var(--chart-5)]",
    textClass: "text-[color:var(--chart-5)]",
    segments: 2,
  },
  2: {
    key: "fair",
    barClass: "bg-[color:var(--chart-4)]",
    textClass: "text-[color:var(--chart-4)]",
    segments: 3,
  },
  3: {
    key: "strong",
    barClass: "bg-[color:var(--neon)]",
    textClass: "text-[color:var(--neon)]",
    segments: 4,
  },
  4: {
    key: "veryStrong",
    barClass: "bg-[image:var(--gradient-neon)]",
    textClass: "text-[color:var(--neon)]",
    segments: 5,
  },
};

type Tab = "modern" | "classic";
const TABS: Tab[] = ["modern", "classic"];

export function EncryptionTool() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("modern");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-border bg-muted/30 p-1">
        {TABS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "rounded-lg py-2 text-sm font-medium transition",
              tab === key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t(`tools.encryptionTool.tabs.${key}`)}
          </button>
        ))}
      </div>

      {tab === "modern" ? <ModernTab /> : <ClassicTab />}

      <p className="text-center text-xs text-muted-foreground">
        {t("tools.encryptionTool.privacyNote")}
      </p>
    </div>
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

type Mode = "encrypt" | "decrypt";
type InputKind = "text" | "file";

function ModernTab() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("encrypt");
  const [inputKind, setInputKind] = useState<InputKind>("text");
  const [passphrase, setPassphrase] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [fileResult, setFileResult] = useState<{
    blob: Blob;
    name: string;
  } | null>(null);
  const [breakdown, setBreakdown] = useState<CryptoBreakdown | null>(null);

  const analysis = useMemo(() => analyzePassword(passphrase), [passphrase]);
  const meta = LEVEL_META[analysis.level];
  const showStrength = mode === "encrypt" && passphrase.length > 0;

  function resetOutputs() {
    setError(null);
    setTextResult(null);
    setFileResult(null);
    setBreakdown(null);
  }

  async function handleRun() {
    resetOutputs();
    if (!passphrase) {
      setError(t("tools.encryptionTool.modern.errors.needPassphrase"));
      return;
    }
    if (inputKind === "text" && !text) {
      setError(t("tools.encryptionTool.modern.errors.needText"));
      return;
    }
    if (inputKind === "file" && !file) {
      setError(t("tools.encryptionTool.modern.errors.needFile"));
      return;
    }
    if (inputKind === "file" && file && file.size > 20 * 1024 * 1024) {
      setError(t("tools.encryptionTool.modern.errors.fileTooLarge"));
      return;
    }

    setBusy(true);
    try {
      if (inputKind === "text") {
        if (mode === "encrypt") {
          const r = await encryptText(text, passphrase);
          setTextResult(r.ciphertextB64);
          setBreakdown(r);
        } else {
          const r = await decryptText(text, passphrase);
          setTextResult(r.plaintext);
          setBreakdown(r);
        }
      } else if (file) {
        const r =
          mode === "encrypt"
            ? await encryptFile(file, passphrase)
            : await decryptFile(file, passphrase);
        setFileResult({ blob: r.blob, name: r.downloadName });
        setBreakdown(r);
        downloadBlob(r.blob, r.downloadName);
      }
    } catch {
      setError(
        mode === "encrypt"
          ? t("tools.encryptionTool.modern.errors.encryptFailed")
          : t("tools.encryptionTool.modern.errors.decryptFailed"),
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleCopy() {
    if (!textResult) return;
    try {
      await navigator.clipboard.writeText(textResult);
      toast.success(t("tools.encryptionTool.modern.copied"));
    } catch {
      toast.error(t("tools.encryptionTool.modern.copyFailed"));
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
        <p>{t("tools.encryptionTool.modern.warning")}</p>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("encrypt");
            resetOutputs();
          }}
          className={cn(
            "rounded-xl border py-2 text-sm font-medium transition",
            mode === "encrypt"
              ? "border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)]"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {t("tools.encryptionTool.modern.encryptButton")}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("decrypt");
            resetOutputs();
          }}
          className={cn(
            "rounded-xl border py-2 text-sm font-medium transition",
            mode === "decrypt"
              ? "border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)]"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {t("tools.encryptionTool.modern.decryptButton")}
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setInputKind("text");
            resetOutputs();
          }}
          className={cn(
            "rounded-xl border py-2 text-sm font-medium transition",
            inputKind === "text"
              ? "border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)]"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {t("tools.encryptionTool.modern.textTab")}
        </button>
        <button
          type="button"
          onClick={() => {
            setInputKind("file");
            resetOutputs();
          }}
          className={cn(
            "rounded-xl border py-2 text-sm font-medium transition",
            inputKind === "file"
              ? "border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)]"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {t("tools.encryptionTool.modern.fileTab")}
        </button>
      </div>

      <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {t("tools.encryptionTool.modern.passphraseLabel")}
      </label>
      <input
        type="password"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        placeholder={t("tools.encryptionTool.modern.passphrasePlaceholder")}
        className="mb-2 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon)]"
      />

      <div className="mb-4 h-[34px]">
        {showStrength ? (
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className={cn("text-xs font-semibold", meta.textClass)}>
                {t(`tools.passwordStrength.strength.${meta.key}`)}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("tools.encryptionTool.modern.crackTimeLabel", {
                  time: t(
                    `tools.passwordStrength.crackTime.${analysis.crackOfflineFast}`,
                  ),
                })}
              </span>
            </div>
            <div
              className="flex gap-1.5"
              role="img"
              aria-label={t(`tools.passwordStrength.strength.${meta.key}`)}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      i < meta.segments ? meta.barClass : "bg-transparent",
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {inputKind === "text" ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder={
            mode === "encrypt"
              ? t("tools.encryptionTool.modern.textPlaceholderEncrypt")
              : t("tools.encryptionTool.modern.textPlaceholderDecrypt")
          }
          className="mb-4 w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon)]"
        />
      ) : (
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground"
          />
          {file ? (
            <p className="mt-1.5 text-xs text-muted-foreground">
              {file.name} ({Math.round(file.size / 1024)} KB)
            </p>
          ) : null}
        </div>
      )}

      <button
        type="button"
        onClick={handleRun}
        disabled={busy}
        className="mb-3 w-full rounded-xl bg-[color:var(--neon)] py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
      >
        {busy
          ? t(
              mode === "encrypt"
                ? "tools.encryptionTool.modern.encrypting"
                : "tools.encryptionTool.modern.decrypting",
            )
          : t(
              mode === "encrypt"
                ? "tools.encryptionTool.modern.encryptButton"
                : "tools.encryptionTool.modern.decryptButton",
            )}
      </button>

      {error ? <p className="mb-3 text-sm text-destructive">{error}</p> : null}

      {textResult !== null ? (
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.encryptionTool.modern.outputLabel")}
          </label>
          <div
            dir="ltr"
            className="mb-2 max-h-40 overflow-y-auto rounded-xl border border-border bg-muted/30 p-3 text-left font-mono text-xs break-all"
          >
            {textResult}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
          >
            <Copy className="size-3.5" />{" "}
            {t("tools.encryptionTool.modern.copyButton")}
          </button>
        </div>
      ) : null}

      {fileResult ? (
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-sm">
            <FileCheck className="size-4 shrink-0 text-[color:var(--neon)]" />
            <span className="truncate">{fileResult.name}</span>
          </div>
          <button
            type="button"
            onClick={() => downloadBlob(fileResult.blob, fileResult.name)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <Download className="size-3.5" />{" "}
            {t("tools.encryptionTool.modern.downloadAgainButton")}
          </button>
        </div>
      ) : null}

      {breakdown ? (
        <div>
          <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.encryptionTool.modern.breakdownLabel")}
          </label>
          <div
            dir="ltr"
            className="space-y-2 rounded-xl border border-border bg-muted/30 p-3 text-left font-mono text-xs"
          >
            <div>
              <div className="text-muted-foreground">Salt (16 bytes)</div>
              <div className="break-all">{breakdown.saltHex}</div>
            </div>
            <div>
              <div className="text-muted-foreground">IV (12 bytes)</div>
              <div className="break-all">{breakdown.ivHex}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Ciphertext</div>
              <div>
                {t("tools.encryptionTool.modern.cipherBytesLabel", {
                  count: breakdown.cipherBytes,
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type ClassicCipher = "caesar" | "vigenere";
const CLASSIC_CIPHERS: ClassicCipher[] = ["caesar", "vigenere"];

function ClassicTab() {
  const { t } = useTranslation();
  const [cipher, setCipher] = useState<ClassicCipher>("caesar");
  const [text, setText] = useState("Attack at dawn");

  return (
    <div>
      <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {t("tools.encryptionTool.classic.textLabel")}
      </label>
      <textarea
        dir="ltr"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="mb-4 w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-left font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--violet)]"
      />

      <div className="mb-4 grid grid-cols-2 gap-2">
        {CLASSIC_CIPHERS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setCipher(key)}
            className={cn(
              "rounded-xl border py-2 text-sm font-medium transition",
              cipher === key
                ? "border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)]"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {t(`tools.encryptionTool.classic.cipherTabs.${key}`)}
          </button>
        ))}
      </div>

      {cipher === "caesar" ? (
        <CaesarSection text={text} />
      ) : (
        <VigenereSection text={text} />
      )}
    </div>
  );
}

function CaesarSection({ text }: { text: string }) {
  const { t } = useTranslation();
  const [shift, setShift] = useState(3);
  const [showCrack, setShowCrack] = useState(false);

  const output = useMemo(() => caesarShift(text, shift), [text, shift]);
  const allShifts = useMemo(() => caesarAllShifts(text), [text]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <label className="shrink-0 text-xs text-muted-foreground">
          {t("tools.encryptionTool.classic.caesar.shiftLabel")}
        </label>
        <input
          type="range"
          min={0}
          max={25}
          step={1}
          value={shift}
          onChange={(e) => {
            setShift(Number(e.target.value));
            setShowCrack(false);
          }}
          className="flex-1 accent-[color:var(--violet)]"
        />
        <span className="w-6 text-center text-sm font-medium">{shift}</span>
      </div>

      <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {t("tools.encryptionTool.classic.caesar.outputLabel")}
      </label>
      <div
        dir="ltr"
        className="mb-4 rounded-xl border border-border bg-muted/30 p-3 text-left font-mono text-sm"
      >
        {output || " "}
      </div>

      <button
        type="button"
        onClick={() => setShowCrack(true)}
        className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
      >
        <Search className="size-4" />{" "}
        {t("tools.encryptionTool.classic.caesar.crackButton")}
      </button>

      {showCrack ? (
        <div
          dir="ltr"
          className="max-h-64 overflow-y-auto rounded-xl border border-border"
        >
          {allShifts.map(({ shift: s, result }) => (
            <div
              key={s}
              className="flex gap-3 border-b border-border px-3 py-1.5 text-xs last:border-0"
            >
              <span className="w-5 shrink-0 font-mono text-muted-foreground">
                {s}
              </span>
              <span className="break-all font-mono">{result}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type VigenereMode = "encrypt" | "decrypt";

function VigenereSection({ text }: { text: string }) {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState("lemon");
  const [mode, setMode] = useState<VigenereMode>("encrypt");

  const hasKeyword = keyword.replace(/[^a-zA-Z]/g, "").length > 0;
  const output = useMemo(
    () =>
      mode === "encrypt"
        ? vigenereEncrypt(text, keyword)
        : vigenereDecrypt(text, keyword),
    [text, keyword, mode],
  );

  return (
    <div>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode("encrypt")}
          className={cn(
            "rounded-xl border py-2 text-sm font-medium transition",
            mode === "encrypt"
              ? "border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)]"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {t("tools.encryptionTool.classic.vigenere.encryptButton")}
        </button>
        <button
          type="button"
          onClick={() => setMode("decrypt")}
          className={cn(
            "rounded-xl border py-2 text-sm font-medium transition",
            mode === "decrypt"
              ? "border-[color:var(--violet)]/40 bg-[color:var(--violet)]/10 text-[color:var(--violet)]"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {t("tools.encryptionTool.classic.vigenere.decryptButton")}
        </button>
      </div>

      <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {t("tools.encryptionTool.classic.vigenere.keywordLabel")}
      </label>
      <input
        dir="ltr"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={t(
          "tools.encryptionTool.classic.vigenere.keywordPlaceholder",
        )}
        className="mb-4 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-left font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--violet)]"
      />

      <label className="mb-1.5 block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {t("tools.encryptionTool.classic.vigenere.outputLabel")}
      </label>
      <div
        dir="ltr"
        className="rounded-xl border border-border bg-muted/30 p-3 text-left font-mono text-sm"
      >
        {hasKeyword
          ? output || " "
          : t("tools.encryptionTool.classic.vigenere.needKeyword")}
      </div>
    </div>
  );
}
