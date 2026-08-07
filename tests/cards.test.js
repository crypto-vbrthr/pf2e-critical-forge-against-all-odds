import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOODIED_ATTACK_CARDS } from "../scripts/data/cards/bloodied-attack.js";
import { BLOODIED_FORTITUDE_CARDS } from "../scripts/data/cards/bloodied-fortitude.js";
import { BLOODIED_REFLEX_CARDS } from "../scripts/data/cards/bloodied-reflex.js";
import { BLOODIED_WILL_CARDS } from "../scripts/data/cards/bloodied-will.js";
import { SURROUNDED_ATTACK_CARDS } from "../scripts/data/cards/surrounded-attack.js";
import { SURROUNDED_FORTITUDE_CARDS } from "../scripts/data/cards/surrounded-fortitude.js";
import { SURROUNDED_REFLEX_CARDS } from "../scripts/data/cards/surrounded-reflex.js";
import { SURROUNDED_WILL_CARDS } from "../scripts/data/cards/surrounded-will.js";
import { GIANT_SLAYER_ATTACK_CARDS } from "../scripts/data/cards/giant-slayer-attack.js";
import { AGAINST_ALL_ODDS_PACK_IDS } from "../scripts/data/cards/card-factory.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILTER_KEYS = [
  "damageTypes", "weaponGroups", "attackTraits", "excludedAttackTraits",
  "saveTypes", "spellTraditions", "spellTraits", "sourceTraits", "targetTraits",
  "excludedSourceTraits", "excludedTargetTraits"
];
const ALL_CARDS = [...BLOODIED_ATTACK_CARDS, ...BLOODIED_FORTITUDE_CARDS, ...BLOODIED_REFLEX_CARDS, ...BLOODIED_WILL_CARDS];
const ALL_SURROUNDED_CARDS = [...SURROUNDED_ATTACK_CARDS, ...SURROUNDED_FORTITUDE_CARDS, ...SURROUNDED_REFLEX_CARDS, ...SURROUNDED_WILL_CARDS];
const ALL_GIANT_SLAYER_CARDS = [...GIANT_SLAYER_ATTACK_CARDS];

function getPath(rootValue, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => value?.[key], rootValue);
}

function conditionLeaves(tree) {
  if (!tree || typeof tree !== "object") return [];
  if (tree.type === "condition" || tree.field) return [tree];
  return (tree.conditions ?? []).flatMap((child) => conditionLeaves(child));
}

function assertBloodiedGate(cards) {
  for (const card of cards) {
    const leaves = conditionLeaves(card.conditions);
    assert.equal(leaves.some((leaf) =>
      leaf.field === "extensions.againstAllOdds.bloodied.matched" && leaf.operator === "eq" && leaf.value === true
    ), true, card.id);
    assert.equal(Object.isFrozen(card), true);
    assert.equal(Object.isFrozen(card.conditions), true);
  }
}

test("the Bloodied Triumphs Attack deck contains thirty unique cards after the final pass", () => {
  assert.equal(BLOODIED_ATTACK_CARDS.length, 30);
  assert.equal(new Set(BLOODIED_ATTACK_CARDS.map((card) => card.id)).size, 30);
  assert.equal(BLOODIED_ATTACK_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_ATTACK_CARDS.every((card) => card.deckType === "attack"), true);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length, 15);
  assert.equal(BLOODIED_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length, 15);
});

test("the Bloodied Triumphs Fortitude deck contains thirty unique critical-save cards after the final pass", () => {
  assert.equal(BLOODIED_FORTITUDE_CARDS.length, 30);
  assert.equal(new Set(BLOODIED_FORTITUDE_CARDS.map((card) => card.id)).size, 30);
  assert.equal(BLOODIED_FORTITUDE_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_FORTITUDE_CARDS.every((card) => card.deckType === "fortitude"), true);
  assert.equal(BLOODIED_FORTITUDE_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(BLOODIED_FORTITUDE_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "fortitude"), true);
});

test("the Bloodied Triumphs Reflex deck contains thirty unique critical-save cards after the final pass", () => {
  assert.equal(BLOODIED_REFLEX_CARDS.length, 30);
  assert.equal(new Set(BLOODIED_REFLEX_CARDS.map((card) => card.id)).size, 30);
  assert.equal(BLOODIED_REFLEX_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_REFLEX_CARDS.every((card) => card.deckType === "reflex"), true);
  assert.equal(BLOODIED_REFLEX_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(BLOODIED_REFLEX_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "reflex"), true);
});

test("the Bloodied Triumphs Will deck contains thirty unique critical-save cards after the final pass", () => {
  assert.equal(BLOODIED_WILL_CARDS.length, 30);
  assert.equal(new Set(BLOODIED_WILL_CARDS.map((card) => card.id)).size, 30);
  assert.equal(BLOODIED_WILL_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs), true);
  assert.equal(BLOODIED_WILL_CARDS.every((card) => card.deckType === "will"), true);
  assert.equal(BLOODIED_WILL_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(BLOODIED_WILL_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "will"), true);
});

test("all Bloodied Triumphs cards use unique IDs and the dynamic Bloodied context gate", () => {
  assert.equal(new Set(ALL_CARDS.map((card) => card.id)).size, 120);
  assertBloodiedGate(ALL_CARDS);
});

test("all card filters are complete immutable schema-1 filter sets", () => {
  for (const card of ALL_CARDS) {
    assert.deepEqual(Object.keys(card.filters), FILTER_KEYS);
    assert.equal(FILTER_KEYS.every((key) => Array.isArray(card.filters[key])), true);
    assert.equal(FILTER_KEYS.every((key) => Object.isFrozen(card.filters[key])), true);
  }
});

test("published decks keep their explicit automated/manual split", () => {
  for (const [cards, automatedCount, manualIds] of [
    [BLOODIED_ATTACK_CARDS, 27, [
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-010-one-more-breath",
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-015-hunt-the-opening",
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-021-drive-them-back"
    ]],
    [BLOODIED_FORTITUDE_CARDS, 27, [
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.fortitude.bf-010-close-the-wound",
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.fortitude.bf-020-body-casts-it-out",
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.fortitude.bf-030-stand-because-you-must"
    ]],
    [BLOODIED_REFLEX_CARDS, 27, [
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.reflex.br-010-two-heartbeats-ahead",
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.reflex.br-020-through-the-impossible-opening",
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.reflex.br-030-behind-them-before-they-turn"
    ]],
    [BLOODIED_WILL_CARDS, 27, [
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-010-cut-the-hook",
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-020-slam-the-door-shut",
      "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-030-see-the-hand-behind-it"
    ]]
  ]) {
    const automated = cards.filter((card) => card.effect);
    const manual = cards.filter((card) => !card.effect);
    assert.equal(automated.length, automatedCount);
    assert.deepEqual(manual.map((card) => card.id), manualIds);
    assert.equal(manual.every((card) => card.tags.includes("manual")), true);
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

test("Reflex boons stay on the saver while final-pass countermoves target the hostile source", () => {
  const automated = BLOODIED_REFLEX_CARDS.filter((card) => card.effect);
  assert.deepEqual(automated.filter((card) => card.effect.target === "target").map((card) => card.id.split(".").at(-1)), [
    "br-021-their-lines-cross-behind-you",
    "br-024-overreach-becomes-opening",
    "br-029-source-loses-sight-of-you"
  ]);
  assert.equal(automated.filter((card) => card.effect.target === "source").length, 24);
});

test("Will boons target the saving actor while contextual countershocks target the hostile source", () => {
  const automated = BLOODIED_WILL_CARDS.filter((card) => card.effect);
  const hostile = automated.filter((card) => card.effect.target === "target");
  assert.deepEqual(hostile.map((card) => card.id), [
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-005-heart-remembers",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-009-defiance-looks-back",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-011-will-shows-teeth",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-014-foreign-thought-gives-itself-away",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-015-thought-strikes-back",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-016-intruder-loses-the-thread",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-021-mind-leaves-a-scar",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.will.bw-025-your-voice-comes-back-wrong"
  ]);
  assert.equal(automated.filter((card) => card.effect.target === "source").length, 19);
});

test("beneficial and hostile Attack effects remain intentionally separated", () => {
  const targetCards = BLOODIED_ATTACK_CARDS.filter((card) => card.effect?.target === "target");
  assert.deepEqual(targetCards.map((card) => card.id), [
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-003-back-against-the-world",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-005-you-flinch-first",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-009-scarlet-opening",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-011-blood-answers-blood",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-012-breach-for-everyone",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-013-steal-their-beat",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-014-strength-runs-red",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-016-spellscar",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-018-thought-bleeds-back",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-019-power-refuses-to-fade",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-020-magic-nails-the-shadow",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-022-ruin-their-aim",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-023-bone-rings-like-a-bell",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-024-cut-to-the-core",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-025-find-the-nerve",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-026-light-in-the-wound",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-027-thunder-in-the-blood",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-028-cold-steals-the-step",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-029-lightning-steals-a-heartbeat",
    "pf2e-critical-forge-against-all-odds.bloodied-triumphs.attack.ba-030-acid-finds-the-seam"
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
    "persistentDamage",
    "regeneration",
    "resistance",
    "temporaryHitPoints",
    "weakness"
  ]);
});

test("Fortitude effects cover endurance without duplicate mechanical definitions", () => {
  const signatures = BLOODIED_FORTITUDE_CARDS.filter((card) => card.effect).map((card) => JSON.stringify(card.effect.definition.components));
  assert.equal(new Set(signatures).size, signatures.length);
  assert.equal(BLOODIED_FORTITUDE_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "fastHealing")), true);
  assert.equal(BLOODIED_FORTITUDE_CARDS.filter((card) => card.effect?.definition.components.some((component) => component.type === "immunity")).length, 5);
});

test("Reflex effects cover movement and evasion without duplicate mechanical definitions", () => {
  const signatures = BLOODIED_REFLEX_CARDS.filter((card) => card.effect).map((card) => JSON.stringify(card.effect.definition.components));
  assert.equal(new Set(signatures).size, signatures.length);
  assert.equal(BLOODIED_REFLEX_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "movement")), true);
  assert.equal(BLOODIED_REFLEX_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "resistance" && component.resistanceType === "area-damage")), true);
  assert.equal(BLOODIED_REFLEX_CARDS.filter((card) => card.effect?.definition.components.some((component) => component.type === "immunity")).length, 5);
});

