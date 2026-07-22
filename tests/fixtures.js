export function snapshot(overrides = {}) {
  const base = {
    schemaVersion: 1,
    system: "pf2e",
    provider: "core-pf2e",
    providerVersion: "1.1.0",
    roll: {
      category: "savingThrowCriticalSuccess",
      family: "savingThrow",
      saveType: "reflex",
      dc: 30
    },
    participants: {
      source: {
        level: 8,
        hp: { current: 20, max: 60, ratio: 1 / 3 },
        conditions: { wounded: 1, dying: 0, frightened: 0 },
        defeated: false
      },
      target: {
        level: 12,
        hp: { current: 100, max: 100, ratio: 1 },
        conditions: { wounded: 0, dying: 0, frightened: 0 },
        defeated: false
      }
    },
    battlefield: {
      hostileThreatCount: 3,
      threatEvaluation: "scene-analysis"
    },
    selection: {
      attackTraits: [],
      spellTraits: ["death"],
      sourceTraits: []
    },
    diagnostics: []
  };
  return merge(base, overrides);
}

export function coreReport(overrides = {}) {
  const base = {
    valid: true,
    context: { category: "savingThrowCriticalSuccess", saveTypes: ["reflex"] },
    metadata: { adapter: "pf2e" },
    snapshot: snapshot(),
    diagnostics: [],
    errors: [],
    warnings: [],
    information: []
  };
  return merge(base, overrides);
}

function merge(base, overrides) {
  if (overrides == null || typeof overrides !== "object" || Array.isArray(overrides)) return overrides;
  const result = structuredClone(base);
  for (const [key, value] of Object.entries(overrides)) {
    if (value && typeof value === "object" && !Array.isArray(value) && result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) {
      result[key] = merge(result[key], value);
    } else {
      result[key] = structuredClone(value);
    }
  }
  return result;
}
