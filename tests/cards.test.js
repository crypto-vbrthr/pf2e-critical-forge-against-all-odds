import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOODIED_ATTACK_CARDS } from "../scripts/data/cards/bloodied-attack.js";
import { BLOODIED_FORTITUDE_CARDS } from "../scripts/data/cards/bloodied-fortitude.js";
import { BLOODIED_REFLEX_CARDS } from "../scripts/data/cards/bloodied-reflex.js";
import { AGAINST_ALL_ODDS_PACK_IDS } from "../scripts/data/cards/card-factory.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILTER_KEYS = [
  "damageTypes", "weaponGroups", "attackTraits", "excludedAttackTraits",
  "saveTypes", "spellTraditions", "spellTraits", "sourceTraits", "targetTraits",
  "excludedSourceTraits", "excludedTargetTraits"
];
const ALL_CARDS = [...BLOODIED_ATTACK_CARDS, ...BLOODIED_FORTITUDE_CARDS, ...BLOODIED_REFLEX_CARDS];

function getPath(rootValue, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => value?.[key], rootValue);
}

function assertBloodiedGate(cards) {
  for (const card of cards) {
    assert.deepEqual(card.conditions, {
      type: "condition",
      field: "extensions.againstAllOdds.bloodied.matched",
      operator: "eq",
      value: true
    });
    assert.equal(Object.isFrozen(card), true);
    assert.equal(Object.isFrozen(card.conditions), true);
  }
}

test("the Bloodied Triumphs Attack batch contains ten unique attack-deck cards", () => {
  assert.equal(BLOODIED_ATTACK_CARDS.length, 10);
  assert.equal(new Set(BLOODIED_ATTACK_CARDS.map((card) => card.id)).size, 10);
  assert.equal(BLOODIED_ATTACK_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_ATTACK_CARDS.every((card) => card.deckType === "attack"), true);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length, 5);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length, 5);
});

test("the Bloodied Triumphs Fortitude batch contains ten unique critical-save cards", () => {
  assert.equal(BLOODIED_FORTITUDE_CARDS.length, 10);
  assert.equal(new Set(BLOODIED_FORTITUDE_CARDS.map((card) => card.id)).size, 10);
  assert.equal(BLOODIED_FORTITUDE_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_FORTITUDE_CARDS.every((card) => card.deckType === "fortitude"), true);
  assert.equal(BLOODIED_FORTITUDE_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(BLOODIED_FORTITUDE_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "fortitude"), true);
});

test("the Bloodied Triumphs Reflex batch contains ten unique critical-save cards", () => {
  assert.equal(BLOODIED_REFLEX_CARDS.length, 10);
  assert.equal(new Set(BLOODIED_REFLEX_CARDS.map((card) => card.id)).size, 10);
  assert.equal(BLOODIED_REFLEX_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_REFLEX_CARDS.every((card) => card.deckType === "reflex"), true);
  assert.equal(BLOODIED_REFLEX_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(BLOODIED_REFLEX_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "reflex"), true);
});

test("all Bloodied Triumphs cards use unique IDs and the dynamic Bloodied context gate", () => {
  assert.equal(new Set(ALL_CARDS.map((card) => card.id)).size, 30);
  assertBloodiedGate(ALL_CARDS);
});

test("all card filters are complete immutable schema-1 filter sets", () => {
  for (const card of ALL_CARDS) {
    assert.deepEqual(Object.keys(card.filters), FILTER_KEYS);
    assert.equal(FILTER_KEYS.every((key) => Array.isArray(card.filters[key])), true);
    assert.equal(FILTER_KEYS.every((key) => Object.isFrozen(card.filters[key])), true);
  }
});