test("Will effects cover resolve, perception, mental resistance, and hostile countershock without duplicate definitions", () => {
  const signatures = BLOODIED_WILL_CARDS.filter((card) => card.effect).map((card) => JSON.stringify({ target: card.effect.target, components: card.effect.definition.components }));
  assert.equal(new Set(signatures).size, signatures.length);
  assert.equal(BLOODIED_WILL_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "resistance" && component.resistanceType === "mental")), true);
  assert.equal(BLOODIED_WILL_CARDS.some((card) => card.effect?.definition.components.some((component) => component.type === "modifier" && Array.isArray(component.selector) && component.selector.includes("will-dc"))), true);
  assert.equal(BLOODIED_WILL_CARDS.filter((card) => card.effect?.definition.components.some((component) => component.type === "immunity")).length, 5);
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
  assert.deepEqual(BLOODIED_ATTACK_CARDS.slice(0, 10).map((card) => card.id.split(".").at(-1)), expectedSuffixes);

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
  const immunities = BLOODIED_WILL_CARDS.slice(0, 10).flatMap((card) => card.effect?.definition.components.filter((component) => component.type === "immunity") ?? []);
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


test("the second Attack pass adds five Strike and five spell-attack cards with distinct mechanics", () => {
  const secondPass = BLOODIED_ATTACK_CARDS.slice(10, 20);
  assert.equal(secondPass.length, 10);
  assert.equal(secondPass.filter((card) => card.category === "criticalHit").length, 5);
  assert.equal(secondPass.filter((card) => card.category === "spellCriticalHit").length, 5);
  assert.equal(secondPass.every((card) => card.metadata.contentBatch === 5), true);
  assert.deepEqual(secondPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), ["ba-015-hunt-the-opening"]);

  const componentTypes = secondPass.flatMap((card) => card.effect?.definition.components.map((component) => component.type) ?? []);
  assert.equal(componentTypes.includes("persistentDamage"), true);
  assert.equal(componentTypes.includes("weakness"), true);
  assert.equal(componentTypes.includes("movement"), true);
  assert.equal(secondPass.some((card) => card.effect?.definition.components.some((component) => component.slug === "slowed")), true);
  assert.equal(secondPass.some((card) => card.effect?.definition.components.some((component) => component.slug === "enfeebled")), true);
  assert.equal(secondPass.some((card) => card.effect?.definition.components.some((component) => component.slug === "stupefied")), true);
});

test("second-pass contextual filters avoid nonsensical bleed and mental results", () => {
  const bleed = BLOODIED_ATTACK_CARDS.find((card) => card.id.endsWith("ba-011-blood-answers-blood"));
  const thought = BLOODIED_ATTACK_CARDS.find((card) => card.id.endsWith("ba-018-thought-bleeds-back"));
  assert.deepEqual(bleed.filters.excludedTargetTraits, ["construct", "ooze"]);
  assert.deepEqual(thought.filters.spellTraits, ["mental"]);
  assert.deepEqual(thought.filters.excludedTargetTraits, ["mindless"]);
});

test("the second Fortitude pass adds ten cards with a distinct content batch", () => {
  const secondPass = BLOODIED_FORTITUDE_CARDS.slice(10, 20);
  assert.equal(secondPass.length, 10);
  assert.equal(secondPass.every((card) => card.metadata.contentBatch === 6), true);
  assert.deepEqual(secondPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), ["bf-020-body-casts-it-out"]);
});

test("second-pass Fortitude cards broaden bodily endurance without duplicate effect definitions", () => {
  const secondPass = BLOODIED_FORTITUDE_CARDS.slice(10, 20);
  const automated = secondPass.filter((card) => card.effect);
  const signatures = automated.map((card) => JSON.stringify(card.effect.definition.components));
  assert.equal(new Set(signatures).size, signatures.length);

  const types = new Set(automated.flatMap((card) => card.effect.definition.components.map((component) => component.type)));
  assert.equal(types.has("regeneration"), true);
  assert.equal(types.has("resistance"), true);
  assert.equal(types.has("modifier"), true);
  assert.equal(types.has("immunity"), true);
  assert.equal(secondPass.some((card) => card.effect?.definition.components.some((component) => component.type === "resistance" && component.resistanceType === "all-damage" && component.value === 1)), true);
});

test("second-pass Fortitude contextual filters bind death, inhaled, and void results to matching effects", () => {
  const bySuffix = Object.fromEntries(BLOODIED_FORTITUDE_CARDS.map((card) => [card.id.split(".").at(-1), card]));
  assert.deepEqual(bySuffix["bf-011-death-has-no-purchase"].filters.attackTraits, ["death"]);
  assert.deepEqual(bySuffix["bf-012-iron-lungs"].filters.attackTraits, ["inhaled"]);
  assert.deepEqual(bySuffix["bf-013-no-blood-for-the-void"].filters.damageTypes, ["void"]);
});

test("second-pass Fortitude automated effects always target the saving actor", () => {
  const automated = BLOODIED_FORTITUDE_CARDS.slice(10, 20).filter((card) => card.effect);
  assert.equal(automated.every((card) => card.effect.target === "source"), true);
});

test("second-pass Fortitude includes healing reinforcement, regeneration, and Fortitude-DC pressure resistance", () => {
  const bySuffix = Object.fromEntries(BLOODIED_FORTITUDE_CARDS.map((card) => [card.id.split(".").at(-1), card]));
  assert.deepEqual(bySuffix["bf-015-pain-leaves-room-for-healing"].effect.definition.components, [
    { type: "modifier", selector: "healing-received", value: 2, modifierType: "status", predicate: [] }
  ]);
  assert.deepEqual(bySuffix["bf-016-flesh-remembers"].effect.definition.components, [
    { type: "regeneration", value: 3, deactivatedBy: ["acid", "fire"] }
  ]);
  assert.deepEqual(bySuffix["bf-018-pressure-meets-stone"].effect.definition.components, [
    { type: "modifier", selector: "fortitude-dc", value: 2, modifierType: "circumstance", predicate: [] }
  ]);
});



test("all published cards use Critical Forge supported tone and impact values", () => {
  const supportedTones = new Set(["neutral", "serious", "dramatic", "humorous"]);
  const supportedImpacts = new Set(["narrative", "light", "moderate", "strong"]);
  for (const card of ALL_CARDS) {
    assert.equal(supportedTones.has(card.tone), true, `${card.id} has unsupported tone ${card.tone}`);
    assert.equal(supportedImpacts.has(card.impact), true, `${card.id} has unsupported impact ${card.impact}`);
  }
});

test("Pain Leaves Room for Healing uses a Forge-supported dramatic tone", () => {
  const card = BLOODIED_FORTITUDE_CARDS.find((entry) => entry.id.endsWith("bf-015-pain-leaves-room-for-healing"));
  assert.equal(card.tone, "dramatic");
});

test("the second Reflex pass adds ten cards with a distinct content batch", () => {
  const secondPass = BLOODIED_REFLEX_CARDS.slice(10, 20);
  assert.equal(secondPass.length, 10);
  assert.equal(secondPass.every((card) => card.metadata.contentBatch === 7), true);
  assert.deepEqual(secondPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), ["br-020-through-the-impossible-opening"]);
});

