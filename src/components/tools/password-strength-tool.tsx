import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Check,
  X,
  Clock,
  Binary,
  ShieldCheck,
  ShieldAlert,
  Wand2,
  RefreshCw,
  Copy,
  Search,
  Info,
  LockOpen,
  AlertCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  analyzePassword,
  buildTipKeys,
  passwordSimilarity,
  type PasswordAnalysis,
  type StrengthLevel,
} from "@/lib/password-security";
import {
  generateCharPassword,
  generatePassphrase,
} from "@/lib/password-generator";
import { checkPasswordBreach } from "@/lib/hibp";

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

const CRITERIA: { key: string; test: (a: PasswordAnalysis) => boolean }[] = [
  { key: "length", test: (a) => a.length >= 8 },
  { key: "lower", test: (a) => a.hasLower },
  { key: "upper", test: (a) => a.hasUpper },
  { key: "number", test: (a) => a.hasNumber },
  { key: "symbol", test: (a) => a.hasSymbol },
  { key: "noPattern", test: (a) => !a.hasPattern && a.length > 0 },
  { key: "name", test: (a) => !a.hasName && a.length > 0 },
];

function Criterion({ met, label }: { met: boolean; label: string }) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition sm:text-sm",
        met
          ? "border-[color:var(--neon)]/30 bg-[color:var(--neon)]/5 text-foreground"
          : "border-border text-muted-foreground",
      )}
    >
      {met ? (
        <Check className="size-4 shrink-0 text-[color:var(--neon)]" />
      ) : (
        <X className="size-4 shrink-0 text-muted-foreground/60" />
      )}
      {label}
    </li>
  );
}

type GeneratorMode = "chars" | "passphrase";
type BreachState = "idle" | "checking" | "found" | "notfound" | "error";

