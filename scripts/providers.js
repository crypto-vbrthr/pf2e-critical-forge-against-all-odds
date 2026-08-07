import {
  CONDITION_PROVIDER_ID,
  DIAGNOSTIC_PROVIDER_ID,
  MODULE_ID
} from "./constants.js";
import { plainClone } from "./utils.js";

const GROUP_KEY = "PF2E_AGAINST_ALL_ODDS.Fields.Group";
const GROUP_FALLBACK = "Against All Odds";

export function createConditionProvider() {
  return Object.freeze({
    id: CONDITION_PROVIDER_ID,
    version: "1.2.0",
    fields: Object.freeze([
      field("extensions.againstAllOdds.rollKind", "enum", "RollKind", {
        values: ["attack", "fortitude", "reflex", "will", "unknown"]
      }),

      field("extensions.againstAllOdds.bloodied.matched", "boolean", "BloodiedMatched"),
      field("extensions.againstAllOdds.bloodied.hpRatio", "number", "HitPointRatio"),
      field("extensions.againstAllOdds.bloodied.threshold", "number", "BloodiedThreshold"),

      field("extensions.againstAllOdds.surrounded.matched", "boolean", "SurroundedMatched"),
      field("extensions.againstAllOdds.surrounded.count", "number", "ThreatCount"),
      field("extensions.againstAllOdds.surrounded.threshold", "number", "SurroundedThreshold"),
      field("extensions.againstAllOdds.surrounded.opponentIsThreatening", "boolean", "OpponentIsThreatening"),
      field("extensions.againstAllOdds.surrounded.opponentThreatEvaluation", "string", "OpponentThreatEvaluation"),

      field("extensions.againstAllOdds.giantSlayer.matched", "boolean", "GiantSlayerMatched"),
      field("extensions.againstAllOdds.giantSlayer.rollerLevel", "number", "RollerLevel"),
      field("extensions.againstAllOdds.giantSlayer.opponentLevel", "number", "OpponentLevel"),
      field("extensions.againstAllOdds.giantSlayer.levelGap", "number", "LevelGap"),
      field("extensions.againstAllOdds.giantSlayer.opponentIsThreatening", "boolean", "OpponentIsThreatening"),
      field("extensions.againstAllOdds.giantSlayer.opponentThreatEvaluation", "string", "OpponentThreatEvaluation"),
      field("extensions.againstAllOdds.giantSlayer.opponentSize", "enum", "OpponentSize", {
        values: ["tiny", "sm", "med", "lg", "huge", "grg"]
      }),
      field("extensions.againstAllOdds.giantSlayer.sizeGap", "number", "SizeGap"),
      field("extensions.againstAllOdds.giantSlayer.opponentIsLarger", "boolean", "OpponentIsLarger"),
      field("extensions.againstAllOdds.giantSlayer.threshold", "number", "GiantSlayerThreshold"),

      field("extensions.againstAllOdds.narrowEscape.matched", "boolean", "NarrowEscapeMatched"),
      field("extensions.againstAllOdds.narrowEscape.score", "number", "DangerScore"),
      field("extensions.againstAllOdds.narrowEscape.threshold", "number", "DangerThreshold"),
      field("extensions.againstAllOdds.narrowEscape.componentIds", "stringArray", "DangerComponents")
    ])
  });
}

export function createDiagnosticProvider() {
  return Object.freeze({
    id: DIAGNOSTIC_PROVIDER_ID,
    version: "1.2.0",
    priority: 50,
    inspect(diagnostic) {
      const metrics = diagnostic?.snapshot?.extensions?.againstAllOdds ?? null;
      return metrics == null
        ? { available: false, reason: "context-not-resolved" }
        : { available: true, metrics: plainClone(metrics) };
    }
  });
}

function field(path, type, token, extra = {}) {
  return Object.freeze({
    path,
    type,
    labelKey: `PF2E_AGAINST_ALL_ODDS.Fields.${token}`,
    fallbackLabel: fallbackLabel(token),
    groupKey: GROUP_KEY,
    fallbackGroup: GROUP_FALLBACK,
    ...extra
  });
}

function fallbackLabel(token) {
  return token.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const PROVIDER_IDS = Object.freeze({
  context: `${MODULE_ID}.context`,
  conditions: CONDITION_PROVIDER_ID,
  diagnostics: DIAGNOSTIC_PROVIDER_ID
});
