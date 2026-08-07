import { defineGiantSlayerFortitudeCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const GIANT_SLAYER_FORTITUDE_CARDS = Object.freeze([
  defineGiantSlayerFortitudeCard({
    id: "gsf-001-unmoved-by-the-impossible",
    localizationKey: "UnmovedByTheImpossible",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Unmoved by the Impossible",
    fallbackDescription: "The stronger foe expected raw force to decide the matter. Your body refuses the premise. For 1 round, you gain a +1 circumstance bonus to Fortitude DC and Athletics checks.",
    tags: ["fortitude-dc", "athletics", "brace", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude-dc", "athletics"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-002-their-force-betrays-them",
    localizationKey: "TheirForceBetraysThem",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Their Force Betrays Them",
    fallbackDescription: "The hostile source commits enough force to crush you and instead exposes its own structure. For 1 round, it takes a -1 circumstance penalty to attack rolls and Fortitude DC.",
    tags: ["hostile-source", "attack-roll", "fortitude-dc", "counterpressure", "melee-threat", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "fortitude-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-003-survive-then-strike",
    localizationKey: "SurviveThenStrike",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Survive, Then Strike",
    fallbackDescription: "You withstand what should have ended the exchange and turn survival into timing. For 1 round, you gain a +1 status bonus to Fortitude saves and attack rolls.",
    tags: ["fortitude", "attack-roll", "counteroffense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "attack-roll"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-004-weight-turns-against-them",
    localizationKey: "WeightTurnsAgainstThem",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Weight Turns Against Them",
    fallbackDescription: "The hostile source leans on overwhelming strength and finds its own mass fighting back. For 1 round, it is enfeebled 1 and takes a -1 circumstance penalty to Athletics checks.",
    tags: ["hostile-source", "enfeebled", "athletics", "leverage", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [{ field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }, { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 },
        { type: "modifier", selector: "athletics", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-005-five-levels-still-standing",
    localizationKey: "FiveLevelsStillStanding",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, Still Standing",
    fallbackDescription: "A foe five or more levels above you unleashes its strength and you are still there when the force passes. For 1 round, you gain a +1 status bonus to AC and saving throws.",
    tags: ["extreme-gap", "ac", "saving-throws", "defense", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "saving-throw"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-006-heart-above-the-measure",
    localizationKey: "HeartAboveTheMeasure",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Heart Above the Measure",
    fallbackDescription: "The contest says you are outmatched. Your body supplies a different answer. For 1 round, you gain a +1 status bonus to Fortitude saves and class DC.",
    tags: ["fortitude", "class-dc", "resolve", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "class-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-007-impact-opens-the-guard",
    localizationKey: "ImpactOpensTheGuard",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Impact Opens the Guard",
    fallbackDescription: "The hostile source expected you to fold and overcommits when you do not. For 1 round, it is off-guard and takes a -1 circumstance penalty to Fortitude DC.",
    tags: ["hostile-source", "off-guard", "fortitude-dc", "opening", "melee-threat", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "fortitude-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-008-overreach-has-a-price",
    localizationKey: "OverreachHasAPrice",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Overreach Has a Price",
    fallbackDescription: "Against a foe four or more levels above you, surviving its full commitment turns strength into imbalance. For 1 round, the hostile source is enfeebled 1 and takes a -1 circumstance penalty to Reflex DC.",
    tags: ["greater-gap", "hostile-source", "enfeebled", "reflex-dc", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }
    ],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 },
        { type: "modifier", selector: "reflex", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-009-survival-becomes-counterforce",
    localizationKey: "SurvivalBecomesCounterforce",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Survival Becomes Counterforce",
    fallbackDescription: "You do not merely absorb the stronger foe's power; you carry it into the answer. For 1 round, you gain a +1 circumstance bonus to Strike damage and Fortitude saves.",
    tags: ["strike-damage", "fortitude", "counteroffense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["strike-damage", "fortitude"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-010-step-into-their-shadow",
    localizationKey: "StepIntoTheirShadow",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Step Into Their Shadow",
    fallbackDescription: "The stronger foe's power passes you and leaves one instant in which distance belongs to you. You may immediately Step as a free action. If possible, the Step must reduce the distance to the hostile source. Apply this result manually.",
    tags: ["step", "free-action", "close-distance", "manual"],
    effect: null
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-011-force-meets-a-foundation",
    localizationKey: "ForceMeetsAFoundation",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Force Meets a Foundation",
    fallbackDescription: "The stronger foe brings enough force to move anyone. Your critical success proves that you are not anyone. For 1 round, you gain a +1 circumstance bonus to Fortitude saves, AC, and Fortitude DC.",
    tags: ["fortitude", "ac", "fortitude-dc", "brace", "effect"],
    contentBatch: 26,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "ac", "fortitude-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-012-anchor-beneath-the-colossus",
    localizationKey: "AnchorBeneathTheColossus",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Anchor Beneath the Colossus",
    fallbackDescription: "A larger foe tries to make scale itself the weapon. You find the point where all that mass has to push against you. For 1 round, you gain a +1 circumstance bonus to AC, Athletics checks, and Fortitude saves.",
    tags: ["ac", "athletics", "larger-opponent", "melee-threat", "brace", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 26,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "athletics", "fortitude"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-013-four-levels-spent-strength",
    localizationKey: "FourLevelsSpentStrength",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Four Levels, Spent Strength",
    fallbackDescription: "Against a foe four or more levels above you, surviving its full commitment leaves its strength badly placed. For 1 round, the hostile source takes a -1 circumstance penalty to attack rolls, Athletics checks, and Fortitude DC.",
    tags: ["greater-gap", "hostile-source", "attack-roll", "athletics", "fortitude-dc", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 26,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "athletics", "fortitude-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-014-the-body-keeps-the-lesson",
    localizationKey: "TheBodyKeepsTheLesson",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Body Keeps the Lesson",
    fallbackDescription: "Your body survives the impossible once and immediately learns from it. For 1 round, you gain 5 temporary Hit Points and a +1 circumstance bonus to attack rolls.",
    tags: ["temporary-hp", "attack-roll", "counteroffense", "effect"],
    contentBatch: 26,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 5 },
        { type: "modifier", selector: "attack-roll", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-015-move-the-immovable",
    localizationKey: "MoveTheImmovable",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Move the Immovable",
    fallbackDescription: "The larger foe expected you to be the thing that moved. Instead, you get one impossible instant of leverage. If the hostile source is within your reach and you meet the other normal prerequisites for Shove, you may immediately attempt to Shove it as a free action with a +2 circumstance bonus to the Athletics check. You can attempt this Shove regardless of the target's size. Otherwise, you may immediately Step toward the hostile source. Apply this result manually.",
    tags: ["shove", "athletics", "free-action", "larger-opponent", "melee-threat", "manual"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 26,
    effect: null
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-016-mass-cannot-recover",
    localizationKey: "MassCannotRecover",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Mass Cannot Recover",
    fallbackDescription: "A larger hostile source commits its whole frame and discovers that mass is slow to recover. For 1 round, it is clumsy 1, takes a -1 circumstance penalty to Fortitude DC, and takes a 5-foot circumstance penalty to all Speeds.",
    tags: ["hostile-source", "clumsy", "fortitude-dc", "movement", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 26,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "fortitude-dc", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-017-endurance-reads-the-opening",
    localizationKey: "EnduranceReadsTheOpening",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Endurance Reads the Opening",
    fallbackDescription: "You remain conscious inside pressure that should have erased every useful thought. For 1 round, you gain a +1 status bonus to Perception checks, attack rolls, and class DC.",
    tags: ["perception", "attack-roll", "class-dc", "awareness", "counteroffense", "effect"],
    contentBatch: 26,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["perception", "attack-roll", "class-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-018-five-levels-still-breathing",
    localizationKey: "FiveLevelsStillBreathing",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, Still Breathing",
    fallbackDescription: "A foe five or more levels above you spends enough power to end the argument. Your body answers by continuing. For 1 round, you gain fast healing 3 and a +1 status bonus to saving throws.",
    tags: ["extreme-gap", "fast-healing", "saving-throws", "survival", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    contentBatch: 26,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "fastHealing", value: 3 },
        { type: "modifier", selector: "saving-throw", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-019-their-frame-pays-the-price",
    localizationKey: "TheirFramePaysThePrice",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Their Frame Pays the Price",
    fallbackDescription: "You survive the stronger foe's pressure long enough for its own body to become the weak link. For 1 round, the hostile source is enfeebled 1 and takes a -1 circumstance penalty to AC.",
    tags: ["hostile-source", "enfeebled", "ac", "melee-threat", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 26,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 },
        { type: "modifier", selector: "ac", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-020-break-the-impossible-hold",
    localizationKey: "BreakTheImpossibleHold",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Break the Impossible Hold",
    fallbackDescription: "The stronger foe fails to make your body obey, and for one instant every hold feels breakable. If you are grabbed, restrained, or immobilized by the hostile source, you may immediately attempt to Escape as a free action with a +2 circumstance bonus. Otherwise, you may immediately Step. Apply this result manually.",
    tags: ["escape", "step", "free-action", "recovery", "melee-threat", "manual"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 26,
    effect: null
  })
,
  defineGiantSlayerFortitudeCard({
    id: "gsf-021-take-the-measure-of-force",
    localizationKey: "TakeTheMeasureOfForce",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Take the Measure of Force",
    fallbackDescription: "The stronger foe tests your body and accidentally teaches you the exact weight of the next impact. For 1 round, you gain a +1 circumstance bonus to Fortitude saves and Perception DC.",
    tags: ["fortitude", "perception-dc", "assessment", "effect"],
    contentBatch: 29,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "perception-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-022-the-bigger-they-lean",
    localizationKey: "TheBiggerTheyLean",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "The Bigger They Lean",
    fallbackDescription: "The larger foe commits its whole frame and discovers that mass takes time to recover. For 1 round, the hostile source is clumsy 1 and takes a -1 circumstance penalty to Perception DC.",
    tags: ["hostile-source", "clumsy", "attack-roll", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 29,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "perception-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-023-four-levels-force-runs-out",
    localizationKey: "FourLevelsForceRunsOut",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Levels, Force Runs Out",
    fallbackDescription: "Against a foe four or more levels above you, surviving the full effort leaves its next motion late. For 1 round, the hostile source is slowed 1 and takes a -1 circumstance penalty to Athletics checks.",
    tags: ["greater-gap", "hostile-source", "slowed", "athletics", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 29,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "slowed", value: 1 },
        { type: "modifier", selector: "athletics", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-024-pain-converts-to-leverage",
    localizationKey: "PainConvertsToLeverage",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Pain Converts to Leverage",
    fallbackDescription: "You absorb what should have folded you and turn the surviving tension into useful force. You gain 3 temporary Hit Points and a +1 circumstance bonus to Athletics checks for 1 round.",
    tags: ["temporary-hit-points", "athletics", "leverage", "effect"],
    contentBatch: 29,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 3 },
        { type: "modifier", selector: "athletics", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-025-stand-before-the-colossus",
    localizationKey: "StandBeforeTheColossus",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Stand Before the Colossus",
    fallbackDescription: "The stronger foe expects the impact to decide where you belong. If you are prone, you may immediately Stand as a free action; this movement does not trigger reactions from the hostile source. Otherwise, you may immediately Step. Apply this result manually.",
    tags: ["stand", "step", "movement", "free-action", "melee-threat", "manual"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 29,
    effect: null
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-026-frame-outlasts-impact",
    localizationKey: "FrameOutlastsImpact",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Frame Outlasts Impact",
    fallbackDescription: "Your body takes the stronger foe's measure and refuses to be defined by it. For 1 round, you gain a +1 circumstance bonus to Fortitude DC and class DC.",
    tags: ["fortitude-dc", "class-dc", "resolve", "effect"],
    contentBatch: 29,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude-dc", "class-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-027-their-weight-becomes-delay",
    localizationKey: "TheirWeightBecomesDelay",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Their Weight Becomes Delay",
    fallbackDescription: "The larger foe cannot pull all that weight back into guard at once. For 1 round, the hostile source takes a 5-foot circumstance penalty to all Speeds and a -1 circumstance penalty to Reflex saves.",
    tags: ["hostile-source", "movement", "reflex", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 29,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" },
        { type: "modifier", selector: "reflex", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-028-five-levels-strength-buckles",
    localizationKey: "FiveLevelsStrengthBuckles",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, Strength Buckles",
    fallbackDescription: "Against a foe five or more levels above you, surviving the impossible effort makes the stronger body pay for every ounce of force. For 1 round, the hostile source is enfeebled 1 and slowed 1.",
    tags: ["extreme-gap", "hostile-source", "enfeebled", "slowed", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 29,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 },
        { type: "condition", slug: "slowed", value: 1 }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-029-endure-then-command-space",
    localizationKey: "EndureThenCommandSpace",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Endure, Then Command Space",
    fallbackDescription: "The stronger foe tried to dictate the battlefield with force. Your survival gives you the authority to push back. For 1 round, you gain a +1 status bonus to Athletics checks and class DC.",
    tags: ["athletics", "class-dc", "status-bonus", "effect"],
    contentBatch: 29,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["athletics", "class-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-030-bring-the-weight-down",
    localizationKey: "BringTheWeightDown",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Bring the Weight Down",
    fallbackDescription: "The larger foe's own mass gives you the line. If the hostile source is within your reach and you meet the normal prerequisites for Trip other than its size restriction, you may immediately attempt to Trip it as a free action with a +2 circumstance bonus to the Athletics check, ignoring Trip's normal size restriction. Otherwise, you may immediately Step toward the hostile source. Apply this result manually.",
    tags: ["trip", "athletics", "free-action", "larger-opponent", "melee-threat", "manual"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }
    ],
    contentBatch: 29,
    effect: null
  })
]);
