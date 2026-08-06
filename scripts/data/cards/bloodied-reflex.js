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
  }),
  defineBloodiedReflexCard({
    id: "br-011-motion-refuses-to-die",
    localizationKey: "MotionRefusesToDie",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Motion Refuses to Die",
    fallbackDescription: "Pain strips away hesitation until every direction becomes escape. For 1 round, you gain a +5-foot circumstance bonus to all your Speeds.",
    tags: ["movement", "all-speeds", "circumstance-bonus", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-012-wound-reads-the-angle",
    localizationKey: "WoundReadsTheAngle",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Wound Reads the Angle",
    fallbackDescription: "Every near miss teaches your body exactly where force wants to put you. For 1 round, your Reflex DC gains a +2 circumstance bonus.",
    tags: ["reflex-dc", "circumstance-bonus", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "reflex-dc", value: 2, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-013-no-grip-holds-the-wind",
    localizationKey: "NoGripHoldsTheWind",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "No Grip Holds the Wind",
    fallbackDescription: "Anything that closes around you discovers it has caught motion rather than flesh. For 1 round, you are immune to the grabbed and restrained conditions.",
    tags: ["grabbed", "restrained", "immunity", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "immunity", immunityType: "grabbed" },
        { type: "immunity", immunityType: "restrained" }
      ]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-014-hit-arrives-too-late",
    localizationKey: "HitArrivesTooLate",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Hit Arrives Too Late",
    fallbackDescription: "Your body remembers the fraction of a second that separates a wound from a killing blow. For 1 round, you gain resistance 3 to damage from critical hits.",
    tags: ["critical-hits", "resistance", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "critical-hits", value: 3 }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-015-blood-knows-the-exit",
    localizationKey: "BloodKnowsTheExit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Blood Knows the Exit",
    fallbackDescription: "You stop looking for safety and start moving toward it. For 1 round, you gain a +1 status bonus to Acrobatics and Stealth checks.",
    tags: ["acrobatics", "stealth", "status-bonus", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["acrobatics", "stealth"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-016-dodge-becomes-counterstroke",
    localizationKey: "DodgeBecomesCounterstroke",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Dodge Becomes Counterstroke",
    fallbackDescription: "The motion that saves your life is already winding the next attack. For 1 round, you gain a +1 circumstance bonus to attack rolls.",
    tags: ["attack-roll", "counterattack", "circumstance-bonus", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "attack-roll", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-017-reflex-without-thought",
    localizationKey: "ReflexWithoutThought",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Reflex Without Thought",
    fallbackDescription: "Conscious thought becomes too slow for survival. For 1 round, you gain a +1 status bonus to checks based on Dexterity.",
    tags: ["dexterity", "status-bonus", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "dex-based", value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-018-motion-cannot-be-stolen",
    localizationKey: "MotionCannotBeStolen",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Motion Cannot Be Stolen",
    fallbackDescription: "You have too little life left to surrender even a heartbeat of movement. For 1 round, you are immune to the slowed condition.",
    tags: ["slowed", "immunity", "tempo", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "slowed" }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-019-nothing-clings",
    localizationKey: "NothingClings",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Nothing Clings",
    fallbackDescription: "Flame, acid, blood, and venom find no stable place on a body that will not stop moving. For 1 round, you gain resistance 3 to persistent damage.",
    tags: ["persistent-damage", "resistance", "effect"],
    contentBatch: 7,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "persistent-damage", value: 3 }]
    }
  }),
  defineBloodiedReflexCard({
    id: "br-020-through-the-impossible-opening",
    localizationKey: "ThroughTheImpossibleOpening",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Through the Impossible Opening",
    fallbackDescription: "For one impossible instant, every threat points toward the same escape route. You may immediately Stride as a free action, moving no more than half your Speed. This movement does not trigger reactions; apply this result manually.",
    tags: ["stride", "free-action", "movement", "no-reactions", "manual"],
    contentBatch: 7,
    effect: null
  }),
  defineBloodiedReflexCard({
    id: "br-021-their-lines-cross-behind-you", localizationKey: "TheirLinesCrossBehindYou", tone: "dramatic", impact: "moderate",
    fallbackTitle: "Their Lines Cross Behind You", fallbackDescription: "When at least two enemies threaten you, your escape makes their angles interfere with one another. The hostile source becomes off-guard for 1 round.",
    tags: ["surrounded", "target", "off-guard", "effect"], extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 2 }, contentBatch: 11,
    effect: { target: "target", duration: ONE_ROUND, components: [{ type: "condition", slug: "off-guard" }] }
  }),
  defineBloodiedReflexCard({
    id: "br-022-four-blades-one-rhythm", localizationKey: "FourBladesOneRhythm", tone: "dramatic", impact: "moderate",
    fallbackTitle: "Four Blades, One Rhythm", fallbackDescription: "With four or more enemies threatening you, the chaos becomes a single readable pattern. For 1 round, you gain a +1 status bonus to attack rolls.",
    tags: ["heavily-surrounded", "attack-roll", "status-bonus", "effect"], extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 }, contentBatch: 11,
    effect: { duration: ONE_ROUND, components: [{ type: "modifier", selector: "attack-roll", value: 1, modifierType: "status", predicate: [] }] }
  }),
  defineBloodiedReflexCard({
    id: "br-023-quarter-breath-defense", localizationKey: "QuarterBreathDefense", tone: "dramatic", impact: "strong",
    fallbackTitle: "Defense on a Quarter Breath", fallbackDescription: "At one-quarter Hit Points or less, survival compresses into pure geometry. For 1 round, you gain a +1 circumstance bonus to AC and Reflex DC.",
    tags: ["critical-health", "ac", "reflex-dc", "circumstance-bonus", "effect"], extraConditions: { field: "extensions.againstAllOdds.bloodied.hpRatio", operator: "lte", value: 0.25 }, contentBatch: 11,
    effect: { duration: ONE_ROUND, components: [{ type: "modifier", selector: ["ac", "reflex-dc"], value: 1, modifierType: "circumstance", predicate: [] }] }
  }),
  defineBloodiedReflexCard({
    id: "br-024-overreach-becomes-opening", localizationKey: "OverreachBecomesOpening", tone: "serious", impact: "moderate",
    fallbackTitle: "Overreach Becomes Opening", fallbackDescription: "The hostile source commits too much to the attack you escaped. For 1 round, it takes a -1 circumstance penalty to attack rolls.",
    tags: ["target", "attack-roll", "countermove", "circumstance-penalty", "effect"], contentBatch: 11,
    effect: { target: "target", duration: ONE_ROUND, components: [{ type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }] }
  }),
  defineBloodiedReflexCard({
    id: "br-025-fire-shows-the-gap", localizationKey: "FireShowsTheGap", tone: "dramatic", impact: "moderate",
    fallbackTitle: "Fire Shows the Gap", fallbackDescription: "The flame outlines the safe space you found inside it. After critically succeeding against fire damage, you gain resistance 4 to fire for 1 round.",
    tags: ["fire", "resistance", "effect"], filters: { damageTypes: ["fire"] }, contentBatch: 11,
    effect: { duration: ONE_ROUND, components: [{ type: "resistance", resistanceType: "fire", value: 4 }] }
  }),
  defineBloodiedReflexCard({
    id: "br-026-acid-slides-away", localizationKey: "AcidSlidesAway", tone: "serious", impact: "moderate",
    fallbackTitle: "Acid Slides Away", fallbackDescription: "The same motion that saved you keeps the corrosive edge from settling. After critically succeeding against acid damage, you gain resistance 4 to acid for 1 round.",
    tags: ["acid", "resistance", "effect"], filters: { damageTypes: ["acid"] }, contentBatch: 11,
    effect: { duration: ONE_ROUND, components: [{ type: "resistance", resistanceType: "acid", value: 4 }] }
  }),
  defineBloodiedReflexCard({
    id: "br-027-cold-cannot-settle", localizationKey: "ColdCannotSettle", tone: "serious", impact: "light",
    fallbackTitle: "Cold Cannot Settle", fallbackDescription: "You never give the frost enough stillness to take hold. After critically succeeding against cold damage, your land Speed gains a +5-foot status bonus for 1 round.",
    tags: ["cold", "movement", "status-bonus", "effect"], filters: { damageTypes: ["cold"] }, contentBatch: 11,
    effect: { duration: ONE_ROUND, components: [{ type: "movement", movementType: "land", value: 5, modifierType: "status" }] }
  }),
  defineBloodiedReflexCard({
    id: "br-028-lightning-teaches-the-line", localizationKey: "LightningTeachesTheLine", tone: "dramatic", impact: "moderate",
    fallbackTitle: "Lightning Teaches the Line", fallbackDescription: "The current shows you the shortest path through danger. After critically succeeding against electricity damage, you gain a +1 status bonus to Reflex saves for 1 round.",
    tags: ["electricity", "reflex", "status-bonus", "effect"], filters: { damageTypes: ["electricity"] }, contentBatch: 11,
    effect: { duration: ONE_ROUND, components: [{ type: "modifier", selector: "reflex", value: 1, modifierType: "status", predicate: [] }] }
  }),
  defineBloodiedReflexCard({
    id: "br-029-source-loses-sight-of-you", localizationKey: "SourceLosesSightOfYou", tone: "serious", impact: "moderate",
    fallbackTitle: "The Source Loses Sight of You", fallbackDescription: "Your evasive line leaves the hostile source looking where you were. For 1 round, it takes a -1 circumstance penalty to Perception DC.",
    tags: ["target", "perception-dc", "circumstance-penalty", "effect"], contentBatch: 11,
    effect: { target: "target", duration: ONE_ROUND, components: [{ type: "modifier", selector: "perception-dc", value: -1, modifierType: "circumstance", predicate: [] }] }
  }),
  defineBloodiedReflexCard({
    id: "br-030-behind-them-before-they-turn", localizationKey: "BehindThemBeforeTheyTurn", tone: "dramatic", impact: "strong",
    fallbackTitle: "Behind Them Before They Turn", fallbackDescription: "You may immediately Step as a free action. If a legal path exists, you may end this Step on the opposite side of the hostile source from where you began. This movement does not trigger reactions; apply this result manually.",
    tags: ["step", "positioning", "no-reactions", "manual"], contentBatch: 11, effect: null
  })

]);
