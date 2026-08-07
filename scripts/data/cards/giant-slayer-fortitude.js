import { defineGiantSlayerFortitudeCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const GIANT_SLAYER_FORTITUDE_CARDS = Object.freeze([
  defineGiantSlayerFortitudeCard({
    id: "gsf-001-unmoved-by-the-impossible",
    localizationKey: "UnmovedByTheImpossible",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Unmoved by the Impossible",
    fallbackDescription: "The stronger foe expected raw force to decide the matter. Your body refuses the premise. For 1 round, you gain a +1 circumstance bonus to Fortitude DC and Athletics checks.",
    tags: ["fortitude-dc", "athletics", "brace", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude-dc", "athletics"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-002-their-force-betrays-them",
    localizationKey: "TheirForceBetraysThem",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Their Force Betrays Them",
    fallbackDescription: "The hostile source commits enough force to crush you and instead exposes its own structure. For 1 round, it takes a -1 circumstance penalty to attack rolls and Fortitude DC.",
    tags: ["hostile-source", "attack-roll", "fortitude-dc", "counterpressure", "melee-threat", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "fortitude-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-003-survive-then-strike",
    localizationKey: "SurviveThenStrike",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Survive, Then Strike",
    fallbackDescription: "You withstand what should have ended the exchange and turn survival into timing. For 1 round, you gain a +1 status bonus to Fortitude saves and attack rolls.",
    tags: ["fortitude", "attack-roll", "counteroffense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "attack-roll"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-004-weight-turns-against-them",
    localizationKey: "WeightTurnsAgainstThem",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Weight Turns Against Them",
    fallbackDescription: "The hostile source leans on overwhelming strength and finds its own mass fighting back. For 1 round, it is enfeebled 1 and takes a -1 circumstance penalty to Athletics checks.",
    tags: ["hostile-source", "enfeebled", "athletics", "leverage", "larger-opponent", "melee-threat", "effect"],
    extraConditions: [{ field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }, { field: "extensions.againstAllOdds.giantSlayer.opponentIsLarger", operator: "eq", value: true }],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 },
        { type: "modifier", selector: "athletics", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-005-five-levels-still-standing",
    localizationKey: "FiveLevelsStillStanding",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, Still Standing",
    fallbackDescription: "A foe five or more levels above you unleashes its strength and you are still there when the force passes. For 1 round, you gain a +1 status bonus to AC and saving throws.",
    tags: ["extreme-gap", "ac", "saving-throws", "defense", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "saving-throw"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-006-heart-above-the-measure",
    localizationKey: "HeartAboveTheMeasure",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Heart Above the Measure",
    fallbackDescription: "The contest says you are outmatched. Your body supplies a different answer. For 1 round, you gain a +1 status bonus to Fortitude saves and class DC.",
    tags: ["fortitude", "class-dc", "resolve", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "class-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-007-impact-opens-the-guard",
    localizationKey: "ImpactOpensTheGuard",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Impact Opens the Guard",
    fallbackDescription: "The hostile source expected you to fold and overcommits when you do not. For 1 round, it is off-guard and takes a -1 circumstance penalty to Fortitude DC.",
    tags: ["hostile-source", "off-guard", "fortitude-dc", "opening", "melee-threat", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "fortitude-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-008-overreach-has-a-price",
    localizationKey: "OverreachHasAPrice",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Overreach Has a Price",
    fallbackDescription: "Against a foe four or more levels above you, surviving its full commitment turns strength into imbalance. For 1 round, the hostile source is enfeebled 1 and takes a -1 circumstance penalty to Reflex DC.",
    tags: ["greater-gap", "hostile-source", "enfeebled", "reflex-dc", "melee-threat", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.giantSlayer.opponentIsThreatening", operator: "eq", value: true }
    ],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 },
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-009-survival-becomes-counterforce",
    localizationKey: "SurvivalBecomesCounterforce",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Survival Becomes Counterforce",
    fallbackDescription: "You do not merely absorb the stronger foe's power; you carry it into the answer. For 1 round, you gain a +1 circumstance bonus to Strike damage and Fortitude saves.",
    tags: ["strike-damage", "fortitude", "counteroffense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["strike-damage", "fortitude"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerFortitudeCard({
    id: "gsf-010-step-into-their-shadow",
    localizationKey: "StepIntoTheirShadow",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Step Into Their Shadow",
    fallbackDescription: "The stronger foe's power passes you and leaves one instant in which distance belongs to you. You may immediately Step as a free action. If possible, the Step must reduce the distance to the hostile source. Apply this result manually.",
    tags: ["step", "free-action", "close-distance", "manual"],
    effect: null
  })
]);
