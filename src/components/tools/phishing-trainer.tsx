import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  PHISHING_SCENARIOS,
  PHISHING_RED_FLAGS,
  type PhishingDifficulty,
  type PhishingItem,
} from "@/data/phishing-scenarios";

type ItemVisualState = "normal" | "selected" | "correct" | "missed" | "wrong";
type Mode = "answering" | "checked" | "revealed";

const ACTION_KEYS = ["investigate", "ignore", "report", "normal"] as const;
type ActionKey = (typeof ACTION_KEYS)[number];

const ACTION_CORRECT_FOR: Record<ActionKey, boolean | null> = {
  investigate: null,
  ignore: null,
  report: true,
  normal: false,
};

const BLOCK_STATE_CLASS: Record<ItemVisualState, string> = {
  normal: "border-border bg-transparent",
  selected: "border-[color:var(--violet)]/50 bg-[color:var(--violet)]/10",
  correct: "border-[color:var(--neon)]/50 bg-[color:var(--neon)]/10",
  missed: "border-[color:var(--chart-4)]/50 bg-[color:var(--chart-4)]/10",
  wrong: "border-destructive/50 bg-destructive/10",
};

const SENTENCE_STATE_CLASS: Record<ItemVisualState, string> = {
  normal: "",
  selected: "bg-[color:var(--violet)]/20",
  correct: "bg-[color:var(--neon)]/20",
  missed: "bg-[color:var(--chart-4)]/20",
  wrong: "bg-destructive/20",
};

const DIFFICULTY_CLASS: Record<PhishingDifficulty, string> = {
  easy: "bg-[color:var(--neon)]/10 text-[color:var(--neon)]",
  medium: "bg-[color:var(--chart-4)]/10 text-[color:var(--chart-4)]",
  hard: "bg-destructive/10 text-destructive",
};

function ClickablePart({
  state,
  onClick,
  inline,
  children,
}: {
  state: ItemVisualState;
  onClick: () => void;
  inline?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "cursor-pointer rounded-lg border px-3.5 py-2.5 transition-colors",
        inline ? "inline-block" : "block",
        BLOCK_STATE_CLASS[state],
      )}
    >
      {children}
    </div>
  );
}

