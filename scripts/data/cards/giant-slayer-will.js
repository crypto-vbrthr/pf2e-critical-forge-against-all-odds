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
    tags: ["hostile-source", "stupefied", "intimidation", "counterpressure", "mental", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
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
    filters: { excludedTargetTraits: ["mindless"] },
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
    filters: { excludedTargetTraits: ["mindless"] },
    effect: null
  }),

  defineGiantSlayerWillCard({
    id: "gsw-011-stand-taller-than-the-command",
    localizationKey: "StandTallerThanTheCommand",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Stand Taller Than the Command",
    fallbackDescription: "The stronger foe's will hits like a decree. You answer by becoming harder to move in mind and sharper in judgment. For 1 round, you gain a +1 circumstance bonus to Will saves and Perception checks.",
    tags: ["will", "perception", "resolve", "effect"],
    contentBatch: 28,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will", "perception"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-012-the-voice-falters",
    localizationKey: "TheVoiceFalters",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "The Voice Falters",
    fallbackDescription: "A mental assault from the stronger foe meets resistance sharp enough to break its rhythm. For 1 round, the hostile source is stupefied 1 and takes a -1 circumstance penalty to spell DC.",
    tags: ["hostile-source", "mental", "stupefied", "spell-dc", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    contentBatch: 28,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "stupefied", value: 1 },
        { type: "modifier", selector: "spell-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-013-four-levels-authority-fractures",
    localizationKey: "FourLevelsAuthorityFractures",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Levels, Authority Fractures",
    fallbackDescription: "Against a foe four or more levels above you, a perfect refusal turns certainty into visible strain. For 1 round, the hostile source is frightened 1 and takes a -1 circumstance penalty to Will DC and Perception DC.",
    tags: ["greater-gap", "hostile-source", "frightened", "will-dc", "perception-dc", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
    contentBatch: 28,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "frightened", value: 1 },
        { type: "modifier", selector: ["will-dc", "perception-dc"], value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-014-measure-the-threat-not-yourself",
    localizationKey: "MeasureTheThreatNotYourself",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Measure the Threat, Not Yourself",
    fallbackDescription: "Once you stop comparing power and start reading intent, the stronger foe becomes a problem instead of a verdict. For 1 round, you gain a +1 circumstance bonus to Perception checks and class DC.",
    tags: ["perception", "class-dc", "composure", "effect"],
    contentBatch: 28,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["perception", "class-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-015-share-the-defiance",
    localizationKey: "ShareTheDefiance",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Share the Defiance",
    fallbackDescription: "Your refusal is loud enough to become shelter for someone else. Choose one ally within 30 feet who can see or hear you. That ally gains a +1 circumstance bonus to the next Will save they attempt before the start of your next turn. Apply this result manually.",
    tags: ["ally", "will", "support", "manual"],
    contentBatch: 28,
    effect: null
  }),
  defineGiantSlayerWillCard({
    id: "gsw-016-make-the-threat-sound-small",
    localizationKey: "MakeTheThreatSoundSmall",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Make the Threat Sound Small",
    fallbackDescription: "The stronger foe's presence loses weight the instant you refuse to grant it authority. For 1 round, the hostile source takes a -1 circumstance penalty to Intimidation, Deception, and Diplomacy checks.",
    tags: ["hostile-source", "intimidation", "deception", "diplomacy", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    contentBatch: 28,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["intimidation", "deception", "diplomacy"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-017-your-mind-sets-the-terms",
    localizationKey: "YourMindSetsTheTerms",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Your Mind Sets the Terms",
    fallbackDescription: "You resist overwhelming will so completely that your own magic and authority snap into focus. For 1 round, you gain a +1 status bonus to Will DC and spell DC.",
    tags: ["will-dc", "spell-dc", "focus", "effect"],
    contentBatch: 28,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will-dc", "spell-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-018-five-levels-no-kneeling",
    localizationKey: "FiveLevelsNoKneeling",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, No Kneeling",
    fallbackDescription: "Against a foe five or more levels above you, surviving the pressure becomes proof that the difference in power is not permission to rule you. You gain 5 temporary Hit Points and a +1 status bonus to Will saves for 1 round.",
    tags: ["extreme-gap", "temporary-hit-points", "will", "defiance", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    contentBatch: 28,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 5 },
        { type: "modifier", selector: "will", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-019-pressure-rebounds",
    localizationKey: "PressureRebounds",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Pressure Rebounds",
    fallbackDescription: "The stronger foe drives its mind against yours and finds nowhere for the force to go except back. For 1 round, the hostile source is frightened 1 and stupefied 1, and takes a -1 circumstance penalty to Will DC.",
    tags: ["hostile-source", "mental", "frightened", "stupefied", "counterpressure", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    contentBatch: 28,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "frightened", value: 1 },
        { type: "condition", slug: "stupefied", value: 1 },
        { type: "modifier", selector: "will-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-020-answer-with-a-cutting-word",
    localizationKey: "AnswerWithACuttingWord",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Answer with a Cutting Word",
    fallbackDescription: "The stronger foe tried to make you feel small. You find the sentence that makes the imbalance sound ridiculous. If you can use Bon Mot, you may immediately attempt Bon Mot against the hostile source as a free action with a +2 circumstance bonus to the Diplomacy check. Apply this result manually; normal Bon Mot restrictions still apply.",
    tags: ["bon-mot", "diplomacy", "free-action", "hostile-source", "manual"],
    filters: { excludedTargetTraits: ["mindless"] },
    contentBatch: 28,
    effect: null
  })
,
  defineGiantSlayerWillCard({
    id: "gsw-021-your-voice-carries-upward",
    localizationKey: "YourVoiceCarriesUpward",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Your Voice Carries Upward",
    fallbackDescription: "The stronger foe cannot make authority flow only one way. For 1 round, you gain a +1 circumstance bonus to Diplomacy checks, Intimidation checks, and Perception checks.",
    tags: ["will", "diplomacy", "intimidation", "defiance", "effect"],
    contentBatch: 29,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["diplomacy", "intimidation", "perception"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-022-the-mind-overreaches",
    localizationKey: "TheMindOverreaches",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "The Mind Overreaches",
    fallbackDescription: "A mental assault from the stronger foe reaches too far and loses precision on the return. For 1 round, the hostile source is stupefied 1 and takes a -1 circumstance penalty to AC.",
    tags: ["hostile-source", "mental", "stupefied", "attack-roll", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    contentBatch: 29,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "stupefied", value: 1 },
        { type: "modifier", selector: "ac", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-023-four-levels-the-command-cracks",
    localizationKey: "FourLevelsTheCommandCracks",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Levels, the Command Cracks",
    fallbackDescription: "Against a foe four or more levels above you, your perfect refusal turns command into hesitation. For 1 round, the hostile source is frightened 1 and takes a -1 circumstance penalty to spell DC.",
    tags: ["greater-gap", "hostile-source", "frightened", "spell-dc", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 4 },
    contentBatch: 29,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "frightened", value: 1 },
        { type: "modifier", selector: "spell-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-024-defiance-has-weight",
    localizationKey: "DefianceHasWeight",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Defiance Has Weight",
    fallbackDescription: "The stronger foe fails to move your mind and leaves something solid behind. You gain 3 temporary Hit Points and a +1 circumstance bonus to class DC for 1 round.",
    tags: ["temporary-hit-points", "class-dc", "defiance", "effect"],
    contentBatch: 29,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 3 },
        { type: "modifier", selector: "class-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-025-read-the-claim-behind-the-threat",
    localizationKey: "ReadTheClaimBehindTheThreat",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Read the Claim Behind the Threat",
    fallbackDescription: "Resisting the stronger foe strips the performance away from the intent beneath it. You may immediately use Sense Motive against the hostile source as a free action with a +2 circumstance bonus to the Perception check. The normal restriction on repeated attempts still applies. Apply this result manually.",
    tags: ["sense-motive", "perception", "free-action", "hostile-source", "manual"],
    filters: { excludedTargetTraits: ["mindless"] },
    contentBatch: 29,
    effect: null
  }),
  defineGiantSlayerWillCard({
    id: "gsw-026-break-the-resonance",
    localizationKey: "BreakTheResonance",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Break the Resonance",
    fallbackDescription: "You refuse an overwhelming voice so completely that its authority breaks into noise. For 1 round, the hostile source is deafened and takes a -1 circumstance penalty to spell DC.",
    tags: ["hostile-source", "auditory", "deafened", "spell-dc", "effect"],
    filters: { attackTraits: ["auditory"] },
    contentBatch: 29,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "deafened" },
        { type: "modifier", selector: "spell-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-027-turn-conviction-into-casting",
    localizationKey: "TurnConvictionIntoCasting",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Turn Conviction into Casting",
    fallbackDescription: "Your refusal becomes focus rather than merely survival. For 1 round, you gain a +1 circumstance bonus to spell attack rolls and Will DC.",
    tags: ["spell-attack-roll", "will-dc", "focus", "effect"],
    contentBatch: 29,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["spell-attack-roll", "will-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-028-five-levels-still-your-name",
    localizationKey: "FiveLevelsStillYourName",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Levels, Still Your Name",
    fallbackDescription: "Against a foe five or more levels above you, the pressure fails to decide who you are. For 1 round, you gain a +1 status bonus to Will saves, class DC, and spell DC.",
    tags: ["extreme-gap", "will", "class-dc", "spell-dc", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.giantSlayer.levelGap", operator: "gte", value: 5 },
    contentBatch: 29,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will", "class-dc", "spell-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-029-certainty-collapses-inward",
    localizationKey: "CertaintyCollapsesInward",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Certainty Collapses Inward",
    fallbackDescription: "The stronger foe pushes certainty into your mind and feels its own control fracture when you refuse it. For 1 round, the hostile source is off-guard and takes a -1 circumstance penalty to attack rolls and class DC.",
    tags: ["hostile-source", "mental", "off-guard", "attack-roll", "class-dc", "counterpressure", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    contentBatch: 29,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "class-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineGiantSlayerWillCard({
    id: "gsw-030-name-the-opening-for-another",
    localizationKey: "NameTheOpeningForAnother",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Name the Opening for Another",
    fallbackDescription: "You have heard the stronger foe's certainty crack and can tell someone else exactly where to press. Choose one ally within 30 feet who can see or hear you. That ally gains a +1 circumstance bonus to their next check to Demoralize, Feint, Bon Mot, or Recall Knowledge against the hostile source before the start of your next turn. Apply this result manually.",
    tags: ["ally", "support", "skill-check", "hostile-source", "manual"],
    filters: { excludedTargetTraits: ["mindless"] },
    contentBatch: 29,
    effect: null
  })
]);
