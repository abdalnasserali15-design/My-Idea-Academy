export type NodeId =
  | "firewall"
  | "webServer"
  | "mailServer"
  | "vpn"
  | "appServer"
  | "fileServer"
  | "adminPanel"
  | "database";

export type Difficulty = "easy" | "medium" | "hard";

interface NetworkNode {
  id: NodeId;

  children: NodeId[];
}

const NETWORK: NetworkNode[] = [
  { id: "firewall", children: ["webServer", "mailServer", "vpn"] },
  { id: "webServer", children: ["appServer"] },
  { id: "mailServer", children: ["fileServer"] },
  { id: "vpn", children: ["adminPanel"] },
  { id: "appServer", children: ["database"] },
  { id: "fileServer", children: ["database"] },
  { id: "adminPanel", children: ["database"] },
  { id: "database", children: [] },
];

export const ALL_NODES: NodeId[] = NETWORK.map((n) => n.id);
export const CROWN_JEWEL: NodeId = "database";
export const MAX_ROUNDS = 6;

const HOPS_TO_DATABASE: Record<NodeId, number> = {
  firewall: 3,
  webServer: 2,
  mailServer: 2,
  vpn: 2,
  appServer: 1,
  fileServer: 1,
  adminPanel: 1,
  database: 0,
};

export interface GameState {
  compromised: NodeId[];
  patched: NodeId[];
  isolatesUsed: number;
  round: number;
  turn: "attacker" | "defender";
}

export function createInitialState(): GameState {
  return {
    compromised: [],
    patched: [],
    isolatesUsed: 0,
    round: 1,
    turn: "attacker",
  };
}

function children(id: NodeId): NodeId[] {
  return NETWORK.find((n) => n.id === id)!.children;
}

export function getAttackerMoves(state: GameState): NodeId[] {
  const reachable = new Set<NodeId>();
  if (state.compromised.length === 0) {
    reachable.add("firewall");
  } else {
    for (const c of state.compromised) {
      for (const child of children(c)) reachable.add(child);
    }
  }
  return [...reachable].filter(
    (id) => !state.compromised.includes(id) && !state.patched.includes(id),
  );
}

export type DefenderMove =
  | { type: "patch"; node: NodeId }
  | { type: "isolate"; node: NodeId }
  | { type: "pass" };

export const MAX_PATCHES = 2;

export const MAX_ISOLATES = 2;

export function getDefenderMoves(state: GameState): DefenderMove[] {
  const moves: DefenderMove[] = [];
  if (state.patched.length < MAX_PATCHES) {
    for (const id of ALL_NODES) {
      if (id === CROWN_JEWEL) continue;
      if (!state.compromised.includes(id) && !state.patched.includes(id)) {
        moves.push({ type: "patch", node: id });
      }
    }
  }
  if (state.isolatesUsed < MAX_ISOLATES) {
    for (const id of state.compromised) {
      moves.push({ type: "isolate", node: id });
    }
  }
  if (moves.length === 0) moves.push({ type: "pass" });
  return moves;
}

export function applyAttackerMove(state: GameState, node: NodeId): GameState {
  return {
    ...state,
    compromised: [...state.compromised, node],
    turn: "defender",
  };
}

export function applyDefenderMove(
  state: GameState,
  move: DefenderMove,
): GameState {
  const next: GameState = {
    ...state,
    turn: "attacker",
    round: state.round + 1,
  };
  if (move.type === "patch") {
    next.patched = [...state.patched, move.node];
  } else if (move.type === "isolate") {
    next.compromised = state.compromised.filter((c) => c !== move.node);
    next.isolatesUsed = state.isolatesUsed + 1;
  }
  return next;
}

export function isTerminal(state: GameState): boolean {
  if (state.compromised.includes(CROWN_JEWEL)) return true;
  if (state.round > MAX_ROUNDS) return true;
  if (state.turn === "attacker" && getAttackerMoves(state).length === 0)
    return true;
  return false;
}

export type Winner = "attacker" | "defender" | null;

