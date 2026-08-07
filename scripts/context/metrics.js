import { CONTEXT_PROVIDER_VERSION } from "../constants.js";
import { deepFreeze, finiteNumber, nonNegativeInteger, normalizeThreshold, plainClone } from "../utils.js";

const DANGEROUS_TRAITS = Object.freeze([
  "curse",
  "death",
  "disease",
  "incapacitation",
  "poison"
]);

const SIZE_ALIASES = Object.freeze({
  tiny: "tiny",
  sm: "sm",
  small: "sm",
  med: "med",
  medium: "med",
  lg: "lg",
  large: "lg",
  huge: "huge",
  grg: "grg",
  gargantuan: "grg"
});

const SIZE_RANKS = Object.freeze({ tiny: 0, sm: 1, med: 2, lg: 3, huge: 4, grg: 5 });

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

  const opponentThreat = evaluateOpponentThreat(snapshot);
  const surrounded = Object.freeze({
    matched: hostileThreatCount != null && hostileThreatCount >= thresholds.surroundedCount,
    count: hostileThreatCount,
    threshold: thresholds.surroundedCount,
    evaluation: snapshot?.battlefield?.threatEvaluation ?? "not-evaluated",
    opponentIsThreatening: opponentThreat.value,
    opponentThreatEvaluation: opponentThreat.evaluation,
    opponentThreat: opponentThreat.evidence
  });

  const sizeRelation = evaluateSizeRelation(roller?.size, opponent?.size);
  const giantSlayer = Object.freeze({
    matched: levelGap != null && levelGap >= thresholds.giantSlayerLevelGap,
    rollerLevel,
    opponentLevel,
    levelGap,
    opponentIsThreatening: opponentThreat.value,
    opponentThreatEvaluation: opponentThreat.evaluation,
    opponentThreat: opponentThreat.evidence,
    opponentSize: sizeRelation.opponentSize,
    sizeGap: sizeRelation.sizeGap,
    opponentIsLarger: sizeRelation.opponentIsLarger,
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

export function evaluateOpponentThreat(snapshot = {}) {
  const opponent = snapshot?.participants?.target ?? {};
  const battlefield = snapshot?.battlefield ?? {};
  const threats = Array.isArray(battlefield.hostileThreats) ? battlefield.hostileThreats : [];
  const identities = new Set([
    opponent.uuid, opponent.tokenUuid, opponent.id, opponent.actorUuid, opponent.actorId, opponent.tokenId
  ].map(normalizedIdentity).filter(Boolean));

  if (!identities.size) {
    return deepFreeze({ value: null, evaluation: "opponent-unresolved", evidence: null });
  }

  const matchingThreat = threats.find((entry) => [
    entry?.actorUuid, entry?.tokenUuid, entry?.actorId, entry?.tokenId
  ].map(normalizedIdentity).some((identity) => identity && identities.has(identity)));

  if (matchingThreat) {
    return deepFreeze({
      value: matchingThreat.counted === true,
      evaluation: "threat-evidence",
      evidence: {
        actorUuid: matchingThreat.actorUuid ?? null,
        tokenUuid: matchingThreat.tokenUuid ?? null,
        actorId: matchingThreat.actorId ?? null,
        tokenId: matchingThreat.tokenId ?? null,
        name: matchingThreat.name ?? null,
        counted: matchingThreat.counted === true,
        rejectedBy: Array.isArray(matchingThreat.rejectedBy) ? [...matchingThreat.rejectedBy] : []
      }
    });
  }

  if (battlefield.threatEvaluation === "scene-analysis") {
    return deepFreeze({ value: false, evaluation: "scene-analysis-no-match", evidence: null });
  }

  return deepFreeze({ value: null, evaluation: battlefield.threatEvaluation ?? "not-evaluated", evidence: null });
}


export function evaluateSizeRelation(rollerSize, opponentSize) {
  const roller = normalizeSize(rollerSize);
  const opponent = normalizeSize(opponentSize);
  const rollerRank = roller == null ? null : SIZE_RANKS[roller];
  const opponentRank = opponent == null ? null : SIZE_RANKS[opponent];
  const sizeGap = rollerRank == null || opponentRank == null ? null : opponentRank - rollerRank;
  return deepFreeze({
    rollerSize: roller,
    opponentSize: opponent,
    sizeGap,
    opponentIsLarger: sizeGap == null ? null : sizeGap > 0
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

function normalizedIdentity(value) {
  const normalized = String(value ?? "").trim();
  return normalized || null;
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

function normalizeSize(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return SIZE_ALIASES[normalized] ?? null;
}
