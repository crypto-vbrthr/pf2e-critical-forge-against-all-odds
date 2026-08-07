import { defineSurroundedAttackCard } from "./card-factory.js";

const SOURCE_ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-start" });
const TARGET_ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const SURROUNDED_ATTACK_CARDS = Object.freeze([
  defineSurroundedAttackCard({
    id: "ssa-001-center-does-not-break",
    localizationKey: "CenterDoesNotBreak",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Center Does Not Break",
    fallbackDescription: "Where others would retreat, you become the fixed point in the ring. For 1 round, you gain a +1 circumstance bonus to AC.",
    tags: ["ac", "circumstance-bonus", "defense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [{ type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-002-break-their-rhythm",
    localizationKey: "BreakTheirRhythm",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Break Their Rhythm",
    fallbackDescription: "Your counterstroke makes the ring hesitate. For 1 round, the target takes a -1 circumstance penalty to attack rolls.",
    tags: ["target", "attack-roll", "circumstance-penalty", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-003-one-foe-becomes-the-gap",
    localizationKey: "OneFoeBecomesTheGap",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "One Foe Becomes the Gap",
    fallbackDescription: "The critical hit turns one part of the encirclement into a liability. The target becomes clumsy 1 for 1 round.",
    tags: ["target", "clumsy", "formation", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "condition", slug: "clumsy", value: 1 }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-004-three-blades-one-focus",
    localizationKey: "ThreeBladesOneFocus",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Three Blades, One Focus",
    fallbackDescription: "With three or more enemies pressing in, every threat becomes a guide to the next opening. For 1 round, you gain a +1 circumstance bonus to attack rolls.",
    tags: ["heavily-surrounded", "attack-roll", "circumstance-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [{ type: "modifier", selector: "attack-roll", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-005-through-the-gap",
    localizationKey: "ThroughTheGap",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Through the Gap",
    fallbackDescription: "The critical blow opens a heartbeat of space. You may immediately Step as a free action; if possible, end the Step in a space where fewer enemies threaten you. Apply this result manually.",
    tags: ["step", "positioning", "free-action", "manual"],
    effect: null
  }),
  defineSurroundedAttackCard({
    id: "ssa-006-pressure-sharpens-the-formula",
    localizationKey: "PressureSharpensTheFormula",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Pressure Sharpens the Formula",
    fallbackDescription: "Every closing blade strips another distraction from the spell. For 1 round, you gain a +1 circumstance bonus to spell attack rolls.",
    tags: ["spell", "spell-attack-roll", "circumstance-bonus", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [{ type: "modifier", selector: "spell-attack-roll", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-007-magic-tears-the-formation",
    localizationKey: "MagicTearsTheFormation",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Magic Tears the Formation",
    fallbackDescription: "The spell turns the target into the weak seam of the encirclement. For 1 round, the target takes a -1 circumstance penalty to saving throws.",
    tags: ["spell", "target", "saving-throws", "circumstance-penalty", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "modifier", selector: "saving-throw", value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-008-four-against-one",
    localizationKey: "FourAgainstOne",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Against One",
    fallbackDescription: "Four or more enemies close in and still the spell lands perfectly. The target becomes frightened 1.",
    tags: ["spell", "heavily-surrounded", "target", "frightened", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "condition", slug: "frightened", value: 1 }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-009-ring-turns-inward",
    localizationKey: "RingTurnsInward",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "The Ring Turns Inward",
    fallbackDescription: "The spell makes one enemy the fault line in the whole formation. For 1 round, the target gains weakness 1 to all damage.",
    tags: ["spell", "target", "weakness", "teamwork", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "weakness", weaknessType: "all-damage", value: 1 }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-010-no-free-angle",
    localizationKey: "NoFreeAngle",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "No Free Angle",
    fallbackDescription: "The spell steals the target's ability to close the ring cleanly. For 1 round, the target takes a -5-foot circumstance penalty to all Speeds.",
    tags: ["spell", "target", "movement", "circumstance-penalty", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }]
    }
  })
]);
