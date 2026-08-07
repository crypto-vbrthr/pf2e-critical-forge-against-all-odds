import { defineGiantSlayerAttackCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const GIANT_SLAYER_ATTACK_CARDS = Object.freeze([
  defineGiantSlayerAttackCard({
    id: "gsa-001-find-the-joint",
    localizationKey: "FindTheJoint",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Find the Joint",
    fallbackDescription: "Power builds armor around the obvious places. Your critical hit finds the seam instead. For 1 round, the target takes a -1 circumstance penalty to AC and Fortitude DC.",
    tags: ["target", "ac", "fortitude-dc", "precision", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "fortitude-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-002-beneath-their-reach",
    localizationKey: "BeneathTheirReach",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Beneath Their Reach",
    fallbackDescription: "The stronger foe has reach, weight, and confidence. You have already stepped inside all three. For 1 round, you gain a +1 circumstance bonus to AC and Reflex saves.",
    tags: ["ac", "reflex", "defense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "reflex"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-003-make-the-giant-kneel",
    localizationKey: "MakeTheGiantKneel",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Make the Giant Kneel",
    fallbackDescription: "Your critical hit steals the footing from a foe who should have been impossible to move. For 1 round, the target is prone and takes a -1 circumstance penalty to Reflex DC.",
    tags: ["target", "prone", "balance", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "prone" },
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-004-reach-becomes-leverage",
    localizationKey: "ReachBecomesLeverage",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Reach Becomes Leverage",
    fallbackDescription: "The larger foe has farther to recover when you spoil the line of the attack. For 1 round, the target takes a -1 circumstance penalty to Athletics checks and a 5-foot circumstance penalty to all Speeds.",
    tags: ["target", "athletics", "movement", "leverage", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "athletics", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-005-five-levels-one-mistake",
    localizationKey: "FiveLevelsOneMistake",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, One Mistake",
    fallbackDescription: "A foe five or more levels above you makes one mistake, and you make it enormous. For 1 round, the target is clumsy 1 and off-guard.",
    tags: ["extreme-gap", "target", "clumsy", "off-guard", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "condition", slug: "off-guard" }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-006-formula-above-your-station",
    localizationKey: "FormulaAboveYourStation",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Formula Above Your Station",
    fallbackDescription: "The spell succeeds where the mathematics said it should not. For 1 round, you gain a +1 circumstance bonus to spell attack rolls and spell DC.",
    tags: ["spell", "spell-attack-roll", "spell-dc", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["spell-attack-roll", "spell-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-007-magic-finds-the-smallest-crack",
    localizationKey: "MagicFindsTheSmallestCrack",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Magic Finds the Smallest Crack",
    fallbackDescription: "Your spell turns a hairline flaw in impossible defenses into a breach everyone can exploit. For 1 round, the target takes a -1 circumstance penalty to AC, saving throws, and Perception checks.",
    tags: ["spell", "target", "ac", "saving-throws", "breach", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "saving-throw", "perception"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-008-greater-power-recoils",
    localizationKey: "GreaterPowerRecoils",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Greater Power Recoils",
    fallbackDescription: "Against a foe four or more levels above you, the critical spell makes its own power recoil through the opening. For 1 round, the target is stupefied 1 and takes a -1 circumstance penalty to class DC.",
    tags: ["spell", "greater-gap", "target", "stupefied", "class-dc", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
    filters: { excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "stupefied", value: 1 },
        { type: "modifier", selector: "class-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-009-impossible-arc-perfect-impact",
    localizationKey: "ImpossibleArcPerfectImpact",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Impossible Arc, Perfect Impact",
    fallbackDescription: "The scale of the opponent makes the impossible trajectory suddenly obvious. For 1 round, you gain a +1 status bonus to spell damage rolls and Perception checks.",
    tags: ["spell", "spell-damage", "perception", "status-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["spell-damage", "perception"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-010-read-the-colossus",
    localizationKey: "ReadTheColossus",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Read the Colossus",
    fallbackDescription: "The critical spell reveals how the stronger foe is put together. You may immediately Recall Knowledge about the target as a free action with a +2 circumstance bonus. Apply this result manually.",
    tags: ["spell", "recall-knowledge", "free-action", "insight", "manual"],
    effect: null
  })
]);
