import { defineSurroundedReflexCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const SURROUNDED_REFLEX_CARDS = Object.freeze([
  defineSurroundedReflexCard({
    id: "ssr-001-thread-between-blades",
    localizationKey: "ThreadBetweenBlades",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Thread Between the Blades",
    fallbackDescription: "The ring leaves no path, so you turn the bodies inside it into landmarks. For 1 round, you gain a +2 circumstance bonus to Acrobatics checks.",
    tags: ["acrobatics", "circumstance-bonus", "positioning", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "acrobatics", value: 2, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-002-bodies-become-cover",
    localizationKey: "BodiesBecomeCover",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Bodies Become Cover",
    fallbackDescription: "For one heartbeat, the enemies around you block one another's sightlines and attacks. You are concealed for 1 round and gain a +1 circumstance bonus to Reflex DC.",
    tags: ["concealed", "reflex-dc", "crowd", "defense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "concealed" },
        { type: "modifier", selector: "reflex-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-003-three-threats-one-current",
    localizationKey: "ThreeThreatsOneCurrent",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Three Threats, One Current",
    fallbackDescription: "With three or more enemies threatening you, their motions merge into a single readable flow. For 1 round, you gain a +1 status bonus to Reflex saves.",
    tags: ["heavily-surrounded", "reflex", "status-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "reflex", value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-004-four-threats-open-ground",
    localizationKey: "FourThreatsOpenGround",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Threats, Open Ground",
    fallbackDescription: "With four or more enemies closing in, the only open ground is the ground you create. For 1 round, you gain a +5-foot circumstance bonus to all your Speeds.",
    tags: ["heavily-surrounded", "movement", "all-speeds", "circumstance-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-005-overreach-opens-the-source",
    localizationKey: "OverreachOpensTheSource",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Overreach Opens the Source",
    fallbackDescription: "A threatening source commits too far into the crowded attack. For 1 round, it becomes off-guard and takes a -1 circumstance penalty to attack rolls.",
    tags: ["target", "off-guard", "attack-roll", "countermove", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-006-balance-turns-against-them",
    localizationKey: "BalanceTurnsAgainstThem",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Balance Turns Against Them",
    fallbackDescription: "Your escape forces the hostile source to recover its footing instead of pressing the advantage. For 1 round, its Reflex DC takes a -1 circumstance penalty.",
    tags: ["target", "reflex-dc", "circumstance-penalty", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-007-no-one-owns-your-back",
    localizationKey: "NoOneOwnsYourBack",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "No One Owns Your Back",
    fallbackDescription: "The ring cannot agree which side of you is vulnerable. For 1 round, you gain a +1 circumstance bonus to AC, Perception checks, and Perception DC.",
    tags: ["anti-flanking", "ac", "perception", "circumstance-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "perception", "perception-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-008-too-many-bodies-no-clean-shot",
    localizationKey: "TooManyBodiesNoCleanShot",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Too Many Bodies, No Clean Shot",
    fallbackDescription: "Every enemy in the ring spoils another's perfect angle. For 1 round, you gain resistance 3 to precision damage.",
    tags: ["precision", "resistance", "crowd", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "precision", value: 3 }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-009-eyes-on-every-opening",
    localizationKey: "EyesOnEveryOpening",
    tone: "serious",
    impact: "light",
    fallbackTitle: "Eyes on Every Opening",
    fallbackDescription: "Tracking several threats at once sharpens your sense for the gap between them. For 1 round, you gain a +1 circumstance bonus to Perception checks and Perception DC.",
    tags: ["perception", "perception-dc", "circumstance-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["perception", "perception-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-010-ghost-through-the-ring",
    localizationKey: "GhostThroughTheRing",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Ghost Through the Ring",
    fallbackDescription: "You may immediately Stride as a free action, moving no more than half your Speed. This movement does not trigger reactions from creatures that currently threaten you; if possible, end where fewer enemies threaten you. Apply this result manually.",
    tags: ["stride", "free-action", "movement", "no-reactions", "positioning", "manual"],
    effect: null
  }),
  defineSurroundedReflexCard({
    id: "ssr-011-edge-becomes-exit",
    localizationKey: "EdgeBecomesExit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Edge Becomes an Exit",
    fallbackDescription: "You stop treating the ring as a wall and start reading its edge as a route. For 1 round, you gain a +1 circumstance bonus to AC and Acrobatics checks.",
    tags: ["ac", "acrobatics", "positioning", "circumstance-bonus", "effect"],
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "acrobatics"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-012-ring-trips-over-itself",
    localizationKey: "RingTripsOverItself",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Ring Trips Over Itself",
    fallbackDescription: "A threatening source has to correct for the bodies crowding its attack. For 1 round, it takes a -1 circumstance penalty to attack rolls and Reflex DC.",
    tags: ["target", "attack-roll", "reflex-dc", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 18,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "reflex-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-013-three-angles-one-tempo",
    localizationKey: "ThreeAnglesOneTempo",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Three Angles, One Tempo",
    fallbackDescription: "With three or more enemies threatening you, their separate attacks collapse into one rhythm you can read. For 1 round, you gain a +1 circumstance bonus to Reflex saves and Perception checks.",
    tags: ["heavily-surrounded", "reflex", "perception", "awareness", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["reflex", "perception"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-014-four-steps-one-misstep",
    localizationKey: "FourStepsOneMisstep",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Steps, One Misstep",
    fallbackDescription: "With four or more enemies pressing in, one threatening foe loses its footing when you break the shared rhythm. For 1 round, it becomes clumsy 1 and takes a -1 circumstance penalty to attack rolls.",
    tags: ["heavily-surrounded", "target", "clumsy", "attack-roll", "formation", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 18,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-015-tumble-through-the-teeth",
    localizationKey: "TumbleThroughTheTeeth",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Tumble Through the Teeth",
    fallbackDescription: "You may immediately attempt to Tumble Through one creature that currently threatens you as a free action, gaining a +2 circumstance bonus to the Acrobatics check. That creature cannot use reactions triggered by this movement. Apply this result manually.",
    tags: ["tumble-through", "free-action", "acrobatics", "no-reactions", "positioning", "manual"],
    contentBatch: 18,
    effect: null
  }),
  defineSurroundedReflexCard({
    id: "ssr-016-crowd-builds-your-momentum",
    localizationKey: "CrowdBuildsYourMomentum",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Crowd Builds Your Momentum",
    fallbackDescription: "Every correction an enemy makes gives you another fraction of motion. For 1 round, you gain a +1 circumstance bonus to attack rolls and a +5-foot circumstance bonus to all your Speeds.",
    tags: ["attack-roll", "movement", "momentum", "circumstance-bonus", "effect"],
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "attack-roll", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-017-turn-their-eyes-sideways",
    localizationKey: "TurnTheirEyesSideways",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Turn Their Eyes Sideways",
    fallbackDescription: "A threatening source loses track of the whole formation when you vanish from its expected line. For 1 round, it takes a -1 circumstance penalty to Perception checks and Perception DC.",
    tags: ["target", "perception", "perception-dc", "misdirection", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 18,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["perception", "perception-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-018-gap-stays-open",
    localizationKey: "GapStaysOpen",
    tone: "serious",
    impact: "light",
    fallbackTitle: "The Gap Stays Open",
    fallbackDescription: "Once you find the opening, your body remembers it. For 1 round, you gain a +1 circumstance bonus to Acrobatics checks and Reflex DC.",
    tags: ["acrobatics", "reflex-dc", "positioning", "circumstance-bonus", "effect"],
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["acrobatics", "reflex-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-019-one-body-blocks-the-next",
    localizationKey: "OneBodyBlocksTheNext",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "One Body Blocks the Next",
    fallbackDescription: "You make a threatening source occupy exactly the wrong place for the rest of the ring. For 1 round, it is off-guard and takes a -1 circumstance penalty to Reflex DC.",
    tags: ["target", "off-guard", "reflex-dc", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 18,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedReflexCard({
    id: "ssr-020-never-stop-in-the-center",
    localizationKey: "NeverStopInTheCenter",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Never Stop in the Center",
    fallbackDescription: "The ring can only close around the place you were. For 1 round, you gain a +5-foot circumstance bonus to all your Speeds and a +1 circumstance bonus to Perception DC.",
    tags: ["movement", "perception-dc", "positioning", "circumstance-bonus", "effect"],
    contentBatch: 18,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" },
        { type: "modifier", selector: "perception-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  })
]);
