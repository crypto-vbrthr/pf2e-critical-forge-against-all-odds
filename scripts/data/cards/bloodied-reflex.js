import { defineBloodiedReflexCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const BLOODIED_REFLEX_CARDS = Object.freeze([
  defineBloodiedReflexCard({
    id: "br-001-between-the-blades",
    localizationKey: "BetweenTheBlades",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Between the Blades",
    fallbackDescription: "There is no safe path, so you make one between the edges. For 1 round, you gain a +1 circumstance bonus to Reflex saves and Reflex DC.",
    tags: ["reflex", "reflex-dc", "circumstance-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["reflex", "reflex-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-002-blood-red-blur",
    localizationKey: "BloodRedBlur",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Blood-Red Blur",
    fallbackDescription: "For one heartbeat, your wounded outline becomes impossible to follow. For 1 round, you are concealed.",
    tags: ["concealed", "defense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "condition", slug: "concealed" }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-003-run-before-falling",
    localizationKey: "RunBeforeFalling",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Run Before Falling",
    fallbackDescription: "Your body spends tomorrow's strength on surviving now. For 1 round, you gain a +10-foot status bonus to your land Speed.",
    tags: ["movement", "land-speed", "status-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "movement", movementType: "land", value: 10, modifierType: "status" }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-004-turn-the-blast-aside",
    localizationKey: "TurnTheBlastAside",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Turn the Blast Aside",
    fallbackDescription: "You do not escape the force completely; you teach it to pass around what remains of you. For 1 round, you gain resistance 3 to area damage.",
    tags: ["area-damage", "resistance", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "area-damage", value: 3 }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-005-no-angle-left",
    localizationKey: "NoAngleLeft",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "No Angle Left",
    fallbackDescription: "Every line of attack closes a fraction too late. For 1 round, you gain a +1 circumstance bonus to AC.",
    tags: ["armor-class", "circumstance-bonus", "defense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-006-never-where-needed",
    localizationKey: "NeverWhereNeeded",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Never Where They Need You",
    fallbackDescription: "The enemy's perfect opening keeps finding empty air. For 1 round, you are immune to the off-guard condition.",
    tags: ["off-guard", "immunity", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "off-guard" }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-007-feet-refuse-ground",
    localizationKey: "FeetRefuseGround",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Feet Refuse the Ground",
    fallbackDescription: "Even the floor cannot decide where to catch you. For 1 round, you are immune to the prone condition.",
    tags: ["prone", "immunity", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "prone" }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-008-wound-taught-balance",
    localizationKey: "WoundTaughtBalance",
    tone: "serious",
    impact: "light",
    fallbackTitle: "Wound-Taught Balance",
    fallbackDescription: "Pain has become a map of every dangerous shift in your weight. For 1 round, you gain a +1 status bonus to Acrobatics checks.",
    tags: ["acrobatics", "status-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "acrobatics", value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-009-slip-the-snare",
    localizationKey: "SlipTheSnare",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Slip the Snare",
    fallbackDescription: "Nothing gets to hold you while survival still has somewhere else to be. For 1 round, you are immune to the immobilized condition.",
    tags: ["immobilized", "immunity", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "immobilized" }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-010-two-heartbeats-ahead",
    localizationKey: "TwoHeartbeatsAhead",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Two Heartbeats Ahead",
    fallbackDescription: "You are already leaving the place where death expected to find you. You may immediately Step twice as a free action. Each Step must move you farther from the hostile source, and the normal restrictions of Step apply.",
    tags: ["step", "free-action", "movement", "manual"],
    effect: null
  })
]);
