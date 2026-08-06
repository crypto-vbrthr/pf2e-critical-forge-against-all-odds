import { defineBloodiedAttackCard } from "./card-factory.js";

const SOURCE_ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-start" });
const TARGET_ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });
const UNLIMITED = Object.freeze({ value: -1, unit: "unlimited", expiry: null });

export const BLOODIED_ATTACK_CARDS = Object.freeze([
  defineBloodiedAttackCard({
    id: "ba-001-not-yet",
    localizationKey: "NotYet",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Not Yet",
    fallbackDescription: "Pain turns into force before it can become weakness. For 1 round, you gain a +2 circumstance bonus to Strike damage.",
    tags: ["strike-damage", "circumstance-bonus", "offense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "strike-damage", value: 2, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-002-pain-honed-edge",
    localizationKey: "PainHonedEdge",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Pain-Honed Edge",
    fallbackDescription: "Every wound redraws the line of your next attack. For 1 round, you gain a +1 circumstance bonus to attack rolls.",
    tags: ["attack-roll", "circumstance-bonus", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "attack-roll", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-003-back-against-the-world",
    localizationKey: "BackAgainstTheWorld",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Against the Whole World",
    fallbackDescription: "Your counterstroke tears open the defense that should have ended you. The target is off-guard for 1 round.",
    tags: ["target", "off-guard", "opening", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "off-guard" }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-004-blood-in-the-stride",
    localizationKey: "BloodInTheStride",
    category: "criticalHit",
    tone: "dramatic",
    impact: "light",
    fallbackTitle: "Blood in the Grip",
    fallbackDescription: "The pain steadies your hands and gives your threat a terrible certainty. For 1 round, you gain a +1 status bonus to Athletics and Intimidation checks.",
    tags: ["athletics", "intimidation", "status-bonus", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: ["athletics", "intimidation"], value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-005-you-flinch-first",
    localizationKey: "YouFlinchFirst",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "You Flinch First",
    fallbackDescription: "The target recoils before the wounded creature that should have broken. The target becomes clumsy 1 for 1 round.",
    tags: ["target", "clumsy", "recoil", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "clumsy", value: 1 }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-006-crimson-afterimage",
    localizationKey: "CrimsonAfterimage",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Crimson Afterimage",
    fallbackDescription: "The spell leaves a second, blood-red impact inside every wound it opens. For 1 round, you gain a +2 status bonus to spell damage.",
    tags: ["spell-damage", "status-bonus", "offense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "spell-damage", value: 2, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-007-will-through-the-wound",
    localizationKey: "WillThroughTheWound",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Will Through the Wound",
    fallbackDescription: "The successful spell proves that your will is still stronger than your injuries. For 1 round, you gain a +1 status bonus to saving throws.",
    tags: ["saving-throws", "status-bonus", "defiance", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "saving-throw", value: 1, modifierType: "status", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-008-wound-holds-the-weave",
    localizationKey: "WoundHoldsTheWeave",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Wound Holds the Weave",
    fallbackDescription: "For one impossible moment, your injuries anchor magic instead of weakening it. For 1 round, you gain resistance 2 to all damage.",
    tags: ["resistance", "all-damage", "defense", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "resistance", resistanceType: "all-damage", value: 2 }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-009-scarlet-opening",
    localizationKey: "ScarletOpening",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "strong",
    fallbackTitle: "Scarlet Opening",
    fallbackDescription: "The critical spell leaves the target's defenses traced in red. For 1 round, the target takes a -1 circumstance penalty to saving throws.",
    tags: ["target", "saving-throws", "circumstance-penalty", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "modifier", selector: "saving-throw", value: -1, modifierType: "circumstance", predicate: [] }
      ]
    }
  }),
  defineBloodiedAttackCard({
    id: "ba-010-one-more-breath",
    localizationKey: "OneMoreBreath",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "One More Breath",
    fallbackDescription: "The spell buys a heartbeat from a future that had already spent it. You may immediately Step as a free action, following the normal restrictions of Step.",
    tags: ["step", "free-action", "movement", "manual"],
    effect: null
  }),
  defineBloodiedAttackCard({
    id: "ba-011-blood-answers-blood",
    localizationKey: "BloodAnswersBlood",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Blood Answers Blood",
    fallbackDescription: "Your own wounds make the strike cruelly exact. The target takes 1d4 persistent bleed damage.",
    tags: ["target", "persistent-damage", "bleed", "effect"],
    filters: { excludedTargetTraits: ["construct", "ooze"] },
    effect: {
      target: "target",
      duration: UNLIMITED,
      components: [
        { type: "persistentDamage", formula: "1d4", damageType: "bleed" }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-012-breach-for-everyone",
    localizationKey: "BreachForEveryone",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "A Breach for Everyone",
    fallbackDescription: "Your critical blow opens a seam that every weapon can find. For 1 round, the target gains weakness 2 to weapons.",
    tags: ["target", "weakness", "weapons", "teamwork", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "weakness", weaknessType: "weapons", value: 2 }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-013-steal-their-beat",
    localizationKey: "StealTheirBeat",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Steal Their Beat",
    fallbackDescription: "The hit lands exactly when the enemy needs their rhythm most. The target becomes slowed 1 for 1 round.",
    tags: ["target", "slowed", "tempo", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "slowed", value: 1 }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-014-strength-runs-red",
    localizationKey: "StrengthRunsRed",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Strength Runs Red",
    fallbackDescription: "The wound steals leverage from every motion that follows. The target becomes enfeebled 1 for 1 round.",
    tags: ["target", "enfeebled", "pressure", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "enfeebled", value: 1 }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-015-hunt-the-opening",
    localizationKey: "HuntTheOpening",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Hunt the Opening",
    fallbackDescription: "The critical blow creates a path and your wounded body takes it before caution can object. You may immediately Step as a free action, but you must end the Step closer to the target if possible.",
    tags: ["step", "free-action", "pursuit", "manual"],
    effect: null,
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-016-spellscar",
    localizationKey: "Spellscar",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Spellscar",
    fallbackDescription: "The magic does not merely strike; it leaves a place where more magic wants to enter. For 1 round, the target gains weakness 2 to damage from spells.",
    tags: ["target", "weakness", "spell-damage", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "weakness", weaknessType: "damage-from-spells", value: 2 }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-017-pain-holds-the-formula",
    localizationKey: "PainHoldsTheFormula",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Pain Holds the Formula",
    fallbackDescription: "Your injuries strip away every unnecessary thought until only the spell remains. For 1 round, you gain a +1 circumstance bonus to your spell DC.",
    tags: ["spell-dc", "circumstance-bonus", "focus", "effect"],
    effect: {
      duration: SOURCE_ONE_ROUND,
      components: [
        { type: "modifier", selector: "spell-dc", value: 1, modifierType: "circumstance", predicate: [] }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-018-thought-bleeds-back",
    localizationKey: "ThoughtBleedsBack",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Thought Bleeds Back",
    fallbackDescription: "The mental impact rebounds through the opening it created. The target becomes stupefied 1 for 1 round.",
    tags: ["target", "mental", "stupefied", "effect"],
    filters: { spellTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "condition", slug: "stupefied", value: 1 }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-019-power-refuses-to-fade",
    localizationKey: "PowerRefusesToFade",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Power Refuses to Fade",
    fallbackDescription: "The spell should be over. The pain in your body refuses to let it end. The target takes 1d4 persistent force damage.",
    tags: ["target", "persistent-damage", "force", "effect"],
    effect: {
      target: "target",
      duration: UNLIMITED,
      components: [
        { type: "persistentDamage", formula: "1d4", damageType: "force" }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-020-magic-nails-the-shadow",
    localizationKey: "MagicNailsTheShadow",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Magic Nails the Shadow",
    fallbackDescription: "The spell pins the target's motion to the instant of impact. For 1 round, the target takes a -5-foot circumstance penalty to all Speeds.",
    tags: ["target", "movement", "speed-penalty", "effect"],
    effect: {
      target: "target",
      duration: TARGET_ONE_ROUND,
      components: [
        { type: "movement", movementType: "all", value: -5, modifierType: "circumstance" }
      ]
    },
    contentBatch: 5
  }),
  defineBloodiedAttackCard({
    id: "ba-021-drive-them-back",
    localizationKey: "DriveThemBack",
    category: "criticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Drive Them Back",
    fallbackDescription: "The critical blow gives you one brutal instant of leverage. If the triggering attack was melee, you may immediately attempt to Shove the target as a free action; the Shove uses its normal rules and contributes to your multiple attack penalty. Apply this result manually.",
    tags: ["melee", "shove", "free-action", "manual"],
    filters: { attackTraits: ["melee"] },
    effect: null,
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-022-ruin-their-aim",
    localizationKey: "RuinTheirAim",
    category: "criticalHit",
    tone: "serious",
    impact: "light",
    fallbackTitle: "Ruin Their Aim",
    fallbackDescription: "Your shot does not need to kill to spoil the enemy's next line. For 1 round, the target takes a -1 circumstance penalty to attack rolls.",
    tags: ["ranged", "target", "attack-roll", "circumstance-penalty", "effect"],
    filters: { attackTraits: ["ranged"], excludedAttackTraits: ["spell"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "modifier", selector: "attack-roll", value: -1, modifierType: "circumstance", predicate: [] }] },
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-023-bone-rings-like-a-bell",
    localizationKey: "BoneRingsLikeABell",
    category: "criticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Bone Rings Like a Bell",
    fallbackDescription: "The bludgeoning impact travels through the target faster than balance can answer. The target falls prone.",
    tags: ["bludgeoning", "target", "prone", "effect"],
    filters: { damageTypes: ["bludgeoning"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "condition", slug: "prone" }] },
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-024-cut-to-the-core",
    localizationKey: "CutToTheCore",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Cut to the Core",
    fallbackDescription: "The slashing wound makes every attempt to brace or resist visibly harder. For 1 round, the target takes a -1 circumstance penalty to Fortitude DC.",
    tags: ["slashing", "target", "fortitude-dc", "circumstance-penalty", "effect"],
    filters: { damageTypes: ["slashing"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "modifier", selector: "fortitude-dc", value: -1, modifierType: "circumstance", predicate: [] }] },
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-025-find-the-nerve",
    localizationKey: "FindTheNerve",
    category: "criticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Find the Nerve",
    fallbackDescription: "The piercing strike finds a point the target cannot move without remembering. For 1 round, the target takes a -1 circumstance penalty to Reflex DC.",
    tags: ["piercing", "target", "reflex-dc", "circumstance-penalty", "effect"],
    filters: { damageTypes: ["piercing"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "modifier", selector: "reflex-dc", value: -1, modifierType: "circumstance", predicate: [] }] },
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-026-light-in-the-wound",
    localizationKey: "LightInTheWound",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Light in the Wound",
    fallbackDescription: "The spell leaves brightness burning where the target expected pain. After a critical light spell attack, the target is dazzled for 1 round.",
    tags: ["light", "target", "dazzled", "effect"],
    filters: { spellTraits: ["light"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "condition", slug: "dazzled" }] },
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-027-thunder-in-the-blood",
    localizationKey: "ThunderInTheBlood",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "light",
    fallbackTitle: "Thunder in the Blood",
    fallbackDescription: "The sonic impact leaves the world ringing behind it. After a critical sonic spell attack, the target is deafened for 1 round.",
    tags: ["sonic", "target", "deafened", "effect"],
    filters: { spellTraits: ["sonic"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "condition", slug: "deafened" }] },
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-028-cold-steals-the-step",
    localizationKey: "ColdStealsTheStep",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Cold Steals the Step",
    fallbackDescription: "Frost locks around the target's stride before the pain can fade. For 1 round after a critical cold spell attack, the target takes a 10-foot circumstance penalty to its land Speed.",
    tags: ["cold", "target", "movement", "effect"],
    filters: { spellTraits: ["cold"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "movement", movementType: "land", value: -10, modifierType: "circumstance" }] },
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-029-lightning-steals-a-heartbeat",
    localizationKey: "LightningStealsAHeartbeat",
    category: "spellCriticalHit",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Lightning Steals a Heartbeat",
    fallbackDescription: "The current arrives in the target's nerves before its thoughts can follow. After a critical electricity spell attack, the target becomes stunned 1.",
    tags: ["electricity", "target", "stunned", "effect"],
    filters: { spellTraits: ["electricity"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "condition", slug: "stunned", value: 1 }] },
    contentBatch: 9
  }),
  defineBloodiedAttackCard({
    id: "ba-030-acid-finds-the-seam",
    localizationKey: "AcidFindsTheSeam",
    category: "spellCriticalHit",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Acid Finds the Seam",
    fallbackDescription: "The acid does not need to eat through everything; it only needs to show where the protection ends. For 1 round, the target takes a -1 circumstance penalty to AC.",
    tags: ["acid", "target", "ac", "circumstance-penalty", "effect"],
    filters: { spellTraits: ["acid"] },
    effect: { target: "target", duration: TARGET_ONE_ROUND, components: [{ type: "modifier", selector: "ac", value: -1, modifierType: "circumstance", predicate: [] }] },
    contentBatch: 9
  })

]);
