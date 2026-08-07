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
  }),
  defineSurroundedWillCard({
    id: "ssw-011-make-one-voice-falter",
    localizationKey: "MakeOneVoiceFalter",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Make One Voice Falter",
    fallbackDescription: "You meet one threatening enemy's pressure with a stare that breaks its certainty. For 1 round, the hostile source takes a -1 circumstance penalty to Will DC and Intimidation checks.",
    tags: ["hostile-source", "will-dc", "intimidation", "counterpressure", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 19,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will-dc", "intimidation"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-012-hold-the-inner-line",
    localizationKey: "HoldTheInnerLine",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Hold the Inner Line",
    fallbackDescription: "The circle closes around your body, not your judgment. For 1 round, you gain a +1 circumstance bonus to Will saves and Perception DC.",
    tags: ["will", "perception-dc", "focus", "effect"],
    contentBatch: 19,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will", "perception-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-013-three-threats-one-stillness",
    localizationKey: "ThreeThreatsOneStillness",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Three Threats, One Stillness",
    fallbackDescription: "With three or more enemies pressing in, your attention stops scattering and becomes absolute. For 1 round, you gain a +1 status bonus to Will DC and Perception checks.",
    tags: ["heavily-surrounded", "will-dc", "perception", "status-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    contentBatch: 19,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will-dc", "perception"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-014-four-threats-one-cracked-nerve",
    localizationKey: "FourThreatsOneCrackedNerve",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Threats, One Cracked Nerve",
    fallbackDescription: "With four or more enemies packed around you, the threatening source realizes that numbers are no longer enough. For 1 round, it becomes frightened 1 and takes a -1 circumstance penalty to Will DC.",
    tags: ["heavily-surrounded", "hostile-source", "frightened", "will-dc", "counterpressure", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    extraConditions: [
      { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 19,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "frightened", value: 1 },
        { type: "modifier", selector: "will-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-015-pass-the-defiance-on",
    localizationKey: "PassTheDefianceOn",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Pass the Defiance On",
    fallbackDescription: "Your refusal steadies someone else. Choose one ally within 30 feet who can hear you; that ally gains a +1 circumstance bonus to their next Will save before the end of their next turn. Apply this result manually.",
    tags: ["ally", "will", "support", "auditory", "manual"],
    contentBatch: 19,
    effect: null
  }),
  defineSurroundedWillCard({
    id: "ssw-016-the-ring-hears-you-breathe",
    localizationKey: "TheRingHearsYouBreathe",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Ring Hears You Breathe",
    fallbackDescription: "You make your calm audible, and the circle has to reckon with it. For 1 round, you gain a +1 circumstance bonus to Intimidation checks and Will DC.",
    tags: ["intimidation", "will-dc", "presence", "effect"],
    contentBatch: 19,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["intimidation", "will-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-017-their-certainty-breaks-first",
    localizationKey: "TheirCertaintyBreaksFirst",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Their Certainty Breaks First",
    fallbackDescription: "A threatening enemy expected the ring to make you hesitate. Instead, it loses the initiative of conviction. For 1 round, the hostile source takes a -1 circumstance penalty to attack rolls and class DC.",
    tags: ["hostile-source", "attack-roll", "class-dc", "counterpressure", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 19,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "class-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-018-fear-has-too-many-faces",
    localizationKey: "FearHasTooManyFaces",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Fear Has Too Many Faces",
    fallbackDescription: "When fear comes from inside a ring of enemies, you stop giving any one face authority over you. After a fear effect, for 1 round you gain a +1 circumstance bonus to AC and Will DC.",
    tags: ["fear", "ac", "will-dc", "resolve", "effect"],
    filters: { attackTraits: ["fear"] },
    contentBatch: 19,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "will-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-019-a-mental-grip-leaves-an-opening",
    localizationKey: "AMentalGripLeavesAnOpening",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "A Mental Grip Leaves an Opening",
    fallbackDescription: "A threatening enemy reaches for your thoughts and exposes its own focus. After a mental effect, for 1 round the hostile source is off-guard and takes a -1 circumstance penalty to Will DC.",
    tags: ["mental", "hostile-source", "off-guard", "will-dc", "counterpressure", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 19,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard", value: 1 },
        { type: "modifier", selector: "will-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedWillCard({
    id: "ssw-020-mind-above-the-ring",
    localizationKey: "MindAboveTheRing",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Mind Above the Ring",
    fallbackDescription: "You stop reacting to the circle and begin reading it as a whole. For 1 round, you gain a +1 status bonus to class DC and Perception DC.",
    tags: ["class-dc", "perception-dc", "awareness", "status-bonus", "effect"],
    contentBatch: 19,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["class-dc", "perception-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  })
]);
