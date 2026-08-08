import { defineNarrowEscapeWillCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const NARROW_ESCAPE_WILL_CARDS = Object.freeze([
  defineNarrowEscapeWillCard({
    id: "new-001-keep-your-name",
    localizationKey: "KeepYourName",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Keep Your Name",
    fallbackDescription: "The danger reaches for the part of you that decides who you are and comes away empty. For 1 round, you gain a +1 circumstance bonus to Will saves and a +1 status bonus to Deception checks.",
    tags: ["will", "deception", "identity", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "will", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "deception", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-002-panic-spends-its-last-breath",
    localizationKey: "PanicSpendsItsLastBreath",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Panic Spends Its Last Breath",
    fallbackDescription: "Fear spends everything it has trying to close the world around you. After critically succeeding against a fear effect, for 1 round you gain 2 temporary Hit Points and a +1 circumstance bonus to Will saves.",
    tags: ["fear", "temporary-hit-points", "will", "effect"],
    filters: { attackTraits: ["fear"] },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 2 },
        { type: "modifier", selector: "will", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-003-thought-finds-the-door",
    localizationKey: "ThoughtFindsTheDoor",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Thought Finds the Door",
    fallbackDescription: "The instant your mind clears, you see the route that panic had hidden. For 1 round, you gain a +1 circumstance bonus to Perception checks and a 5-foot status bonus to all Speeds.",
    tags: ["perception", "movement", "escape-route", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "perception", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "status" }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-004-your-voice-returns-first",
    localizationKey: "YourVoiceReturnsFirst",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Your Voice Returns First",
    fallbackDescription: "The pressure breaks before your voice does. For 1 round, you gain a +1 circumstance bonus to Diplomacy checks, Intimidation checks, and Will DC.",
    tags: ["diplomacy", "intimidation", "will-dc", "voice", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["diplomacy", "intimidation", "will-dc"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-005-look-for-the-way-out",
    localizationKey: "LookForTheWayOut",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Look for the Way Out",
    fallbackDescription: "The instant your mind is yours again, you use it. You may immediately Seek as a free action with a +2 circumstance bonus to the Perception check. Apply this result manually.",
    tags: ["seek", "perception", "free-action", "manual"],
    effect: null
  }),
  defineNarrowEscapeWillCard({
    id: "new-006-the-mental-grip-slips",
    localizationKey: "TheMentalGripSlips",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "The Mental Grip Slips",
    fallbackDescription: "A mental effect finds purchase for one instant and then loses you completely. After critically succeeding against a mental effect, for 1 round you gain resistance 2 to mental damage and a +1 status bonus to Will saves.",
    tags: ["mental", "resistance", "will", "effect"],
    filters: { attackTraits: ["mental"] },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "mental", value: 2 },
        { type: "modifier", selector: "will", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-007-choice-becomes-motion",
    localizationKey: "ChoiceBecomesMotion",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Choice Becomes Motion",
    fallbackDescription: "The danger fails to choose for you. Your next decision arrives already in motion. For 1 round, you gain a +1 status bonus to Will DC and a 5-foot circumstance bonus to all Speeds.",
    tags: ["will-dc", "movement", "agency", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "will-dc", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-008-four-points-mind-still-mine",
    localizationKey: "FourPointsMindStillMine",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Points, Mind Still Mine",
    fallbackDescription: "At danger score 4 or higher, keeping hold of yourself is the opening. For 1 round, you gain 3 temporary Hit Points, a +1 status bonus to Will saves, and a +1 circumstance bonus to Perception DC.",
    tags: ["danger-score", "temporary-hit-points", "will", "perception-dc", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 3 },
        { type: "modifier", selector: "will", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "perception-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-009-five-points-refuse-the-ending",
    localizationKey: "FivePointsRefuseTheEnding",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Points, Refuse the Ending",
    fallbackDescription: "At danger score 5 or higher, refusal becomes a complete survival instinct. For 1 round, you gain a +1 status bonus to saving throws and Perception checks and a 5-foot circumstance bonus to all Speeds.",
    tags: ["danger-score", "saving-throws", "perception", "movement", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["saving-throw", "perception"], value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-010-nothing-left-to-command",
    localizationKey: "NothingLeftToCommand",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Nothing Left to Command",
    fallbackDescription: "Whatever tried to dictate your next move has lost the argument. For 1 round, you gain a +1 circumstance bonus to Deception checks, Will DC, and class DC.",
    tags: ["deception", "will-dc", "class-dc", "agency", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["deception", "will-dc", "class-dc"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  })
]);
