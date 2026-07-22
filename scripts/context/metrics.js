import { CONTEXT_PROVIDER_VERSION } from "../constants.js";
import { deepFreeze, finiteNumber, nonNegativeInteger, normalizeThreshold, plainClone } from "../utils.js";

const DANGEROUS_TRAITS = Object.freeze([
  "curse",
  "death",
  "disease",
  "incapacitation",
  "poison"
]);

export function evaluateAgainstAllOdds(snapshot = {}, settings = {}) {
  const roller = snapshot?.participants?.source ?? {};
  const opponent = snapshot?.participants?.target ?? {};
  const hpRatio = finiteNumber(roller?.hp?.ratio);
  const hpCurrent = finiteNumber(roller?.hp?.current);
  const wounded = nonNegativeInteger(roller?.conditions?.wounded) ?? 0;
  const defeated = roller?.defeated === true;
  const hostileThreatCount = nonNegativeInteger(snapshot?.battlefield?.hostileThreatCount);
  const rollerLevel = finiteNumber(roller?.level);
  const opponentLevel = finiteNumber(opponent?.level);
  const levelGap = rollerLevel == null || opponentLevel == null ? null : opponentLevel - rollerLevel;

  const thresholds = Object.freeze({
    bloodiedRatio: normalizeThreshold(settings?.bloodiedThreshold, 0.5, { minimum: 0.1, maximum: 0.9 }),
    surroundedCount: Math.round(normalizeThreshold(settings?.surroundedThreshold, 2, { minimum: 1, maximum: 8 })),
    giantSlayerLevelGap: Math.round(normalizeThreshold(settings?.giantSlayerThreshold, 3, { minimum: 1, maximum: 8 })),
    narrowEscapeScore: Math.round(normalizeThreshold(settings?.narrowEscapeThreshold, 3, { minimum: 1, maximum: 8 }))
  });

  const bloodied = Object.freeze({
    matched: hpRatio != null && hpCurrent !== 0 && !defeated && hpRatio <= thresholds.bloodiedRatio,
    hpRatio,
    hpCurrent,
    threshold: thresholds.bloodiedRatio,
    defeated
  });

  const surrounded = Object.freeze({
    matched: hostileThreatCount != null && hostileThreatCount >= thresholds.surroundedCount,
    count: hostileThreatCount,
    threshold: thresholds.surroundedCount,
    evaluation: snapshot?.battlefield?.threatEvaluation ?? "not-evaluated"
  });

  const giantSlayer = Object.freeze({
    matched: levelGap != null && levelGap >= thresholds.giantSlayerLevelGap,
    rollerLevel,
    opponentLevel,
    levelGap,
    threshold: thresholds.giantSlayerLevelGap
  });

  const narrowEscape = evaluateDangerScore(snapshot, {
    hpRatio,
    wounded,
    hostileThreatCount,
    levelGap,
    threshold: thresholds.narrowEscapeScore
  });

  return deepFreeze({
    version: CONTEXT_PROVIDER_VERSION,
    rollKind: resolveRollKind(snapshot),
    thresholds,
    bloodied,
    surrounded,
    giantSlayer,
    narrowEscape
  });
}

