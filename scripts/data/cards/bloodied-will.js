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
  })
]);