test("second-pass Reflex cards broaden mobility, restraint escape, and defensive momentum", () => {
  const secondPass = BLOODIED_REFLEX_CARDS.slice(10, 20);
  const automated = secondPass.filter((card) => card.effect);
  const signatures = automated.map((card) => JSON.stringify(card.effect.definition.components));
  assert.equal(new Set(signatures).size, signatures.length);

  const bySuffix = Object.fromEntries(BLOODIED_REFLEX_CARDS.map((card) => [card.id.split(".").at(-1), card]));
  assert.deepEqual(bySuffix["br-011-motion-refuses-to-die"].effect.definition.components, [
    { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
  ]);
  assert.deepEqual(bySuffix["br-012-wound-reads-the-angle"].effect.definition.components, [
    { type: "modifier", selector: "reflex-dc", value: 2, modifierType: "circumstance", predicate: [] }
  ]);
  assert.deepEqual(bySuffix["br-013-no-grip-holds-the-wind"].effect.definition.components, [
    { type: "immunity", immunityType: "grabbed" },
    { type: "immunity", immunityType: "restrained" }
  ]);
  assert.deepEqual(bySuffix["br-014-hit-arrives-too-late"].effect.definition.components, [
    { type: "resistance", resistanceType: "critical-hits", value: 3 }
  ]);
  assert.deepEqual(bySuffix["br-019-nothing-clings"].effect.definition.components, [
    { type: "resistance", resistanceType: "persistent-damage", value: 3 }
  ]);
});

test("second-pass Reflex automated effects stay on the saving actor", () => {
  const automated = BLOODIED_REFLEX_CARDS.slice(10, 20).filter((card) => card.effect);
  assert.equal(automated.every((card) => card.effect.target === "source"), true);
});

test("German second-pass Reflex text uses Remaster condition terminology", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang", "de.json"), "utf8"));
  const reflex = de.PF2E_AGAINST_ALL_ODDS.Cards.BloodiedTriumphs.Reflex;
  assert.match(reflex.NoGripHoldsTheWind.Description, /Gegriffen/u);
  assert.match(reflex.NoGripHoldsTheWind.Description, /Gebunden/u);
  assert.match(reflex.MotionCannotBeStolen.Description, /Verlangsamt/u);
});

test("the second Will pass adds ten cards with a distinct content batch", () => {
  const secondPass = BLOODIED_WILL_CARDS.slice(10, 20);
  assert.equal(secondPass.length, 10);
  assert.equal(secondPass.every((card) => card.metadata.contentBatch === 8), true);
  assert.deepEqual(secondPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), ["bw-020-slam-the-door-shut"]);
});

test("second-pass Will cards broaden mental counterplay without duplicate automated definitions", () => {
  const secondPass = BLOODIED_WILL_CARDS.slice(10, 20);
  const automated = secondPass.filter((card) => card.effect);
  const signatures = automated.map((card) => JSON.stringify({ target: card.effect.target, components: card.effect.definition.components }));
  assert.equal(new Set(signatures).size, signatures.length);

  const bySuffix = Object.fromEntries(BLOODIED_WILL_CARDS.map((card) => [card.id.split(".").at(-1), card]));
  assert.deepEqual(bySuffix["bw-011-will-shows-teeth"].effect.definition.components, [
    { type: "modifier", selector: "attack", value: -1, modifierType: "circumstance", predicate: [] }
  ]);
  assert.deepEqual(bySuffix["bw-012-name-remains"].effect.definition.components, [
    { type: "modifier", selector: ["wis-based", "cha-based"], value: 1, modifierType: "status", predicate: [] }
  ]);
  assert.deepEqual(bySuffix["bw-015-thought-strikes-back"].effect.definition.components, [
    { type: "persistentDamage", formula: "1d4", damageType: "mental", dc: 15 }
  ]);
  assert.deepEqual(bySuffix["bw-018-no-second-voice"].effect.definition.components, [
    { type: "immunity", immunityType: "stupefied" }
  ]);
});

test("second-pass Will contextual countershocks require matching mental or fear effects", () => {
  const bySuffix = Object.fromEntries(BLOODIED_WILL_CARDS.map((card) => [card.id.split(".").at(-1), card]));
  for (const id of [
    "bw-011-will-shows-teeth",
    "bw-014-foreign-thought-gives-itself-away",
    "bw-015-thought-strikes-back",
    "bw-016-intruder-loses-the-thread"
  ]) {
    assert.deepEqual(bySuffix[id].filters.attackTraits, ["mental"]);
    assert.deepEqual(bySuffix[id].filters.excludedTargetTraits, ["mindless"]);
  }
  assert.deepEqual(bySuffix["bw-013-fear-forgets-the-way"].filters.attackTraits, ["fear"]);
});

test("second-pass Will target roles keep boons on the saver and countershocks on the hostile source", () => {
  const secondPass = BLOODIED_WILL_CARDS.slice(10, 20).filter((card) => card.effect);
  assert.equal(secondPass.filter((card) => card.effect.target === "source").length, 5);
  assert.equal(secondPass.filter((card) => card.effect.target === "target").length, 4);
});

test("German second-pass Will text uses established condition and DC terminology", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang", "de.json"), "utf8"));
  const will = de.PF2E_AGAINST_ALL_ODDS.Cards.BloodiedTriumphs.Will;
  assert.match(will.FearForgetsTheWay.Description, /Fliehend/u);
  assert.match(will.NoSecondVoice.Description, /Benommen/u);
  assert.match(will.IntruderLosesTheThread.Description, /Zauber-SG/u);
  assert.match(will.IntruderLosesTheThread.Description, /Klassen-SG/u);
});



test("eighty-card review uses German Situationsbonus/Situationsmalus terminology", () => {
  const deText = fs.readFileSync(path.join(root, "lang", "de.json"), "utf8");
  assert.doesNotMatch(deText, /Umstandsbonus|Umstandsmalus/u);
  assert.match(deText, /Situationsbonus/u);
  assert.match(deText, /Situationsmalus/u);
});

test("all automated persistent-damage cards use unlimited effect duration", () => {
  const persistentCards = ALL_CARDS.filter((card) => card.effect?.definition.components.some((component) => component.type === "persistentDamage"));
  assert.equal(persistentCards.length >= 3, true);
  for (const card of persistentCards) {
    assert.deepEqual(card.effect.definition.duration, { value: -1, unit: "unlimited", expiry: null }, card.id);
  }
});

test("eighty-card review removes the duplicate temporary-HP Last Reserve mechanic", () => {
  const card = BLOODIED_FORTITUDE_CARDS.find((entry) => entry.id.endsWith("bf-019-last-reserve"));
  assert.equal(card.impact, "moderate");
  assert.deepEqual(card.effect.definition.components, [{ type: "resistance", resistanceType: "all-damage", value: 1 }]);
});

test("regeneration disclosure and Pain Becomes Authority impact match the eighty-card review", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang", "de.json"), "utf8"));
  assert.match(de.PF2E_AGAINST_ALL_ODDS.Cards.BloodiedTriumphs.Fortitude.FleshRemembers.Description, /Sterbend nicht über 3/u);
  const authority = BLOODIED_WILL_CARDS.find((entry) => entry.id.endsWith("bw-017-pain-becomes-authority"));
  assert.equal(authority.impact, "strong");
});


test("the final Attack pass completes a 15/15 split with contextual weapon and spell filters", () => {
  const finalPass = BLOODIED_ATTACK_CARDS.slice(20);
  assert.equal(finalPass.length, 10);
  assert.equal(finalPass.every((card) => card.metadata.contentBatch === 9), true);
  assert.equal(finalPass.filter((card) => card.category === "criticalHit").length, 5);
  assert.equal(finalPass.filter((card) => card.category === "spellCriticalHit").length, 5);
  const bySuffix = Object.fromEntries(finalPass.map((card) => [card.id.split(".").at(-1), card]));
  assert.deepEqual(bySuffix["ba-021-drive-them-back"].filters.attackTraits, ["melee"]);
  assert.deepEqual(bySuffix["ba-022-ruin-their-aim"].filters.attackTraits, ["ranged"]);
  assert.deepEqual(bySuffix["ba-023-bone-rings-like-a-bell"].filters.damageTypes, ["bludgeoning"]);
  assert.deepEqual(bySuffix["ba-024-cut-to-the-core"].filters.damageTypes, ["slashing"]);
  assert.deepEqual(bySuffix["ba-025-find-the-nerve"].filters.damageTypes, ["piercing"]);
  assert.deepEqual(bySuffix["ba-026-light-in-the-wound"].filters.spellTraits, ["light"]);
  assert.deepEqual(bySuffix["ba-030-acid-finds-the-seam"].filters.spellTraits, ["acid"]);
});

