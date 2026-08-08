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
,
  defineNarrowEscapeWillCard({
    id: "new-011-clarity-survives-the-pressure",
    localizationKey: "ClaritySurvivesThePressure",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Clarity Survives the Pressure",
    fallbackDescription: "The danger leaves your mind one clear thought, and one is enough. For 1 round, you gain a +1 circumstance bonus to Will DC and a +1 status bonus to Perception checks.",
    tags: ["will-dc", "perception", "clarity", "effect"],
    contentBatch: 37,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "will-dc", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "perception", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-012-fear-loses-the-next-step",
    localizationKey: "FearLosesTheNextStep",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Fear Loses the Next Step",
    fallbackDescription: "Fear almost chooses your next move and then loses the argument. After critically succeeding against a fear effect, for 1 round you gain a +1 status bonus to AC and a +1 circumstance bonus to Intimidation checks.",
    tags: ["fear", "ac", "intimidation", "effect"],
    filters: { attackTraits: ["fear"] },
    contentBatch: 37,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "ac", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "intimidation", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-013-the-command-leaves-a-seam",
    localizationKey: "TheCommandLeavesASeam",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Command Leaves a Seam",
    fallbackDescription: "The pressure that nearly closed around your choices leaves one visible seam. For 1 round, you gain a +1 circumstance bonus to class DC and a +1 status bonus to Deception checks.",
    tags: ["class-dc", "deception", "agency", "effect"],
    contentBatch: 37,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "class-dc", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "deception", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-014-four-points-one-clear-route",
    localizationKey: "FourPointsOneClearRoute",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Points, One Clear Route",
    fallbackDescription: "At danger score 4 or higher, clarity is measured in heartbeats and distance. For 1 round, you gain 4 temporary Hit Points, a +1 circumstance bonus to Will DC, and a 5-foot status bonus to your land Speed.",
    tags: ["danger-score", "temporary-hit-points", "will-dc", "land-speed", "effect"],
    contentBatch: 37,
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 4 },
        { type: "modifier", selector: "will-dc", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "land", value: 5, modifierType: "status" }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-015-break-the-spiral",
    localizationKey: "BreakTheSpiral",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Break the Spiral",
    fallbackDescription: "The thought that would have trapped you breaks before it can repeat. You may immediately Step as a free action. If there is an identifiable hostile source, end farther from it than you began if possible. Apply this result manually.",
    tags: ["step", "free-action", "movement", "manual"],
    contentBatch: 37,
    effect: null
  }),
  defineNarrowEscapeWillCard({
    id: "new-016-the-mental-hook-comes-free",
    localizationKey: "TheMentalHookComesFree",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "The Mental Hook Comes Free",
    fallbackDescription: "A mental effect catches for an instant, then tears loose without taking your focus with it. After critically succeeding against a mental effect, for 1 round you gain a +1 circumstance bonus to Will DC and a +1 status bonus to spell DC.",
    tags: ["mental", "will-dc", "spell-dc", "effect"],
    filters: { attackTraits: ["mental"] },
    contentBatch: 37,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "will-dc", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "spell-dc", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-017-choose-the-next-motion",
    localizationKey: "ChooseTheNextMotion",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Choose the Next Motion",
    fallbackDescription: "The danger nearly chose for you. The next motion is yours on principle. For 1 round, you gain a +1 status bonus to Deception checks and a +1 circumstance bonus to Reflex DC.",
    tags: ["deception", "reflex-dc", "agency", "effect"],
    contentBatch: 37,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "deception", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "reflex-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-018-five-points-the-mind-reboots",
    localizationKey: "FivePointsTheMindReboots",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Points, the Mind Reboots",
    fallbackDescription: "At danger score 5 or higher, the instant after refusal feels like a system coming back online. For 1 round, you gain fast healing 3, a +1 circumstance bonus to Will saves, and a +1 status bonus to AC.",
    tags: ["danger-score", "fast-healing", "will", "ac", "effect"],
    contentBatch: 37,
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "fastHealing", value: 3 },
        { type: "modifier", selector: "will", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "ac", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-019-leave-them-guessing",
    localizationKey: "LeaveThemGuessing",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Leave Them Guessing",
    fallbackDescription: "The danger no longer knows whether it frightened you, fooled you, or simply lost you. For 1 round, you gain a +1 status bonus to Deception checks and a +1 circumstance bonus to Perception DC.",
    tags: ["deception", "perception-dc", "uncertainty", "effect"],
    contentBatch: 37,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "deception", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "perception-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-020-name-what-almost-took-you",
    localizationKey: "NameWhatAlmostTookYou",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Name What Almost Took You",
    fallbackDescription: "Once the pressure breaks, understanding becomes another kind of distance. You may immediately attempt Recall Knowledge as a free action about the hostile source or the effect you just resisted, with a +2 circumstance bonus to the check. Apply this result manually; normal Recall Knowledge restrictions still apply.",
    tags: ["recall-knowledge", "free-action", "knowledge", "manual"],
    contentBatch: 37,
    effect: null
  })

