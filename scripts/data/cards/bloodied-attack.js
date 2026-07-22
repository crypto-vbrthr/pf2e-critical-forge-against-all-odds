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
    fallbackDescription: "Pain turns into force before it can become weakness. For 1 round, you gain a +2 circumstance bonus to Strike damage.",
    tags: ["strike-damage", "circumstance-bonus", "offense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "strike-damage", value: 2, modifierType: "circumstance", predicate: [] }
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
    fallbackTitle: "Against the Whole World",
    fallbackDescription: "Your counterstroke tears open the defense that should have ended you. The target is off-guard for 1 round.",
    tags: ["target", "off-guard", "opening", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-004-blood-in-the-stride",
    localizationKey: "BloodInTheStride",
    category: "criticalHit",
    tone: "dramatic",
    impact: "light",
    fallbackTitle: "Blood in the Grip",
    fallbackDescription: "The pain steadies your hands and gives your threat a terrible certainty. For 1 round, you gain a +1 status bonus to Athletics and Intimidation checks.",
    tags: ["athletics", "intimidation", "status-bonus", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: ["athletics", "intimidation"], value: 1, modifierType: "status", predicate: [] }
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
    fallbackDescription: "The target recoils before the wounded creature that should have broken. The target becomes clumsy 1 for 1 round.",
    tags: ["target", "clumsy", "recoil", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 }
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
    fallbackDescription: "The spell leaves a second, blood-red impact inside every wound it opens. For 1 round, you gain a +2 status bonus to spell damage.",
    tags: ["spell-damage", "status-bonus", "offense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "spell-damage", value: 2, modifierType: "status", predicate: [] }
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
