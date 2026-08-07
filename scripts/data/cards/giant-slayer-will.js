import { defineGiantSlayerWillCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const GIANT_SLAYER_WILL_CARDS = Object.freeze([
  defineGiantSlayerWillCard({
    id: "gsw-001-the-impossible-has-a-name",
    localizationKey: "TheImpossibleHasAName",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Impossible Has a Name",
    fallbackDescription: "A foe this powerful stops being an abstraction the moment you understand that it can still be opposed. For 1 round, you gain a +1 circumstance bonus to Will saves and Intimidation checks.",
    tags: ["will", "intimidation", "resolve", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will", "intimidation"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-002-arrogance-cracks",
    localizationKey: "ArroganceCracks",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Arrogance Cracks",
    fallbackDescription: "The stronger foe expected obedience, terror, or hesitation. Your refusal leaves a visible fracture in that certainty. For 1 round, the hostile source is frightened 1 and takes a -1 circumstance penalty to Perception DC.",
    tags: ["hostile-source", "frightened", "perception-dc", "arrogance", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "frightened", value: 1 },
        { type: "modifier", selector: "perception-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-003-defiance-becomes-authority",
    localizationKey: "DefianceBecomesAuthority",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Defiance Becomes Authority",
    fallbackDescription: "Resisting something far beyond you gives your own intent unexpected weight. For 1 round, you gain a +1 status bonus to Will DC and class DC.",
    tags: ["will-dc", "class-dc", "authority", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will-dc", "class-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-004-dominance-loses-its-grip",
    localizationKey: "DominanceLosesItsGrip",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Dominance Loses Its Grip",
    fallbackDescription: "The hostile source presses its mind against yours and discovers that superiority is not the same thing as control. For 1 round, it is stupefied 1 and takes a -1 circumstance penalty to Intimidation checks.",
    tags: ["hostile-source", "stupefied", "intimidation", "counterpressure", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "stupefied", value: 1 },
        { type: "modifier", selector: "intimidation", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-005-five-levels-still-no-god",
    localizationKey: "FiveLevelsStillNoGod",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, Still No God",
    fallbackDescription: "Against a foe five or more levels above you, the difference in power becomes undeniable and somehow less frightening for being named. For 1 round, you gain a +1 status bonus to Will saves, AC, and Perception DC.",
    tags: ["extreme-gap", "will", "ac", "perception-dc", "defiance", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will", "ac", "perception-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-006-speak-across-the-gap",
    localizationKey: "SpeakAcrossTheGap",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Speak Across the Gap",
    fallbackDescription: "You answer overwhelming presence with a voice that refuses to become smaller. For 1 round, you gain a +1 circumstance bonus to Diplomacy checks and Will DC.",
    tags: ["diplomacy", "will-dc", "presence", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["diplomacy", "will-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-007-their-certainty-misses-a-beat",
    localizationKey: "TheirCertaintyMissesABeat",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Their Certainty Misses a Beat",
    fallbackDescription: "The stronger foe realizes that its pressure did not move you, and that realization costs it a moment of perfect command. For 1 round, the hostile source takes a -1 circumstance penalty to attack rolls, Will DC, and Perception DC.",
    tags: ["hostile-source", "attack-roll", "will-dc", "perception-dc", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "will-dc", "perception-dc"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-008-four-levels-one-doubt",
    localizationKey: "FourLevelsOneDoubt",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Levels, One Doubt",
    fallbackDescription: "Against a foe four or more levels above you, your refusal plants a doubt powerful enough to survive inside its certainty. For 1 round, the hostile source is frightened 1 and takes a -1 circumstance penalty to class DC.",
    tags: ["greater-gap", "hostile-source", "frightened", "class-dc", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "frightened", value: 1 },
        { type: "modifier", selector: "class-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-009-look-back-without-flinching",
    localizationKey: "LookBackWithoutFlinching",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Look Back Without Flinching",
    fallbackDescription: "You stop measuring yourself against the stronger foe and start measuring the battlefield instead. For 1 round, you gain a +1 status bonus to Perception checks, Intimidation checks, and Will DC.",
    tags: ["perception", "intimidation", "will-dc", "composure", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["perception", "intimidation", "will-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-010-answer-the-giant",
    localizationKey: "AnswerTheGiant",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Answer the Giant",
    fallbackDescription: "The stronger foe tried to impose its will and gave you the perfect moment to answer. You may immediately attempt to Demoralize the hostile source as a free action with a +2 circumstance bonus. Apply this result manually; normal Demoralize restrictions still apply.",
    tags: ["demoralize", "free-action", "intimidation", "hostile-source", "manual"],
    effect: null
  })
]);