,
  defineNarrowEscapeWillCard({
    id: "new-021-one-thought-ahead",
    localizationKey: "OneThoughtAhead",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "One Thought Ahead",
    fallbackDescription: "The pressure loses because you are already thinking about the next safe choice. For 1 round, you gain a +1 circumstance bonus to Will saves and a +1 status bonus to Perception DC.",
    tags: ["will", "perception-dc", "clarity", "effect"],
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "will", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "perception-dc", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-022-turn-panic-into-direction",
    localizationKey: "TurnPanicIntoDirection",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Turn Panic into Direction",
    fallbackDescription: "Fear points at every bad ending at once. You pick a direction anyway. After critically succeeding against a fear effect, for 1 round you gain a +1 status bonus to Intimidation checks and a +5-foot circumstance bonus to all Speeds.",
    tags: ["fear", "intimidation", "movement", "escape", "effect"],
    filters: { attackTraits: ["fear"] },
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "intimidation", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-023-four-points-keep-the-thread",
    localizationKey: "FourPointsKeepTheThread",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Points, Keep the Thread",
    fallbackDescription: "At danger score 4 or higher, one coherent thought is enough to pull the rest of you through. For 1 round, you gain 4 temporary Hit Points, a +1 status bonus to Will DC, and a +1 circumstance bonus to Perception checks.",
    tags: ["danger-score", "temporary-hit-points", "will-dc", "perception", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 4 },
        { type: "modifier", selector: "will-dc", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "perception", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-024-call-someone-back",
    localizationKey: "CallSomeoneBack",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Call Someone Back",
    fallbackDescription: "Your refusal gives someone else a voice to follow. Choose one ally within 30 feet who can see or hear you. That ally gains a +1 circumstance bonus to their next Will save against the same hostile source before the start of your next turn. Apply this result manually.",
    tags: ["ally", "will", "support", "manual"],
    contentBatch: 38,
    effect: null
  }),
  defineNarrowEscapeWillCard({
    id: "new-025-the-lie-gives-you-a-landmark",
    localizationKey: "TheLieGivesYouALandmark",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Lie Gives You a Landmark",
    fallbackDescription: "Once the false path fails, it becomes something you can navigate around. For 1 round, you gain a +1 circumstance bonus to Perception checks and a +1 status bonus to Will DC.",
    tags: ["perception", "will-dc", "clarity", "effect"],
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "perception", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "will-dc", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-026-thought-slips-the-hook",
    localizationKey: "ThoughtSlipsTheHook",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Thought Slips the Hook",
    fallbackDescription: "The mental effect catches the shape of your thought and nothing underneath it. After critically succeeding against a mental effect, for 1 round you gain a +1 status bonus to spell attack rolls and a +1 circumstance bonus to Will saves.",
    tags: ["mental", "spell-attack-roll", "will", "effect"],
    filters: { attackTraits: ["mental"] },
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "spell-attack-roll", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "will", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-027-hear-the-exit-not-the-order",
    localizationKey: "HearTheExitNotTheOrder",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Hear the Exit, Not the Order",
    fallbackDescription: "The sound reaches you; the authority inside it does not. After critically succeeding against an auditory effect, for 1 round you gain a +1 status bonus to Perception checks and a +1 circumstance bonus to Will saves.",
    tags: ["auditory", "perception", "will", "effect"],
    filters: { attackTraits: ["auditory"] },
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "perception", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "will", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-028-five-points-self-still-intact",
    localizationKey: "FivePointsSelfStillIntact",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Points, Self Still Intact",
    fallbackDescription: "At danger score 5 or higher, surviving the thought is enough to rebuild the rest of the moment. For 1 round, you gain 5 temporary Hit Points, a +1 status bonus to saving throws, and a +1 circumstance bonus to Will DC.",
    tags: ["danger-score", "temporary-hit-points", "saving-throws", "will-dc", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 5 },
        { type: "modifier", selector: "saving-throw", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "will-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-029-resolve-becomes-position",
    localizationKey: "ResolveBecomesPosition",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Resolve Becomes Position",
    fallbackDescription: "Refusing the danger is only useful if it changes where the next blow can find you. For 1 round, you gain a +1 status bonus to AC, a +1 circumstance bonus to Will DC, and a +5-foot status bonus to your land Speed.",
    tags: ["ac", "will-dc", "land-speed", "escape", "effect"],
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "ac", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "will-dc", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "land", value: 5, modifierType: "status" }
      ]
    }
  }),
  defineNarrowEscapeWillCard({
    id: "new-030-pull-them-with-you",
    localizationKey: "PullThemWithYou",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Pull Them with You",
    fallbackDescription: "You escape the mental trap loudly enough for someone else to follow. Choose one ally within 30 feet who can see or hear you. That ally may immediately Step as a free action. If there is an identifiable hostile source, the Step must end farther from it than it began if possible. Apply this result manually.",
    tags: ["ally", "step", "free-action", "support", "manual"],
    contentBatch: 38,
    effect: null
  })

]);
