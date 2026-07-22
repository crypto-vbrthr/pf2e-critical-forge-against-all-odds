import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOODIED_ATTACK_CARDS } from "../scripts/data/cards/bloodied-attack.js";
import { BLOODIED_FORTITUDE_CARDS } from "../scripts/data/cards/bloodied-fortitude.js";
import { BLOODIED_REFLEX_CARDS } from "../scripts/data/cards/bloodied-reflex.js";
import { BLOODIED_WILL_CARDS } from "../scripts/data/cards/bloodied-will.js";
import { AGAINST_ALL_ODDS_PACK_IDS } from "../scripts/data/cards/card-factory.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILTER_KEYS = [
  "damageTypes", "weaponGroups", "attackTraits", "excludedAttackTraits",
  "saveTypes", "spellTraditions", "spellTraits", "sourceTraits", "targetTraits",
  "excludedSourceTraits", "excludedTargetTraits"
];
const ALL_CARDS = [...BLOODIED_ATTACK_CARDS, ...BLOODIED_FORTITUDE_CARDS, ...BLOODIED_REFLEX_CARDS, ...BLOODIED_WILL_CARDS];

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

test("the Bloodied Triumphs Will batch contains ten unique critical-save cards", () => {
  assert.equal(BLOODIED_WILL_CARDS.length, 10);
  assert.equal(new Set(BLOODIED_WILL_CARDS.map((card) => card.id)).size, 10);
  assert.equal(BLOODIED_WILL_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_WILL_CARDS.every((card) => card.deckType === "will"), true);
  assert.equal(BLOODIED_WILL_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(BLOODIED_WILL_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "will"), true);
});

test("all Bloodied Triumphs cards use unique IDs and the dynamic Bloodied context gate", () => {
  assert.equal(new Set(ALL_CARDS.map((card) => card.id)).size, 40);
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
    [BLOODIED_REFLEX_CARDS, "pf2e-critical-forge-against-all-odds.bloodied-triumphs.reflex.br-010-two-heartbeats-ahead"],
    [BLOODIED_WILL_CARDS, "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-010-cut-the-hook"]
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

test("Will boons target the saving actor while contextual countershocks target the hostile source", () => {
  const automated = BLOODIED_WILL_CARDS.filter((card) => card.effect);
  const hostile = automated.filter((card) => card.effect.target === "target");
  assert.deepEqual(hostile.map((card) => card.id), [
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-005-heart-remembers",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-009-defiance-looks-back"
  ]);
  assert.equal(automated.filter((card) => card.effect.target === "source").length, 7);
});

test("beneficial and hostile Attack effects remain intentionally separated", () => {
  const targetCards = BLOODIED_ATTACK_CARDS.filter((card) => card.effect?.target === "target");
  assert.deepEqual(targetCards.map((card) => card.id), [
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-003-back-against-the-world",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-005-you-flinch-first",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-009-scarlet-opening"
  ]);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.effect?.target === "source").length, 6);
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

test("Will effects cover resolve, perception, mental resistance, and hostile countershock without duplicate definitions", () => {
  const signatures = BLOODIED_WILL_CARDS.filter((card) => card.effect).map((card) => JSON.stringify({ target: card.effect.target, components: card.effect.definition.components }));
  assert.equal(new Set(signatures).size, signatures.length);
  assert.equal(BLOODIED_WILL_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "resistance" && component.resistanceType === "mental")), true);
  assert.equal(BLOODIED_WILL_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "modifier" && Array.isArray(component.selector) && component.selector.includes("will-dc"))), true);
  assert.equal(BLOODIED_WILL_CARDS.filter((card) => card.effect?.definition.components.some((component) => component.type === "immunity")).length, 3);
  assert.equal(BLOODIED_WILL_CARDS.find((card) => card.id.endsWith("bw-009-defiance-looks-back"))?.filters.excludedTargetTraits.includes("mindless"), true);
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


