import { defineBloodiedAttackCard } from "./card-factory.js";

const SOURCE_ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-start" });
const TARGET_ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const BLOODIED_ATTACK_CARDS = Object.freeze([
  defineBloodiedAttackCard({
    id: "ba-001-not-yet",
    localizationKey: "NotYet",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Not Yet",
    fallbackDescription: "Pain meets defiance and loses. For 1 round, you gain 5 temporary Hit Points.",
    tags: ["temporary-hit-points", "survival", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 5 }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-002-pain-honed-edge",
    localizationKey: "PainHonedEdge",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Pain-Honed Edge",
    fallbackDescription: "Every wound redraws the line of your next attack. For 1 round, you gain a +1 circumstance bonus to attack rolls.",
    tags: ["attack-roll", "circumstance-bonus", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "attack-roll", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-003-back-against-the-world",
    localizationKey: "BackAgainstTheWorld",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Back Against the World",
    fallbackDescription: "You find a stance where none should remain. For 1 round, you gain a +1 circumstance bonus to AC.",
    tags: ["armor-class", "circumstance-bonus", "defense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-004-blood-in-the-stride",
    localizationKey: "BloodInTheStride",
    category: "criticalHit",
    tone: "dramatic",
    impact: "light",
    fallbackTitle: "Blood in the Stride",
    fallbackDescription: "Your body chooses speed over collapse. For 1 round, you gain a +10-foot status bonus to your land Speed.",
    tags: ["movement", "land-speed", "status-bonus", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "movement", movementType: "land", value: 10, modifierType: "status" }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-005-you-flinch-first",
    localizationKey: "YouFlinchFirst",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "You Flinch First",
    fallbackDescription: "The enemy realizes the wounded creature still has teeth. The target becomes frightened 1 for 1 round.",
    tags: ["target", "frightened", "emotion", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "frightened", value: 1 }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-006-crimson-afterimage",
    localizationKey: "CrimsonAfterimage",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Crimson Afterimage",
    fallbackDescription: "The spell tears a second, blood-red outline from your body. For 1 round, you are concealed.",
    tags: ["concealed", "afterimage", "defense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "condition", slug: "concealed" }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-007-will-through-the-wound",
    localizationKey: "WillThroughTheWound",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Will Through the Wound",
    fallbackDescription: "The successful spell proves that your will is still stronger than your injuries. For 1 round, you gain a +1 status bonus to saving throws.",
    tags: ["saving-throws", "status-bonus", "defiance", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "saving-throw", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-008-wound-holds-the-weave",
    localizationKey: "WoundHoldsTheWeave",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Wound Holds the Weave",
    fallbackDescription: "For one impossible moment, your injuries anchor magic instead of weakening it. For 1 round, you gain resistance 2 to all damage.",
    tags: ["resistance", "all-damage", "defense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "all-damage", value: 2 }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-009-scarlet-opening",
    localizationKey: "ScarletOpening",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Scarlet Opening",
    fallbackDescription: "The critical spell leaves the target's defenses traced in red. For 1 round, the target takes a -1 circumstance penalty to saving throws.",
    tags: ["target", "saving-throws", "circumstance-penalty", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "modifier", selector: "saving-throw", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-010-one-more-breath",
    localizationKey: "OneMoreBreath",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "One More Breath",
    fallbackDescription: "The spell buys a heartbeat from a future that had already spent it. You may immediately Step as a free action, following the normal restrictions of Step.",
    tags: ["step", "free-action", "movement", "manual"],
    effect: null
  })
]);
