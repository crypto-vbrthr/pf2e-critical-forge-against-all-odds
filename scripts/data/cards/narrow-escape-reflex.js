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
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-011-thread-the-second-impact",
    localizationKey: "ThreadTheSecondImpact",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Thread the Second Impact",
    fallbackDescription: "The first danger misses. You are already reading where the next piece of the disaster will land. For 1 round, you gain a +1 circumstance bonus to Reflex DC and Acrobatics checks.",
    tags: ["reflex-dc", "acrobatics", "follow-through", "escape", "effect"],
    contentBatch: 36,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["reflex-dc", "acrobatics"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-012-read-the-rebound",
    localizationKey: "ReadTheRebound",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Read the Rebound",
    fallbackDescription: "You see how the danger will ricochet before it has finished missing you. For 1 round, you gain a +1 status bonus to Perception checks and a +1 circumstance bonus to AC.",
    tags: ["perception", "ac", "rebound", "effect"],
    contentBatch: 36,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "perception", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-013-feet-find-the-narrow-ground",
    localizationKey: "FeetFindTheNarrowGround",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Feet Find the Narrow Ground",
    fallbackDescription: "There is almost nowhere safe to stand, so your feet choose the one place that still works. For 1 round, your land Speed gains a +5-foot status bonus and you gain a +1 circumstance bonus to Stealth checks.",
    tags: ["land-speed", "stealth", "positioning", "escape", "effect"],
    contentBatch: 36,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "land", value: 5, modifierType: "status" },
        { type: "modifier", selector: "stealth", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-014-four-points-only-one-angle",
    localizationKey: "FourPointsOnlyOneAngle",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Points, Only One Angle",
    fallbackDescription: "At danger score 4 or higher, there is no safe field, only the least impossible angle. For 1 round, you gain 4 temporary Hit Points, a +1 status bonus to Reflex DC, and a +5-foot circumstance bonus to all Speeds.",
    tags: ["danger-score", "temporary-hit-points", "reflex-dc", "movement", "effect"],
    contentBatch: 36,
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 4 },
        { type: "modifier", selector: "reflex-dc", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-015-leap-the-last-gap",
    localizationKey: "LeapTheLastGap",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Leap the Last Gap",
    fallbackDescription: "The safe route is not a path anymore. It is a gap. You may immediately Leap as a free action. If you cannot Leap, you may Step instead. If there is an identifiable hostile source, you must end farther from it than you began if possible. Apply this result manually.",
    tags: ["leap", "step", "free-action", "movement", "manual"],
    contentBatch: 36,
    effect: null
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-016-let-the-blast-spend-itself",
    localizationKey: "LetTheBlastSpendItself",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Let the Blast Spend Itself",
    fallbackDescription: "You move with the force instead of trying to stop it. For 1 round, your land Speed gains a +10-foot circumstance bonus and you gain a +1 circumstance bonus to Fortitude saves.",
    tags: ["land-speed", "fortitude", "momentum", "effect"],
    contentBatch: 36,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "land", value: 10, modifierType: "circumstance" },
        { type: "modifier", selector: "fortitude", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-017-keep-your-balance-through-it",
    localizationKey: "KeepYourBalanceThroughIt",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Keep Your Balance Through It",
    fallbackDescription: "The ground, the blast, and your own momentum all disagree about where you should be. You refuse all three. For 1 round, you gain a +1 status bonus to Acrobatics checks and a +1 circumstance bonus to Fortitude DC.",
    tags: ["acrobatics", "fortitude-dc", "balance", "effect"],
    contentBatch: 36,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "acrobatics", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "fortitude-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-018-five-points-faster-than-ruin",
    localizationKey: "FivePointsFasterThanRuin",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Points, Faster Than Ruin",
    fallbackDescription: "At danger score 5 or higher, the only defense left is to be somewhere else before the disaster notices. For 1 round, you gain 4 temporary Hit Points, a +1 status bonus to AC, and a +10-foot circumstance bonus to all Speeds.",
    tags: ["danger-score", "temporary-hit-points", "ac", "movement", "effect"],
    contentBatch: 36,
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 4 },
        { type: "modifier", selector: "ac", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "all", value: 10, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-019-leave-no-easy-line",
    localizationKey: "LeaveNoEasyLine",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Leave No Easy Line",
    fallbackDescription: "You leave the danger no clean line to follow. For 1 round, you gain a +1 status bonus to Stealth checks and a +1 circumstance bonus to Perception DC.",
    tags: ["stealth", "perception-dc", "escape-line", "effect"],
    contentBatch: 36,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "stealth", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "perception-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeReflexCard({
    id: "ner-020-tumble-through-the-closing-edge",
    localizationKey: "TumbleThroughTheClosingEdge",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Tumble Through the Closing Edge",
    fallbackDescription: "The danger closes from the obvious direction, so you escape through the space it thought it controlled. You may immediately Tumble Through as a free action with a +2 circumstance bonus to the Acrobatics check. If Tumble Through is not applicable, you may instead Stride up to 10 feet. If there is an identifiable hostile source, that Stride must end farther from it than you began if possible. Apply this result manually.",
    tags: ["tumble-through", "stride", "free-action", "acrobatics", "manual"],
    contentBatch: 36,
    effect: null
  })

]);