export function PhishingTrainer() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [mode, setMode] = useState<Mode>("answering");
  const [actionChoice, setActionChoice] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const scenario = PHISHING_SCENARIOS[currentIndex];
  const isLast = currentIndex === PHISHING_SCENARIOS.length - 1;

  function toggleItem(idx: number) {
    if (mode !== "answering") return;
    setSelected((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  function itemState(idx: number, item: PhishingItem): ItemVisualState {
    const isFlag = !!item.flag;
    const isSel = !!selected[idx];
    if (mode === "answering") return isSel ? "selected" : "normal";
    if (mode === "revealed") return isFlag ? "correct" : "normal";
    if (isFlag && isSel) return "correct";
    if (isFlag && !isSel) return "missed";
    if (!isFlag && isSel) return "wrong";
    return "normal";
  }

  function handleCheck() {
    if (mode !== "answering") return;
    const allCorrect = scenario.items.every(
      (item, idx) => !!item.flag === !!selected[idx],
    );
    if (allCorrect) setScore((s) => s + 1);
    setMode("checked");
  }

  function handleShowAll() {
    if (mode !== "answering") return;
    setMode("revealed");
  }

  function handleActionChoice(idx: number) {
    if (actionChoice !== null) return;
    setActionChoice(idx);
  }

  function handleNext() {
    if (currentIndex + 1 >= PHISHING_SCENARIOS.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelected({});
    setMode("answering");
    setActionChoice(null);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setScore(0);
    setSelected({});
    setMode("answering");
    setActionChoice(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-border bg-card/70 p-6 text-center shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-8">
          <div className="text-3xl font-semibold text-foreground">
            {score} / {PHISHING_SCENARIOS.length}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {t("tools.phishingTrainer.finalScoreCaption")}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.phishingTrainer.redFlagsRecapTitle")}
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
            {PHISHING_RED_FLAGS.map((text, i) => (
              <li
                key={i}
                className="flex items-start gap-2 bg-muted/30 px-3.5 py-2.5 text-sm text-muted-foreground"
              >
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="w-full rounded-xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 px-4 py-2.5 text-sm font-medium text-[color:var(--neon)] transition hover:bg-[color:var(--neon)]/20"
        >
          {t("tools.phishingTrainer.tryAgainButton")}
        </button>
      </div>
    );
  }

  const senderEntry = scenario.items
    .map((item, idx) => ({ item, idx }))
    .find((e) => e.item.type === "sender");
  const subjectEntry = scenario.items
    .map((item, idx) => ({ item, idx }))
    .find((e) => e.item.type === "subject");
  const sentenceEntries = scenario.items
    .map((item, idx) => ({ item, idx }))
    .filter((e) => e.item.type === "sentence");
  const linkEntry = scenario.items
    .map((item, idx) => ({ item, idx }))
    .find((e) => e.item.type === "link");
  const flagItems = scenario.items.filter((it) => it.flag);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {t("tools.phishingTrainer.progressLabel", {
              current: currentIndex + 1,
              total: PHISHING_SCENARIOS.length,
            })}
          </span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              DIFFICULTY_CLASS[scenario.difficulty],
            )}
          >
            {t(`tools.phishingTrainer.difficulty.${scenario.difficulty}`)}
          </span>
        </div>
        <span className="text-sm font-medium text-foreground">
          {t("tools.phishingTrainer.scoreLabel", {
            score,
            total: currentIndex + (mode === "answering" ? 0 : 1),
          })}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        {t("tools.phishingTrainer.instructionLabel")}
      </p>

      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3.5 py-2.5">
          {scenario.channel === "message" ? (
            <MessageSquare className="size-4 text-muted-foreground" />
          ) : (
            <Mail className="size-4 text-muted-foreground" />
          )}
          <span className="text-xs text-muted-foreground">
            {scenario.channel === "message"
              ? t("tools.phishingTrainer.smsChannel")
              : t("tools.phishingTrainer.emailChannel")}
          </span>
        </div>

        <div className="space-y-2.5 p-4">
          {senderEntry ? (
            <ClickablePart
              state={itemState(senderEntry.idx, senderEntry.item)}
              onClick={() => toggleItem(senderEntry.idx)}
            >
              <div className="text-sm font-medium text-foreground">
                {senderEntry.item.name}
              </div>
              <div className="break-all font-mono text-xs text-muted-foreground">
                {senderEntry.item.address}
              </div>
            </ClickablePart>
          ) : null}

          {subjectEntry ? (
            <ClickablePart
              state={itemState(subjectEntry.idx, subjectEntry.item)}
              onClick={() => toggleItem(subjectEntry.idx)}
            >
              <div className="text-sm font-medium text-foreground">
                {subjectEntry.item.text}
              </div>
            </ClickablePart>
          ) : null}

          <p className="text-sm leading-8 text-muted-foreground">
            {sentenceEntries.map(({ item, idx }) => (
              <span
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => toggleItem(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleItem(idx);
                  }
                }}
                className={cn(
                  "cursor-pointer rounded px-0.5 py-px",
                  SENTENCE_STATE_CLASS[itemState(idx, item)],
                )}
              >
                {item.text}{" "}
              </span>
            ))}
          </p>

          {linkEntry ? (
            <ClickablePart
              inline
              state={itemState(linkEntry.idx, linkEntry.item)}
              onClick={() => toggleItem(linkEntry.idx)}
            >
              <span className="text-sm text-[color:var(--neon)] underline">
                {linkEntry.item.text}
              </span>
            </ClickablePart>
          ) : null}
        </div>
      </div>

      {mode === "answering" ? (
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleCheck}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {t("tools.phishingTrainer.checkButton")}
          </button>
          <button
            type="button"
            onClick={handleShowAll}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {t("tools.phishingTrainer.showAllButton")}
          </button>
        </div>
      ) : null}

      {mode !== "answering" ? (
        <div>
          <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.phishingTrainer.whatGaveItAway")}
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
            {scenario.isPhishing ? (
              flagItems.map((it, i) => (
                <li key={i} className="bg-muted/30 px-3.5 py-2.5 text-sm">
                  <div className="font-medium text-foreground">
                    {it.flag!.label}
                  </div>
                  <div className="text-muted-foreground">
                    {it.flag!.explanation}
                  </div>
                </li>
              ))
            ) : (
              <li className="bg-muted/30 px-3.5 py-2.5 text-sm text-muted-foreground">
                {scenario.safeExplanation}
              </li>
            )}
          </ul>
          {scenario.isPhishing ? (
            <div className="mt-2.5 flex flex-wrap gap-2">
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                {t("tools.phishingTrainer.attackTypeLabel")}:{" "}
                {scenario.attackType}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                {t("tools.phishingTrainer.techniqueLabel")}:{" "}
                {scenario.psychPrinciple}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}

      {mode !== "answering" ? (
        <div>
          <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("tools.phishingTrainer.whatWouldYouDo")}
          </div>
          <div className="flex flex-col gap-2">
            {ACTION_KEYS.map((key, idx) => {
              const isCorrectOption =
                ACTION_CORRECT_FOR[key] === scenario.isPhishing;
              const isChosen = actionChoice === idx;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleActionChoice(idx)}
                  disabled={actionChoice !== null}
                  className={cn(
                    "rounded-lg border px-3.5 py-2.5 text-start text-sm transition-colors",
                    actionChoice === null &&
                      "border-border text-foreground hover:bg-muted",
                    actionChoice !== null &&
                      isCorrectOption &&
                      "border-[color:var(--neon)]/50 bg-[color:var(--neon)]/10 text-foreground",
                    actionChoice !== null &&
                      !isCorrectOption &&
                      isChosen &&
                      "border-destructive/50 bg-destructive/10 text-foreground",
                    actionChoice !== null &&
                      !isCorrectOption &&
                      !isChosen &&
                      "border-border text-muted-foreground",
                  )}
                >
                  {t(`tools.phishingTrainer.actionOptions.${key}`)}
                </button>
              );
            })}
          </div>
          {actionChoice !== null ? (
            <div className="mt-2.5 rounded-lg bg-[color:var(--neon)]/10 px-3.5 py-2.5 text-sm text-foreground">
              {scenario.isPhishing
                ? t("tools.phishingTrainer.actionFeedbackPhishing")
                : t("tools.phishingTrainer.actionFeedbackLegit")}
            </div>
          ) : null}
        </div>
      ) : null}

      {actionChoice !== null ? (
        <button
          type="button"
          onClick={handleNext}
          className="w-full rounded-xl border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 px-4 py-2.5 text-sm font-medium text-[color:var(--neon)] transition hover:bg-[color:var(--neon)]/20"
        >
          {isLast
            ? t("tools.phishingTrainer.finishButton")
            : t("tools.phishingTrainer.nextButton")}
        </button>
      ) : null}
    </div>
  );
}
