import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Copy, Check, X, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  HASH_ALGOS,
  computeAllHashes,
  identifyHash,
  hashesMatch,
  type HashAlgo,
} from "@/lib/hash-tools";

type Tab = "generate" | "identify" | "compare";
const TABS: Tab[] = ["generate", "identify", "compare"];

export function HashTool() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("generate");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-border bg-muted/30 p-1">
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
            {t(`tools.hashTool.tabs.${key}`)}
          </button>
        ))}
      </div>

      {tab === "generate" ? <GenerateTab /> : null}
      {tab === "identify" ? <IdentifyTab /> : null}
      {tab === "compare" ? <CompareTab /> : null}

      <p className="text-center text-xs text-muted-foreground">
        {t("tools.hashTool.privacyNote")}
      </p>
    </div>
  );
}

function GenerateTab() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<HashAlgo, string> | null>(null);

  useEffect(() => {
    if (!text) {
      setHashes(null);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      computeAllHashes(text).then((result) => {
        if (!cancelled) setHashes(result);
      });
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [text]);

  async function handleCopy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(t("tools.hashTool.generate.copied"));
    } catch {
      toast.error(t("tools.hashTool.generate.copyFailed"));
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card/70 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7">
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        {t("tools.hashTool.generate.label")}
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("tools.hashTool.generate.placeholder")}
        rows={3}
        dir="ltr"
        className="mb-4 w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2.5 text-start text-sm text-foreground outline-none focus:border-[color:var(--neon)]/60"
      />

      {hashes ? (
        <div className="space-y-2">
          {HASH_ALGOS.map((algo) => (
            <div
              key={algo}
              className="rounded-xl border border-border bg-muted/20 p-3"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--neon)]">
                  {algo}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(hashes[algo])}
                  aria-label={t("tools.hashTool.generate.copy")}
                  className="grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:text-foreground"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
              <div
                dir="ltr"
                className="break-all text-start font-mono text-xs text-foreground"
              >
                {hashes[algo]}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          {t("tools.hashTool.generate.empty")}
        </p>
      )}
    </div>
  );
}

function IdentifyTab() {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const result = useMemo(() => identifyHash(value), [value]);

  return (
    <div className="rounded-3xl border border-border bg-card/70 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7">
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        {t("tools.hashTool.identify.label")}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("tools.hashTool.identify.placeholder")}
        dir="ltr"
        className="mb-4 w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-start font-mono text-sm text-foreground outline-none focus:border-[color:var(--neon)]/60"
      />

      {!value ? (
        <p className="text-center text-sm text-muted-foreground">
          {t("tools.hashTool.identify.empty")}
        </p>
      ) : result.guesses.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          {t("tools.hashTool.identify.noMatch")}
        </p>
      ) : (
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.hashTool.identify.resultsTitle")}
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
            {result.guesses.map((guess) => (
              <li
                key={guess.label}
                className="bg-muted/30 px-3.5 py-2.5 text-sm"
              >
                <div className="font-medium text-foreground">{guess.label}</div>
                <div className="text-muted-foreground">{guess.note}</div>
              </li>
            ))}
          </ul>
          {result.guesses.length > 1 ? (
            <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-[color:var(--chart-4)]/10 px-3.5 py-2.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0 text-[color:var(--chart-4)]" />
              {t("tools.hashTool.identify.ambiguousNote")}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function CompareTab() {
  const { t } = useTranslation();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const bothFilled = a.trim().length > 0 && b.trim().length > 0;
  const isMatch = useMemo(() => hashesMatch(a, b), [a, b]);

  return (
    <div className="rounded-3xl border border-border bg-card/70 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7">
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            {t("tools.hashTool.compare.labelA")}
          </label>
          <input
            type="text"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder={t("tools.hashTool.compare.placeholder")}
            dir="ltr"
            className="w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-start font-mono text-sm text-foreground outline-none focus:border-[color:var(--neon)]/60"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            {t("tools.hashTool.compare.labelB")}
          </label>
          <input
            type="text"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder={t("tools.hashTool.compare.placeholder")}
            dir="ltr"
            className="w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-start font-mono text-sm text-foreground outline-none focus:border-[color:var(--neon)]/60"
          />
        </div>
      </div>

      <div className="mt-4">
        {!bothFilled ? (
          <p className="text-center text-sm text-muted-foreground">
            {t("tools.hashTool.compare.empty")}
          </p>
        ) : (
          <div
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium",
              isMatch
                ? "border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 text-[color:var(--neon)]"
                : "border-destructive/40 bg-destructive/10 text-destructive",
            )}
          >
            {isMatch ? <Check className="size-4" /> : <X className="size-4" />}
            {isMatch
              ? t("tools.hashTool.compare.match")
              : t("tools.hashTool.compare.noMatch")}
          </div>
        )}
        <p className="mt-2.5 text-center text-xs text-muted-foreground">
          {t("tools.hashTool.compare.note")}
        </p>
      </div>
    </div>
  );
}
