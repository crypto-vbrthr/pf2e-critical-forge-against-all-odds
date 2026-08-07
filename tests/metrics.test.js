import test from "node:test";
import assert from "node:assert/strict";
import {
  enrichContextReport,
  evaluateAgainstAllOdds,
  evaluateDangerScore,
  evaluateOpponentThreat,
  resolveRollKind
} from "../scripts/context/metrics.js";
import { coreReport, snapshot } from "./fixtures.js";

const settings = {
  bloodiedThreshold: 0.5,
  surroundedThreshold: 2,
  giantSlayerThreshold: 3,
  narrowEscapeThreshold: 3
};

test("the four theme metrics are evaluated from one immutable snapshot", () => {
  const metrics = evaluateAgainstAllOdds(snapshot(), settings);
  assert.equal(metrics.rollKind, "reflex");
  assert.equal(metrics.bloodied.matched, true);
  assert.equal(metrics.surrounded.matched, true);
  assert.equal(metrics.giantSlayer.matched, true);
  assert.equal(metrics.narrowEscape.matched, true);
  assert.equal(Object.isFrozen(metrics), true);
  assert.equal(Object.isFrozen(metrics.narrowEscape.components), true);
});

test("bloodied excludes an actor at zero hit points", () => {
  const metrics = evaluateAgainstAllOdds(snapshot({
    participants: { source: { hp: { current: 0, max: 60, ratio: 0 } } }
  }), settings);
  assert.equal(metrics.bloodied.matched, false);
});

test("surrounded stays unavailable when battlefield evaluation has no count", () => {
  const metrics = evaluateAgainstAllOdds(snapshot({
    battlefield: { hostileThreatCount: null, threatEvaluation: "not-evaluated" }
  }), settings);
  assert.equal(metrics.surrounded.count, null);
  assert.equal(metrics.surrounded.matched, false);
});

test("surrounded identifies whether the current opponent is one of the counted melee threats", () => {
  const threatening = snapshot({
    participants: { target: { uuid: "Actor.orc", tokenUuid: "Scene.test.Token.orc" } },
    battlefield: {
      hostileThreatCount: 2,
      threatEvaluation: "scene-analysis",
      hostileThreats: [
        { actorUuid: "Actor.orc", tokenUuid: "Scene.test.Token.orc", name: "Orc", counted: true, rejectedBy: [] },
        { actorUuid: "Actor.archer", tokenUuid: "Scene.test.Token.archer", name: "Archer", counted: false, rejectedBy: ["out-of-reach"] }
      ]
    }
  });
  const remote = snapshot({
    participants: { target: { uuid: "Actor.archer", tokenUuid: "Scene.test.Token.archer" } },
    battlefield: threatening.battlefield
  });
  assert.equal(evaluateOpponentThreat(threatening).value, true);
  assert.equal(evaluateOpponentThreat(remote).value, false);
  assert.equal(evaluateAgainstAllOdds(threatening, settings).surrounded.opponentIsThreatening, true);
  assert.equal(evaluateAgainstAllOdds(remote, settings).surrounded.opponentIsThreatening, false);
});

test("opponent threat membership stays unknown when only an explicit count is available", () => {
  const value = evaluateOpponentThreat(snapshot({
    participants: { target: { uuid: "Actor.remote" } },
    battlefield: { hostileThreatCount: 3, threatEvaluation: "explicit", hostileThreats: [] }
  }));
  assert.equal(value.value, null);
  assert.equal(value.evaluation, "explicit");
});

test("giant-slayer compares the opponent against the rolling actor", () => {
  const below = evaluateAgainstAllOdds(snapshot({ participants: { target: { level: 10 } } }), settings);
  const exact = evaluateAgainstAllOdds(snapshot({ participants: { target: { level: 11 } } }), settings);
  assert.equal(below.giantSlayer.levelGap, 2);
  assert.equal(below.giantSlayer.matched, false);
  assert.equal(exact.giantSlayer.levelGap, 3);
  assert.equal(exact.giantSlayer.matched, true);
});

test("the danger score records additive, serializable evidence", () => {
  const danger = evaluateDangerScore(snapshot(), { threshold: 6 });
  assert.equal(danger.score, 6);
  assert.equal(danger.matched, true);
  assert.deepEqual(danger.componentIds, [
    "overwhelming-opponent",
    "bloodied",
    "wounded",
    "surrounded",
    "dangerous-trait"
  ]);
  assert.doesNotThrow(() => JSON.stringify(danger));
});

test("critical health and heavy encirclement replace their lesser score components", () => {
  const danger = evaluateDangerScore(snapshot({
    participants: { source: { hp: { current: 10, max: 60, ratio: 1 / 6 } } },
    battlefield: { hostileThreatCount: 5 },
    selection: { spellTraits: [] }
  }), { threshold: 8 });
  assert.equal(danger.componentIds.includes("critical-health"), true);
  assert.equal(danger.componentIds.includes("bloodied"), false);
  assert.equal(danger.componentIds.includes("heavily-surrounded"), true);
  assert.equal(danger.componentIds.includes("surrounded"), false);
});

test("roll kind resolves attack and the three save decks", () => {
  assert.equal(resolveRollKind(snapshot({ roll: { saveType: "fortitude" } })), "fortitude");
  assert.equal(resolveRollKind(snapshot({ roll: { saveType: "will" } })), "will");
  assert.equal(resolveRollKind(snapshot({ roll: { family: "attack", saveType: null } })), "attack");
  assert.equal(resolveRollKind(snapshot({ roll: { family: null, saveType: null, category: null } })), "unknown");
});

test("context enrichment preserves the core report and adds one extension branch", () => {
  const core = coreReport();
  const enriched = enrichContextReport(core, settings);
  assert.notEqual(enriched, core);
  assert.equal(core.snapshot.extensions, undefined);
  assert.equal(enriched.snapshot.provider, "pf2e-critical-forge-against-all-odds.context");
  assert.equal(enriched.snapshot.extensions.againstAllOdds.bloodied.matched, true);
  assert.equal(enriched.diagnostics.at(-1).code, "AAO_CONTEXT_EVALUATED");
  assert.equal(Object.isFrozen(enriched), true);
});
