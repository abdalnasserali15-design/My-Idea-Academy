import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  ShieldOff,
  Skull,
  Wrench,
  RotateCcw,
  Database,
  Trophy,
  Timer,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ALL_NODES,
  CROWN_JEWEL,
  MAX_ISOLATES,
  MAX_PATCHES,
  MAX_ROUNDS,
  createInitialState,
  applyAttackerMove,
  applyDefenderMove,
  chooseAttackerMove,
  getDefenderMoves,
  getWinner,
  isTerminal,
  type DefenderMove,
  type Difficulty,
  type GameState,
  type NodeId,
} from "@/lib/network-defense-game";

const NODE_POSITION: Record<NodeId, { col: number; row: number }> = {
  firewall: { col: 1, row: 0 },
  webServer: { col: 0, row: 1 },
  mailServer: { col: 1, row: 1 },
  vpn: { col: 2, row: 1 },
  appServer: { col: 0, row: 2 },
  fileServer: { col: 1, row: 2 },
  adminPanel: { col: 2, row: 2 },
  database: { col: 1, row: 3 },
};

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export function NetworkDefenseTool() {
  const { t } = useTranslation();
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [started, setStarted] = useState(false);
  const [state, setState] = useState<GameState>(createInitialState());
  const [lastAttack, setLastAttack] = useState<NodeId | null>(null);
  const [thinking, setThinking] = useState(false);
  const [nodesExplored, setNodesExplored] = useState<number | null>(null);

  const winner = getWinner(state);
  const gameOver = winner !== null;

  const runAttackerTurn = useCallback(
    (current: GameState) => {
      setThinking(true);
      setLastAttack(null);
      window.setTimeout(() => {
        const decision = chooseAttackerMove(current, difficulty);
        const next = applyAttackerMove(current, decision.move);
        setState(next);
        setLastAttack(decision.move);
        setNodesExplored(decision.nodesExplored);
        setThinking(false);
      }, 550);
    },
    [difficulty],
  );

  const startGame = () => {
    setStarted(true);
    setLastAttack(null);
    setNodesExplored(null);
    const fresh = createInitialState();
    setState(fresh);
    runAttackerTurn(fresh);
  };

  const restart = () => {
    setStarted(false);
    setState(createInitialState());
    setLastAttack(null);
    setNodesExplored(null);
  };

  const handleDefenderMove = (move: DefenderMove) => {
    if (gameOver || thinking) return;
    const next = applyDefenderMove(state, move);
    setState(next);
    if (!isTerminal(next)) runAttackerTurn(next);
  };

  const defenderMoves = getDefenderMoves(state);
  const patchMoves = defenderMoves.filter(
    (m): m is Extract<DefenderMove, { type: "patch" }> => m.type === "patch",
  );
  const isolateMoves = defenderMoves.filter(
    (m): m is Extract<DefenderMove, { type: "isolate" }> =>
      m.type === "isolate",
  );
  const onlyPassAvailable =
    defenderMoves.length === 1 && defenderMoves[0].type === "pass";

  const nodeStatus = (id: NodeId): "compromised" | "patched" | "safe" => {
    if (state.compromised.includes(id)) return "compromised";
    if (state.patched.includes(id)) return "patched";
    return "safe";
  };

  return (
    <div className="space-y-5">
      {!started ? (
        <div className="rounded-2xl border border-border bg-card/70 p-6 text-center">
          <Skull className="mx-auto size-8 text-[color:var(--neon)]" />
          <h3 className="mt-3 text-lg font-semibold text-foreground">
            {t("tools.networkDefense.introTitle")}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {t("tools.networkDefense.introBody")}
          </p>
          <div className="mt-5 flex justify-center gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-medium transition",
                  difficulty === d
                    ? "border-[color:var(--neon)] bg-[color:var(--neon)]/10 text-[color:var(--neon)]"
                    : "border-border bg-background/60 text-foreground/80 hover:bg-muted",
                )}
              >
                {t(`tools.networkDefense.difficulty.${d}`)}
              </button>
            ))}
          </div>
          <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground">
            {t(`tools.networkDefense.difficultyHint.${difficulty}`)}
          </p>
          <Button onClick={startGame} className="mt-5">
            {t("tools.networkDefense.startButton")}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/70 p-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Timer className="size-4" />
                {t("tools.networkDefense.round", {
                  round: Math.min(state.round, MAX_ROUNDS),
                  max: MAX_ROUNDS,
                })}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Wrench className="size-4" />
                {t("tools.networkDefense.patchesLeft", {
                  count: MAX_PATCHES - state.patched.length,
                })}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <ShieldOff className="size-4" />
                {t("tools.networkDefense.isolatesLeft", {
                  count: MAX_ISOLATES - state.isolatesUsed,
                })}
              </span>
            </div>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                difficulty === "easy" &&
                  "border-[color:var(--neon)]/40 text-[color:var(--neon)]",
                difficulty === "medium" &&
                  "border-[color:var(--violet)]/40 text-[color:var(--violet)]",
                difficulty === "hard" &&
                  "border-destructive/40 text-destructive",
              )}
            >
              {t(`tools.networkDefense.difficulty.${difficulty}`)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-border bg-card/70 p-5">
            {ALL_NODES.map((id) => {
              const pos = NODE_POSITION[id];
              const status = nodeStatus(id);
              const isCrownJewel = id === CROWN_JEWEL;
              return (
                <div
                  key={id}
                  style={{
                    gridColumnStart: pos.col + 1,
                    gridRowStart: pos.row + 1,
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition",
                    status === "compromised" &&
                      "border-destructive bg-destructive/10",
                    status === "patched" &&
                      "border-[color:var(--neon)]/50 bg-[color:var(--neon)]/10",
                    status === "safe" &&
                      !isCrownJewel &&
                      "border-border bg-background/50",
                    status === "safe" &&
                      isCrownJewel &&
                      "border-[color:var(--violet)]/50 bg-[color:var(--violet)]/10",
                    id === lastAttack && "ring-2 ring-destructive",
                  )}
                >
                  {isCrownJewel ? (
                    <Database
                      className={cn(
                        "size-5",
                        status === "compromised"
                          ? "text-destructive"
                          : "text-[color:var(--violet)]",
                      )}
                    />
                  ) : status === "compromised" ? (
                    <Skull className="size-5 text-destructive" />
                  ) : status === "patched" ? (
                    <ShieldCheck className="size-5 text-[color:var(--neon)]" />
                  ) : (
                    <div className="size-5 rounded-full border border-border" />
                  )}
                  <span className="text-[11px] font-medium text-foreground">
                    {t(`tools.networkDefense.nodes.${id}`)}
                  </span>
                </div>
              );
            })}
          </div>

          {gameOver ? (
            <div className="rounded-2xl border border-border bg-card/70 p-6 text-center">
              {winner === "defender" ? (
                <Trophy className="mx-auto size-8 text-[color:var(--neon)]" />
              ) : (
                <Skull className="mx-auto size-8 text-destructive" />
              )}
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {winner === "defender"
                  ? t("tools.networkDefense.defenderWon")
                  : t("tools.networkDefense.attackerWon")}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {winner === "defender"
                  ? t("tools.networkDefense.defenderWonBody")
                  : t("tools.networkDefense.attackerWonBody")}
              </p>
              <Button onClick={restart} className="mt-4">
                <RotateCcw className="size-4" />
                {t("tools.networkDefense.playAgain")}
              </Button>
            </div>
          ) : thinking ? (
            <div className="rounded-2xl border border-border bg-card/70 p-5 text-center text-sm text-muted-foreground">
              {t("tools.networkDefense.attackerThinking")}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card/70 p-5">
              <h4 className="text-sm font-semibold text-foreground">
                {t("tools.networkDefense.yourTurn")}
              </h4>
              {onlyPassAvailable ? (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    {t("tools.networkDefense.noDefensesLeft")}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3"
                    onClick={() => handleDefenderMove({ type: "pass" })}
                  >
                    {t("tools.networkDefense.passButton")}
                  </Button>
                </div>
              ) : (
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      {t("tools.networkDefense.patchAction")}
                    </p>
                    {patchMoves.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        {t("tools.networkDefense.noPatchesLeft")}
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {patchMoves.map((m) => (
                          <Button
                            key={m.node}
                            size="sm"
                            variant="outline"
                            onClick={() => handleDefenderMove(m)}
                          >
                            {t(`tools.networkDefense.nodes.${m.node}`)}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      {t("tools.networkDefense.isolateAction")}
                    </p>
                    {isolateMoves.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        {t("tools.networkDefense.noIsolatesLeft")}
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {isolateMoves.map((m) => (
                          <Button
                            key={m.node}
                            size="sm"
                            variant="outline"
                            onClick={() => handleDefenderMove(m)}
                          >
                            {t(`tools.networkDefense.nodes.${m.node}`)}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {nodesExplored !== null ? (
            <p className="text-center text-xs text-muted-foreground">
              {t("tools.networkDefense.nodesExplored", {
                count: nodesExplored,
              })}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
