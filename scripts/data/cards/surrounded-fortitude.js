import { defineSurroundedFortitudeCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const SURROUNDED_FORTITUDE_CARDS = Object.freeze([
  defineSurroundedFortitudeCard({
    id: "ssf-001-body-is-the-anchor",
    localizationKey: "BodyIsTheAnchor",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Body Is the Anchor",
    fallbackDescription: "The ring presses inward and your stance ties defense to endurance. For 1 round, you gain a +1 circumstance bonus to AC and Fortitude DC.",
    tags: ["ac", "fortitude-dc", "anchor", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "fortitude-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-002-pressure-hardens-the-frame",
    localizationKey: "PressureHardensTheFrame",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Pressure Hardens the Frame",
    fallbackDescription: "Every enemy leaning into the crush teaches your body where to harden and brace. For 1 round, you gain resistance 2 to physical damage and a +1 circumstance bonus to Athletics checks.",
    tags: ["physical", "resistance", "athletics", "brace", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "physical", value: 2 },
        { type: "modifier", selector: "athletics", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-003-no-hand-finds-purchase",
    localizationKey: "NoHandFindsPurchase",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "No Hand Finds Purchase",
    fallbackDescription: "Too many hands reach for you, giving you leverage against every hold. For 1 round, you gain a +2 circumstance bonus to Athletics checks and Fortitude DC.",
    tags: ["grab", "athletics", "fortitude-dc", "brace", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["athletics", "fortitude-dc"], value: 2, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-004-three-against-stone",
    localizationKey: "ThreeAgainstStone",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Three Against Stone",
    fallbackDescription: "With three or more enemies bearing down on you, every angle of pressure locks the next one in place. For 1 round, you gain a +1 circumstance bonus to AC.",
    tags: ["heavily-surrounded", "ac", "circumstance-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-005-four-cannot-fold-you",
    localizationKey: "FourCannotFoldYou",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Cannot Fold You",
    fallbackDescription: "Four or more threats close in and your whole body becomes one refusal. For 1 round, you gain a +1 status bonus to saving throws.",
    tags: ["heavily-surrounded", "saving-throws", "status-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "saving-throw", value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-006-make-them-spend-themselves",
    localizationKey: "MakeThemSpendThemselves",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Make Them Spend Themselves",
    fallbackDescription: "A threatening enemy commits too much force trying to break you. For 1 round, the hostile source takes a -1 circumstance penalty to attack rolls and Athletics checks.",
    tags: ["hostile-source", "attack-roll", "athletics", "counterpressure", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "athletics"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-007-breath-between-blows",
    localizationKey: "BreathBetweenBlows",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Breath Between Blows",
    fallbackDescription: "You find one clean breath in a space where there should be none. For 1 round, you gain fast healing 3.",
    tags: ["fast-healing", "endurance", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "fastHealing", value: 3 }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-008-every-wound-shares-the-load",
    localizationKey: "EveryWoundSharesTheLoad",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Every Wound Shares the Load",
    fallbackDescription: "No single injury gets to own your attention while the ring is closing. For 1 round, you gain resistance 2 to persistent damage and fast healing 2.",
    tags: ["persistent-damage", "resistance", "fast-healing", "endurance", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "persistent-damage", value: 2 },
        { type: "fastHealing", value: 2 }
      ]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-009-crowd-gives-you-leverage",
    localizationKey: "CrowdGivesYouLeverage",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Crowd Gives You Leverage",
    fallbackDescription: "Every body pressing inward becomes something to brace against. For 1 round, you gain a +1 circumstance bonus to Athletics checks and attack rolls.",
    tags: ["athletics", "attack-roll", "circumstance-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["athletics", "attack-roll"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedFortitudeCard({
    id: "ssf-010-set-your-feet",
    localizationKey: "SetYourFeet",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Set Your Feet",
    fallbackDescription: "You root yourself against the whole ring at once. Until the start of your next turn, reduce any forced movement caused by a hostile effect by 10 feet, to a minimum of 0 feet. Apply this result manually.",
    tags: ["forced-movement", "brace", "manual"],
    effect: null
  })
]);