test("final save passes add context-aware quarter-health, wounded, and battlefield gates without rewriting legacy conditions", () => {
  assert.equal(BLOODIED_FORTITUDE_CARDS.slice(0, 20).every((card) => card.conditions.type === "condition"), true);
  assert.equal(BLOODIED_REFLEX_CARDS.slice(0, 20).every((card) => card.conditions.type === "condition"), true);
  assert.equal(BLOODIED_WILL_CARDS.slice(0, 20).every((card) => card.conditions.type === "condition"), true);
  for (const card of [
    BLOODIED_FORTITUDE_CARDS.find((entry) => entry.id.endsWith("bf-021-last-quarter")),
    BLOODIED_FORTITUDE_CARDS.find((entry) => entry.id.endsWith("bf-022-wounded-stands-taller")),
    BLOODIED_FORTITUDE_CARDS.find((entry) => entry.id.endsWith("bf-023-ring-of-enemies-becomes-armor")),
    BLOODIED_REFLEX_CARDS.find((entry) => entry.id.endsWith("br-021-their-lines-cross-behind-you")),
    BLOODIED_REFLEX_CARDS.find((entry) => entry.id.endsWith("br-022-four-blades-one-rhythm")),
    BLOODIED_REFLEX_CARDS.find((entry) => entry.id.endsWith("br-023-quarter-breath-defense")),
    BLOODIED_WILL_CARDS.find((entry) => entry.id.endsWith("bw-028-too-hurt-to-be-small"))
  ]) {
    assert.equal(card.conditions.type, "group", card.id);
    assert.equal(card.conditions.mode, "all", card.id);
    assert.equal(conditionLeaves(card.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.bloodied.matched"), true, card.id);
  }
});

test("the final Fortitude, Reflex, and Will passes each use one manual result and no new immunity components", () => {
  for (const [cards, batch, manualSuffix] of [
    [BLOODIED_FORTITUDE_CARDS, 10, "bf-030-stand-because-you-must"],
    [BLOODIED_REFLEX_CARDS, 11, "br-030-behind-them-before-they-turn"],
    [BLOODIED_WILL_CARDS, 12, "bw-030-see-the-hand-behind-it"]
  ]) {
    const finalPass = cards.slice(20);
    assert.equal(finalPass.every((card) => card.metadata.contentBatch === batch), true);
    assert.deepEqual(finalPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), [manualSuffix]);
    assert.equal(finalPass.flatMap((card) => card.effect?.definition.components ?? []).some((component) => component.type === "immunity"), false);
  }
});

test("Bloodied Triumphs completes 120 unique cards with a stable 108 automated / 12 manual split", () => {
  assert.equal(ALL_CARDS.length, 120);
  assert.equal(new Set(ALL_CARDS.map((card) => card.id)).size, 120);
  assert.equal(ALL_CARDS.filter((card) => card.effect).length, 108);
  assert.equal(ALL_CARDS.filter((card) => !card.effect).length, 12);
});


test("Surrounded, Still Standing Attack deck contains thirty cards after the final pass", () => {
  assert.equal(SURROUNDED_ATTACK_CARDS.length, 30);
  assert.equal(new Set(SURROUNDED_ATTACK_CARDS.map((card) => card.id)).size, 30);
  assert.equal(SURROUNDED_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length, 15);
  assert.equal(SURROUNDED_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length, 15);
  assert.equal(SURROUNDED_ATTACK_CARDS.every((card) => card.deckType === "attack"), true);
  assert.equal(SURROUNDED_ATTACK_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.surroundedStillStanding), true);
  assert.equal(SURROUNDED_ATTACK_CARDS.slice(0, 10).every((card) => card.metadata.contentBatch === 13), true);
  assert.equal(SURROUNDED_ATTACK_CARDS.slice(10, 20).every((card) => card.metadata.contentBatch === 17), true);
  assert.equal(SURROUNDED_ATTACK_CARDS.slice(20).every((card) => card.metadata.contentBatch === 20), true);
});

test("all Surrounded Attack cards use the dynamic surrounded gate", () => {
  for (const card of SURROUNDED_ATTACK_CARDS) {
    const leaves = conditionLeaves(card.conditions);
    assert.equal(leaves.some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.matched" && leaf.operator === "eq" && leaf.value === true), true, card.id);
    assert.equal(Object.isFrozen(card), true);
    assert.equal(Object.isFrozen(card.conditions), true);
  }
});

test("heavier Surrounded Attack results require three or four threatening enemies", () => {
  const three = SURROUNDED_ATTACK_CARDS.find((card) => card.id.endsWith("ssa-004-three-blades-one-focus"));
  const four = SURROUNDED_ATTACK_CARDS.find((card) => card.id.endsWith("ssa-008-four-against-one"));
  assert.equal(conditionLeaves(three.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 3), true);
  assert.equal(conditionLeaves(four.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 4), true);
});

test("Surrounded Attack first pass keeps hostile and beneficial targets intentional", () => {
  const firstPass = SURROUNDED_ATTACK_CARDS.slice(0, 10);
  const automated = firstPass.filter((card) => card.effect);
  assert.equal(automated.length, 9);
  assert.equal(firstPass.filter((card) => !card.effect).length, 1);
  assert.equal(automated.filter((card) => card.effect.target === "source").length, 3);
  assert.equal(automated.filter((card) => card.effect.target === "target").length, 6);
  assert.equal(firstPass.find((card) => card.id.endsWith("ssa-008-four-against-one")).filters.excludedTargetTraits.includes("mindless"), true);
});

test("Surrounded Attack card and effect localization keys exist in German and English", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang", "de.json"), "utf8"));
  const en = JSON.parse(fs.readFileSync(path.join(root, "lang", "en.json"), "utf8"));
  for (const language of [de, en]) {
    for (const card of SURROUNDED_ATTACK_CARDS) {
      assert.equal(typeof getPath(language, card.titleKey), "string", card.titleKey);
      assert.equal(typeof getPath(language, card.descriptionKey), "string", card.descriptionKey);
      if (card.effect) assert.equal(typeof getPath(language, card.effect.nameKey), "string", card.effect.nameKey);
    }
  }
});


test("Surrounded first-pass cards use Forge-supported tones, impacts, filters, and schema-2 effects", () => {
  const tones = new Set(["neutral", "serious", "dramatic", "humorous"]);
  const impacts = new Set(["light", "moderate", "strong"]);
  for (const card of SURROUNDED_ATTACK_CARDS) {
    assert.equal(tones.has(card.tone), true, card.id);
    assert.equal(impacts.has(card.impact), true, card.id);
    for (const key of FILTER_KEYS) assert.equal(Array.isArray(card.filters[key]), true, `${card.id}:${key}`);
    if (card.effect) {
      assert.equal(card.effect.definition.schemaVersion, 2, card.id);
      assert.equal(card.effect.nameKey.startsWith("PF2E_AGAINST_ALL_ODDS.Effects.SurroundedStillStanding.Attack."), true, card.id);
    }
  }
});


test("Surrounded Attack second pass adds five Strike and five spell criticals with formation-specific mechanics", () => {
  const secondPass = SURROUNDED_ATTACK_CARDS.slice(10, 20);
  assert.equal(secondPass.length, 10);
  assert.equal(secondPass.filter((card) => card.category === "criticalHit").length, 5);
  assert.equal(secondPass.filter((card) => card.category === "spellCriticalHit").length, 5);
  assert.equal(secondPass.every((card) => card.metadata.contentBatch === 17), true);
  assert.deepEqual(secondPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), [
    "ssa-015-shoulder-the-ring-open",
    "ssa-020-carve-a-magical-corridor"
  ]);
  const components = secondPass.flatMap((card) => card.effect?.definition.components ?? []);
  assert.equal(components.some((component) => component.type === "weakness" && component.weaknessType === "weapons"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "stupefied"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "off-guard"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "frightened"), true);
});

test("Surrounded Attack second pass escalates at three and four threats without weakening the base pool", () => {
  const bySuffix = Object.fromEntries(SURROUNDED_ATTACK_CARDS.slice(10).map((card) => [card.id.split(".").at(-1), card]));
  for (const suffix of ["ssa-013-more-blades-fewer-openings", "ssa-018-pressure-finds-the-weak-link"]) {
    assert.equal(conditionLeaves(bySuffix[suffix].conditions).some((leaf) =>
      leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 3
    ), true, suffix);
  }
  for (const suffix of ["ssa-014-four-bodies-one-bottleneck", "ssa-019-four-shadows-one-flash"]) {
    assert.equal(conditionLeaves(bySuffix[suffix].conditions).some((leaf) =>
      leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 4
    ), true, suffix);
  }
});

test("Surrounded Attack second pass uses current-opponent threat gating for formation attacks", () => {
  const expected = new Set([
    "ssa-011-turn-the-ring-against-them",
    "ssa-012-crowd-their-footwork",
    "ssa-014-four-bodies-one-bottleneck",
    "ssa-017-arc-through-the-crowd",
    "ssa-018-pressure-finds-the-weak-link",
    "ssa-019-four-shadows-one-flash"
  ]);
  for (const card of SURROUNDED_ATTACK_CARDS.slice(10, 20)) {
    const suffix = card.id.split(".").at(-1);
    const hasGate = conditionLeaves(card.conditions).some((leaf) =>
      leaf.field === "extensions.againstAllOdds.surrounded.opponentIsThreatening" && leaf.operator === "eq" && leaf.value === true
    );
    assert.equal(hasGate, expected.has(suffix), card.id);
  }
});

test("Surrounded, Still Standing Fortitude deck contains thirty unique critical-save cards after the final pass", () => {
  assert.equal(SURROUNDED_FORTITUDE_CARDS.length, 30);
  assert.equal(new Set(SURROUNDED_FORTITUDE_CARDS.map((card) => card.id)).size, 30);
  assert.equal(SURROUNDED_FORTITUDE_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.surroundedStillStanding), true);
  assert.equal(SURROUNDED_FORTITUDE_CARDS.every((card) => card.deckType === "fortitude"), true);
  assert.equal(SURROUNDED_FORTITUDE_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(SURROUNDED_FORTITUDE_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "fortitude"), true);
  assert.equal(SURROUNDED_FORTITUDE_CARDS.slice(0, 10).every((card) => card.metadata.contentBatch === 14), true);
  assert.equal(SURROUNDED_FORTITUDE_CARDS.slice(10, 20).every((card) => card.metadata.contentBatch === 18), true);
  assert.equal(SURROUNDED_FORTITUDE_CARDS.slice(20).every((card) => card.metadata.contentBatch === 20), true);
});

