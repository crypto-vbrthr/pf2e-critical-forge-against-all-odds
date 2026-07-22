import { defineBloodiedFortitudeCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const BLOODIED_FORTITUDE_CARDS = Object.freeze([
  defineBloodiedFortitudeCard({
    id: "bf-001-heart-refuses",
    localizationKey: "HeartRefuses",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Heart Refuses",
    fallbackDescription: "The body hears the order to fail and answers with another beat. For 1 round, you gain 6 temporary Hit Points.",
    tags: ["temporary-hit-points", "survival", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "temporaryHitPoints", value: 6 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-002-bitter-blood",
    localizationKey: "BitterBlood",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Bitter Blood",
    fallbackDescription: "Your wounded body turns hostile to every toxin that enters it. For 1 round, you gain resistance 3 to poison damage.",
    tags: ["poison", "resistance", "effect"],
    filters: { attackTraits: ["poison"] },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "poison", value: 3 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-003-body-as-bastion",
    localizationKey: "BodyAsBastion",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Body as Bastion",
    fallbackDescription: "Muscle, bone, and stubbornness lock into one defensive shape. For 1 round, you gain a +1 circumstance bonus to Fortitude saves and Fortitude DC.",
    tags: ["fortitude", "fortitude-dc", "circumstance-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["fortitude", "fortitude-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-004-flesh-becomes-armor",
    localizationKey: "FleshBecomesArmor",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Flesh Becomes Armor",
    fallbackDescription: "Pain hardens the body faster than steel can break it. For 1 round, you gain resistance 2 to physical damage.",
    tags: ["physical", "resistance", "defense", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "physical", value: 2 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-005-second-pulse",
    localizationKey: "SecondPulse",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Second Pulse",
    fallbackDescription: "A second rhythm rises beneath the first and drags you back from the brink. For 1 round, you gain fast healing 4.",
    tags: ["fast-healing", "recovery", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "fastHealing", value: 4 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-006-no-room-for-nausea",
    localizationKey: "NoRoomForNausea",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "No Room for Nausea",
    fallbackDescription: "Your body has more urgent work than surrendering to sickness. For 1 round, you are immune to the sickened condition.",
    tags: ["sickened", "disease", "immunity", "effect"],
    filters: { attackTraits: ["disease"] },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "sickened" }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-007-blood-obeys",
    localizationKey: "BloodObeys",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Blood Obeys",
    fallbackDescription: "The blood already spilled is enough; the rest stays where you command it. For 1 round, you gain resistance 3 to bleed damage.",
    tags: ["bleed", "resistance", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "bleed", value: 3 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-008-nerves-refuse",
    localizationKey: "NervesRefuse",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "The Nerves Refuse",
    fallbackDescription: "Shock races through you and finds every nerve already occupied by defiance. For 1 round, you are immune to the stunned condition.",
    tags: ["stunned", "immunity", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "stunned" }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-009-strength-does-not-leave",
    localizationKey: "StrengthDoesNotLeave",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Strength Does Not Leave",
    fallbackDescription: "Your strength may bend, but for one more moment it cannot be taken from you. For 1 round, you are immune to the enfeebled condition.",
    tags: ["enfeebled", "immunity", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "enfeebled" }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-010-close-the-wound",
    localizationKey: "CloseTheWound",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Close the Wound",
    fallbackDescription: "Your body seizes one injury and forces it toward an ending. You may immediately attempt the recovery check for one persistent damage effect affecting you, using DC 10 instead of its normal DC.",
    tags: ["persistent-damage", "recovery", "manual"],
    effect: null
  })
]);
