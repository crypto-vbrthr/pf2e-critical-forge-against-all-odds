import test from "node:test";
import assert from "node:assert/strict";
import { bindSettingsRefresh, readSettings, registerSettings } from "../scripts/settings.js";
import { MODULE_ID, SETTING_KEYS } from "../scripts/constants.js";

test("all eight world settings are registered", () => {
  const registrations = [];
  const gameRef = {
    settings: {
      register(moduleId, key, config) { registrations.push({ moduleId, key, config }); }
    }
  };
  assert.equal(registerSettings(gameRef), true);
  assert.equal(registrations.length, 8);
  assert.equal(registrations.every((entry) => entry.moduleId === MODULE_ID), true);
  assert.equal(registrations.every((entry) => entry.config.scope === "world"), true);
  assert.equal(registrations.find((entry) => entry.key === SETTING_KEYS.BLOODIED_THRESHOLD).config.default, 0.5);
});

test("setting changes call the bound pack refresh handler", () => {
  const registrations = [];
  let refreshes = 0;
  bindSettingsRefresh(() => { refreshes += 1; });
  registerSettings({ settings: { register: (_module, _key, config) => registrations.push(config) } });
  registrations[0].onChange(false);
  assert.equal(refreshes, 1);
  bindSettingsRefresh(null);
});

test("settings reader clamps invalid or excessive values", () => {
  const values = new Map([
    [SETTING_KEYS.ENABLE_BLOODIED, false],
    [SETTING_KEYS.BLOODIED_THRESHOLD, 4],
    [SETTING_KEYS.SURROUNDED_THRESHOLD, -2],
    [SETTING_KEYS.GIANT_SLAYER_THRESHOLD, 99],
    [SETTING_KEYS.NARROW_ESCAPE_THRESHOLD, "bad"]
  ]);
  const settings = readSettings({
    settings: { get: (_module, key) => values.get(key) }
  });
  assert.equal(settings.enableBloodiedTriumphs, false);
  assert.equal(settings.bloodiedThreshold, 0.9);
  assert.equal(settings.surroundedThreshold, 1);
  assert.equal(settings.giantSlayerThreshold, 8);
  assert.equal(settings.narrowEscapeThreshold, 3);
});
