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
    tags: ["reflex", "acrobatics", "dead-angle", "larger-opponent", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true },
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
    tags: ["hostile-source", "off-guard", "athletics", "momentum", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [{ field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }, { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }],
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
    tags: ["hostile-source", "attack-roll", "movement", "overshoot", "melee-threat", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
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
    fallbackDescription: "Against a larger foe five or more levels above you, one impossible dodge turns its scale into visual clutter. Until the start of your next turn, you are concealed from the hostile source, and you may immediately Step as a free action. Apply this observer-relative concealment manually.",
    tags: ["extreme-gap", "concealed", "step", "free-action", "larger-opponent", "manual"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    effect: null
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-005-size-becomes-a-blind-spot",
    localizationKey: "SizeBecomesABlindSpot",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Size Becomes a Blind Spot",
    fallbackDescription: "The stronger foe can dominate space but cannot watch every part of it equally well. For 1 round, you gain a +1 circumstance bonus to AC and Stealth checks.",
    tags: ["ac", "stealth", "blind-spot", "larger-opponent", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true },
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
    tags: ["hostile-source", "clumsy", "reflex-dc", "balance", "melee-threat", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
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
    tags: ["greater-gap", "hostile-source", "prone", "attack-roll", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }
    ],
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
    tags: ["step", "take-cover", "free-action", "dead-angle", "melee-threat", "manual"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    effect: null
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-011-turn-inside-the-swing",
    localizationKey: "TurnInsideTheSwing",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Turn Inside the Swing",
    fallbackDescription: "A larger hostile source commits to a line built for something slower. You fold inside the arc before it can close. For 1 round, you gain a +1 circumstance bonus to AC, Reflex saves, and Acrobatics checks.",
    tags: ["ac", "reflex", "acrobatics", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 27,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "reflex", "acrobatics"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-012-their-reach-becomes-your-route",
    localizationKey: "TheirReachBecomesYourRoute",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Their Reach Becomes Your Route",
    fallbackDescription: "Two or more size steps of reach create a corridor once you stop fleeing from the obvious direction. For 1 round, you gain a +5-foot status bonus to your land Speed and a +1 status bonus to Acrobatics checks.",
    tags: ["land-speed", "acrobatics", "size-gap", "mobility", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.sizeGap", operator: "gte", value: 2 },
    contentBatch: 27,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "land", value: 5, modifierType: "status" },
        { type: "modifier", selector: "acrobatics", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-013-four-levels-cannot-stop-short",
    localizationKey: "FourLevelsCannotStopShort",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Levels, Cannot Stop Short",
    fallbackDescription: "Against a threatening foe four or more levels above you, the failed catch becomes an overcommitment it cannot erase. For 1 round, the hostile source is off-guard, takes a -1 circumstance penalty to Reflex DC, and takes a 5-foot circumstance penalty to all Speeds.",
    tags: ["greater-gap", "hostile-source", "off-guard", "reflex-dc", "movement", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 27,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-014-read-the-impact-before-it-lands",
    localizationKey: "ReadTheImpactBeforeItLands",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Read the Impact Before It Lands",
    fallbackDescription: "You stop reacting to the strike and start reading the pressure that comes before it. For 1 round, you gain a +1 circumstance bonus to Reflex saves, Perception checks, and AC.",
    tags: ["reflex", "perception", "ac", "anticipation", "effect"],
    contentBatch: 27,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["reflex", "perception", "ac"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-015-slip-between-their-steps",
    localizationKey: "SlipBetweenTheirSteps",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Slip Between Their Steps",
    fallbackDescription: "A foe at least two size steps larger leaves a moving gap where its reach and footing do not agree. You may immediately move up to 10 feet as a free action. This movement does not trigger reactions from the hostile source and must end no farther from it than you began. Apply this result manually.",
    tags: ["free-action", "movement", "size-gap", "dead-angle", "melee-threat", "manual"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.sizeGap", operator: "gte", value: 2 }
    ],
    contentBatch: 27,
    effect: null
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-016-too-much-body-to-turn",
    localizationKey: "TooMuchBodyToTurn",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Too Much Body to Turn",
    fallbackDescription: "The larger hostile source tries to correct after you pass its line, but there is simply too much of it to turn at once. For 1 round, it is clumsy 1 and takes a -1 circumstance penalty to AC.",
    tags: ["hostile-source", "clumsy", "ac", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 27,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "ac", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-017-momentum-becomes-your-tempo",
    localizationKey: "MomentumBecomesYourTempo",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Momentum Becomes Your Tempo",
    fallbackDescription: "You survive the stronger foe's speed and steal its rhythm for yourself. For 1 round, you gain a +5-foot status bonus to your land Speed and a +1 circumstance bonus to attack rolls and Reflex saves.",
    tags: ["land-speed", "attack-roll", "reflex", "counteroffense", "effect"],
    contentBatch: 27,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "land", value: 5, modifierType: "status" },
        { type: "modifier", selector: ["attack-roll", "reflex"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-018-five-levels-still-ahead-of-it",
    localizationKey: "FiveLevelsStillAheadOfIt",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, Still Ahead of It",
    fallbackDescription: "A foe five or more levels above you commits enough speed to make escape look impossible. You are already beyond the answer. For 1 round, you gain a +5-foot status bonus to all Speeds and a +1 status bonus to AC and Reflex saves.",
    tags: ["extreme-gap", "movement", "ac", "reflex", "mobility", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    contentBatch: 27,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: 5, modifierType: "status" },
        { type: "modifier", selector: ["ac", "reflex"], value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-019-drag-the-colossus-off-line",
    localizationKey: "DragTheColossusOffLine",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Drag the Colossus Off Line",
    fallbackDescription: "A larger hostile source follows your escape one fraction too far and has to rebuild its entire line of attack. For 1 round, it takes a -1 circumstance penalty to attack rolls, Reflex DC, and Perception DC.",
    tags: ["hostile-source", "attack-roll", "reflex-dc", "perception-dc", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 27,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "reflex-dc", "perception-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerReflexCard({
    id: "gsr-020-outside-the-killing-line",
    localizationKey: "OutsideTheKillingLine",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Outside the Killing Line",
    fallbackDescription: "The stronger foe's failed attack gives you more than an empty square; it gives you a route out of the next one. You may immediately Stride up to half your Speed as a free action. This movement must end farther from the hostile source and does not trigger reactions from it. Apply this result manually.",
    tags: ["stride", "free-action", "movement", "escape-route", "melee-threat", "manual"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 27,
    effect: null
  })
]);
