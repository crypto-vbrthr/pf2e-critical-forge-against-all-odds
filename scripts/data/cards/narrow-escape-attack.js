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
    fallbackDescription: "The spell lights the one route that was invisible a heartbeat ago. For 1 round, you gain a +1 circumstance bonus to AC and Reflex saves and a 5-foot circumstance bonus to all Speeds.",
    tags: ["spell", "ac", "reflex", "movement", "escape", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["ac", "reflex"], value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
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
,
  defineNarrowEscapeAttackCard({
    id: "nea-011-turn-the-counterstroke-aside",
    localizationKey: "TurnTheCounterstrokeAside",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Turn the Counterstroke Aside",
    fallbackDescription: "The critical hit gives you just enough warning to survive the answer. For 1 round, you gain a +1 circumstance bonus to AC and Perception DC.",
    tags: ["ac", "perception-dc", "counterattack", "effect"],
    contentBatch: 34,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["ac", "perception-dc"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-012-keep-the-exit-behind-you",
    localizationKey: "KeepTheExitBehindYou",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Keep the Exit Behind You",
    fallbackDescription: "You strike without losing sight of the way out. For 1 round, you gain a 5-foot circumstance bonus to all Speeds and a +1 circumstance bonus to Perception checks.",
    tags: ["movement", "perception", "escape-route", "effect"],
    contentBatch: 34,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" },
        { type: "modifier", selector: "perception", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-013-leave-them-reaching",
    localizationKey: "LeaveThemReaching",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Leave Them Reaching",
    fallbackDescription: "The critical hit forces the pursuer to answer from a bad position. For 1 round, the target takes a -1 circumstance penalty to attack rolls and Perception checks.",
    tags: ["target", "attack-roll", "perception", "pursuit", "effect"],
    contentBatch: 34,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["attack-roll", "perception"], value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-014-four-points-break-contact",
    localizationKey: "FourPointsBreakContact",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Points, Break Contact",
    fallbackDescription: "At danger score 4 or higher, the critical hit becomes the instant you stop being trapped. For 1 round, you gain a +1 circumstance bonus to saving throws and a 5-foot circumstance bonus to all Speeds.",
    tags: ["danger-score", "saving-throws", "movement", "escape", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    contentBatch: 34,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "saving-throw", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-015-sprint-through-the-reprieve",
    localizationKey: "SprintThroughTheReprieve",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Sprint Through the Reprieve",
    fallbackDescription: "The critical hit buys more than a step. You may immediately Stride up to half your Speed as a free action. This movement must end farther from the target than you began and does not trigger reactions from that target. Apply this result manually.",
    tags: ["stride", "movement", "free-action", "escape", "manual"],
    contentBatch: 34,
    effect: null
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-016-spell-buys-cover",
    localizationKey: "SpellBuysCover",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Spell Buys Cover",
    fallbackDescription: "The critical spell gives you a heartbeat in which danger loses your outline. For 1 round, you gain a +1 circumstance bonus to Stealth checks and a +1 status bonus to Reflex saves.",
    tags: ["spell", "stealth", "reflex", "escape", "effect"],
    contentBatch: 34,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "stealth", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "modifier", selector: "reflex", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-017-magic-makes-them-hesitate",
    localizationKey: "MagicMakesThemHesitate",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Magic Makes Them Hesitate",
    fallbackDescription: "The spell lands hard enough that the pursuer's answer comes a beat late. For 1 round, you gain a +1 circumstance bonus to AC and saving throws.",
    tags: ["spell", "ac", "saving-throws", "disruption", "effect"],
    contentBatch: 34,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: ["ac", "saving-throw"], value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-018-five-points-run-before-it-closes",
    localizationKey: "FivePointsRunBeforeItCloses",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Points, Run Before It Closes",
    fallbackDescription: "At danger score 5 or higher, the critical spell gives you one impossible breath of safety. For 1 round, you gain 5 temporary Hit Points, a +1 circumstance bonus to saving throws, and a 5-foot circumstance bonus to all Speeds.",
    tags: ["spell", "danger-score", "temporary-hit-points", "saving-throws", "movement", "survival", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    contentBatch: 34,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 5 },
        { type: "modifier", selector: "saving-throw", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-019-cast-the-pursuer-off-balance",
    localizationKey: "CastThePursuerOffBalance",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Cast the Pursuer Off Balance",
    fallbackDescription: "The critical spell makes pursuit cost balance. For 1 round, the target is off-guard and takes a -5-foot circumstance penalty to all Speeds.",
    tags: ["spell", "target", "off-guard", "movement", "pursuit", "effect"],
    contentBatch: 34,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-020-hide-in-the-spells-wake",
    localizationKey: "HideInTheSpellsWake",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Hide in the Spell's Wake",
    fallbackDescription: "The critical spell leaves just enough confusion to vanish from the obvious line of danger. You may immediately Step as a free action. If that Step leaves you with cover or concealment from the target, you may immediately attempt to Hide as part of the same free action. Apply this result manually.",
    tags: ["spell", "step", "hide", "free-action", "escape", "manual"],
    contentBatch: 34,
    effect: null
  })

,
  defineNarrowEscapeAttackCard({
    id: "nea-021-keep-moving-after-the-hit",
    localizationKey: "KeepMovingAfterTheHit",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Keep Moving After the Hit",
    fallbackDescription: "The critical hit is not the end of the exchange; it is the instant your body remembers the route out. For 1 round, you gain a +1 status bonus to Athletics checks and a +1 circumstance bonus to Fortitude DC.",
    tags: ["athletics", "fortitude-dc", "escape", "effect"],
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "athletics", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "fortitude-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-022-cut-the-pursuit-short",
    localizationKey: "CutThePursuitShort",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Cut the Pursuit Short",
    fallbackDescription: "The pursuer has to choose between answering your hit and keeping control of the chase. For 1 round, the target takes a -1 circumstance penalty to class DC and a -5-foot circumstance penalty to all Speeds.",
    tags: ["target", "class-dc", "movement", "pursuit", "effect"],
    contentBatch: 38,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "class-dc", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-023-four-points-turn-the-corner",
    localizationKey: "FourPointsTurnTheCorner",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Four Points, Turn the Corner",
    fallbackDescription: "At danger score 4 or higher, the critical hit buys enough distance to make the next heartbeat belong to you. For 1 round, you gain 4 temporary Hit Points, a +1 status bonus to Perception checks, and a +10-foot circumstance bonus to your land Speed.",
    tags: ["danger-score", "temporary-hit-points", "perception", "land-speed", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 4 },
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 4 },
        { type: "modifier", selector: "perception", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "land", value: 10, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-024-take-the-narrow-way",
    localizationKey: "TakeTheNarrowWay",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Take the Narrow Way",
    fallbackDescription: "The opening is too small to waste. You may immediately Stride up to 10 feet as a free action. The first 5 feet of difficult terrain during this movement cost no extra movement, and the target cannot use reactions triggered by this movement. Apply this result manually.",
    tags: ["stride", "difficult-terrain", "free-action", "escape", "manual"],
    contentBatch: 38,
    effect: null
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-025-make-them-guard-the-wrong-side",
    localizationKey: "MakeThemGuardTheWrongSide",
    category: "criticalHit",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Make Them Guard the Wrong Side",
    fallbackDescription: "The critical hit makes the pursuer defend the place you are no longer going to be. For 1 round, the target takes a -1 circumstance penalty to Reflex DC and a -5-foot status penalty to all Speeds.",
    tags: ["target", "reflex-dc", "movement", "misdirection", "effect"],
    contentBatch: 38,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: -5, modifierType: "status" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-026-magic-marks-the-safe-line",
    localizationKey: "MagicMarksTheSafeLine",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Magic Marks the Safe Line",
    fallbackDescription: "For one clear instant, the spell shows where danger is not. For 1 round, you gain a +1 status bonus to Perception DC and a +1 circumstance bonus to spell DC.",
    tags: ["spell", "perception-dc", "spell-dc", "escape-route", "effect"],
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "perception-dc", value: 1, modifierType: "status", predicate: [] },
        { type: "modifier", selector: "spell-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-027-leave-the-blast-behind",
    localizationKey: "LeaveTheBlastBehind",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Leave the Blast Behind",
    fallbackDescription: "The spell finishes behind you instead of around you. For 1 round, you gain a +1 circumstance bonus to Fortitude saves and a +5-foot status bonus to all Speeds.",
    tags: ["spell", "fortitude", "movement", "escape", "effect"],
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "modifier", selector: "fortitude", value: 1, modifierType: "circumstance", predicate: [] },
        { type: "movement", movementType: "all", value: 5, modifierType: "status" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-028-five-points-vanish-before-the-answer",
    localizationKey: "FivePointsVanishBeforeTheAnswer",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Five Points, Vanish Before the Answer",
    fallbackDescription: "At danger score 5 or higher, the spell lands and you are already somewhere harder to finish. For 1 round, you gain 5 temporary Hit Points, a +1 status bonus to Stealth checks, and a +10-foot circumstance bonus to your land Speed.",
    tags: ["spell", "danger-score", "temporary-hit-points", "stealth", "land-speed", "effect"],
    extraConditions: { field: "extensions.againstAllOdds.narrowEscape.score", operator: "gte", value: 5 },
    contentBatch: 38,
    effect: {
      duration: ONE_ROUND,
      components: [
        { type: "temporaryHitPoints", value: 5 },
        { type: "modifier", selector: "stealth", value: 1, modifierType: "status", predicate: [] },
        { type: "movement", movementType: "land", value: 10, modifierType: "circumstance" }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-029-close-the-pursuit-window",
    localizationKey: "CloseThePursuitWindow",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Close the Pursuit Window",
    fallbackDescription: "The critical spell leaves the pursuer reacting too slowly to keep the route closed. For 1 round, the target is clumsy 1 and takes a -1 circumstance penalty to spell DC.",
    tags: ["spell", "target", "clumsy", "spell-dc", "pursuit", "effect"],
    contentBatch: 38,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 },
        { type: "modifier", selector: "spell-dc", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineNarrowEscapeAttackCard({
    id: "nea-030-run-for-the-cover-the-spell-made",
    localizationKey: "RunForTheCoverTheSpellMade",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Run for the Cover the Spell Made",
    fallbackDescription: "The spell gives you one moving pocket of safety. You may immediately Stride up to 10 feet as a free action. If you end this movement with cover from the target, you may immediately Take Cover as part of the same free action. The target cannot use reactions triggered by this movement. Apply this result manually.",
    tags: ["spell", "stride", "take-cover", "free-action", "escape", "manual"],
    contentBatch: 38,
    effect: null
  })

]);
