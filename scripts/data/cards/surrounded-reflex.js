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
  })
]);
