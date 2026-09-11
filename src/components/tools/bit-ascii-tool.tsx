import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { textToBinary, binaryToText } from "@/lib/bit-ascii";

type Tab = "textToBinary" | "binaryToText";
const TABS: Tab[] = ["textToBinary", "binaryToText"];

export function BitAsciiTool() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("textToBinary");

  async function handleCopy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(t("tools.bitAscii.copied"));
    } catch {
      toast.error(t("tools.bitAscii.copyFailed"));
    }
  }

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
            {t(`tools.bitAscii.tabs.${key}`)}
          </button>
        ))}
      </div>

      {tab === "textToBinary" ? (
        <TextToBinaryTab onCopy={handleCopy} />
      ) : (
        <BinaryToTextTab onCopy={handleCopy} />
      )}
    </div>
  );
}

function TextToBinaryTab({ onCopy }: { onCopy: (value: string) => void }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const binary = useMemo(() => textToBinary(text), [text]);
  const byteCount = text === "" ? 0 : binary.split(" ").length;

  return (
    <div className="rounded-3xl border border-border bg-card/70 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7">
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        {t("tools.bitAscii.textLabel")}
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("tools.bitAscii.textPlaceholder")}
        rows={3}
        className="mb-4 w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2.5 text-start text-sm text-foreground outline-none focus:border-[color:var(--neon)]/60"
      />

      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {t("tools.bitAscii.binaryOutputLabel")}
        </span>
        {text !== "" ? (
          <button
            type="button"
            onClick={() => onCopy(binary)}
            aria-label={t("tools.bitAscii.copy")}
            className="grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:text-foreground"
          >
            <Copy className="size-3.5" />
          </button>
        ) : null}
      </div>
      <div
        dir="ltr"
        className="min-h-[3.5rem] break-all rounded-xl border border-border bg-muted/20 p-3 text-start font-mono text-sm text-foreground"
      >
        {text !== "" ? (
          binary
        ) : (
          <span className="text-muted-foreground">
            {t("tools.bitAscii.binaryEmptyState")}
          </span>
        )}
      </div>
      {text !== "" ? (
        <p className="mt-2 text-xs text-muted-foreground">
          {t("tools.bitAscii.byteCount", { count: byteCount })}
        </p>
      ) : null}
    </div>
  );
}

function BinaryToTextTab({ onCopy }: { onCopy: (value: string) => void }) {
  const { t } = useTranslation();
  const [binary, setBinary] = useState("");
  const result = useMemo(() => binaryToText(binary), [binary]);

  return (
    <div className="rounded-3xl border border-border bg-card/70 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-7">
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        {t("tools.bitAscii.binaryLabel")}
      </label>
      <textarea
        value={binary}
        onChange={(e) => setBinary(e.target.value)}
        placeholder={t("tools.bitAscii.binaryPlaceholder")}
        rows={3}
        dir="ltr"
        className="mb-4 w-full resize-none rounded-xl border border-input bg-transparent px-3 py-2.5 text-start font-mono text-sm text-foreground outline-none focus:border-[color:var(--neon)]/60"
      />

      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {t("tools.bitAscii.textOutputLabel")}
        </span>
        {result.ok ? (
          <button
            type="button"
            onClick={() => onCopy(result.text)}
            aria-label={t("tools.bitAscii.copy")}
            className="grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:text-foreground"
          >
            <Copy className="size-3.5" />
          </button>
        ) : null}
      </div>
      <div
        className={cn(
          "min-h-[3.5rem] break-words rounded-xl border p-3 text-start text-sm",
          result.ok === false && result.reason !== "empty"
            ? "border-destructive/40 bg-destructive/5 text-destructive"
            : "border-border bg-muted/20 text-foreground",
        )}
      >
        {result.ok ? (
          result.text
        ) : result.reason === "empty" ? (
          <span className="text-muted-foreground">
            {t("tools.bitAscii.textEmptyState")}
          </span>
        ) : (
          t(`tools.bitAscii.errors.${result.reason}`)
        )}
      </div>
      {result.ok ? (
        <p className="mt-2 text-xs text-muted-foreground">
          {t("tools.bitAscii.byteCount", { count: result.byteCount })}
        </p>
      ) : null}
    </div>
  );
}
