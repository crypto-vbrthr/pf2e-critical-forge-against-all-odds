import { defineNarrowEscapeAttackCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const NARROW_ESCAPE_ATTACK_CARDS = Object.freeze([
  defineNarrowEscapeAttackCard({
    id: "nea-001-cut-open-the-exit",
    localizationKey: "CutOpenTheExit",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Cut Open the Exit",
    fallbackDescription: "The critical hit does more than wound. It tears a route through the danger. For 1 round, the target is off-guard and takes a -1 circumstance penalty to Perception checks.",
    tags: ["target", "off-guard", "perception", "escape-route", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "modifier", selector: "perception", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-002-one-second-bought",
    localizationKey: "OneSecondBought",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "One Second Bought",
    fallbackDescription: "The opening is tiny, but it is yours. For 1 round, you gain a +1 circumstance bonus to AC and Fortitude saves.",
    tags: ["ac", "fortitude", "defense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["ac", "fortitude"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-003-run-on-the-opening",
    localizationKey: "RunOnTheOpening",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Run on the Opening",
    fallbackDescription: "You do not admire the hit. You use it. For 1 round, you gain a 5-foot circumstance bonus to all Speeds and a +1 circumstance bonus to Acrobatics checks.",
    tags: ["movement", "acrobatics", "escape", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" },
        { type: "modifier", selector: "acrobatics", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-004-make-pursuit-expensive",
    localizationKey: "MakePursuitExpensive",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Make Pursuit Expensive",
    fallbackDescription: "The critical hit punishes the instant they try to recover and chase. For 1 round, the target takes a -5-foot circumstance penalty to all Speeds and a -1 circumstance penalty to Perception checks.",
    tags: ["target", "movement", "perception", "pursuit", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" },
        { type: "modifier", selector: "perception", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-005-shield-the-heartbeat",
    localizationKey: "ShieldTheHeartbeat",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Shield the Heartbeat",
    fallbackDescription: "The hit buys exactly enough time to protect the life behind it. If you are wielding a shield and can Raise a Shield, you may immediately Raise it as a free action. Otherwise, you may immediately Step. Apply this result manually.",
    tags: ["raise-a-shield", "step", "free-action", "manual"],
    effect: null
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-006-cast-through-the-gap",
    localizationKey: "CastThroughTheGap",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Cast Through the Gap",
    fallbackDescription: "The critical spell leaves momentum behind instead of smoke. For 1 round, you gain a +1 circumstance bonus to spell attack rolls and a 5-foot circumstance bonus to all Speeds.",
    tags: ["spell", "spell-attack-roll", "movement", "escape", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "spell-attack-roll", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-007-flash-of-an-exit",
    localizationKey: "FlashOfAnExit",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Flash of an Exit",
    fallbackDescription: "The spell lights the one route that was invisible a heartbeat ago. For 1 round, you gain a +1 circumstance bonus to AC, Reflex saves, and Perception checks.",
    tags: ["spell", "ac", "reflex", "perception", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["ac", "reflex", "perception"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-008-danger-breaks-its-stride",
    localizationKey: "DangerBreaksItsStride",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Danger Breaks Its Stride",
    fallbackDescription: "When the danger is already severe, the critical spell turns pursuit into recovery. At danger score 4 or higher, for 1 round the target is clumsy 1 and takes a -1 circumstance penalty to Perception checks.",
    tags: ["spell", "danger-score", "target", "clumsy", "perception", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "perception", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-009-still-here-still-moving",
    localizationKey: "StillHereStillMoving",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Still Here, Still Moving",
    fallbackDescription: "At danger score 5 or higher, the spell proves there is still a future to move toward. For 1 round, you gain 4 temporary Hit Points and a +1 circumstance bonus to Reflex saves.",
    tags: ["spell", "danger-score", "temporary-hit-points", "reflex", "survival", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 4 },
        { type: "modifier", selector: "reflex", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-010-collapse-the-line-behind-you",
    localizationKey: "CollapseTheLineBehindYou",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Collapse the Line Behind You",
    fallbackDescription: "The critical spell leaves the pursuer choosing between you and its footing. For 1 round, the target takes a -1 circumstance penalty to Reflex DC and Perception checks.",
    tags: ["spell", "target", "reflex-dc", "perception", "effect"],
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "perception", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  })
]);