export function PasswordStrengthTool() {
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [genError, setGenError] = useState<string | null>(null);

  const [mode, setMode] = useState<GeneratorMode>("chars");
  const [genLength, setGenLength] = useState(20);
  const [genUpper, setGenUpper] = useState(true);
  const [genLower, setGenLower] = useState(true);
  const [genNumber, setGenNumber] = useState(true);
  const [genSymbol, setGenSymbol] = useState(true);
  const [genAvoidAmbiguous, setGenAvoidAmbiguous] = useState(false);

  const [passWordCount, setPassWordCount] = useState(5);
  const [sepDash, setSepDash] = useState(true);
  const [sepUnderscore, setSepUnderscore] = useState(false);
  const [sepDot, setSepDot] = useState(false);
  const [sepSpace, setSepSpace] = useState(false);
  const [passCapitalize, setPassCapitalize] = useState(true);
  const [passAddNumber, setPassAddNumber] = useState(true);

  const [showCompare, setShowCompare] = useState(false);
  const [oldPassword, setOldPassword] = useState("");

  const [breachState, setBreachState] = useState<BreachState>("idle");
  const [breachTimes, setBreachTimes] = useState(0);

  useEffect(() => {
    setBreachState("idle");
  }, [password]);

  const analysis = useMemo(() => analyzePassword(password), [password]);
  const tipKeys = useMemo(() => buildTipKeys(analysis), [analysis]);
  const isEmpty = password.length === 0;
  const meta = LEVEL_META[analysis.level];

  const similarity = useMemo(
    () =>
      password && oldPassword
        ? passwordSimilarity(password, oldPassword)
        : null,
    [password, oldPassword],
  );
  const tooSimilar = similarity !== null && similarity >= 0.6;

  function applyGenerated(value: string) {
    setGeneratedOutput(value);
    setPassword(value);
    setVisible(true);
  }

  function handleGenerate() {
    if (mode === "chars") {
      const result = generateCharPassword({
        length: genLength,
        upper: genUpper,
        lower: genLower,
        number: genNumber,
        symbol: genSymbol,
        avoidAmbiguous: genAvoidAmbiguous,
      });
      if (!result) {
        setGenError(t("tools.passwordStrength.generator.selectAtLeastOneChar"));
        return;
      }
      setGenError(null);
      applyGenerated(result);
    } else {
      const separators = [
        sepDash && "-",
        sepUnderscore && "_",
        sepDot && ".",
        sepSpace && " ",
      ].filter((s): s is string => Boolean(s));
      const result = generatePassphrase({
        wordCount: passWordCount,
        separators,
        capitalize: passCapitalize,
        addNumber: passAddNumber,
      });
      if (!result) {
        setGenError(
          t("tools.passwordStrength.generator.selectAtLeastOneSeparator"),
        );
        return;
      }
      setGenError(null);
      applyGenerated(result);
    }
  }

  async function handleCopy() {
    if (!generatedOutput) return;
    try {
      await navigator.clipboard.writeText(generatedOutput);
      toast.success(t("tools.passwordStrength.generator.copied"));
    } catch {
      toast.error(t("tools.passwordStrength.generator.copyFailed"));
    }
  }

  async function handleBreachCheck() {
    if (isEmpty) return;
    setBreachState("checking");
    try {
      const result = await checkPasswordBreach(password);
      setBreachTimes(result.count);
      setBreachState(result.pwned ? "found" : "notfound");
    } catch {
      setBreachState("error");
    }
  }

  return (
    <div className="space-y-6">
      {}
      <div className="rounded-3xl border border-border bg-card/70 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <Wand2 className="size-4 text-[color:var(--neon)]" />
          {t("tools.passwordStrength.generator.title")}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-1.5 rounded-xl border border-border bg-muted/30 p-1">
          <button
            type="button"
            onClick={() => setMode("chars")}
            className={cn(
              "rounded-lg py-2 text-sm font-medium transition",
              mode === "chars"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t("tools.passwordStrength.generator.modeChars")}
          </button>
          <button
            type="button"
            onClick={() => setMode("passphrase")}
            className={cn(
              "rounded-lg py-2 text-sm font-medium transition",
              mode === "passphrase"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t("tools.passwordStrength.generator.modePassphrase")}
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            readOnly
            value={generatedOutput}
            placeholder={t("tools.passwordStrength.generator.placeholder")}
            className="h-11 flex-1 rounded-xl border border-input bg-transparent px-3 font-mono text-sm text-foreground outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            disabled={!generatedOutput}
            aria-label={t("tools.passwordStrength.generator.copy")}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-input text-muted-foreground transition hover:text-foreground disabled:opacity-40"
          >
            <Copy className="size-4" />
          </button>
        </div>

        {mode === "chars" ? (
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  {t("tools.passwordStrength.generator.lengthLabel")}
                </Label>
                <span className="font-mono text-sm font-semibold text-foreground">
                  {genLength}
                </span>
              </div>
              <Slider
                min={8}
                max={64}
                step={1}
                value={[genLength]}
                onValueChange={([v]) => setGenLength(v)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox
                  checked={genUpper}
                  onCheckedChange={(v) => setGenUpper(v === true)}
                />
                {t("tools.passwordStrength.generator.uppercase")}
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox
                  checked={genLower}
                  onCheckedChange={(v) => setGenLower(v === true)}
                />
                {t("tools.passwordStrength.generator.lowercase")}
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox
                  checked={genNumber}
                  onCheckedChange={(v) => setGenNumber(v === true)}
                />
                {t("tools.passwordStrength.generator.numbers")}
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox
                  checked={genSymbol}
                  onCheckedChange={(v) => setGenSymbol(v === true)}
                />
                {t("tools.passwordStrength.generator.symbols")}
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={genAvoidAmbiguous}
                onCheckedChange={(v) => setGenAvoidAmbiguous(v === true)}
              />
              {t("tools.passwordStrength.generator.avoidAmbiguous")}
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  {t("tools.passwordStrength.generator.wordCountLabel")}
                </Label>
                <span className="font-mono text-sm font-semibold text-foreground">
                  {passWordCount}
                </span>
              </div>
              <Slider
                min={3}
                max={8}
                step={1}
                value={[passWordCount]}
                onValueChange={([v]) => setPassWordCount(v)}
              />
            </div>
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                {t("tools.passwordStrength.generator.separatorLabel")}
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox
                    checked={sepDash}
                    onCheckedChange={(v) => setSepDash(v === true)}
                  />
                  {t("tools.passwordStrength.generator.separatorDash")}
                </label>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox
                    checked={sepUnderscore}
                    onCheckedChange={(v) => setSepUnderscore(v === true)}
                  />
                  {t("tools.passwordStrength.generator.separatorUnderscore")}
                </label>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox
                    checked={sepDot}
                    onCheckedChange={(v) => setSepDot(v === true)}
                  />
                  {t("tools.passwordStrength.generator.separatorDot")}
                </label>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox
                    checked={sepSpace}
                    onCheckedChange={(v) => setSepSpace(v === true)}
                  />
                  {t("tools.passwordStrength.generator.separatorSpace")}
                </label>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={passCapitalize}
                onCheckedChange={(v) => setPassCapitalize(v === true)}
              />
              {t("tools.passwordStrength.generator.capitalizeWords")}
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={passAddNumber}
                onCheckedChange={(v) => setPassAddNumber(v === true)}
              />
              {t("tools.passwordStrength.generator.addNumber")}
            </label>
          </div>
        )}

        <Button
          type="button"
          onClick={handleGenerate}
          className="mt-5 w-full gap-2"
        >
          <RefreshCw className="size-4" />
          {t("tools.passwordStrength.generator.generate")}
        </Button>
        {genError ? (
          <p className="mt-2 text-xs text-destructive">{genError}</p>
        ) : null}
      </div>

      {}
      <div className="rounded-3xl border border-border bg-card/70 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7">
        <label
          htmlFor="password-strength-input"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {t("tools.passwordStrength.label")}
        </label>
        <div className="relative mb-4">
          <input
            id="password-strength-input"
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("tools.passwordStrength.placeholder")}
            autoComplete="new-password"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="h-12 w-full rounded-xl border border-input bg-transparent px-4 pe-12 font-mono text-base text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={
              visible
                ? t("tools.passwordStrength.hide")
                : t("tools.passwordStrength.show")
            }
            className="absolute inset-y-0 end-2 grid w-8 place-items-center text-muted-foreground transition hover:text-foreground"
          >
            {visible ? (
              <EyeOff className="size-4.5" />
            ) : (
              <Eye className="size-4.5" />
            )}
          </button>
        </div>

        <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-[color:var(--chart-4)]/30 bg-[color:var(--chart-4)]/10 px-3 py-2.5 text-sm text-foreground">
          <span aria-hidden="true">⚠️</span>
          {t("tools.passwordStrength.namesWarning")}
        </div>

        <button
          type="button"
          onClick={() => setShowCompare((v) => !v)}
          className="mb-4 text-sm text-[color:var(--neon)] hover:underline"
        >
          {showCompare
            ? t("tools.passwordStrength.compareHide")
            : t("tools.passwordStrength.compareShow")}
        </button>

        {showCompare ? (
          <div className="mb-5">
            <label
              htmlFor="old-password-input"
              className="mb-2 block text-sm text-muted-foreground"
            >
              {t("tools.passwordStrength.comparePreviousLabel")}
            </label>
            <input
              id="old-password-input"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder={t(
                "tools.passwordStrength.comparePreviousPlaceholder",
              )}
              autoComplete="off"
              spellCheck={false}
              className="h-11 w-full rounded-xl border border-input bg-transparent px-3 font-mono text-sm text-foreground outline-none"
            />
            {similarity !== null ? (
              <div
                className={cn(
                  "mt-2.5 rounded-xl border px-3 py-2.5 text-sm",
                  tooSimilar
                    ? "border-destructive/40 bg-destructive/10 text-destructive"
                    : "border-[color:var(--neon)]/30 bg-[color:var(--neon)]/10 text-foreground",
                )}
              >
                {tooSimilar
                  ? t("tools.passwordStrength.compareTooSimilar")
                  : t("tools.passwordStrength.compareDifferent")}
              </div>
            ) : null}
          </div>
        ) : null}

        {}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.passwordStrength.strengthLabel")}
          </span>
          <span
            className={cn(
              "text-sm font-semibold",
              isEmpty ? "text-muted-foreground" : meta.textClass,
            )}
          >
            {isEmpty
              ? t("tools.passwordStrength.strength.empty")
              : t(`tools.passwordStrength.strength.${meta.key}`)}
          </span>
        </div>
        <div
          className="mb-4 flex gap-1.5"
          role="img"
          aria-label={t(`tools.passwordStrength.strength.${meta.key}`)}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
            >
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  !isEmpty && i < meta.segments
                    ? meta.barClass
                    : "bg-transparent",
                )}
              />
            </div>
          ))}
        </div>

        <AnimatePresence>
          {analysis.level === 4 && !isEmpty ? (
            <motion.div
              key="vault"
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="mb-4 flex items-center gap-2.5 rounded-xl bg-[color:var(--neon)]/10 px-3 py-2.5 text-sm font-medium text-[color:var(--neon)]"
            >
              <LockOpen className="size-5" />
              {t("tools.passwordStrength.vaultUnlocked")}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {}
        <ul className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CRITERIA.map((c) => (
            <Criterion
              key={c.key}
              met={c.test(analysis)}
              label={t(`tools.passwordStrength.criteria.${c.key}`)}
            />
          ))}
        </ul>

        {}
        <div className="mb-5">
          <Button
            type="button"
            variant="outline"
            onClick={handleBreachCheck}
            disabled={isEmpty || breachState === "checking"}
            className="w-full gap-2"
          >
            <Search className="size-4" />
            {breachState === "checking"
              ? t("tools.passwordStrength.breach.checking")
              : t("tools.passwordStrength.breach.title")}
          </Button>

          {breachState === "found" ? (
            <div className="mt-2.5 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              <ShieldAlert className="mt-0.5 size-4 shrink-0" />
              {t("tools.passwordStrength.breach.foundResult", {
                times: breachTimes.toLocaleString(),
              })}
            </div>
          ) : null}
          {breachState === "notfound" ? (
            <div className="mt-2.5 flex items-start gap-2 rounded-xl border border-[color:var(--neon)]/30 bg-[color:var(--neon)]/10 px-3 py-2.5 text-sm text-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[color:var(--neon)]" />
              {t("tools.passwordStrength.breach.notFoundResult")}
            </div>
          ) : null}
          {breachState === "error" ? (
            <div className="mt-2.5 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              {t("tools.passwordStrength.breach.errorResult")}
            </div>
          ) : null}

          <div className="mt-2.5 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            {t("tools.passwordStrength.breach.note")}
          </div>
        </div>

        {}
        {!isEmpty ? (
          <div className="mb-5 space-y-3">
            <div className="rounded-xl border border-border bg-muted/40 px-3 py-2.5">
              <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Binary className="size-3.5" />
                {t("tools.passwordStrength.entropyLabel")}
              </div>
              <div className="font-mono text-sm font-semibold text-foreground">
                {analysis.entropyBits} bits
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 px-3 py-2.5">
              <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {t("tools.passwordStrength.crackByAttackTypeLabel")}
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {t("tools.passwordStrength.crackScenario.online")}
                  </span>
                  <span className="font-medium text-foreground">
                    {t(
                      `tools.passwordStrength.crackTime.${analysis.crackOnline}`,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-1.5">
                  <span className="text-muted-foreground">
                    {t("tools.passwordStrength.crackScenario.offlineFast")}
                  </span>
                  <span className="font-medium text-foreground">
                    {t(
                      `tools.passwordStrength.crackTime.${analysis.crackOfflineFast}`,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-1.5">
                  <span className="text-muted-foreground">
                    {t("tools.passwordStrength.crackScenario.offlineSlow")}
                  </span>
                  <span className="font-medium text-foreground">
                    {t(
                      `tools.passwordStrength.crackTime.${analysis.crackOfflineSlow}`,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {}
        {tipKeys.length > 0 ? (
          <div>
            <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {t("tools.passwordStrength.tipsTitle")}
            </div>
            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
              {tipKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-2 bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />
                  {t(`tools.passwordStrength.tips.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="flex items-start gap-2.5 rounded-2xl border border-[color:var(--neon)]/20 bg-[color:var(--neon)]/5 px-4 py-3 text-xs text-muted-foreground sm:text-sm">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[color:var(--neon)]" />
        {t("tools.passwordStrength.privacyNote")}
      </div>
    </div>
  );
}
