import { defineSurroundedFortitudeCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const SURROUNDED_FORTITUDE_CARDS = Object.freeze([
  defineSurroundedFortitudeCard({
    id: "ssf-001-body-is-the-anchor",
    localizationKey: "BodyIsTheAnchor",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Body Is the Anchor",
    fallbackDescription: "The ring presses inward and your stance ties defense to endurance. For 1 round, you gain a +1 circumstance bonus to AC and Fortitude DC.",
    tags: ["ac", "fortitude-dc", "anchor", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "fortitude-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-002-pressure-hardens-the-frame",
    localizationKey: "PressureHardensTheFrame",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Pressure Hardens the Frame",
    fallbackDescription: "Every enemy leaning into the crush teaches your body where to harden and brace. For 1 round, you gain resistance 2 to physical damage and a +1 circumstance bonus to Athletics checks.",
    tags: ["physical", "resistance", "athletics", "brace", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "physical", value: 2 },
        { type: "modifier", selector: "athletics", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-003-no-hand-finds-purchase",
    localizationKey: "NoHandFindsPurchase",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "No Hand Finds Purchase",
    fallbackDescription: "Too many hands reach for you, giving you leverage against every hold. For 1 round, you gain a +2 circumstance bonus to Athletics checks and Fortitude DC.",
    tags: ["grab", "athletics", "fortitude-dc", "brace", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["athletics", "fortitude-dc"], value: 2, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-004-three-against-stone",
    localizationKey: "ThreeAgainstStone",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Three Against Stone",
    fallbackDescription: "With three or more enemies bearing down on you, every angle of pressure locks the next one in place. For 1 round, you gain a +1 circumstance bonus to AC.",
    tags: ["heavily-surrounded", "ac", "circumstance-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-005-four-cannot-fold-you",
    localizationKey: "FourCannotFoldYou",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Cannot Fold You",
    fallbackDescription: "Four or more threats close in and your whole body becomes one refusal. For 1 round, you gain a +1 status bonus to saving throws.",
    tags: ["heavily-surrounded", "saving-throws", "status-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "saving-throw", value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-006-make-them-spend-themselves",
    localizationKey: "MakeThemSpendThemselves",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Make Them Spend Themselves",
    fallbackDescription: "A threatening enemy commits too much force trying to break you. For 1 round, the hostile source takes a -1 circumstance penalty to attack rolls and Athletics checks.",
    tags: ["hostile-source", "attack-roll", "athletics", "counterpressure", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "athletics"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-007-breath-between-blows",
    localizationKey: "BreathBetweenBlows",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Breath Between Blows",
    fallbackDescription: "You find one clean breath in a space where there should be none. For 1 round, you gain fast healing 3.",
    tags: ["fast-healing", "endurance", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "fastHealing", value: 3 }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-008-every-wound-shares-the-load",
    localizationKey: "EveryWoundSharesTheLoad",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Every Wound Shares the Load",
    fallbackDescription: "No single injury gets to own your attention while the ring is closing. For 1 round, you gain resistance 2 to persistent damage and fast healing 2.",
    tags: ["persistent-damage", "resistance", "fast-healing", "endurance", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "persistent-damage", value: 2 },
        { type: "fastHealing", value: 2 }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-009-crowd-gives-you-leverage",
    localizationKey: "CrowdGivesYouLeverage",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Crowd Gives You Leverage",
    fallbackDescription: "Every body pressing inward becomes something to brace against. For 1 round, you gain a +1 circumstance bonus to Athletics checks and attack rolls.",
    tags: ["athletics", "attack-roll", "circumstance-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["athletics", "attack-roll"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-010-set-your-feet",
    localizationKey: "SetYourFeet",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Set Your Feet",
    fallbackDescription: "You root yourself against the whole ring at once. Until the start of your next turn, reduce any forced movement caused by a hostile effect by 10 feet, to a minimum of 0 feet. Apply this result manually.",
    tags: ["forced-movement", "brace", "manual"],
    effect: null
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-011-turn-their-weight-against-them",
    localizationKey: "TurnTheirWeightAgainstThem",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Turn Their Weight Against Them",
    fallbackDescription: "A threatening foe leans into the crush and gives you the leverage to break their stance. For 1 round, the hostile source takes a -1 circumstance penalty to Athletics checks and Fortitude DC.",
    tags: ["hostile-source", "athletics", "fortitude-dc", "counterpressure", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 18,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["athletics", "fortitude-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-012-brace-on-their-advance",
    localizationKey: "BraceOnTheirAdvance",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Brace on Their Advance",
    fallbackDescription: "A foe's pressure becomes a brace instead of a burden. For 1 round, you gain a +1 circumstance bonus to AC and Constitution-based checks.",
    tags: ["brace", "ac", "constitution", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "con-based"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-013-three-bodies-one-bastion",
    localizationKey: "ThreeBodiesOneBastion",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Three Bodies, One Bastion",
    fallbackDescription: "With three or more threats closing in, the pressure locks your frame into a single defensive structure. For 1 round, you gain a +1 status bonus to Fortitude saves and Fortitude DC.",
    tags: ["heavily-surrounded", "fortitude", "fortitude-dc", "status-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "fortitude-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-014-four-hands-one-mistake",
    localizationKey: "FourHandsOneMistake",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Hands, One Mistake",
    fallbackDescription: "With four or more threats around you, one attacker overcommits and the whole ring stutters. A threatening hostile source becomes slowed 1 and takes a -1 circumstance penalty to Fortitude DC for 1 round.",
    tags: ["heavily-surrounded", "hostile-source", "slowed", "fortitude-dc", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 18,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "slowed", value: 1 },
        { type: "modifier", selector: "fortitude-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-015-break-the-clinch",
    localizationKey: "BreakTheClinch",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Break the Clinch",
    fallbackDescription: "The crush gives you one violent instant to wrench free. If you are grabbed, restrained, or immobilized, you may immediately attempt to Escape as a free action with a +2 circumstance bonus. Otherwise, you may Step. Apply this result manually.",
    tags: ["escape", "step", "free-action", "manual"],
    contentBatch: 18,
    effect: null
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-016-breathe-through-the-crush",
    localizationKey: "BreatheThroughTheCrush",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Breathe Through the Crush",
    fallbackDescription: "You force one measured breath through the chaos and your body remembers its discipline. For 1 round, you gain a +1 status bonus to Fortitude saves and Constitution-based checks.",
    tags: ["fortitude", "constitution", "status-bonus", "effect"],
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "con-based"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-017-use-the-ring-as-leverage",
    localizationKey: "UseTheRingAsLeverage",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Use the Ring as Leverage",
    fallbackDescription: "Every body pressing inward becomes leverage for the next blow. For 1 round, you gain a +1 circumstance bonus to Athletics checks and Strike damage.",
    tags: ["athletics", "strike-damage", "counteroffense", "effect"],
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["athletics", "strike-damage"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-018-one-body-takes-the-weight",
    localizationKey: "OneBodyTakesTheWeight",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "One Body Takes the Weight",
    fallbackDescription: "You shift the pressure onto one threatening foe and leave them fighting the rest of the ring. For 1 round, the hostile source is off-guard and takes a -1 circumstance penalty to Athletics checks.",
    tags: ["hostile-source", "off-guard", "athletics", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 18,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard", value: 1 },
        { type: "modifier", selector: "athletics", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-019-force-meets-formation",
    localizationKey: "ForceMeetsFormation",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Force Meets Formation",
    fallbackDescription: "A threatening foe drives into you and discovers the ring has nowhere left to give. For 1 round, the hostile source takes a -5-foot circumstance penalty to all Speeds and a -1 circumstance penalty to Fortitude DC.",
    tags: ["hostile-source", "movement", "fortitude-dc", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 18,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" },
        { type: "modifier", selector: "fortitude-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-020-make-a-shield-of-them",
    localizationKey: "MakeAShieldOfThem",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Make a Shield of Them",
    fallbackDescription: "Turn one threatening enemy into an obstacle for the rest. Choose a currently threatening foe; until the start of your next turn, treat that creature as cover against attacks from other threatening enemies whenever it physically blocks the line of attack. Apply this result manually.",
    tags: ["cover", "positioning", "formation", "manual"],
    contentBatch: 18,
    effect: null
  })

,
  defineSurroundedFortitudeCard({
    id: "ssf-021-overcommitment-costs-them",
    localizationKey: "OvercommitmentCostsThem",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Overcommitment Costs Them",
    fallbackDescription: "A threatening enemy leans too much of its strength into the ring and pays for it. For 1 round, the hostile source becomes enfeebled 1 and takes a -1 circumstance penalty to attack rolls.",
    tags: ["hostile-source", "enfeebled", "attack-roll", "counterpressure", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 20,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 },
        { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-022-shoulder-through-the-crush",
    localizationKey: "ShoulderThroughTheCrush",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Shoulder Through the Crush",
    fallbackDescription: "The press of bodies becomes something you can drive against. For 1 round, you gain a +5-foot circumstance bonus to all Speeds and a +1 circumstance bonus to Fortitude DC.",
    tags: ["movement", "fortitude-dc", "brace", "effect"],
    contentBatch: 20,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" },
        { type: "modifier", selector: "fortitude-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-023-three-bodies-one-bearing",
    localizationKey: "ThreeBodiesOneBearing",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Three Bodies, One Bearing",
    fallbackDescription: "With three or more enemies pushing inward, you find a single line through all their weight. For 1 round, you gain a +1 circumstance bonus to AC and Athletics checks.",
    tags: ["heavily-surrounded", "ac", "athletics", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    contentBatch: 20,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "athletics"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-024-four-bodies-break-their-own-line",
    localizationKey: "FourBodiesBreakTheirOwnLine",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Bodies Break Their Own Line",
    fallbackDescription: "With four or more enemies packed around you, the hostile source cannot recover its balance after the failed pressure. For 1 round, it becomes slowed 1 and takes a -1 circumstance penalty to attack rolls.",
    tags: ["heavily-surrounded", "hostile-source", "slowed", "attack-roll", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 20,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "slowed", value: 1 },
        { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-025-anchor-and-turn",
    localizationKey: "AnchorAndTurn",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Anchor and Turn",
    fallbackDescription: "You absorb the pressure, pivot on it, and make space where none existed. You may immediately Step as a free action; until the start of your next turn, reduce the first instance of forced movement that would move you by 5 feet. Apply this result manually.",
    tags: ["step", "forced-movement", "positioning", "manual"],
    contentBatch: 20,
    effect: null
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-026-their-grip-goes-soft",
    localizationKey: "TheirGripGoesSoft",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Their Grip Goes Soft",
    fallbackDescription: "A threatening source spends too much strength trying to hold you inside the ring. For 1 round, it becomes clumsy 1 and takes a -1 circumstance penalty to Athletics checks.",
    tags: ["hostile-source", "clumsy", "athletics", "counterpressure", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 20,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "athletics", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-027-weight-becomes-impact",
    localizationKey: "WeightBecomesImpact",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Weight Becomes Impact",
    fallbackDescription: "The ring gives every committed motion something solid to rebound from. For 1 round, you gain a +1 circumstance bonus to strike damage and Fortitude DC.",
    tags: ["strike-damage", "fortitude-dc", "momentum", "effect"],
    contentBatch: 20,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["strike-damage", "fortitude-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-028-body-finds-the-seam",
    localizationKey: "BodyFindsTheSeam",
    tone: "serious",
    impact: "light",
    fallbackTitle: "The Body Finds the Seam",
    fallbackDescription: "You feel the ring's pressure change before the opening is visible. For 1 round, you gain a +5-foot circumstance bonus to your land Speed and a +1 circumstance bonus to Perception DC.",
    tags: ["movement", "perception-dc", "awareness", "effect"],
    contentBatch: 20,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "land", value: 5, modifierType: "circumstance" },
        { type: "modifier", selector: "perception-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-029-break-the-pressure-chain",
    localizationKey: "BreakThePressureChain",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Break the Pressure Chain",
    fallbackDescription: "Choose two enemies that currently threaten you. Until the start of your next turn, treat those two enemies as unable to cooperate with one another for flanking or similar positional assistance against you. Apply this result manually.",
    tags: ["formation", "flanking", "defense", "manual"],
    contentBatch: 20,
    effect: null
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-030-stand-through-the-crush",
    localizationKey: "StandThroughTheCrush",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Stand Through the Crush",
    fallbackDescription: "The failed pressure leaves you one instant to reclaim your footing. If you are prone, grabbed, or restrained, you may immediately Stand or attempt to Escape as a free action with a +2 circumstance bonus. Apply this result manually.",
    tags: ["stand", "escape", "free-action", "manual"],
    contentBatch: 20,
    effect: null
  })

]);
