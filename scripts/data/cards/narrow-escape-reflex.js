import { defineNarrowEscapeReflexCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const NARROW_ESCAPE_REFLEX_CARDS = Object.freeze([
  defineNarrowEscapeReflexCard({
    id: "ner-001-half-a-heartbeat-clear",
    localizationKey: "HalfAHeartbeatClear",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Half a Heartbeat Clear",
    fallbackDescription: "You are moving before the danger has finished becoming real. For 1 round, you gain a +1 circumstance bonus to Reflex saves and a 5-foot circumstance bonus to all Speeds.",
    tags: ["reflex", "movement", "escape", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "reflex", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-002-the-angle-stays-open",
    localizationKey: "TheAngleStaysOpen",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Angle Stays Open",
    fallbackDescription: "The path is narrow enough that hesitation would close it. For 1 round, you gain a +1 circumstance bonus to AC and a +1 status bonus to Acrobatics checks.",
    tags: ["ac", "acrobatics", "escape-route", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "acrobatics", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-003-read-the-falling-line",
    localizationKey: "ReadTheFallingLine",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Read the Falling Line",
    fallbackDescription: "The danger shows you where it will be a fraction of a second before it arrives. For 1 round, you gain a +1 circumstance bonus to Perception checks and Reflex DC.",
    tags: ["perception", "reflex-dc", "timing", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["perception", "reflex-dc"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-004-distance-before-impact",
    localizationKey: "DistanceBeforeImpact",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Distance Before Impact",
    fallbackDescription: "You turn the successful dodge into distance before the danger can reset. For 1 round, your land Speed gains a +10-foot circumstance bonus and you gain a +1 circumstance bonus to Acrobatics checks.",
    tags: ["land-speed", "acrobatics", "distance", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "land", value: 10, modifierType: "circumstance" },
        { type: "modifier", selector: "acrobatics", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-005-two-steps-from-disaster",
    localizationKey: "TwoStepsFromDisaster",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Two Steps from Disaster",
    fallbackDescription: "The first step avoids the danger. The second makes sure it cannot simply close again. You may immediately Step up to twice as a single free action. If there is an identifiable hostile source, you must end farther from it than you began. Apply this result manually.",
    tags: ["step", "free-action", "movement", "manual"],
    effect: null
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-006-the-finishing-blow-misses",
    localizationKey: "TheFinishingBlowMisses",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "The Finishing Blow Misses",
    fallbackDescription: "An effect meant to end the fight fails at the one instant that mattered. After critically succeeding against an incapacitation effect, for 1 round you gain a +1 status bonus to Reflex saves and a +1 circumstance bonus to AC.",
    tags: ["incapacitation", "reflex", "ac", "effect"],
    filters: { attackTraits: ["incapacitation"] },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "reflex", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-007-momentum-stays-yours",
    localizationKey: "MomentumStaysYours",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Momentum Stays Yours",
    fallbackDescription: "You do not let the escape end when the immediate danger does. For 1 round, you gain a +1 circumstance bonus to Reflex DC and a 5-foot status bonus to all Speeds.",
    tags: ["reflex-dc", "movement", "momentum", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "reflex-dc", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "status" }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-008-four-points-no-room-left",
    localizationKey: "FourPointsNoRoomLeft",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Points, No Room Left",
    fallbackDescription: "At danger score 4 or higher, every remaining inch matters. For 1 round, you gain 3 temporary Hit Points, a +1 status bonus to Acrobatics checks, and a 5-foot circumstance bonus to all Speeds.",
    tags: ["danger-score", "temporary-hit-points", "acrobatics", "movement", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 3 },
        { type: "modifier", selector: "acrobatics", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-009-five-points-nowhere-but-through",
    localizationKey: "FivePointsNowhereButThrough",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Points, Nowhere but Through",
    fallbackDescription: "At danger score 5 or higher, survival stops being a choice between routes. There is only the one you make. For 1 round, you gain a +1 circumstance bonus to AC and Reflex saves and a +10-foot status bonus to your land Speed.",
    tags: ["danger-score", "ac", "reflex", "land-speed", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["ac", "reflex"], value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "land", value: 10, modifierType: "status" }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-010-leave-only-an-afterimage",
    localizationKey: "LeaveOnlyAnAfterimage",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Leave Only an Afterimage",
    fallbackDescription: "By the time the danger finishes passing, the place you occupied is already old information. For 1 round, you gain a +1 circumstance bonus to Stealth checks and Perception DC.",
    tags: ["stealth", "perception-dc", "afterimage", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["stealth", "perception-dc"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  })
]);