test("all Surrounded Fortitude cards use the dynamic surrounded gate", () => {
  for (const card of SURROUNDED_FORTITUDE_CARDS) {
    const leaves = conditionLeaves(card.conditions);
    assert.equal(leaves.some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.matched" && leaf.operator === "eq" && leaf.value === true), true, card.id);
    assert.equal(Object.isFrozen(card), true);
    assert.equal(Object.isFrozen(card.conditions), true);
  }
});

test("heavier Surrounded Fortitude results require three or four threatening enemies", () => {
  const three = SURROUNDED_FORTITUDE_CARDS.find((card) => card.id.endsWith("ssf-004-three-against-stone"));
  const four = SURROUNDED_FORTITUDE_CARDS.find((card) => card.id.endsWith("ssf-005-four-cannot-fold-you"));
  assert.equal(conditionLeaves(three.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 3), true);
  assert.equal(conditionLeaves(four.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 4), true);
});

test("Surrounded Fortitude first pass keeps boons on the saver and one counterpressure effect on the hostile source", () => {
  const firstPass = SURROUNDED_FORTITUDE_CARDS.slice(0, 10);
  const automated = firstPass.filter((card) => card.effect);
  assert.equal(automated.length, 9);
  assert.deepEqual(firstPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), ["ssf-010-set-your-feet"]);
  assert.equal(automated.filter((card) => card.effect.target === "source").length, 8);
  assert.equal(automated.filter((card) => card.effect.target === "target").length, 1);
  assert.equal(SURROUNDED_FORTITUDE_CARDS.find((card) => card.id.endsWith("ssf-006-make-them-spend-themselves")).effect.target, "target");
});

test("Surrounded Fortitude first pass covers anchoring, bracing, recovery, and counterpressure", () => {
  const components = SURROUNDED_FORTITUDE_CARDS.slice(0, 10).flatMap((card) => card.effect?.definition.components ?? []);
  assert.equal(components.some((component) => component.type === "modifier" && Array.isArray(component.selector) && component.selector.includes("fortitude-dc") && component.selector.includes("ac")), true);
  assert.equal(components.some((component) => component.type === "resistance" && component.resistanceType === "physical"), true);
  assert.equal(components.some((component) => component.type === "fastHealing" && component.value === 3), true);
  assert.equal(components.some((component) => component.type === "modifier" && Array.isArray(component.selector) && component.selector.includes("attack-roll") && component.selector.includes("athletics") && component.value === -1), true);
  assert.equal(components.some((component) => component.type === "immunity"), false);
});

test("Surrounded Fortitude card and effect localization keys exist in German and English", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang", "de.json"), "utf8"));
  const en = JSON.parse(fs.readFileSync(path.join(root, "lang", "en.json"), "utf8"));
  for (const language of [de, en]) {
    for (const card of SURROUNDED_FORTITUDE_CARDS) {
      assert.equal(typeof getPath(language, card.titleKey), "string", card.titleKey);
      assert.equal(typeof getPath(language, card.descriptionKey), "string", card.descriptionKey);
      if (card.effect) assert.equal(typeof getPath(language, card.effect.nameKey), "string", card.effect.nameKey);
    }
  }
});

test("Surrounded Fortitude first pass uses Forge-supported tones, impacts, filters, and schema-2 effects", () => {
  const tones = new Set(["neutral", "serious", "dramatic", "humorous"]);
  const impacts = new Set(["light", "moderate", "strong"]);
  for (const card of SURROUNDED_FORTITUDE_CARDS) {
    assert.equal(tones.has(card.tone), true, card.id);
    assert.equal(impacts.has(card.impact), true, card.id);
    for (const key of FILTER_KEYS) assert.equal(Array.isArray(card.filters[key]), true, `${card.id}:${key}`);
    if (card.effect) {
      assert.equal(card.effect.definition.schemaVersion, 2, card.id);
      assert.equal(card.effect.nameKey.startsWith("PF2E_AGAINST_ALL_ODDS.Effects.SurroundedStillStanding.Fortitude."), true, card.id);
    }
  }
});


test("Surrounded Fortitude second pass adds ten formation-specific critical-save cards", () => {
  const secondPass = SURROUNDED_FORTITUDE_CARDS.slice(10, 20);
  assert.equal(secondPass.length, 10);
  assert.equal(secondPass.every((card) => card.metadata.contentBatch === 18), true);
  assert.deepEqual(secondPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), [
    "ssf-015-break-the-clinch",
    "ssf-020-make-a-shield-of-them"
  ]);
  assert.equal(secondPass.filter((card) => card.effect?.target === "source").length, 4);
  assert.equal(secondPass.filter((card) => card.effect?.target === "target").length, 4);
});

test("Surrounded Fortitude second pass escalates at three and four threats", () => {
  const three = SURROUNDED_FORTITUDE_CARDS.find((card) => card.id.endsWith("ssf-013-three-bodies-one-bastion"));
  const four = SURROUNDED_FORTITUDE_CARDS.find((card) => card.id.endsWith("ssf-014-four-hands-one-mistake"));
  assert.equal(conditionLeaves(three.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 3), true);
  const leaves = conditionLeaves(four.conditions);
  assert.equal(leaves.some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 4), true);
  assert.equal(leaves.some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.opponentIsThreatening" && leaf.operator === "eq" && leaf.value === true), true);
});

test("Surrounded Fortitude second pass favors leverage and counterpressure over new resistance or immunity series", () => {
  const secondPass = SURROUNDED_FORTITUDE_CARDS.slice(10, 20);
  const components = secondPass.flatMap((card) => card.effect?.definition.components ?? []);
  assert.equal(components.some((component) => component.type === "resistance"), false);
  assert.equal(components.some((component) => component.type === "immunity"), false);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "slowed"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "off-guard"), true);
  assert.equal(components.some((component) => component.type === "modifier" && Array.isArray(component.selector) && component.selector.includes("strike-damage") && component.selector.includes("athletics")), true);
});


test("Surrounded, Still Standing Reflex deck contains thirty unique critical-save cards after the final pass", () => {
  assert.equal(SURROUNDED_REFLEX_CARDS.length, 30);
  assert.equal(new Set(SURROUNDED_REFLEX_CARDS.map((card) => card.id)).size, 30);
  assert.equal(SURROUNDED_REFLEX_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.surroundedStillStanding), true);
  assert.equal(SURROUNDED_REFLEX_CARDS.every((card) => card.deckType === "reflex"), true);
  assert.equal(SURROUNDED_REFLEX_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(SURROUNDED_REFLEX_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "reflex"), true);
  assert.equal(SURROUNDED_REFLEX_CARDS.slice(0, 10).every((card) => card.metadata.contentBatch === 15), true);
  assert.equal(SURROUNDED_REFLEX_CARDS.slice(10, 20).every((card) => card.metadata.contentBatch === 18), true);
  assert.equal(SURROUNDED_REFLEX_CARDS.slice(20).every((card) => card.metadata.contentBatch === 20), true);
});

test("all Surrounded Reflex cards use the dynamic surrounded gate", () => {
  for (const card of SURROUNDED_REFLEX_CARDS) {
    const leaves = conditionLeaves(card.conditions);
    assert.equal(leaves.some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.matched" && leaf.operator === "eq" && leaf.value === true), true, card.id);
    assert.equal(Object.isFrozen(card), true);
    assert.equal(Object.isFrozen(card.conditions), true);
  }
});

test("heavier Surrounded Reflex results require three or four threatening enemies", () => {
  for (const suffix of ["ssr-003-three-threats-one-current", "ssr-013-three-angles-one-tempo"]) {
    const card = SURROUNDED_REFLEX_CARDS.find((entry) => entry.id.endsWith(suffix));
    assert.equal(conditionLeaves(card.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 3), true, suffix);
  }
  for (const suffix of ["ssr-004-four-threats-open-ground", "ssr-014-four-steps-one-misstep"]) {
    const card = SURROUNDED_REFLEX_CARDS.find((entry) => entry.id.endsWith(suffix));
    assert.equal(conditionLeaves(card.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 4), true, suffix);
  }
});

test("Surrounded Reflex first pass keeps boons on the saver and counterpressure on the hostile source", () => {
  const firstPass = SURROUNDED_REFLEX_CARDS.slice(0, 10);
  const automated = firstPass.filter((card) => card.effect);
  assert.equal(automated.length, 9);
  assert.deepEqual(firstPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), ["ssr-010-ghost-through-the-ring"]);
  assert.equal(automated.filter((card) => card.effect.target === "source").length, 7);
  assert.equal(automated.filter((card) => card.effect.target === "target").length, 2);
});