test("the review patch preserves all published card IDs while replacing overlapping mechanics", () => {
  const expectedSuffixes = [
    "ba-001-not-yet", "ba-002-pain-honed-edge", "ba-003-back-against-the-world", "ba-004-blood-in-the-stride", "ba-005-you-flinch-first",
    "ba-006-crimson-afterimage", "ba-007-will-through-the-wound", "ba-008-wound-holds-the-weave", "ba-009-scarlet-opening", "ba-010-one-more-breath"
  ];
  assert.deepEqual(BLOODIED_ATTACK_CARDS.map((card) => card.id.split(".").at(-1)), expectedSuffixes);

  const attackComponents = Object.fromEntries(BLOODIED_ATTACK_CARDS.filter((card) => card.effect).map((card) => [card.id.split(".").at(-1), card.effect.definition.components]));
  assert.equal(attackComponents["ba-001-not-yet"][0].selector, "strike-damage");
  assert.equal(attackComponents["ba-003-back-against-the-world"][0].slug, "off-guard");
  assert.deepEqual(attackComponents["ba-004-blood-in-the-stride"][0].selector, ["athletics", "intimidation"]);
  assert.equal(attackComponents["ba-005-you-flinch-first"][0].slug, "clumsy");
  assert.equal(attackComponents["ba-006-crimson-afterimage"][0].selector, "spell-damage");
});

test("situational review filters bind specialized cards to matching effect traits", () => {
  const bySuffix = Object.fromEntries(ALL_CARDS.map((card) => [card.id.split(".").at(-1), card]));
  assert.deepEqual(bySuffix["bf-002-bitter-blood"].filters.attackTraits, ["poison"]);
  assert.deepEqual(bySuffix["bf-006-no-room-for-nausea"].filters.attackTraits, ["disease"]);
  assert.deepEqual(bySuffix["bw-003-no-master-here"].filters.attackTraits, ["mental"]);
  assert.deepEqual(bySuffix["bw-004-pain-is-proof"].filters.attackTraits, ["illusion"]);
  assert.deepEqual(bySuffix["bw-005-heart-remembers"].filters.attackTraits, ["emotion"]);
  assert.deepEqual(bySuffix["bw-006-thought-behind-the-blood"].filters.attackTraits, ["mental"]);
});

test("Second Pulse now has a strong one-round healing value", () => {
  const card = BLOODIED_FORTITUDE_CARDS.find((entry) => entry.id.endsWith("bf-005-second-pulse"));
  assert.equal(card.impact, "strong");
  assert.deepEqual(card.effect.definition.components, [{ type: "fastHealing", value: 4 }]);
});

test("the review patch reduces broad Will immunities and adds an emotion countershock", () => {
  const immunities = BLOODIED_WILL_CARDS.flatMap((card) => card.effect?.definition.components.filter((component) => component.type === "immunity") ?? []);
  assert.deepEqual(immunities.map((component) => component.immunityType).sort(), ["confused", "controlled", "frightened"]);
  const heart = BLOODIED_WILL_CARDS.find((card) => card.id.endsWith("bw-005-heart-remembers"));
  assert.equal(heart.effect.target, "target");
  assert.deepEqual(heart.effect.definition.components, [{ type: "condition", slug: "stupefied", value: 1 }]);
  assert.equal(heart.filters.excludedTargetTraits.includes("mindless"), true);
});

test("German Remaster terms and reviewed titles are present without obsolete wording", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang", "de.json"), "utf8"));
  const cards = de.PF2E_AGAINST_ALL_ODDS.Cards.BloodiedTriumphs;
  assert.match(cards.Will.NoMasterHere.Description, /Gesteuert/u);
  assert.doesNotMatch(cards.Will.NoMasterHere.Description, /Kontrolliert/u);
  assert.match(cards.Fortitude.StrengthDoesNotLeave.Description, /Kraftlos/u);
  assert.doesNotMatch(cards.Fortitude.StrengthDoesNotLeave.Description, /Entkräftet/u);
  assert.equal(cards.Attack.WoundHoldsTheWeave.Title, "Die Wunde hält das Geflecht");
  assert.equal(cards.Reflex.NeverWhereNeeded.Title, "Nie dort, wo sie dich erwarten");
});
