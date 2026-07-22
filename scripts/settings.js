import { MODULE_ID, SETTING_KEYS } from "./constants.js";
import { booleanSetting, normalizeThreshold } from "./utils.js";

let refreshHandler = null;

export function bindSettingsRefresh(handler) {
  refreshHandler = typeof handler === "function" ? handler : null;
}

export function registerSettings(gameRef = globalThis.game) {
  const settings = gameRef?.settings;
  if (!settings?.register) return false;

  registerBoolean(settings, SETTING_KEYS.ENABLE_BLOODIED, true);
  registerBoolean(settings, SETTING_KEYS.ENABLE_SURROUNDED, true);
  registerBoolean(settings, SETTING_KEYS.ENABLE_GIANT_SLAYER, true);
  registerBoolean(settings, SETTING_KEYS.ENABLE_NARROW_ESCAPE, true);

  settings.register(MODULE_ID, SETTING_KEYS.BLOODIED_THRESHOLD, {
    name: "PF2E_AGAINST_ALL_ODDS.Settings.BloodiedThreshold.Name",
    hint: "PF2E_AGAINST_ALL_ODDS.Settings.BloodiedThreshold.Hint",
    scope: "world",
    config: true,
    type: Number,
    default: 0.5,
    range: { min: 0.1, max: 0.9, step: 0.05 },
    onChange: requestRefresh
  });

  settings.register(MODULE_ID, SETTING_KEYS.SURROUNDED_THRESHOLD, {
    name: "PF2E_AGAINST_ALL_ODDS.Settings.SurroundedThreshold.Name",
    hint: "PF2E_AGAINST_ALL_ODDS.Settings.SurroundedThreshold.Hint",
    scope: "world",
    config: true,
    type: Number,
    default: 2,
    range: { min: 1, max: 8, step: 1 },
    onChange: requestRefresh
  });

  settings.register(MODULE_ID, SETTING_KEYS.GIANT_SLAYER_THRESHOLD, {
    name: "PF2E_AGAINST_ALL_ODDS.Settings.GiantSlayerThreshold.Name",
    hint: "PF2E_AGAINST_ALL_ODDS.Settings.GiantSlayerThreshold.Hint",
    scope: "world",
    config: true,
    type: Number,
    default: 3,
    range: { min: 1, max: 8, step: 1 },
    onChange: requestRefresh
  });

  settings.register(MODULE_ID, SETTING_KEYS.NARROW_ESCAPE_THRESHOLD, {
    name: "PF2E_AGAINST_ALL_ODDS.Settings.NarrowEscapeThreshold.Name",
    hint: "PF2E_AGAINST_ALL_ODDS.Settings.NarrowEscapeThreshold.Hint",
    scope: "world",
    config: true,
    type: Number,
    default: 3,
    range: { min: 1, max: 8, step: 1 },
    onChange: requestRefresh
  });

  return true;
}

export function readSettings(gameRef = globalThis.game) {
  const read = (key, fallback) => {
    try {
      const value = gameRef?.settings?.get?.(MODULE_ID, key);
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };

  return Object.freeze({
    enableBloodiedTriumphs: booleanSetting(read(SETTING_KEYS.ENABLE_BLOODIED, true)),
    enableSurroundedStillStanding: booleanSetting(read(SETTING_KEYS.ENABLE_SURROUNDED, true)),
    enableGiantSlayerMoments: booleanSetting(read(SETTING_KEYS.ENABLE_GIANT_SLAYER, true)),
    enableNarrowEscapes: booleanSetting(read(SETTING_KEYS.ENABLE_NARROW_ESCAPE, true)),
    bloodiedThreshold: normalizeThreshold(read(SETTING_KEYS.BLOODIED_THRESHOLD, 0.5), 0.5, { minimum: 0.1, maximum: 0.9 }),
    surroundedThreshold: Math.round(normalizeThreshold(read(SETTING_KEYS.SURROUNDED_THRESHOLD, 2), 2, { minimum: 1, maximum: 8 })),
    giantSlayerThreshold: Math.round(normalizeThreshold(read(SETTING_KEYS.GIANT_SLAYER_THRESHOLD, 3), 3, { minimum: 1, maximum: 8 })),
    narrowEscapeThreshold: Math.round(normalizeThreshold(read(SETTING_KEYS.NARROW_ESCAPE_THRESHOLD, 3), 3, { minimum: 1, maximum: 8 }))
  });
}

function registerBoolean(settings, key, defaultValue) {
  const token = key.charAt(0).toUpperCase() + key.slice(1);
  settings.register(MODULE_ID, key, {
    name: `PF2E_AGAINST_ALL_ODDS.Settings.${token}.Name`,
    hint: `PF2E_AGAINST_ALL_ODDS.Settings.${token}.Hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: defaultValue,
    onChange: requestRefresh
  });
}

function requestRefresh() {
  try {
    refreshHandler?.();
  } catch (error) {
    console.error(`${MODULE_ID} | Failed to refresh after a setting change.`, error);
  }
}