test("Surrounded Reflex cards cover mobility, cross-cover, precision defense, and counter-openings", () => {
  const components = SURROUNDED_REFLEX_CARDS.flatMap((card) => card.effect?.definition.components ?? []);
  assert.equal(components.some((component) => component.type === "movement" && component.movementType === "all" && component.value === 5), true);
  assert.equal(components.some((component) => component.type === "modifier" && Array.isArray(component.selector) && component.selector.includes("ac") && component.selector.includes("perception-dc")), true);
  assert.equal(components.some((component) => component.type === "resistance" && component.resistanceType === "precision" && component.value === 3), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "concealed"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "off-guard"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "clumsy"), true);
  assert.equal(components.some((component) => component.type === "modifier" && component.selector === "reflex-dc" && component.value === -1), true);
});

test("Surrounded Reflex card and effect localization keys exist in German and English", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang", "de.json"), "utf8"));
  const en = JSON.parse(fs.readFileSync(path.join(root, "lang", "en.json"), "utf8"));
  for (const language of [de, en]) {
    for (const card of SURROUNDED_REFLEX_CARDS) {
      assert.equal(typeof getPath(language, card.titleKey), "string", card.titleKey);
      assert.equal(typeof getPath(language, card.descriptionKey), "string", card.descriptionKey);
      if (card.effect) assert.equal(typeof getPath(language, card.effect.nameKey), "string", card.effect.nameKey);
    }
  }
});

test("Surrounded Reflex cards use Forge-supported tones, impacts, filters, and schema-2 effects", () => {
  const tones = new Set(["neutral", "serious", "dramatic", "humorous"]);
  const impacts = new Set(["light", "moderate", "strong"]);
  for (const card of SURROUNDED_REFLEX_CARDS) {
    assert.equal(tones.has(card.tone), true, card.id);
    assert.equal(impacts.has(card.impact), true, card.id);
    for (const key of FILTER_KEYS) assert.equal(Array.isArray(card.filters[key]), true, `${card.id}:${key}`);
    if (card.effect) {
      assert.equal(card.effect.definition.schemaVersion, 2, card.id);
      assert.equal(card.effect.nameKey.startsWith("PF2E_AGAINST_ALL_ODDS.Effects.SurroundedStillStanding.Reflex."), true, card.id);
    }
  }
});

test("Surrounded Reflex second pass adds ten formation-and-mobility critical-save cards", () => {
  const secondPass = SURROUNDED_REFLEX_CARDS.slice(10, 20);
  assert.equal(secondPass.length, 10);
  assert.equal(secondPass.every((card) => card.metadata.contentBatch === 18), true);
  assert.deepEqual(secondPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), [
    "ssr-015-tumble-through-the-teeth"
  ]);
  const components = secondPass.flatMap((card) => card.effect?.definition.components ?? []);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "clumsy"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "off-guard"), true);
  assert.equal(components.some((component) => component.type === "movement" && component.movementType === "all" && component.value === 5), true);
  assert.equal(components.some((component) => component.type === "resistance" || component.type === "immunity"), false);
});

test("Surrounded Reflex second pass uses current-opponent threat gating for ring geometry", () => {
  const expected = new Set([
    "ssr-012-ring-trips-over-itself",
    "ssr-014-four-steps-one-misstep",
    "ssr-017-turn-their-eyes-sideways",
    "ssr-019-one-body-blocks-the-next"
  ]);
  for (const card of SURROUNDED_REFLEX_CARDS.slice(10, 20)) {
    const suffix = card.id.split(".").at(-1);
    const hasGate = conditionLeaves(card.conditions).some((leaf) =>
      leaf.field === "extensions.againstAllOdds.surrounded.opponentIsThreatening" && leaf.operator === "eq" && leaf.value === true
    );
    assert.equal(hasGate, expected.has(suffix), card.id);
  }
});


test("Surrounded, Still Standing Will deck contains thirty unique critical-save cards after the final pass", () => {
  assert.equal(SURROUNDED_WILL_CARDS.length, 30);
  assert.equal(new Set(SURROUNDED_WILL_CARDS.map((card) => card.id)).size, 30);
  assert.equal(SURROUNDED_WILL_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.surroundedStillStanding), true);
  assert.equal(SURROUNDED_WILL_CARDS.every((card) => card.deckType === "will"), true);
  assert.equal(SURROUNDED_WILL_CARDS.every((card) => card.category === "savingThrowCriticalSuccess"), true);
  assert.equal(SURROUNDED_WILL_CARDS.every((card) => card.filters.saveTypes.length === 1 && card.filters.saveTypes[0] === "will"), true);
  assert.equal(SURROUNDED_WILL_CARDS.slice(0, 10).every((card) => card.metadata.contentBatch === 16), true);
  assert.equal(SURROUNDED_WILL_CARDS.slice(10, 20).every((card) => card.metadata.contentBatch === 19), true);
  assert.equal(SURROUNDED_WILL_CARDS.slice(20).every((card) => card.metadata.contentBatch === 20), true);
});

test("all Surrounded Will cards use the dynamic surrounded gate", () => {
  for (const card of SURROUNDED_WILL_CARDS) {
    const leaves = conditionLeaves(card.conditions);
    assert.equal(leaves.some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.matched" && leaf.operator === "eq" && leaf.value === true), true, card.id);
    assert.equal(Object.isFrozen(card), true);
    assert.equal(Object.isFrozen(card.conditions), true);
  }
});

test("heavier Surrounded Will results require three or four threatening enemies", () => {
  const three = SURROUNDED_WILL_CARDS.find((card) => card.id.endsWith("ssw-003-three-threats-one-answer"));
  const four = SURROUNDED_WILL_CARDS.find((card) => card.id.endsWith("ssw-004-four-threats-one-doubt"));
  assert.equal(conditionLeaves(three.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 3), true);
  assert.equal(conditionLeaves(four.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 4), true);
});

test("Surrounded Will first pass keeps most boons on the saver and two counterpressure effects on the hostile source", () => {
  const firstPass = SURROUNDED_WILL_CARDS.slice(0, 10);
  const automated = firstPass.filter((card) => card.effect);
  assert.equal(automated.length, 9);
  assert.deepEqual(firstPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), ["ssw-010-answer-every-voice"]);
  assert.equal(automated.filter((card) => card.effect.target === "source").length, 7);
  assert.equal(automated.filter((card) => card.effect.target === "target").length, 2);
});

test("Surrounded Will first pass covers resolve, fear reversal, mental defense, presence, and counterpressure", () => {
  const components = SURROUNDED_WILL_CARDS.slice(0, 10).flatMap((card) => card.effect?.definition.components ?? []);
  assert.equal(components.some((component) => component.type === "modifier" && component.selector === "will-dc" && component.value === 2), true);
  assert.equal(components.some((component) => component.type === "modifier" && Array.isArray(component.selector) && component.selector.includes("will") && component.selector.includes("will-dc")), true);
  assert.equal(components.some((component) => component.type === "resistance" && component.resistanceType === "mental" && component.value === 2), true);
  assert.equal(components.some((component) => component.type === "immunity"), false);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "frightened"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "stupefied"), true);
  assert.deepEqual(SURROUNDED_WILL_CARDS.find((card) => card.id.endsWith("ssw-005-fear-finds-no-leader")).filters.attackTraits, ["fear"]);
  assert.deepEqual(SURROUNDED_WILL_CARDS.find((card) => card.id.endsWith("ssw-006-no-command-owns-the-circle")).filters.attackTraits, ["mental"]);
});

test("Surrounded Will card and effect localization keys exist in German and English", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang", "de.json"), "utf8"));
  const en = JSON.parse(fs.readFileSync(path.join(root, "lang", "en.json"), "utf8"));
  for (const language of [de, en]) {
    for (const card of SURROUNDED_WILL_CARDS) {
      assert.equal(typeof getPath(language, card.titleKey), "string", card.titleKey);
      assert.equal(typeof getPath(language, card.descriptionKey), "string", card.descriptionKey);
      if (card.effect) assert.equal(typeof getPath(language, card.effect.nameKey), "string", card.effect.nameKey);
    }
  }
});

test("Surrounded Will cards use Forge-supported tones, impacts, filters, and schema-2 effects", () => {
  const tones = new Set(["neutral", "serious", "dramatic", "humorous"]);
  const impacts = new Set(["light", "moderate", "strong"]);
  for (const card of SURROUNDED_WILL_CARDS) {
    assert.equal(tones.has(card.tone), true, card.id);
    assert.equal(impacts.has(card.impact), true, card.id);
    for (const key of FILTER_KEYS) assert.equal(Array.isArray(card.filters[key]), true, `${card.id}:${key}`);
    if (card.effect) {
      assert.equal(card.effect.definition.schemaVersion, 2, card.id);
      assert.equal(card.effect.nameKey.startsWith("PF2E_AGAINST_ALL_ODDS.Effects.SurroundedStillStanding.Will."), true, card.id);
    }
  }
});