export function getWinner(state: GameState): Winner {
  if (state.compromised.includes(CROWN_JEWEL)) return "attacker";
  if (state.round > MAX_ROUNDS) return "defender";
  if (state.turn === "attacker" && getAttackerMoves(state).length === 0)
    return "defender";
  return null;
}

export function evaluate(state: GameState): number {
  if (state.compromised.includes(CROWN_JEWEL)) return 1000;
  if (state.turn === "attacker" && getAttackerMoves(state).length === 0)
    return -1000;
  if (state.round > MAX_ROUNDS) return -500;

  const minHops =
    state.compromised.length > 0
      ? Math.min(...state.compromised.map((id) => HOPS_TO_DATABASE[id]))
      : HOPS_TO_DATABASE.firewall;
  return (
    state.compromised.length * 5 + (HOPS_TO_DATABASE.firewall - minHops) * 15
  );
}

interface SearchOutcome {
  score: number;
  nodesExplored: number;
}

function minimax(
  state: GameState,
  depth: number,
  maximizing: boolean,
): SearchOutcome {
  let nodesExplored = 1;
  if (isTerminal(state) || depth === 0)
    return { score: evaluate(state), nodesExplored };

  if (maximizing) {
    let best = -Infinity;
    for (const move of getAttackerMoves(state)) {
      const result = minimax(applyAttackerMove(state, move), depth - 1, false);
      nodesExplored += result.nodesExplored;
      best = Math.max(best, result.score);
    }
    return { score: best, nodesExplored };
  }
  let best = Infinity;
  for (const move of getDefenderMoves(state)) {
    const result = minimax(applyDefenderMove(state, move), depth - 1, true);
    nodesExplored += result.nodesExplored;
    best = Math.min(best, result.score);
  }
  return { score: best, nodesExplored };
}

function minimaxAlphaBeta(
  state: GameState,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
): SearchOutcome {
  let nodesExplored = 1;
  if (isTerminal(state) || depth === 0)
    return { score: evaluate(state), nodesExplored };

  if (maximizing) {
    let best = -Infinity;
    for (const move of getAttackerMoves(state)) {
      const result = minimaxAlphaBeta(
        applyAttackerMove(state, move),
        depth - 1,
        alpha,
        beta,
        false,
      );
      nodesExplored += result.nodesExplored;
      best = Math.max(best, result.score);
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return { score: best, nodesExplored };
  }
  let best = Infinity;
  for (const move of getDefenderMoves(state)) {
    const result = minimaxAlphaBeta(
      applyDefenderMove(state, move),
      depth - 1,
      alpha,
      beta,
      true,
    );
    nodesExplored += result.nodesExplored;
    best = Math.min(best, result.score);
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return { score: best, nodesExplored };
}

export interface AttackerDecision {
  move: NodeId;
  nodesExplored: number;
}

function chooseAttackerMoveSearch(
  state: GameState,
  depth: number,
  useAlphaBeta: boolean,
): AttackerDecision {
  const moves = getAttackerMoves(state);
  let bestMove = moves[0];
  let bestScore = -Infinity;
  let nodesExplored = 1;

  for (const move of moves) {
    const next = applyAttackerMove(state, move);
    const result = useAlphaBeta
      ? minimaxAlphaBeta(next, depth - 1, -Infinity, Infinity, false)
      : minimax(next, depth - 1, false);
    nodesExplored += result.nodesExplored;
    if (result.score > bestScore) {
      bestScore = result.score;
      bestMove = move;
    }
  }
  return { move: bestMove, nodesExplored };
}

export function chooseAttackerMove(
  state: GameState,
  difficulty: Difficulty,
): AttackerDecision {
  const moves = getAttackerMoves(state);
  if (moves.length === 0)
    throw new Error("chooseAttackerMove called with no legal moves");

  if (difficulty === "easy") {
    return {
      move: moves[Math.floor(Math.random() * moves.length)],
      nodesExplored: 1,
    };
  }
  if (difficulty === "medium") {
    return chooseAttackerMoveSearch(state, 4, false);
  }
  return chooseAttackerMoveSearch(state, 6, true);
}
