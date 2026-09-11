import { describe, expect, it } from "vitest";

import {
  ALL_NODES,
  CROWN_JEWEL,
  MAX_ISOLATES,
  MAX_PATCHES,
  MAX_ROUNDS,
  applyAttackerMove,
  applyDefenderMove,
  chooseAttackerMove,
  createInitialState,
  evaluate,
  getAttackerMoves,
  getDefenderMoves,
  getWinner,
  isTerminal,
  type DefenderMove,
  type GameState,
} from "./network-defense-game";

describe("createInitialState", () => {
  it("starts with no footholds, full budgets, round 1, and the attacker to move", () => {
    const state = createInitialState();
    expect(state.compromised).toEqual([]);
    expect(state.patched).toEqual([]);
    expect(state.isolatesUsed).toBe(0);
    expect(state.round).toBe(1);
    expect(state.turn).toBe("attacker");
  });
});

describe("getAttackerMoves", () => {
  it("only firewall is reachable at the very start", () => {
    expect(getAttackerMoves(createInitialState())).toEqual(["firewall"]);
  });

  it("compromising firewall opens exactly its three children", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "attacker",
    };
    expect([...getAttackerMoves(state)].sort()).toEqual(
      ["mailServer", "vpn", "webServer"].sort(),
    );
  });

  it("never re-offers an already-compromised node", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "attacker",
    };
    const moves = getAttackerMoves(state);
    expect(moves).not.toContain("firewall");
    expect(moves).not.toContain("webServer");
  });

  it("never offers a patched node, even though it would otherwise be reachable", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: ["webServer"],
      isolatesUsed: 0,
      round: 1,
      turn: "attacker",
    };
    expect([...getAttackerMoves(state)].sort()).toEqual(
      ["mailServer", "vpn"].sort(),
    );
  });

  it("pigeonhole: with the full patch budget spent on two different first-hop nodes, the third path is still fully open", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: ["webServer", "mailServer"],
      isolatesUsed: 0,
      round: 1,
      turn: "attacker",
    };
    expect(getAttackerMoves(state)).toEqual(["vpn"]);
  });

  it("reachability is the union of children across every current foothold, not just the most recent one", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer", "mailServer"],
      patched: [],
      isolatesUsed: 0,
      round: 2,
      turn: "attacker",
    };
    expect([...getAttackerMoves(state)].sort()).toEqual(
      ["appServer", "fileServer", "vpn"].sort(),
    );
  });

  it("returns no moves when every reachable frontier node is patched (hand-constructed - exceeds the normal patch budget on purpose, to isolate this branch)", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer", "mailServer", "vpn"],
      patched: ["appServer", "fileServer", "adminPanel"],
      isolatesUsed: 0,
      round: 3,
      turn: "attacker",
    };
    expect(getAttackerMoves(state)).toEqual([]);
  });
});

describe("getDefenderMoves", () => {
  it("at the very start, offers exactly one patch move per node except the crown jewel, and nothing else", () => {
    const moves = getDefenderMoves(createInitialState());
    const patchTargets = moves
      .filter(
        (m): m is Extract<DefenderMove, { type: "patch" }> =>
          m.type === "patch",
      )
      .map((m) => m.node);
    expect(patchTargets.sort()).toEqual(
      ALL_NODES.filter((id) => id !== CROWN_JEWEL).sort(),
    );
    expect(moves.some((m) => m.type === "isolate")).toBe(false);
    expect(moves.some((m) => m.type === "pass")).toBe(false);
  });

  it("stops offering patch moves once the patch budget is spent", () => {
    const patched = ALL_NODES.filter((id) => id !== CROWN_JEWEL).slice(
      0,
      MAX_PATCHES,
    );
    const state: GameState = {
      compromised: [],
      patched,
      isolatesUsed: 0,
      round: 1,
      turn: "defender",
    };
    expect(getDefenderMoves(state).some((m) => m.type === "patch")).toBe(false);
  });

  it("offers an isolate move for every currently-compromised node, and nothing for uncompromised ones", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "defender",
    };
    const isolateTargets = getDefenderMoves(state)
      .filter(
        (m): m is Extract<DefenderMove, { type: "isolate" }> =>
          m.type === "isolate",
      )
      .map((m) => m.node);
    expect(isolateTargets.sort()).toEqual(["firewall", "webServer"].sort());
  });

  it("stops offering isolate moves once the isolate budget is spent", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: MAX_ISOLATES,
      round: 1,
      turn: "defender",
    };
    expect(getDefenderMoves(state).some((m) => m.type === "isolate")).toBe(
      false,
    );
  });

  it("falls back to a single pass move when both budgets are spent - the move list is never empty", () => {
    const patched = ALL_NODES.filter((id) => id !== CROWN_JEWEL).slice(
      0,
      MAX_PATCHES,
    );
    const state: GameState = {
      compromised: [],
      patched,
      isolatesUsed: MAX_ISOLATES,
      round: 3,
      turn: "defender",
    };
    expect(getDefenderMoves(state)).toEqual([{ type: "pass" }]);
  });

  it("never pads a non-empty move list with a pass option", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "defender",
    };
    const moves = getDefenderMoves(state);
    expect(moves.length).toBeGreaterThan(0);
    expect(moves.some((m) => m.type === "pass")).toBe(false);
  });
});

