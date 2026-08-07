export const MODULE_ID = "pf2e-critical-forge-against-all-odds";
export const MODULE_TITLE = "PF2E Critical Forge: Against All Odds";
export const MODULE_VERSION = "0.1.0-dev.21";
export const API_VERSION = "0.1.0";

export const REQUIRED_CRITICAL_FORGE_VERSION = ">=1.0.0-rc";
export const REQUIRED_CRITICAL_FORGE_API_VERSION = ">=0.9.4";
export const REQUIRED_EXTENSION_CONTRACT_VERSION = ">=1";

export const CONTEXT_PROVIDER_ID = `${MODULE_ID}.context`;
export const CONTEXT_PROVIDER_VERSION = "1.1.0";
export const CONDITION_PROVIDER_ID = `${MODULE_ID}.fields`;
export const DIAGNOSTIC_PROVIDER_ID = `${MODULE_ID}.diagnostics`;

export const THEME_IDS = Object.freeze({
  BLOODIED: "bloodied-triumphs",
  SURROUNDED: "surrounded-still-standing",
  GIANT_SLAYER: "giant-slayer-moments",
  NARROW_ESCAPE: "narrow-escapes"
});

export const SPECIALIZED_DECK_TYPES = Object.freeze([
  "attack",
  "fortitude",
  "reflex",
  "will"
]);

export const SETTING_KEYS = Object.freeze({
  ENABLE_BLOODIED: "enableBloodiedTriumphs",
  ENABLE_SURROUNDED: "enableSurroundedStillStanding",
  ENABLE_GIANT_SLAYER: "enableGiantSlayerMoments",
  ENABLE_NARROW_ESCAPE: "enableNarrowEscapes",
  BLOODIED_THRESHOLD: "bloodiedThreshold",
  SURROUNDED_THRESHOLD: "surroundedThreshold",
  GIANT_SLAYER_THRESHOLD: "giantSlayerThreshold",
  NARROW_ESCAPE_THRESHOLD: "narrowEscapeThreshold"
});
