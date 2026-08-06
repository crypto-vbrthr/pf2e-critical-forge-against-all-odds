import { defineBloodiedWillCard } from "./card-factory.js";

const ONE_ROUND = Object.freeze({ value: 1, unit: "rounds", expiry: "turn-end" });

export const BLOODIED_WILL_CARDS = Object.freeze([
  defineBloodiedWillCard({
    id: "bw-001-mind-refuses",
    localizationKey: "MindRefuses",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Mind Refuses",
    fallbackDescription: "Your thoughts close ranks around the one command that still matters: endure. For 1 round, you gain a +1 circumstance bonus to Will saves and Will DC.",
    tags: ["will", "will-dc", "circumstance-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["will", "will-dc"], value: 1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-002-nothing-left-to-fear",
    localizationKey: "NothingLeftToFear",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Nothing Left to Fear",
    fallbackDescription: "Fear searches your wounds for purchase and finds every place already occupied by resolve. For 1 round, you are immune to the frightened condition.",
    tags: ["frightened", "fear", "immunity", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "frightened" }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-003-no-master-here",
    localizationKey: "NoMasterHere",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "No Master Here",
    fallbackDescription: "The invading will reaches for a throne and finds only shattered stone and a blade waiting beneath it. For 1 round, you are immune to the controlled condition.",
    tags: ["controlled", "mental", "immunity", "effect"],
    filters: { attackTraits: ["mental"] },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "controlled" }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-004-pain-is-proof",
    localizationKey: "PainIsProof",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Pain Is Proof",
    fallbackDescription: "The wound is real, the blood is real, and the lie has nowhere left to hide. For 1 round, you gain a +2 circumstance bonus to Perception checks and Will saves.",
    tags: ["illusion", "clarity", "perception", "will", "effect"],
    filters: { attackTraits: ["illusion"] },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["perception", "will"], value: 2, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-005-heart-remembers",
    localizationKey: "HeartRemembers",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Heart Remembers",
    fallbackDescription: "Someone else may command your feelings, but they cannot rewrite why you are still standing. The hostile source becomes stupefied 1 for 1 round.",
    tags: ["emotion", "target", "stupefied", "countershock", "effect"],
    filters: { attackTraits: ["emotion"], excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "condition", slug: "stupefied", value: 1 }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-006-thought-behind-the-blood",
    localizationKey: "ThoughtBehindTheBlood",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Thought Behind the Blood",
    fallbackDescription: "Behind the pain, one untouched thought remains and shelters everything that follows. For 1 round, you gain resistance 3 to mental damage.",
    tags: ["mental", "resistance", "effect"],
    filters: { attackTraits: ["mental"] },
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "resistance", resistanceType: "mental", value: 3 }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-007-clear-as-the-wound",
    localizationKey: "ClearAsTheWound",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Clear as the Wound",
    fallbackDescription: "Agony burns every false direction away until only the next necessary choice remains. For 1 round, you are immune to the confused condition.",
    tags: ["confused", "clarity", "immunity", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "confused" }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-008-eyes-behind-the-eyes",
    localizationKey: "EyesBehindTheEyes",
    tone: "dramatic",
    impact: "light",
    fallbackTitle: "Eyes Behind the Eyes",
    fallbackDescription: "The assault opens a colder awareness behind your ordinary senses. For 1 round, you gain a +1 status bonus to Perception checks and Perception DC.",
    tags: ["perception", "perception-dc", "status-bonus", "effect"],
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["perception", "perception-dc"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-009-defiance-looks-back",
    localizationKey: "DefianceLooksBack",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Defiance Looks Back",
    fallbackDescription: "The intruder meets your gaze from inside your own mind and realizes it has entered the wrong place. The hostile source becomes frightened 1 for 1 round.",
    tags: ["target", "frightened", "emotion", "countershock", "effect"],
    filters: { excludedTargetTraits: ["mindless"] },
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "condition", slug: "frightened", value: 1 }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-010-cut-the-hook",
    localizationKey: "CutTheHook",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Cut the Hook",
    fallbackDescription: "The failed intrusion leaves its barb exposed. You may immediately reduce your frightened or stupefied condition by 1. Choose one condition if both apply.",
    tags: ["frightened", "stupefied", "recovery", "manual"],
    effect: null
  }),
  defineBloodiedWillCard({
    id: "bw-011-will-shows-teeth",
    localizationKey: "WillShowsTeeth",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "The Will Shows Teeth",
    fallbackDescription: "The hostile thought recoils and leaves its owner a fraction too slow to press the attack. For 1 round, the hostile source takes a -1 circumstance penalty to attack rolls.",
    tags: ["mental", "target", "attack", "countershock", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    contentBatch: 8,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "attack", value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-012-name-remains",
    localizationKey: "NameRemains",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "A Name Remains",
    fallbackDescription: "Pain strips away every borrowed voice until only your own remains. For 1 round, you gain a +1 status bonus to checks based on Wisdom and Charisma.",
    tags: ["wisdom", "charisma", "identity", "status-bonus", "effect"],
    contentBatch: 8,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["wis-based", "cha-based"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-013-fear-forgets-the-way",
    localizationKey: "FearForgetsTheWay",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Fear Forgets the Way",
    fallbackDescription: "Fear can still scream, but it can no longer tell your feet where to go. For 1 round, you are immune to the fleeing condition.",
    tags: ["fear", "fleeing", "immunity", "effect"],
    filters: { attackTraits: ["fear"] },
    contentBatch: 8,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "fleeing" }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-014-foreign-thought-gives-itself-away",
    localizationKey: "ForeignThoughtGivesItselfAway",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Foreign Thought Gives Itself Away",
    fallbackDescription: "Once the intrusion fails, you can see the intention behind it. For 1 round, the hostile source takes a -1 circumstance penalty to Perception DC.",
    tags: ["mental", "target", "perception-dc", "countershock", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    contentBatch: 8,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "perception-dc", value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-015-thought-strikes-back",
    localizationKey: "ThoughtStrikesBack",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Thought Strikes Back",
    fallbackDescription: "The mental blow rebounds through the open channel. The hostile source takes 1d4 persistent mental damage.",
    tags: ["mental", "target", "persistent-damage", "countershock", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    contentBatch: 8,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "persistentDamage", formula: "1d4", damageType: "mental", dc: 15 }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-016-intruder-loses-the-thread",
    localizationKey: "IntruderLosesTheThread",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "The Intruder Loses the Thread",
    fallbackDescription: "The failed assault leaves the enemy's next command tangled in its own intent. For 1 round, the hostile source takes a -1 circumstance penalty to Spell DC and Class DC.",
    tags: ["mental", "target", "spell-dc", "class-dc", "countershock", "effect"],
    filters: { attackTraits: ["mental"], excludedTargetTraits: ["mindless"] },
    contentBatch: 8,
    effect: {
      target: "target",
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["spell-dc", "class"], value: -1, modifierType: "circumstance", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-017-pain-becomes-authority",
    localizationKey: "PainBecomesAuthority",
    tone: "dramatic",
    impact: "moderate",
    fallbackTitle: "Pain Becomes Authority",
    fallbackDescription: "You have already paid the price of doubt. For 1 round, your Spell DC and Class DC gain a +1 status bonus.",
    tags: ["spell-dc", "class-dc", "status-bonus", "effect"],
    contentBatch: 8,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: ["spell-dc", "class"], value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-018-no-second-voice",
    localizationKey: "NoSecondVoice",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "No Second Voice",
    fallbackDescription: "There is no room left in your skull for another voice to dull your thoughts. For 1 round, you are immune to the stupefied condition.",
    tags: ["stupefied", "immunity", "effect"],
    contentBatch: 8,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "immunity", immunityType: "stupefied" }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-019-clarity-after-the-storm",
    localizationKey: "ClarityAfterTheStorm",
    tone: "serious",
    impact: "moderate",
    fallbackTitle: "Clarity After the Storm",
    fallbackDescription: "The failed intrusion leaves the rest of the world unnaturally simple. For 1 round, you gain a +1 status bonus to skill checks.",
    tags: ["skill-check", "clarity", "status-bonus", "effect"],
    contentBatch: 8,
    effect: {
      duration: ONE_ROUND,
      components: [{ type: "modifier", selector: "skill-check", value: 1, modifierType: "status", predicate: [] }]
    }
  }),
  defineBloodiedWillCard({
    id: "bw-020-slam-the-door-shut",
    localizationKey: "SlamTheDoorShut",
    tone: "dramatic",
    impact: "strong",
    fallbackTitle: "Slam the Door Shut",
    fallbackDescription: "You seize the instant of clarity and lock one intruder outside yourself. Choose one ongoing effect with the mental trait currently affecting you. Its effects are suppressed until the end of your next turn, though its duration continues; apply this result manually.",
    tags: ["mental", "suppression", "manual"],
    contentBatch: 8,
    effect: null
  })

]);
