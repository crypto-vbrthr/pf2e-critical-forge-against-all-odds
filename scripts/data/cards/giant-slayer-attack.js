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
    tags: ["ac", "reflex", "defense", "melee-threat", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
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
    tags: ["target", "athletics", "movement", "leverage", "larger-opponent", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true },
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
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-011-cut-the-long-lever",
    localizationKey: "CutTheLongLever",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Cut the Long Lever",
    fallbackDescription: "Against a larger foe, the limb that grants reach is also a lever. Your critical hit spoils it. For 1 round, the target is enfeebled 1 and takes a 5-foot circumstance penalty to all Speeds.",
    tags: ["target", "enfeebled", "movement", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 25,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-012-beneath-the-center-of-mass",
    localizationKey: "BeneathTheCenterOfMass",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Beneath the Center of Mass",
    fallbackDescription: "A foe two or more size steps above you has power everywhere except the angle directly beneath its balance. For 1 round, you gain a +1 circumstance bonus to Acrobatics checks and Strike damage.",
    tags: ["acrobatics", "strike-damage", "size-gap", "counteroffense", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.sizeGap", operator: "gte", value: 2 },
    contentBatch: 25,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["acrobatics", "strike-damage"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-013-make-power-commit",
    localizationKey: "MakePowerCommit",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Make Power Commit",
    fallbackDescription: "Against a foe four or more levels above you, the only safe opening is the one it creates by committing too much. For 1 round, the target is clumsy 1 and takes a -1 circumstance penalty to Fortitude DC.",
    tags: ["greater-gap", "target", "clumsy", "fortitude-dc", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 25,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "fortitude-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-014-hit-above-the-numbers",
    localizationKey: "HitAboveTheNumbers",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Hit Above the Numbers",
    fallbackDescription: "The stronger foe can absorb ordinary pressure. Your critical hit attacks the places its statistics cannot cover. For 1 round, the target takes a -1 circumstance penalty to Fortitude DC and Reflex DC.",
    tags: ["target", "fortitude-dc", "reflex-dc", "opening", "effect"],
    contentBatch: 25,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude-dc", "reflex-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-015-run-the-giants-line",
    localizationKey: "RunTheGiantsLine",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Run the Giant's Line",
    fallbackDescription: "Your critical hit opens a route through the larger foe's own stance. You may immediately attempt to Tumble Through the target as a free action with a +2 circumstance bonus to the Acrobatics check. Apply this result manually.",
    tags: ["tumble-through", "acrobatics", "free-action", "larger-opponent", "melee-threat", "manual"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 25,
    effect: null
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-016-power-needs-room",
    localizationKey: "PowerNeedsRoom",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Power Needs Room",
    fallbackDescription: "The critical spell denies the stronger foe the space its power expects. For 1 round, the target takes a 5-foot circumstance penalty to all Speeds and a -1 circumstance penalty to Reflex DC.",
    tags: ["spell", "target", "movement", "reflex-dc", "constraint", "effect"],
    contentBatch: 25,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" },
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-017-make-the-impossible-blink",
    localizationKey: "MakeTheImpossibleBlink",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Make the Impossible Blink",
    fallbackDescription: "The stronger foe has seen power before. It has not seen yours land like this. For 1 round, the target is dazzled and takes a 5-foot circumstance penalty to all Speeds.",
    tags: ["spell", "target", "dazzled", "movement", "disruption", "effect"],
    contentBatch: 25,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "dazzled" },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-018-five-levels-one-breach",
    localizationKey: "FiveLevelsOneBreach",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, One Breach",
    fallbackDescription: "Against a foe five or more levels above you, the critical spell proves that even impossible defenses can fail together. For 1 round, the target is off-guard and takes a -1 circumstance penalty to saving throws.",
    tags: ["spell", "extreme-gap", "target", "off-guard", "saving-throws", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    contentBatch: 25,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "saving-throw", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-019-the-first-crack-is-real",
    localizationKey: "TheFirstCrackIsReal",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "The First Crack Is Real",
    fallbackDescription: "Once your spell proves the stronger foe can be hurt, everyone sees where the legend ends and the target begins. For 1 round, the target gains weakness 1 to all damage and takes a -1 circumstance penalty to AC.",
    tags: ["spell", "target", "weakness", "ac", "teamwork", "effect"],
    contentBatch: 25,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "weakness", weaknessType: "all-damage", value: 1 },
        { type: "modifier", selector: "ac", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerAttackCard({
    id: "gsa-020-share-the-impossible-opening",
    localizationKey: "ShareTheImpossibleOpening",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Share the Impossible Opening",
    fallbackDescription: "The critical spell opens a moment too large to keep for yourself. One ally within 30 feet who can see the target may immediately Step as a free action. Apply this result manually.",
    tags: ["spell", "ally", "step", "free-action", "teamwork", "manual"],
    contentBatch: 25,
    effect: null
  })

]);
