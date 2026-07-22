import {
  API_VERSION,
  MODULE_ID,
  MODULE_VERSION,
  REQUIRED_CRITICAL_FORGE_API_VERSION,
  REQUIRED_CRITICAL_FORGE_VERSION,
  REQUIRED_EXTENSION_CONTRACT_VERSION
} from "./constants.js";
import { createAgainstAllOddsContextProvider } from "./context/provider.js";
import { buildAgainstAllOddsPacks } from "./data/packs.js";
import { createConditionProvider, createDiagnosticProvider } from "./providers.js";
import { bindSettingsRefresh, readSettings } from "./settings.js";
import { evaluateAgainstAllOdds, evaluateDangerScore } from "./context/metrics.js";

let activeRuntime = null;

export function initializeAgainstAllOdds(forge, {
  gameRef = globalThis.game,
  settingsReader = () => readSettings(gameRef),
  notify = defaultNotify
} = {}) {
  if (!forge?.extensions?.forModule || !forge?.cards) {
    throw new TypeError("PF2E Critical Forge: Against All Odds requires the Critical Forge public API.");
  }
  if (!forge.cards.capabilities?.battlefieldThreatEvaluation) {
    throw new Error("PF2E Critical Forge: Against All Odds requires Critical Forge battlefield threat evaluation.");
  }

  const extension = forge.extensions.forModule(MODULE_ID, {
    version: MODULE_VERSION,
    requirements: {
      moduleVersion: REQUIRED_CRITICAL_FORGE_VERSION,
      apiVersion: REQUIRED_CRITICAL_FORGE_API_VERSION,
      extensionContractVersion: REQUIRED_EXTENSION_CONTRACT_VERSION,
      cardSchemaVersion: ">=1",
      cardPackSchemaVersion: ">=1",
      capabilities: [
        "cards.contextSnapshots",
        "cards.contextProviders",
        "cards.contextConditions",
        "cards.conditionEditor",
        "cards.diagnosticReports",
        "cards.multiDeckPacks",
        "extensions.contracts",
        "extensions.conditionProviders",
        "extensions.diagnosticProviders",
        "extensions.registrationDiagnostics"
      ]
    }
  });

  extension.assertCompatible();
  try {
    extension.registerContextProvider(createAgainstAllOddsContextProvider(forge, { settingsReader }));
    extension.registerConditionProvider(createConditionProvider());
    extension.registerDiagnosticProvider(createDiagnosticProvider());
    extension.registerPacks(buildAgainstAllOddsPacks(settingsReader()));
  } catch (error) {
    try { extension.unregisterAll(); } catch { /* best-effort rollback */ }
    throw error;
  }

  const runtime = Object.freeze({
    version: API_VERSION,
    moduleVersion: MODULE_VERSION,
    extension,
    evaluateContext: (snapshot, settings = settingsReader()) => evaluateAgainstAllOdds(snapshot, settings),
    evaluateDangerScore,
    get settings() { return settingsReader(); },
    listPacks: () => extension.listPacks(),
    refreshPacks() {
      const packs = buildAgainstAllOddsPacks(settingsReader());
      extension.registerPacks(packs, { replace: true });
      notify("info", "PF2E_AGAINST_ALL_ODDS.Notifications.Refreshed");
      return packs;
    },
    diagnostics: extension.diagnostics
  });

  activeRuntime = runtime;
  bindSettingsRefresh(() => activeRuntime?.refreshPacks());
  exposeModuleApi(gameRef, runtime);
  return runtime;
}

export function getAgainstAllOddsRuntime() {
  return activeRuntime;
}

export function resetAgainstAllOddsRuntime() {
  bindSettingsRefresh(null);
  activeRuntime = null;
}

function exposeModuleApi(gameRef, runtime) {
  const module = gameRef?.modules?.get?.(MODULE_ID);
  if (module) module.api = runtime;
}

function defaultNotify(level, key) {
  const text = globalThis.game?.i18n?.localize?.(key) ?? key;
  globalThis.ui?.notifications?.[level]?.(text);
}