test("each published batch contains nine automated effects and one explicit manual result", () => {
  for (const [cards, manualId] of [
    [BLOODIED_ATTACK_CARDS, "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-010-one-more-breath"],
    [BLOODIED_FORTITUDE_CARDS, "pf2e-critical-forge-against-all-odds.bloodied-triumphs.fortitude.bf-010-close-the-wound"],
    [BLOODIED_REFLEX_CARDS, "pf2e-critical-forge-against-all-odds.bloodied-triumphs.reflex.br-010-two-heartbeats-ahead"]
  ]) {
    const automated = cards.filter((card) => card.effect);
    const manual = cards.filter((card) => !card.effect);
    assert.equal(automated.length, 9);
    assert.deepEqual(manual.map((card) => card.id), [manualId]);
    assert.equal(manual[0].tags.includes("manual"), true);
    for (const card of automated) {
      assert.equal(card.effect.definition.schemaVersion, 2);
      assert.equal(card.effect.definition.components.length > 0, true);
      assert.equal(card.effect.nameKey.startsWith("PF2E_AGAINST_ALL_ODDS.Effects.BloodiedTriumphs."), true);
    }
  }
});

test("Fortitude boons always target the saving actor", () => {
  assert.equal(BLOODIED_FORTITUDE_CARDS.filter((card) => card.effect).every((card) => card.effect.target === "source"), true);
});

test("Reflex boons always target the saving actor", () => {
  assert.equal(BLOODIED_REFLEX_CARDS.filter((card) => card.effect).every((card) => card.effect.target === "source"), true);
});

test("beneficial and hostile Attack effects remain intentionally separated", () => {
  const targetCards = BLOODIED_ATTACK_CARDS.filter((card) => card.effect?.target === "target");
  assert.deepEqual(targetCards.map((card) => card.id), [
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-005-you-flinch-first",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-009-scarlet-opening"
  ]);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.effect?.target === "source").length, 7);
});

test("published batches use only Effect Engine component types supported by the Forge RC", () => {
  const types = new Set(ALL_CARDS.flatMap((card) => card.effect?.definition.components.map((component) => component.type) ?? []));
  assert.deepEqual([...types].sort(), [
    "condition",
    "fastHealing",
    "immunity",
    "modifier",
    "movement",
    "resistance",
    "temporaryHitPoints"
  ]);
});

test("Fortitude effects cover endurance without duplicate mechanical definitions", () => {
  const signatures = BLOODIED_FORTITUDE_CARDS.filter((card) => card.effect).map((card) => JSON.stringify(card.effect.definition.components));
  assert.equal(new Set(signatures).size, signatures.length);
  assert.equal(BLOODIED_FORTITUDE_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "fastHealing")), true);
  assert.equal(BLOODIED_FORTITUDE_CARDS.filter((card) => card.effect?.definition.components.some((component) => component.type === "immunity")).length, 3);
});

test("Reflex effects cover movement and evasion without duplicate mechanical definitions", () => {
  const signatures = BLOODIED_REFLEX_CARDS.filter((card) => card.effect).map((card) => JSON.stringify(card.effect.definition.components));
  assert.equal(new Set(signatures).size, signatures.length);
  assert.equal(BLOODIED_REFLEX_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "movement")), true);
  assert.equal(BLOODIED_REFLEX_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "resistance" && component.resistanceType === "area-damage")), true);
  assert.equal(BLOODIED_REFLEX_CARDS.filter((card) => card.effect?.definition.components.some((component) => component.type === "immunity")).length, 3);
});

test("all card and effect localization keys exist in German and English", () => {
  const languages = ["de", "en"].map((language) => JSON.parse(fs.readFileSync(path.join(root, "lang", `${language}.json`), "utf8")));
  for (const card of ALL_CARDS) {
    for (const language of languages) {
      assert.equal(typeof getPath(language, card.titleKey), "string", card.titleKey);
      assert.equal(typeof getPath(language, card.descriptionKey), "string", card.descriptionKey);
      if (card.effect) assert.equal(typeof getPath(language, card.effect.nameKey), "string", card.effect.nameKey);
    }
  }
});