describe("applyAttackerMove", () => {
  it("adds the node to compromised and hands the turn to the defender, without advancing the round", () => {
    const state = createInitialState();
    const next = applyAttackerMove(state, "firewall");
    expect(next.compromised).toEqual(["firewall"]);
    expect(next.turn).toBe("defender");
    expect(next.round).toBe(state.round);
  });

  it("does not mutate the state it was given", () => {
    const state = createInitialState();
    applyAttackerMove(state, "firewall");
    expect(state.compromised).toEqual([]);
    expect(state.turn).toBe("attacker");
  });
});

describe("applyDefenderMove", () => {
  const base: GameState = {
    compromised: ["firewall"],
    patched: [],
    isolatesUsed: 0,
    round: 1,
    turn: "defender",
  };

  it("a patch move adds to patched, advances the round, and hands the turn back to the attacker", () => {
    const next = applyDefenderMove(base, { type: "patch", node: "webServer" });
    expect(next.patched).toEqual(["webServer"]);
    expect(next.compromised).toEqual(["firewall"]);
    expect(next.round).toBe(2);
    expect(next.turn).toBe("attacker");
  });

  it("an isolate move evicts the node from compromised and increments isolatesUsed", () => {
    const next = applyDefenderMove(base, { type: "isolate", node: "firewall" });
    expect(next.compromised).toEqual([]);
    expect(next.isolatesUsed).toBe(1);
    expect(next.round).toBe(2);
    expect(next.turn).toBe("attacker");
  });

  it("a pass move still advances the round and turn, but changes nothing else", () => {
    const next = applyDefenderMove(base, { type: "pass" });
    expect(next.compromised).toEqual(base.compromised);
    expect(next.patched).toEqual(base.patched);
    expect(next.isolatesUsed).toBe(base.isolatesUsed);
    expect(next.round).toBe(2);
    expect(next.turn).toBe("attacker");
  });

  it("does not mutate the state it was given", () => {
    applyDefenderMove(base, { type: "patch", node: "webServer" });
    expect(base.patched).toEqual([]);
    expect(base.turn).toBe("defender");
  });
});

describe("isTerminal / getWinner", () => {
  it("a fresh game is not terminal and has no winner yet", () => {
    expect(isTerminal(createInitialState())).toBe(false);
    expect(getWinner(createInitialState())).toBeNull();
  });

  it("reaching the crown jewel ends the game for the attacker immediately, regardless of whose turn it nominally is", () => {
    const state: GameState = {
      compromised: ["firewall", "appServer", "database"],
      patched: [],
      isolatesUsed: 0,
      round: 2,
      turn: "defender",
    };
    expect(isTerminal(state)).toBe(true);
    expect(getWinner(state)).toBe("attacker");
  });

  it("exceeding MAX_ROUNDS ends the game for the defender", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: 0,
      round: MAX_ROUNDS + 1,
      turn: "attacker",
    };
    expect(isTerminal(state)).toBe(true);
    expect(getWinner(state)).toBe("defender");
  });

  it("an attacker with zero legal moves on their own turn loses, even before MAX_ROUNDS", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer", "mailServer", "vpn"],
      patched: ["appServer", "fileServer", "adminPanel"],
      isolatesUsed: 0,
      round: 3,
      turn: "attacker",
    };
    expect(getAttackerMoves(state)).toEqual([]);
    expect(isTerminal(state)).toBe(true);
    expect(getWinner(state)).toBe("defender");
  });

  it("that same stuck position is NOT terminal when it isn't the attacker's turn - the check is gated on state.turn", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer", "mailServer", "vpn"],
      patched: ["appServer", "fileServer", "adminPanel"],
      isolatesUsed: 0,
      round: 3,
      turn: "defender",
    };
    expect(isTerminal(state)).toBe(false);
    expect(getWinner(state)).toBeNull();
  });
});