test("Surrounded Will second pass adds ten resolve-and-counterpressure critical-save cards", () => {
  const secondPass = SURROUNDED_WILL_CARDS.slice(10, 20);
  assert.equal(secondPass.length, 10);
  assert.equal(secondPass.every((card) => card.metadata.contentBatch === 19), true);
  assert.deepEqual(secondPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), [
    "ssw-015-pass-the-defiance-on"
  ]);
  const components = secondPass.flatMap((card) => card.effect?.definition.components ?? []);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "frightened"), true);
  assert.equal(components.some((component) => component.type === "condition" && component.slug === "off-guard"), true);
  assert.equal(components.some((component) => component.type === "resistance" || component.type === "immunity"), false);
});

test("Surrounded Will second pass scales at three and four threats and uses current-opponent gating for direct counterpressure", () => {
  const three = SURROUNDED_WILL_CARDS.find((card) => card.id.endsWith("ssw-013-three-threats-one-stillness"));
  const four = SURROUNDED_WILL_CARDS.find((card) => card.id.endsWith("ssw-014-four-threats-one-cracked-nerve"));
  assert.equal(conditionLeaves(three.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 3), true);
  assert.equal(conditionLeaves(four.conditions).some((leaf) => leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 4), true);

  const expected = new Set([
    "ssw-011-make-one-voice-falter",
    "ssw-014-four-threats-one-cracked-nerve",
    "ssw-017-their-certainty-breaks-first",
    "ssw-019-a-mental-grip-leaves-an-opening"
  ]);
  for (const card of SURROUNDED_WILL_CARDS.slice(10, 20)) {
    const suffix = card.id.split(".").at(-1);
    const hasGate = conditionLeaves(card.conditions).some((leaf) =>
      leaf.field === "extensions.againstAllOdds.surrounded.opponentIsThreatening" && leaf.operator === "eq" && leaf.value === true
    );
    assert.equal(hasGate, expected.has(suffix), card.id);
  }
});

test("Surrounded Will second pass separates self boons, hostile counterpressure, and one manual ally-support result", () => {
  const secondPass = SURROUNDED_WILL_CARDS.slice(10, 20);
  const automated = secondPass.filter((card) => card.effect);
  assert.equal(automated.length, 9);
  assert.equal(automated.filter((card) => card.effect.target === "source").length, 5);
  assert.equal(automated.filter((card) => card.effect.target === "target").length, 4);
  assert.equal(secondPass.find((card) => card.id.endsWith("ssw-015-pass-the-defiance-on")).tags.includes("ally"), true);
  assert.deepEqual(secondPass.find((card) => card.id.endsWith("ssw-018-fear-has-too-many-faces")).filters.attackTraits, ["fear"]);
  assert.deepEqual(secondPass.find((card) => card.id.endsWith("ssw-019-a-mental-grip-leaves-an-opening")).filters.attackTraits, ["mental"]);
});

test("target-centric Surrounded cards require the current opponent to be a counted melee threat", () => {
  const expectedSuffixes = new Set([
    "ssa-002-break-their-rhythm",
    "ssa-003-one-foe-becomes-the-gap",
    "ssa-007-magic-tears-the-formation",
    "ssa-009-ring-turns-inward",
    "ssa-010-no-free-angle",
    "ssa-011-turn-the-ring-against-them",
    "ssa-012-crowd-their-footwork",
    "ssa-014-four-bodies-one-bottleneck",
    "ssa-017-arc-through-the-crowd",
    "ssa-018-pressure-finds-the-weak-link",
    "ssa-019-four-shadows-one-flash",
    "ssf-006-make-them-spend-themselves",
    "ssf-011-turn-their-weight-against-them",
    "ssf-012-brace-on-their-advance",
    "ssf-014-four-hands-one-mistake",
    "ssf-018-one-body-takes-the-weight",
    "ssf-019-force-meets-formation",
    "ssr-005-overreach-opens-the-source",
    "ssr-006-balance-turns-against-them",
    "ssr-012-ring-trips-over-itself",
    "ssr-014-four-steps-one-misstep",
    "ssr-017-turn-their-eyes-sideways",
    "ssr-019-one-body-blocks-the-next",
    "ssw-011-make-one-voice-falter",
    "ssw-014-four-threats-one-cracked-nerve",
    "ssw-017-their-certainty-breaks-first",
    "ssw-019-a-mental-grip-leaves-an-opening",
    "ssa-021-make-them-watch-each-other",
    "ssa-024-four-bodies-one-domino",
    "ssa-025-break-their-approach",
    "ssa-026-magic-makes-a-blind-side",
    "ssa-029-four-threats-one-faultline",
    "ssf-021-overcommitment-costs-them",
    "ssf-024-four-bodies-break-their-own-line",
    "ssf-026-their-grip-goes-soft",
    "ssr-021-their-eyes-collide",
    "ssr-024-four-threats-one-tangle",
    "ssr-026-source-loses-the-lane",
    "ssr-028-make-them-turn-too-far",
    "ssw-021-one-mind-breaks-rank",
    "ssw-024-four-threats-one-collapse-of-nerve",
    "ssw-026-shout-down-the-chorus",
    "ssw-029-their-focus-points-inward"
  ]);
  for (const card of ALL_SURROUNDED_CARDS) {
    const suffix = card.id.split(".").at(-1);
    const hasGate = conditionLeaves(card.conditions).some((leaf) =>
      leaf.field === "extensions.againstAllOdds.surrounded.opponentIsThreatening" && leaf.operator === "eq" && leaf.value === true
    );
    assert.equal(hasGate, expectedSuffixes.has(suffix), card.id);
  }
});


test("Surrounded final pass completes thirty cards per deck and 120 unique theme cards", () => {
  for (const cards of [SURROUNDED_ATTACK_CARDS, SURROUNDED_FORTITUDE_CARDS, SURROUNDED_REFLEX_CARDS, SURROUNDED_WILL_CARDS]) {
    assert.equal(cards.length, 30);
    assert.equal(cards.slice(20).every((card) => card.metadata.contentBatch === 20), true);
  }
  assert.equal(ALL_SURROUNDED_CARDS.length, 120);
  assert.equal(new Set(ALL_SURROUNDED_CARDS.map((card) => card.id)).size, 120);
  assert.equal(ALL_SURROUNDED_CARDS.filter((card) => card.effect).length, 100);
  assert.equal(ALL_SURROUNDED_CARDS.filter((card) => !card.effect).length, 20);
  assert.equal(SURROUNDED_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length, 15);
  assert.equal(SURROUNDED_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length, 15);
});

test("Surrounded final pass uses the intended manual split and keeps strong results sparse", () => {
  const expectations = [
    [SURROUNDED_ATTACK_CARDS, ["ssa-022-hook-the-outer-edge", "ssa-024-four-bodies-one-domino", "ssa-030-blink-through-the-line"]],
    [SURROUNDED_FORTITUDE_CARDS, ["ssf-025-anchor-and-turn", "ssf-029-break-the-pressure-chain", "ssf-030-stand-through-the-crush"]],
    [SURROUNDED_REFLEX_CARDS, ["ssr-025-cut-between-their-reactions", "ssr-030-run-the-seam"]],
    [SURROUNDED_WILL_CARDS, ["ssw-025-turn-the-chorus-on-itself", "ssw-030-call-the-opening"]]
  ];
  for (const [cards, expectedManual] of expectations) {
    const finalPass = cards.slice(20);
    assert.deepEqual(finalPass.filter((card) => !card.effect).map((card) => card.id.split(".").at(-1)), expectedManual);
    assert.equal(finalPass.filter((card) => card.impact === "strong").length, 1);
  }
});

test("each Surrounded final deck adds exactly one three-threat and one four-threat escalation", () => {
  for (const cards of [SURROUNDED_ATTACK_CARDS, SURROUNDED_FORTITUDE_CARDS, SURROUNDED_REFLEX_CARDS, SURROUNDED_WILL_CARDS]) {
    const finalPass = cards.slice(20);
    const three = finalPass.filter((card) => conditionLeaves(card.conditions).some((leaf) =>
      leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 3
    ));
    const four = finalPass.filter((card) => conditionLeaves(card.conditions).some((leaf) =>
      leaf.field === "extensions.againstAllOdds.surrounded.count" && leaf.operator === "gte" && leaf.value === 4
    ));
    assert.equal(three.length, 1);
    assert.equal(four.length, 1);
  }
});

test("Surrounded final save passes avoid new resistance and immunity series", () => {
  for (const cards of [SURROUNDED_FORTITUDE_CARDS, SURROUNDED_REFLEX_CARDS, SURROUNDED_WILL_CARDS]) {
    const components = cards.slice(20).flatMap((card) => card.effect?.definition.components ?? []);
    assert.equal(components.some((component) => component.type === "immunity"), false);
    assert.equal(components.some((component) => component.type === "resistance"), false);
  }
});

