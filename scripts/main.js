import { MODULE_ID } from "./constants.js";
import { initializeAgainstAllOdds } from "./runtime.js";
import { registerSettings } from "./settings.js";

if (globalThis.Hooks?.once) {
  Hooks.once("init", () => {
    registerSettings();
  });

  Hooks.once("pf2eCriticalForgeReady", (forge) => {
    try {
      initializeAgainstAllOdds(forge);
      console.info(`${MODULE_ID} | Registered Against All Odds with Critical Forge.`);
    } catch (error) {
      console.error(`${MODULE_ID} | Registration failed.`, error);
      const message = globalThis.game?.i18n?.localize?.("PF2E_AGAINST_ALL_ODDS.Notifications.RegistrationFailed")
        ?? "PF2E Critical Forge: Against All Odds could not register with Critical Forge.";
      globalThis.ui?.notifications?.error?.(message);
    }
  });
}
