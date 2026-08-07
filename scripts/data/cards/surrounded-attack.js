import { defineSurroundedAttackCard } from "./card-factory.js";

const SOURCE_ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-start" });
const TARGET_ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const SURROUNDED_ATTACK_CARDS = Object.freeze([
  defineSurroundedAttackCard({
    id: "ssa-001-center-does-not-break",
    localizationKey: "CenterDoesNotBreak",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Center Does Not Break",
    fallbackDescription: "Where others would retreat, you become the fixed point in the ring. For 1 round, you gain a +1 circumstance bonus to AC.",
    tags: ["ac", "circumstance-bonus", "defense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [{ type: "modifier", selector: "ac", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-002-break-their-rhythm",
    localizationKey: "BreakTheirRhythm",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Break Their Rhythm",
    fallbackDescription: "Your counterstroke makes one fighter in the ring hesitate. For 1 round, a threatening target takes a -1 circumstance penalty to attack rolls and Athletics checks.",
    tags: ["target", "attack-roll", "athletics", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "athletics"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-003-one-foe-becomes-the-gap",
    localizationKey: "OneFoeBecomesTheGap",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "One Foe Becomes the Gap",
    fallbackDescription: "Your critical hit turns a threatening enemy into the weak seam of the ring. For 1 round, the target becomes clumsy 1 and takes a -5-foot circumstance penalty to all Speeds.",
    tags: ["target", "clumsy", "movement", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-004-three-blades-one-focus",
    localizationKey: "ThreeBladesOneFocus",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Three Blades, One Focus",
    fallbackDescription: "With three or more enemies pressing in, every threat becomes a landmark. For 1 round, you gain a +1 circumstance bonus to attack rolls and Perception checks.",
    tags: ["heavily-surrounded", "attack-roll", "perception", "circumstance-bonus", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [{ type: "modifier", selector: ["attack-roll", "perception"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-005-through-the-gap",
    localizationKey: "ThroughTheGap",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Through the Gap",
    fallbackDescription: "The critical blow opens a heartbeat of space. You may immediately Step as a free action; if possible, end the Step in a space where fewer enemies threaten you. Apply this result manually.",
    tags: ["step", "positioning", "free-action", "manual"],
    effect: null
  }),
  defineSurroundedAttackCard({
    id: "ssa-006-pressure-sharpens-the-formula",
    localizationKey: "PressureSharpensTheFormula",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Pressure Sharpens the Formula",
    fallbackDescription: "Every closing blade strips another distraction from the spell. For 1 round, you gain a +1 circumstance bonus to spell attack rolls.",
    tags: ["spell", "spell-attack-roll", "circumstance-bonus", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [{ type: "modifier", selector: "spell-attack-roll", value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-007-magic-tears-the-formation",
    localizationKey: "MagicTearsTheFormation",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Magic Tears the Formation",
    fallbackDescription: "The spell makes a threatening enemy the weak seam of the formation. For 1 round, the target takes a -1 circumstance penalty to saving throws and Perception checks.",
    tags: ["spell", "target", "saving-throws", "perception", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "modifier", selector: ["saving-throw", "perception"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-008-four-against-one",
    localizationKey: "FourAgainstOne",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Against One",
    fallbackDescription: "Four or more enemies close in and still the spell lands perfectly. The target becomes frightened 1.",
    tags: ["spell", "heavily-surrounded", "target", "frightened", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "condition", slug: "frightened", value: 1 }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-009-ring-turns-inward",
    localizationKey: "RingTurnsInward",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "The Ring Turns Inward",
    fallbackDescription: "The spell makes one enemy the fault line in the whole formation. For 1 round, the target gains weakness 1 to all damage.",
    tags: ["spell", "target", "weakness", "teamwork", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "weakness", weaknessType: "all-damage", value: 1 }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-010-no-free-angle",
    localizationKey: "NoFreeAngle",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "No Free Angle",
    fallbackDescription: "The spell catches a threatening enemy where the formation gives it nowhere clean to move or strike. For 1 round, the target takes a -5-foot circumstance penalty to all Speeds and a -1 circumstance penalty to attack rolls.",
    tags: ["spell", "target", "movement", "attack-roll", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" },
        { type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-011-turn-the-ring-against-them",
    localizationKey: "TurnTheRingAgainstThem",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Turn the Ring Against Them",
    fallbackDescription: "You drive a threatening foe into the bad geometry of its own formation. For 1 round, the target takes a -1 circumstance penalty to AC and Athletics checks.",
    tags: ["target", "ac", "athletics", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 17,
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "athletics"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-012-crowd-their-footwork",
    localizationKey: "CrowdTheirFootwork",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Crowd Their Footwork",
    fallbackDescription: "Your hit makes a threatening enemy trip over the very pressure meant to trap you. For 1 round, the target takes a -1 circumstance penalty to Reflex DC and a -5-foot circumstance penalty to all Speeds.",
    tags: ["target", "reflex-dc", "movement", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 17,
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-013-more-blades-fewer-openings",
    localizationKey: "MoreBladesFewerOpenings",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "More Blades, Fewer Openings",
    fallbackDescription: "With three or more enemies crowding you, their attacks begin to obstruct one another. For 1 round, you gain a +1 circumstance bonus to AC and Reflex DC.",
    tags: ["heavily-surrounded", "ac", "reflex-dc", "defense", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
    contentBatch: 17,
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "reflex-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-014-four-bodies-one-bottleneck",
    localizationKey: "FourBodiesOneBottleneck",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Bodies, One Bottleneck",
    fallbackDescription: "With four or more enemies packed around you, a critical hit turns one threatening foe into a blockage. For 1 round, the target gains weakness 1 to weapons and takes a -5-foot circumstance penalty to all Speeds.",
    tags: ["heavily-surrounded", "target", "weakness", "movement", "formation", "effect"],
    extraConditions: [
      { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 17,
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "weakness", weaknessType: "weapons", value: 1 },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-015-shoulder-the-ring-open",
    localizationKey: "ShoulderTheRingOpen",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Shoulder the Ring Open",
    fallbackDescription: "Your critical hit gives you one brutal instant to disrupt the encirclement. You may immediately attempt to Shove one currently threatening enemy other than the target as a free action. Apply this result manually.",
    tags: ["shove", "formation", "free-action", "manual"],
    contentBatch: 17,
    effect: null
  }),
  defineSurroundedAttackCard({
    id: "ssa-016-spell-between-their-blades",
    localizationKey: "SpellBetweenTheirBlades",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Spell Between Their Blades",
    fallbackDescription: "You cast through a forest of weapons without giving the ring a clean opening. For 1 round, you gain a +1 circumstance bonus to spell attack rolls and AC.",
    tags: ["spell", "spell-attack-roll", "ac", "defense", "effect"],
    contentBatch: 17,
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [{ type: "modifier", selector: ["spell-attack-roll", "ac"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-017-arc-through-the-crowd",
    localizationKey: "ArcThroughTheCrowd",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Arc Through the Crowd",
    fallbackDescription: "The spell uses the ring's own congestion against a threatening foe. For 1 round, the target takes a -1 circumstance penalty to AC and saving throws.",
    tags: ["spell", "target", "ac", "saving-throws", "formation", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true },
    contentBatch: 17,
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [{ type: "modifier", selector: ["ac", "saving-throw"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-018-pressure-finds-the-weak-link",
    localizationKey: "PressureFindsTheWeakLink",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Pressure Finds the Weak Link",
    fallbackDescription: "With three or more enemies closing in, your spell exposes the one whose concentration holds the line together. A threatening target becomes stupefied 1 and takes a -5-foot circumstance penalty to all Speeds for 1 round.",
    tags: ["spell", "heavily-surrounded", "target", "stupefied", "movement", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    extraConditions: [
      { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 3 },
      { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 17,
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "stupefied", value: 1 },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-019-four-shadows-one-flash",
    localizationKey: "FourShadowsOneFlash",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Shadows, One Flash",
    fallbackDescription: "Four or more enemies crowd your sightlines, and the spell still finds the exact break in the ring. A threatening target becomes off-guard and frightened 1 for 1 round.",
    tags: ["spell", "heavily-surrounded", "target", "off-guard", "frightened", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    extraConditions: [
      { field: "extensions.againstAllOdds.surrounded.count", operator: "gte", value: 4 },
      { field: "extensions.againstAllOdds.surrounded.opponentIsThreatening", operator: "eq", value: true }
    ],
    contentBatch: 17,
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard", value: 1 },
        { type: "condition", slug: "frightened", value: 1 }
      ]
    }
  }),
  defineSurroundedAttackCard({
    id: "ssa-020-carve-a-magical-corridor",
    localizationKey: "CarveAMagicalCorridor",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Carve a Magical Corridor",
    fallbackDescription: "The spell punches a momentary lane through the encirclement. You may immediately Stride up to half your Speed as a free action; the spell's target cannot use reactions triggered by this movement. Apply this result manually.",
    tags: ["spell", "stride", "positioning", "reaction-denial", "manual"],
    contentBatch: 17,
    effect: null
  })
]);
