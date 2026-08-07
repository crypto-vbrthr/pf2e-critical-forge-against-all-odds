import { defineGiantSlayerReflexCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const GIANT_SLAYER_REFLEX_CARDS = Object.freeze([
  defineGiantSlayerReflexCard({
    id: "gsr-001-duck-beneath-the-impossible",
    localizationKey: "DuckBeneathTheImpossible",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Duck Beneath the Impossible",
    fallbackDescription: "The stronger foe fills the battlefield with danger, but scale also creates space beneath the obvious line. For 1 round, you gain a +1 status bonus to Reflex saves and Acrobatics checks.",
    tags: ["reflex", "acrobatics", "dead-angle", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["reflex", "acrobatics"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-002-momentum-exposes-the-flank",
    localizationKey: "MomentumExposesTheFlank",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Momentum Exposes the Flank",
    fallbackDescription: "The hostile source commits enough mass to overwhelm you and has too much of itself in motion to recover cleanly. For 1 round, it is off-guard and takes a -1 circumstance penalty to Athletics checks.",
    tags: ["hostile-source", "off-guard", "athletics", "momentum", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "athletics", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-003-let-the-giant-overshoot",
    localizationKey: "LetTheGiantOvershoot",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Let the Giant Overshoot",
    fallbackDescription: "You leave the line at the last possible instant and the stronger foe has to drag its own attack back under control. For 1 round, the hostile source takes a -1 circumstance penalty to attack rolls and a 5-foot circumstance penalty to all Speeds.",
    tags: ["hostile-source", "attack-roll", "movement", "overshoot", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-004-five-levels-one-empty-square",
    localizationKey: "FiveLevelsOneEmptySquare",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, One Empty Square",
    fallbackDescription: "Against a foe five or more levels above you, one impossible dodge turns its scale into visual clutter. For 1 round, you are concealed and gain a +5-foot circumstance bonus to your land Speed.",
    tags: ["extreme-gap", "concealed", "movement", "escape", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "concealed" },
        { type: "movement", movementType: "land", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-005-size-becomes-a-blind-spot",
    localizationKey: "SizeBecomesABlindSpot",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Size Becomes a Blind Spot",
    fallbackDescription: "The stronger foe can dominate space but cannot watch every part of it equally well. For 1 round, you gain a +1 circumstance bonus to AC and Stealth checks.",
    tags: ["ac", "stealth", "blind-spot", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "stealth"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-006-footing-cannot-follow",
    localizationKey: "FootingCannotFollow",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Their Footing Cannot Follow",
    fallbackDescription: "You change direction faster than the stronger foe can bring its balance with it. For 1 round, the hostile source is clumsy 1 and takes a -1 circumstance penalty to Reflex DC.",
    tags: ["hostile-source", "clumsy", "reflex-dc", "balance", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-007-impact-becomes-distance",
    localizationKey: "ImpactBecomesDistance",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Impact Becomes Distance",
    fallbackDescription: "The force meant to catch you becomes the rhythm of your escape. For 1 round, you gain a +5-foot status bonus to your land Speed and a +1 circumstance bonus to Reflex DC.",
    tags: ["land-speed", "reflex-dc", "momentum", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "land", value: 5, modifierType: "status" },
        { type: "modifier", selector: "reflex-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-008-four-levels-too-much-momentum",
    localizationKey: "FourLevelsTooMuchMomentum",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Levels, Too Much Momentum",
    fallbackDescription: "Against a foe four or more levels above you, the force of the failed catch becomes a collapse in posture. For 1 round, the hostile source is prone and takes a -1 circumstance penalty to attack rolls.",
    tags: ["greater-gap", "hostile-source", "prone", "attack-roll", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "prone" },
        { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-009-read-the-shadow-not-the-weapon",
    localizationKey: "ReadTheShadowNotTheWeapon",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Read the Shadow, Not the Weapon",
    fallbackDescription: "Against something this powerful, watching the weapon is already too late. You read the whole body instead. For 1 round, you gain a +1 status bonus to Perception checks and Reflex DC.",
    tags: ["perception", "reflex-dc", "read-movement", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["perception", "reflex-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-010-cross-the-dead-angle",
    localizationKey: "CrossTheDeadAngle",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Cross the Dead Angle",
    fallbackDescription: "The stronger foe's failed attack creates a brief route through the space it cannot immediately cover. You may immediately Step or Take Cover as a free action. If you Step, movement does not trigger reactions from the hostile source. Apply this result manually.",
    tags: ["step", "take-cover", "free-action", "dead-angle", "manual"],
    effect: null
  })
]);
