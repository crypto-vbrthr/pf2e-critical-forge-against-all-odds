import { defineNarrowEscapeFortitudeCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const NARROW_ESCAPE_FORTITUDE_CARDS = Object.freeze([
  defineNarrowEscapeFortitudeCard({
    id: "nef-001-hold-together-long-enough",
    localizationKey: "HoldTogetherLongEnough",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Hold Together Long Enough",
    fallbackDescription: "The danger fails to break you before the opening appears. For 1 round, you gain a +1 circumstance bonus to Fortitude saves and a 5-foot circumstance bonus to all Speeds.",
    tags: ["fortitude", "movement", "escape", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "fortitude", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-002-shock-finds-no-grip",
    localizationKey: "ShockFindsNoGrip",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Shock Finds No Grip",
    fallbackDescription: "Your body locks into the one posture that keeps the danger from taking hold. For 1 round, you gain a +1 circumstance bonus to Fortitude DC and Reflex saves.",
    tags: ["fortitude-dc", "reflex", "brace", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["fortitude-dc", "reflex"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-003-pain-marks-the-exit",
    localizationKey: "PainMarksTheExit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Pain Marks the Exit",
    fallbackDescription: "The pain does not blur the world. It outlines the route that is still open. For 1 round, you gain a +1 circumstance bonus to Perception and Acrobatics checks.",
    tags: ["perception", "acrobatics", "escape-route", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["perception", "acrobatics"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-004-one-breath-ahead",
    localizationKey: "OneBreathAhead",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "One Breath Ahead",
    fallbackDescription: "You steal one clean breath from the edge of collapse. For 1 round, you gain fast healing 2 and a +1 circumstance bonus to Fortitude saves.",
    tags: ["fast-healing", "fortitude", "endurance", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "fastHealing", value: 2 },
        { type: "modifier", selector: "fortitude", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-005-up-before-it-closes",
    localizationKey: "UpBeforeItCloses",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Up Before It Closes",
    fallbackDescription: "Your body answers before the danger can finish closing around you. If you are prone, you may immediately Stand as a free action. Otherwise, you may immediately Step. Apply this result manually.",
    tags: ["stand", "step", "free-action", "manual"],
    effect: null
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-006-toxin-loses-the-race",
    localizationKey: "ToxinLosesTheRace",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "The Toxin Loses the Race",
    fallbackDescription: "The poison is dangerous, but it is not faster than your refusal to fall. Against an incoming poison effect, for 1 round you gain resistance 2 to poison damage and a +1 status bonus to Fortitude saves.",
    tags: ["poison", "resistance", "fortitude", "effect"],
    filters: { attackTraits: ["poison"] },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "poison", value: 2 },
        { type: "modifier", selector: "fortitude", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-007-body-refuses-to-lock",
    localizationKey: "BodyRefusesToLock",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Body Refuses to Lock",
    fallbackDescription: "Muscle, breath, and heartbeat all choose the same answer: not yet. For 1 round, you gain 3 temporary Hit Points and a +1 circumstance bonus to Fortitude DC.",
    tags: ["temporary-hit-points", "fortitude-dc", "survival", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 3 },
        { type: "modifier", selector: "fortitude-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-008-four-points-still-breathing",
    localizationKey: "FourPointsStillBreathing",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Points, Still Breathing",
    fallbackDescription: "At danger score 4 or higher, survival becomes its own burst of momentum. For 1 round, you gain 3 temporary Hit Points, a +1 status bonus to Fortitude saves, and a 5-foot circumstance bonus to all Speeds.",
    tags: ["danger-score", "temporary-hit-points", "fortitude", "movement", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 3 },
        { type: "modifier", selector: "fortitude", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-009-five-points-one-more-second",
    localizationKey: "FivePointsOneMoreSecond",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Points, One More Second",
    fallbackDescription: "At danger score 5 or higher, your body manufactures one impossible second more. For 1 round, you gain fast healing 3, a +1 status bonus to saving throws, and a 5-foot circumstance bonus to all Speeds.",
    tags: ["danger-score", "fast-healing", "saving-throws", "movement", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "fastHealing", value: 3 },
        { type: "modifier", selector: "saving-throw", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeFortitudeCard({
    id: "nef-010-the-exit-stays-open",
    localizationKey: "TheExitStaysOpen",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Exit Stays Open",
    fallbackDescription: "The danger had one chance to stop your body. It missed. For 1 round, you gain a +1 circumstance bonus to AC and Fortitude DC and a 5-foot circumstance bonus to all Speeds.",
    tags: ["ac", "fortitude-dc", "movement", "escape", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["ac", "fortitude-dc"], value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  })
]);
