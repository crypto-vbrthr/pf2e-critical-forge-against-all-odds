import { defineSurroundedWillCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const SURROUNDED_WILL_CARDS = Object.freeze([
  defineSurroundedWillCard({
    id: "ssw-001-center-of-your-own-mind",
    localizationKey: "CenterOfYourOwnMind",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Center of Your Own Mind",
    fallbackDescription: "Every threat pushes inward, but your thoughts keep one inviolate center. For 1 round, your Will DC gains a +2 circumstance bonus.",
    tags: ["will-dc", "circumstance-bonus", "resolve", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "will-dc", value: 2, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-002-noise-becomes-rhythm",
    localizationKey: "NoiseBecomesRhythm",
    tone: "serious",
    impact: "light",
    fallbackTitle: "Noise Becomes Rhythm",
    fallbackDescription: "Too many threats compete for your attention and become a pattern instead of a distraction. For 1 round, you gain a +1 circumstance bonus to Will saves.",
    tags: ["will", "circumstance-bonus", "focus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "will", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-003-three-threats-one-answer",
    localizationKey: "ThreeThreatsOneAnswer",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Three Threats, One Answer",
    fallbackDescription: "With three or more enemies pressing in, every demand receives the same answer: no. For 1 round, you gain a +1 status bonus to Will saves and Will DC.",
    tags: ["heavily-surrounded", "will", "will-dc", "status-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will", "will-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-004-four-threats-one-doubt",
    localizationKey: "FourThreatsOneDoubt",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Threats, One Doubt",
    fallbackDescription: "Four or more enemies close around you, and the hostile source is the first to wonder why you still stand. It becomes stupefied 1 for 1 round.",
    tags: ["heavily-surrounded", "target", "stupefied", "counterpressure", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
    filters: { excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "condition", slug: "stupefied", value: 1 }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-005-fear-finds-no-leader",
    localizationKey: "FearFindsNoLeader",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Fear Finds No Leader",
    fallbackDescription: "The fear meant to make the ring feel larger rebounds toward the voice that shaped it. The hostile source becomes frightened 1 for 1 round.",
    tags: ["fear", "target", "frightened", "counterpressure", "effect"],
    filters: { attackTraits: ["fear"], excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "condition", slug: "frightened", value: 1 }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-006-no-command-owns-the-circle",
    localizationKey: "NoCommandOwnsTheCircle",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "No Command Owns the Circle",
    fallbackDescription: "A hostile will tries to turn the crowd into a cage and only sharpens your resistance. After a mental effect, for 1 round you gain a +1 circumstance bonus to Will saves and resistance 2 to mental damage.",
    tags: ["mental", "will", "resistance", "effect"],
    filters: { attackTraits: ["mental"] },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "will", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "resistance", resistanceType: "mental", value: 2 }
      ]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-007-crowd-cannot-enter-with-them",
    localizationKey: "CrowdCannotEnterWithThem",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Crowd Cannot Enter With Them",
    fallbackDescription: "The enemies around you can crowd your body, not your thoughts. For 1 round, you gain resistance 2 to mental damage and a +1 circumstance bonus to Perception DC.",
    tags: ["mental", "resistance", "perception-dc", "resolve", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "mental", value: 2 },
        { type: "modifier", selector: "perception-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-008-name-above-the-noise",
    localizationKey: "NameAboveTheNoise",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Your Name Above the Noise",
    fallbackDescription: "Threats, curses, and shouted orders blur together beneath the certainty of who you are. For 1 round, you gain a +1 status bonus to checks based on Wisdom and Charisma.",
    tags: ["wisdom", "charisma", "identity", "status-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["wis-based", "cha-based"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-009-presence-fills-the-ring",
    localizationKey: "PresenceFillsTheRing",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Presence Fills the Ring",
    fallbackDescription: "Surrounded, you stop looking like prey and start looking like the reason the circle formed. For 1 round, you gain a +1 circumstance bonus to Diplomacy and Intimidation checks.",
    tags: ["diplomacy", "intimidation", "presence", "circumstance-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["diplomacy", "intimidation"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-010-answer-every-voice",
    localizationKey: "AnswerEveryVoice",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Answer Every Voice",
    fallbackDescription: "Choose one enemy that currently threatens you. You may immediately attempt to Demoralize that enemy as a free action. Apply this result manually.",
    tags: ["demoralize", "free-action", "intimidation", "manual"],
    effect: null
  })
]);
