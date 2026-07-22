import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOODIED_ATTACK_CARDS } from "../scripts/data/cards/bloodied-attack.js";
import { AGAINST_ALL_ODDS_PACK_IDS } from "../scripts/data/cards/card-factory.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILTER_KEYS = [
  "damageTypes", "weaponGroups", "attackTraits", "excludedAttackTraits",
  "saveTypes", "spellTraditions", "spellTraits", "sourceTraits", "targetTraits",
  "excludedSourceTraits", "excludedTargetTraits"
];

function getPath(rootValue, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => value?.[key], rootValue);
}

test("the first Bloodied Triumphs batch contains ten unique attack-deck cards", () => {
  assert.equal(BLOODIED_ATTACK_CARDS.length, 10);
  assert.equal(new Set(BLOODIED_ATTACK_CARDS.map((card) => card.id)).size, 10);
  assert.equal(BLOODIED_ATTACK_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_ATTACK_CARDS.every((card) => card.deckType === "attack"), true);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length, 5);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length, 5);
});

test("every card is gated by the dynamic Bloodied Triumphs context field", () => {
  for (const card of BLOODIED_ATTACK_CARDS) {
    assert.deepEqual(card.conditions, {
      type: "condition",
      field: "extensions.againstAllOdds.bloodied.matched",
      operator: "eq",
      value: true
    });
    assert.equal(Object.isFrozen(card), true);
    assert.equal(Object.isFrozen(card.conditions), true);
  }
});

test("all card filters are complete immutable schema-1 filter sets", () => {
  for (const card of BLOODIED_ATTACK_CARDS) {
    assert.deepEqual(Object.keys(card.filters), FILTER_KEYS);
    assert.equal(FILTER_KEYS.every((key) => Array.isArray(card.filters[key])), true);
    assert.equal(FILTER_KEYS.every((key) => Object.isFrozen(card.filters[key])), true);
  }
});

test("the batch contains nine automated effects and one explicit manual result", () => {
  const automated = BLOODIED_ATTACK_CARDS.filter((card) => card.effect);
  const manual = BLOODIED_ATTACK_CARDS.filter((card) => !card.effect);
  assert.equal(automated.length, 9);
  assert.deepEqual(manual.map((card) => card.id), [
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-010-one-more-breath"
  ]);
  assert.equal(manual[0].tags.includes("manual"), true);

  for (const card of automated) {
    assert.equal(card.effect.definition.schemaVersion, 2);
    assert.equal(card.effect.definition.components.length > 0, true);
    assert.equal(card.effect.nameKey.startsWith("PF2E_AGAINST_ALL_ODDS.Effects.BloodiedTriumphs.Attack."), true);
  }
});

test("beneficial and hostile effect targets remain intentionally separated", () => {
  const targetCards = BLOODIED_ATTACK_CARDS.filter((card) => card.effect?.target === "target");
  assert.deepEqual(targetCards.map((card) => card.id), [
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-005-you-flinch-first",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-009-scarlet-opening"
  ]);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.effect?.target === "source").length, 7);
});

test("the first batch uses only Effect Engine component types supported by the Forge RC", () => {
  const types = new Set(BLOODIED_ATTACK_CARDS.flatMap((card) => card.effect?.definition.components.map((component) => component.type) ?? []));
  assert.deepEqual([...types].sort(), [
    "condition",
    "modifier",
    "movement",
    "resistance",
    "temporaryHitPoints"
  ]);
});

test("all card and effect localization keys exist in German and English", () => {
  const languages = ["de", "en"].map((language) => JSON.parse(fs.readFileSync(path.join(root, "lang", `${language}.json`), "utf8")));
  for (const card of BLOODIED_ATTACK_CARDS) {
    for (const language of languages) {
      assert.equal(typeof getPath(language, card.titleKey), "string", card.titleKey);
      assert.equal(typeof getPath(language, card.descriptionKey), "string", card.descriptionKey);
      if (card.effect) assert.equal(typeof getPath(language, card.effect.nameKey), "string", card.effect.nameKey);
    }
  }
});