test("Surrounded final pass target gates match the cards that explicitly manipulate a ring opponent", () => {
  const expectedByDeck = new Map([
    [SURROUNDED_ATTACK_CARDS, new Set(["ssa-021-make-them-watch-each-other", "ssa-024-four-bodies-one-domino", "ssa-025-break-their-approach", "ssa-026-magic-makes-a-blind-side", "ssa-029-four-threats-one-faultline"])],
    [SURROUNDED_FORTITUDE_CARDS, new Set(["ssf-021-overcommitment-costs-them", "ssf-024-four-bodies-break-their-own-line", "ssf-026-their-grip-goes-soft"])],
    [SURROUNDED_REFLEX_CARDS, new Set(["ssr-021-their-eyes-collide", "ssr-024-four-threats-one-tangle", "ssr-026-source-loses-the-lane", "ssr-028-make-them-turn-too-far"])],
    [SURROUNDED_WILL_CARDS, new Set(["ssw-021-one-mind-breaks-rank", "ssw-024-four-threats-one-collapse-of-nerve", "ssw-026-shout-down-the-chorus", "ssw-029-their-focus-points-inward"])]
  ]);
  for (const [cards, expected] of expectedByDeck) {
    for (const card of cards.slice(20)) {
      const suffix = card.id.split(".").at(-1);
      const hasGate = conditionLeaves(card.conditions).some((leaf) =>
        leaf.field === "extensions.againstAllOdds.surrounded.opponentIsThreatening" && leaf.operator === "eq" && leaf.value === true
      );
      assert.equal(hasGate, expected.has(suffix), card.id);
    }
  }
});

test("Surrounded exact automated effect duplication against Bloodied stays at or below 25 percent", () => {
  const signature = (card) => card.effect == null ? null : JSON.stringify({ target: card.effect.target, definition: card.effect.definition });
  const bloodiedSignatures = new Set(ALL_CARDS.filter((card) => card.effect).map(signature));
  const automated = ALL_SURROUNDED_CARDS.filter((card) => card.effect);
  const duplicateCount = automated.filter((card) => bloodiedSignatures.has(signature(card))).length;
  assert.equal(duplicateCount, 9);
  assert.ok(duplicateCount / automated.length <= 0.25);
});

test("Three Blades, One Focus is a moderate mixed awareness-and-attack result after review", () => {
  const card = SURROUNDED_ATTACK_CARDS.find((entry) => entry.id.endsWith("ssa-004-three-blades-one-focus"));
  assert.equal(card.impact, "moderate");
  assert.deepEqual(card.effect.definition.components, [
    { type: "modifier", selector: ["attack-roll", "perception"], value: 1, modifierType: "circumstance", predicate: [] }
  ]);
});


test("Arc Through the Crowd is classified as strong after the eighty-card review", () => {
  const card = SURROUNDED_ATTACK_CARDS.find((entry) => entry.id.endsWith("ssa-017-arc-through-the-crowd"));
  assert.equal(card.impact, "strong");
});

test("Four Steps, One Misstep has its own formation-break mechanic after review", () => {
  const card = SURROUNDED_REFLEX_CARDS.find((entry) => entry.id.endsWith("ssr-014-four-steps-one-misstep"));
  assert.deepEqual(card.effect.definition.components, [
    { type: "condition", slug: "clumsy", value: 1 },
    { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }
  ]);
});

test("Surrounded internal exact automated duplicates remain limited to the two intentional pairs", () => {
  const signature = (card) => card.effect == null ? null : JSON.stringify({ target: card.effect.target, definition: card.effect.definition });
  const groups = new Map();
  for (const card of ALL_SURROUNDED_CARDS.filter((entry) => entry.effect)) {
    const key = signature(card);
    const list = groups.get(key) ?? [];
    list.push(card.id.split(".").at(-1));
    groups.set(key, list);
  }
  const duplicateGroups = [...groups.values()]
    .filter((entries) => entries.length > 1)
    .map((entries) => entries.sort())
    .sort((left, right) => left[0].localeCompare(right[0]));
  assert.deepEqual(duplicateGroups, [
    ["ssa-002-break-their-rhythm", "ssf-006-make-them-spend-themselves"],
    ["ssa-008-four-against-one", "ssw-005-fear-finds-no-leader"]
  ]);
});


test("Giant-Slayer Moments begins with ten Attack cards split five/five between Strike and spell criticals", () => {
  assert.equal(GIANT_SLAYER_ATTACK_CARDS.length, 10);
  assert.equal(new Set(GIANT_SLAYER_ATTACK_CARDS.map((card) => card.id)).size, 10);
  assert.equal(GIANT_SLAYER_ATTACK_CARDS.every((card) => card.packId === AGAINST_ALL_ODDS_PACK_IDS.giantSlayerMoments), true);
  assert.equal(GIANT_SLAYER_ATTACK_CARDS.every((card) => card.deckType === "attack"), true);
  assert.equal(GIANT_SLAYER_ATTACK_CARDS.filter((card) => card.category === "criticalHit").length, 5);
  assert.equal(GIANT_SLAYER_ATTACK_CARDS.filter((card) => card.category === "spellCriticalHit").length, 5);
  assert.equal(GIANT_SLAYER_ATTACK_CARDS.every((card) => card.metadata.contentBatch === 21), true);
});

test("all first-pass Giant-Slayer Attack cards use the dynamic level-gap gate", () => {
  for (const card of GIANT_SLAYER_ATTACK_CARDS) {
    const leaves = conditionLeaves(card.conditions);
    assert.equal(leaves.some((leaf) =>
      leaf.field === "extensions.againstAllOdds.giantSlayer.matched" && leaf.operator === "eq" && leaf.value === true
    ), true, card.id);
    assert.equal(Object.isFrozen(card), true);
    assert.equal(Object.isFrozen(card.conditions), true);
  }
});

test("Giant-Slayer first-pass escalation cards require four or five levels of disadvantage", () => {
  const bySuffix = Object.fromEntries(GIANT_SLAYER_ATTACK_CARDS.map((card) => [card.id.split(".").at(-1), card]));
  const four = conditionLeaves(bySuffix["gsa-008-greater-power-recoils"].conditions)
    .find((leaf) => leaf.field === "extensions.againstAllOdds.giantSlayer.levelGap");
  const five = conditionLeaves(bySuffix["gsa-005-five-levels-one-mistake"].conditions)
    .find((leaf) => leaf.field === "extensions.againstAllOdds.giantSlayer.levelGap");
  assert.deepEqual({ operator: four.operator, value: four.value }, { operator: "gte", value: 4 });
  assert.deepEqual({ operator: five.operator, value: five.value }, { operator: "gte", value: 5 });
});

test("Giant-Slayer first-pass Attack cards keep nine automated results and one manual insight result", () => {
  const automated = GIANT_SLAYER_ATTACK_CARDS.filter((card) => card.effect);
  const manual = GIANT_SLAYER_ATTACK_CARDS.filter((card) => !card.effect);
  assert.equal(automated.length, 9);
  assert.deepEqual(manual.map((card) => card.id.split(".").at(-1)), ["gsa-010-read-the-colossus"]);
  assert.equal(manual[0].tags.includes("manual"), true);
  for (const card of automated) {
    assert.equal(card.effect.definition.schemaVersion, 2);
    assert.equal(card.effect.definition.components.length > 0, true);
    assert.equal(card.effect.nameKey.startsWith("PF2E_AGAINST_ALL_ODDS.Effects.GiantSlayerMoments.Attack."), true);
  }
});

test("Giant-Slayer first-pass cards use complete immutable filters and Forge-supported presentation values", () => {
  const tones = new Set(["neutral", "serious", "dramatic", "humorous"]);
  const impacts = new Set(["light", "moderate", "strong"]);
  for (const card of GIANT_SLAYER_ATTACK_CARDS) {
    assert.deepEqual(Object.keys(card.filters), FILTER_KEYS);
    assert.equal(FILTER_KEYS.every((key) => Array.isArray(card.filters[key]) && Object.isFrozen(card.filters[key])), true, card.id);
    assert.equal(tones.has(card.tone), true, card.id);
    assert.equal(impacts.has(card.impact), true, card.id);
  }
});

test("Giant-Slayer first-pass card and effect localization keys exist in German and English", () => {
  const de = JSON.parse(fs.readFileSync(path.join(root, "lang/de.json"), "utf8"));
  const en = JSON.parse(fs.readFileSync(path.join(root, "lang/en.json"), "utf8"));
  for (const card of GIANT_SLAYER_ATTACK_CARDS) {
    for (const tree of [de, en]) {
      assert.equal(typeof getPath(tree, card.titleKey), "string", card.titleKey);
      assert.equal(typeof getPath(tree, card.descriptionKey), "string", card.descriptionKey);
      if (card.effect) assert.equal(typeof getPath(tree, card.effect.nameKey), "string", card.effect.nameKey);
    }
  }
});

test("Giant-Slayer first-pass automated mechanics are distinct from published Bloodied and Surrounded exact signatures", () => {
  const signature = (card) => card.effect == null ? null : JSON.stringify({ target: card.effect.target, definition: card.effect.definition });
  const existing = new Set([...ALL_CARDS, ...ALL_SURROUNDED_CARDS].filter((card) => card.effect).map(signature));
  const giantAutomated = ALL_GIANT_SLAYER_CARDS.filter((card) => card.effect);
  assert.equal(giantAutomated.filter((card) => existing.has(signature(card))).length, 0);
  assert.equal(new Set(giantAutomated.map(signature)).size, giantAutomated.length);
});
