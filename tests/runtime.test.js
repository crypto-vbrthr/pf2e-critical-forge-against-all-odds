import test from "node:test";
import assert from "node:assert/strict";
import { initializeAgainstAllOdds, resetAgainstAllOddsRuntime } from "../scripts/runtime.js";

function fixture({ battlefield = true } = {}) {
  const calls = [];
  const packs = new Map();
  const extension = {
    sourceModule: "pf2e-critical-forge-against-all-odds",
    assertCompatible() { calls.push(["assertCompatible"]); return { compatible: true }; },
    registerContextProvider(provider) { calls.push(["context", provider]); return provider; },
    registerConditionProvider(provider) { calls.push(["condition", provider]); return provider; },
    registerDiagnosticProvider(provider) { calls.push(["diagnostic", provider]); return provider; },
    registerPacks(values, options = {}) {
      calls.push(["packs", values, options]);
      for (const pack of values) packs.set(pack.id, pack);
      return values;
    },
    listPacks() { return [...packs.values()]; },
    unregisterAll() { calls.push(["unregisterAll"]); packs.clear(); return {}; },
    diagnostics: { list: () => [] }
  };
  let options = null;
  const forge = {
    extensions: {
      forModule(id, value) {
        calls.push(["forModule", id, value]);
        options = value;
        return extension;
      }
    },
    cards: {
      capabilities: { battlefieldThreatEvaluation: battlefield },
      contexts: { resolve: () => ({}) }
    }
  };
  const moduleRecord = {};
  const gameRef = { modules: { get: () => moduleRecord } };
  return { calls, packs, extension, forge, gameRef, moduleRecord, get options() { return options; } };
}

const settings = Object.freeze({
  enableBloodiedTriumphs: true,
  enableSurroundedStillStanding: true,
  enableGiantSlayerMoments: true,
  enableNarrowEscapes: true,
  bloodiedThreshold: 0.5,
  surroundedThreshold: 2,
  giantSlayerThreshold: 3,
  narrowEscapeThreshold: 3
});

test("runtime registration binds all resources through the extension contract", () => {
  resetAgainstAllOddsRuntime();
  const fx = fixture();
  const runtime = initializeAgainstAllOdds(fx.forge, {
    gameRef: fx.gameRef,
    settingsReader: () => settings,
    notify: () => {}
  });
  assert.equal(fx.calls[0][0], "forModule");
  assert.equal(fx.calls.some((entry) => entry[0] === "context"), true);
  assert.equal(fx.calls.some((entry) => entry[0] === "condition"), true);
  assert.equal(fx.calls.some((entry) => entry[0] === "diagnostic"), true);
  assert.equal(fx.calls.find((entry) => entry[0] === "packs")[1].length, 4);
  assert.equal(fx.options.requirements.moduleVersion, ">=1.0.0-rc");
  assert.equal(fx.options.requirements.capabilities.includes("cards.multiDeckPacks"), true);
  assert.equal(fx.moduleRecord.api, runtime);
  assert.equal(runtime.listPacks().length, 4);
  const bloodied = runtime.listPacks().find((pack) => pack.id.endsWith("bloodied-triumphs"));
  assert.equal(bloodied.decks.attack.cards.length, 30);
  assert.equal(bloodied.decks.fortitude.cards.length, 30);
  assert.equal(bloodied.decks.reflex.cards.length, 30);
  assert.equal(bloodied.decks.will.cards.length, 30);
  const surrounded = runtime.listPacks().find((pack) => pack.id.endsWith("surrounded-still-standing"));
  assert.equal(surrounded.decks.attack.cards.length, 30);
  assert.equal(surrounded.decks.fortitude.cards.length, 30);
  assert.equal(surrounded.decks.reflex.cards.length, 30);
  assert.equal(surrounded.decks.will.cards.length, 30);
  const giantSlayer = runtime.listPacks().find((pack) => pack.id.endsWith("giant-slayer-moments"));
  assert.equal(giantSlayer.decks.attack.cards.length, 30);
  assert.equal(giantSlayer.decks.fortitude.cards.length, 30);
  assert.equal(giantSlayer.decks.reflex.cards.length, 30);
  assert.equal(giantSlayer.decks.will.cards.length, 30);
});

test("runtime rejects a Forge without battlefield threat evaluation", () => {
  resetAgainstAllOddsRuntime();
  const fx = fixture({ battlefield: false });
  assert.throws(() => initializeAgainstAllOdds(fx.forge, {
    gameRef: fx.gameRef,
    settingsReader: () => settings
  }), /battlefield threat evaluation/u);
  assert.equal(fx.calls.length, 0);
});

test("pack refresh replaces the four owned packs and reports success", () => {
  resetAgainstAllOddsRuntime();
  const fx = fixture();
  const notices = [];
  let current = { ...settings };
  const runtime = initializeAgainstAllOdds(fx.forge, {
    gameRef: fx.gameRef,
    settingsReader: () => current,
    notify: (...args) => notices.push(args)
  });
  current = { ...current, enableNarrowEscapes: false };
  const refreshed = runtime.refreshPacks();
  const packCalls = fx.calls.filter((entry) => entry[0] === "packs");
  assert.equal(packCalls.length, 2);
  assert.deepEqual(packCalls[1][2], { replace: true });
  assert.equal(refreshed.find((pack) => pack.id.endsWith("narrow-escapes")).enabled, false);
  assert.equal(notices.length, 1);
});

test("registration failure performs best-effort owned-resource rollback", () => {
  resetAgainstAllOddsRuntime();
  const fx = fixture();
  fx.extension.registerDiagnosticProvider = () => { throw new Error("fixture failure"); };
  assert.throws(() => initializeAgainstAllOdds(fx.forge, {
    gameRef: fx.gameRef,
    settingsReader: () => settings
  }), /fixture failure/u);
  assert.equal(fx.calls.some((entry) => entry[0] === "unregisterAll"), true);
});