describe("evaluate", () => {
  it("scores the fresh starting position as perfectly neutral", () => {
    expect(evaluate(createInitialState())).toBe(0);
  });

  it("scores a captured crown jewel at +1000", () => {
    const state: GameState = {
      compromised: ["firewall", "appServer", "database"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "defender",
    };
    expect(evaluate(state)).toBe(1000);
  });

  it("scores a stuck attacker (on their own turn) at -1000", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer", "mailServer", "vpn"],
      patched: ["appServer", "fileServer", "adminPanel"],
      isolatesUsed: 0,
      round: 3,
      turn: "attacker",
    };
    expect(evaluate(state)).toBe(-1000);
  });

  it("scores a round-limit defender survival at -500", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: 0,
      round: MAX_ROUNDS + 1,
      turn: "attacker",
    };
    expect(evaluate(state)).toBe(-500);
  });

  it("rates deeper attacker progress strictly higher than shallower progress", () => {
    const shallow: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "defender",
    };
    const deeper: GameState = {
      compromised: ["firewall", "webServer"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "defender",
    };
    const deepest: GameState = {
      compromised: ["firewall", "webServer", "appServer"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "defender",
    };
    expect(evaluate(deeper)).toBeGreaterThan(evaluate(shallow));
    expect(evaluate(deepest)).toBeGreaterThan(evaluate(deeper));
  });
});

describe("chooseAttackerMove", () => {
  it("throws for a state with no legal moves", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer", "mailServer", "vpn"],
      patched: ["appServer", "fileServer", "adminPanel"],
      isolatesUsed: 0,
      round: 3,
      turn: "attacker",
    };
    expect(() => chooseAttackerMove(state, "medium")).toThrow();
  });

  it("easy always returns a currently-legal move", () => {
    const state = createInitialState();
    for (let i = 0; i < 20; i++) {
      const decision = chooseAttackerMove(state, "easy");
      expect(getAttackerMoves(state)).toContain(decision.move);
    }
  });

  it("easy is genuinely randomized, not hardcoded to one option", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "attacker",
    };
    const seen = new Set<string>();
    for (let i = 0; i < 40; i++) {
      seen.add(chooseAttackerMove(state, "easy").move);
    }
    expect(seen.size).toBeGreaterThan(1);
  });

  it("medium and hard both take an immediately winning move when one is available", () => {
    const state: GameState = {
      compromised: ["firewall", "webServer", "appServer"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "attacker",
    };
    expect(chooseAttackerMove(state, "medium").move).toBe("database");
    expect(chooseAttackerMove(state, "hard").move).toBe("database");
  });

  it("medium and hard are both deterministic - the same state always yields the same move", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "attacker",
    };
    const medium = chooseAttackerMove(state, "medium").move;
    const hard = chooseAttackerMove(state, "hard").move;
    for (let i = 0; i < 5; i++) {
      expect(chooseAttackerMove(state, "medium").move).toBe(medium);
      expect(chooseAttackerMove(state, "hard").move).toBe(hard);
    }
  });

  it("medium and hard both genuinely search (explore more than a single node) on a state with real branching", () => {
    const state: GameState = {
      compromised: ["firewall"],
      patched: [],
      isolatesUsed: 0,
      round: 1,
      turn: "attacker",
    };
    expect(chooseAttackerMove(state, "medium").nodesExplored).toBeGreaterThan(
      1,
    );
    expect(chooseAttackerMove(state, "hard").nodesExplored).toBeGreaterThan(1);
  });
});

describe("a full legal game", () => {
  function randomChoice<T>(options: T[]): T {
    return options[Math.floor(Math.random() * options.length)];
  }

  it("a concrete play-by-play sequence can lead all the way to an attacker win", () => {
    let state = createInitialState();
    state = applyAttackerMove(state, "firewall");
    state = applyDefenderMove(state, { type: "patch", node: "webServer" });
    state = applyAttackerMove(state, "mailServer");
    state = applyDefenderMove(state, { type: "patch", node: "vpn" });
    state = applyAttackerMove(state, "fileServer");
    state = applyDefenderMove(state, { type: "isolate", node: "firewall" });
    state = applyAttackerMove(state, "database");

    expect(isTerminal(state)).toBe(true);
    expect(getWinner(state)).toBe("attacker");
  });

  it("200 games of fully random-but-legal play always terminate, never offer an empty move list, and always end with exactly one declared winner", () => {
    for (let trial = 0; trial < 200; trial++) {
      let state = createInitialState();
      let steps = 0;
      const SAFETY_CAP = 100;

      while (!isTerminal(state)) {
        steps++;
        expect(steps).toBeLessThan(SAFETY_CAP);

        if (state.turn === "attacker") {
          const moves = getAttackerMoves(state);
          expect(moves.length).toBeGreaterThan(0);
          state = applyAttackerMove(state, randomChoice(moves));
        } else {
          const moves = getDefenderMoves(state);
          expect(moves.length).toBeGreaterThan(0);
          state = applyDefenderMove(state, randomChoice(moves));
        }
      }

      const winner = getWinner(state);
      expect(winner === "attacker" || winner === "defender").toBe(true);
      expect(state.round).toBeLessThanOrEqual(MAX_ROUNDS + 1);
    }
  });
});