export function evaluateDangerScore(snapshot = {}, {
  hpRatio = finiteNumber(snapshot?.participants?.source?.hp?.ratio),
  wounded = nonNegativeInteger(snapshot?.participants?.source?.conditions?.wounded) ?? 0,
  hostileThreatCount = nonNegativeInteger(snapshot?.battlefield?.hostileThreatCount),
  levelGap = levelDifference(snapshot),
  threshold = 3
} = {}) {
  const components = [];

  if (levelGap != null && levelGap >= 3) {
    components.push(component("overwhelming-opponent", 2, { levelGap }));
  } else if (levelGap != null && levelGap >= 1) {
    components.push(component("stronger-opponent", 1, { levelGap }));
  }

  if (hpRatio != null && hpRatio <= 0.25) {
    components.push(component("critical-health", 2, { hpRatio }));
  } else if (hpRatio != null && hpRatio <= 0.5) {
    components.push(component("bloodied", 1, { hpRatio }));
  }

  if (wounded >= 1) components.push(component("wounded", 1, { wounded }));

  if (hostileThreatCount != null && hostileThreatCount >= 4) {
    components.push(component("heavily-surrounded", 2, { hostileThreatCount }));
  } else if (hostileThreatCount != null && hostileThreatCount >= 2) {
    components.push(component("surrounded", 1, { hostileThreatCount }));
  }

  const dangerousTraits = collectDangerousTraits(snapshot);
  if (dangerousTraits.length) {
    components.push(component("dangerous-trait", 1, { traits: dangerousTraits }));
  }

  const score = components.reduce((sum, entry) => sum + entry.points, 0);
  const normalizedThreshold = Math.round(normalizeThreshold(threshold, 3, { minimum: 1, maximum: 8 }));
  return deepFreeze({
    matched: score >= normalizedThreshold,
    score,
    threshold: normalizedThreshold,
    componentIds: components.map((entry) => entry.id),
    components,
    dc: finiteNumber(snapshot?.roll?.dc)
  });
}

export function enrichContextReport(coreReport, settings = {}) {
  if (!coreReport || typeof coreReport !== "object") {
    throw new TypeError("Against All Odds requires a Critical Forge context report.");
  }
  const snapshot = plainClone(coreReport.snapshot ?? {});
  const metrics = evaluateAgainstAllOdds(snapshot, settings);
  snapshot.provider = "pf2e-critical-forge-against-all-odds.context";
  snapshot.providerVersion = CONTEXT_PROVIDER_VERSION;
  snapshot.extensions = {
    ...(snapshot.extensions ?? {}),
    againstAllOdds: metrics
  };

  const diagnostic = Object.freeze({
    severity: "info",
    code: "AAO_CONTEXT_EVALUATED",
    path: "extensions.againstAllOdds",
    data: {
      bloodied: metrics.bloodied.matched,
      surrounded: metrics.surrounded.matched,
      giantSlayer: metrics.giantSlayer.matched,
      narrowEscape: metrics.narrowEscape.matched
    }
  });
  const diagnostics = [...(coreReport.diagnostics ?? []), diagnostic];
  const errors = diagnostics.filter((entry) => entry.severity === "error");
  const warnings = diagnostics.filter((entry) => entry.severity === "warning");
  const information = diagnostics.filter((entry) => entry.severity === "info");

  return deepFreeze({
    ...plainClone(coreReport),
    valid: errors.length === 0,
    snapshot,
    diagnostics,
    errors,
    warnings,
    information
  });
}

export function resolveRollKind(snapshot = {}) {
  const saveType = String(snapshot?.roll?.saveType ?? "").trim().toLowerCase();
  if (["fortitude", "reflex", "will"].includes(saveType)) return saveType;
  const family = String(snapshot?.roll?.family ?? "").trim().toLowerCase();
  if (["attack", "spellattack"].includes(family)) return "attack";
  const category = String(snapshot?.roll?.category ?? "");
  if (category.includes("Hit") || category.includes("Fumble")) return "attack";
  return "unknown";
}

function levelDifference(snapshot) {
  const source = finiteNumber(snapshot?.participants?.source?.level);
  const target = finiteNumber(snapshot?.participants?.target?.level);
  return source == null || target == null ? null : target - source;
}

function collectDangerousTraits(snapshot) {
  const values = [
    ...(Array.isArray(snapshot?.selection?.attackTraits) ? snapshot.selection.attackTraits : []),
    ...(Array.isArray(snapshot?.selection?.spellTraits) ? snapshot.selection.spellTraits : []),
    ...(Array.isArray(snapshot?.selection?.sourceTraits) ? snapshot.selection.sourceTraits : [])
  ].map((value) => String(value).trim().toLowerCase());
  return [...new Set(values.filter((value) => DANGEROUS_TRAITS.includes(value)))].sort();
}

function component(id, points, data = {}) {
  return Object.freeze({ id, points, data: plainClone(data) });
}
