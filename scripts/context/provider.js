import {
  CONTEXT_PROVIDER_ID,
  CONTEXT_PROVIDER_VERSION
} from "../constants.js";
import { readSettings } from "../settings.js";
import { enrichContextReport } from "./metrics.js";

export function createAgainstAllOddsContextProvider(forge, {
  settingsReader = () => readSettings()
} = {}) {
  if (!forge?.cards?.contexts?.resolve) {
    throw new TypeError("Against All Odds requires Critical Forge context resolution.");
  }

  return Object.freeze({
    id: CONTEXT_PROVIDER_ID,
    system: "pf2e",
    version: CONTEXT_PROVIDER_VERSION,
    priority: 100,
    createContext(input, options = {}) {
      const core = forge.cards.contexts.resolve(input, {
        ...options,
        system: "pf2e",
        providerId: "core-pf2e"
      });
      return enrichContextReport(core, settingsReader());
    }
  });
}
