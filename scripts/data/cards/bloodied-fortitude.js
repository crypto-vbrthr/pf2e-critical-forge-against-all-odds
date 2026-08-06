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
  ,
  defineBloodiedFortitudeCard({
    id: "bf-011-death-has-no-purchase",
    localizationKey: "DeathHasNoPurchase",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Death Has No Purchase",
    fallbackDescription: "Death reaches for a body that has already decided to remain. For 1 round, you are immune to death effects.",
    tags: ["death", "immunity", "effect"],
    filters: { attackTraits: ["death"] },
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "death-effects" }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-012-iron-lungs",
    localizationKey: "IronLungs",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Iron Lungs",
    fallbackDescription: "You seize one clean breath and refuse to surrender it. For 1 round, you are immune to inhaled effects.",
    tags: ["inhaled", "immunity", "effect"],
    filters: { attackTraits: ["inhaled"] },
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "inhaled" }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-013-no-blood-for-the-void",
    localizationKey: "NoBloodForTheVoid",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "No Blood for the Void",
    fallbackDescription: "The emptiness claws at what little remains and finds your life clenched tight. For 1 round, you gain resistance 4 to void damage.",
    tags: ["void", "resistance", "effect"],
    filters: { damageTypes: ["void"] },
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "void", value: 4 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-014-scars-guard-the-heart",
    localizationKey: "ScarsGuardTheHeart",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Scars Guard the Heart",
    fallbackDescription: "Old wounds teach the new one where not to land. For 1 round, you gain resistance 4 to precision damage.",
    tags: ["precision", "resistance", "effect"],
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "precision", value: 4 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-015-pain-leaves-room-for-healing",
    localizationKey: "PainLeavesRoomForHealing",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Pain Leaves Room for Healing",
    fallbackDescription: "Every torn edge of you reaches toward repair. For 1 round, you gain a +2 status bonus to healing you receive.",
    tags: ["healing", "status-bonus", "effect"],
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "healing-received", value: 2, modifierType: "status", predicate: [] }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-016-flesh-remembers",
    localizationKey: "FleshRemembers",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Flesh Remembers",
    fallbackDescription: "For one impossible heartbeat, your body remembers a shape without wounds. For 1 round, you gain regeneration 3, deactivated by acid or fire damage.",
    tags: ["regeneration", "survival", "effect"],
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "regeneration", value: 3, deactivatedBy: ["acid", "fire"] }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-017-core-against-the-elements",
    localizationKey: "CoreAgainstTheElements",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Core Against the Elements",
    fallbackDescription: "Heat, frost, lightning, and worse meet a body too stubborn to yield. For 1 round, you gain resistance 2 to energy damage.",
    tags: ["energy", "resistance", "effect"],
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "energy", value: 2 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-018-pressure-meets-stone",
    localizationKey: "PressureMeetsStone",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Pressure Meets Stone",
    fallbackDescription: "Anything trying to drag, crush, or force you aside finds stone where flesh should be. For 1 round, your Fortitude DC gains a +2 circumstance bonus.",
    tags: ["fortitude-dc", "circumstance-bonus", "effect"],
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "fortitude-dc", value: 2, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-019-last-reserve",
    localizationKey: "LastReserve",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Last Reserve",
    fallbackDescription: "Your body opens a reserve it was saving for the grave. For 1 round, you gain 8 temporary Hit Points.",
    tags: ["temporary-hit-points", "survival", "effect"],
    contentBatch: 6,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "temporaryHitPoints", value: 8 }]
    }
  }),
  defineBloodiedFortitudeCard({
    id: "bf-020-body-casts-it-out",
    localizationKey: "BodyCastsItOut",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "The Body Casts It Out",
    fallbackDescription: "Your body names one burden foreign and expels it by force. Immediately reduce your sickened, drained, or enfeebled condition by 1 (choose one); apply this result manually.",
    tags: ["condition-reduction", "recovery", "manual"],
    contentBatch: 6,
    effect: null
  })

]);
