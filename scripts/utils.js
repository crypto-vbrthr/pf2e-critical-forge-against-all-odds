export function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) deepFreeze(nested);
  return Object.freeze(value);
}

export function plainClone(value) {
  if (value == null) return value;
  return structuredClone(value);
}

export function finiteNumber(value) {
  if (value == null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function nonNegativeInteger(value) {
  const number = finiteNumber(value);
  return Number.isInteger(number) && number >= 0 ? number : null;
}

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function booleanSetting(value, fallback = true) {
  return value == null ? fallback : Boolean(value);
}

export function normalizeThreshold(value, fallback, { minimum = 0, maximum = Number.POSITIVE_INFINITY } = {}) {
  const number = finiteNumber(value);
  return clamp(number ?? fallback, minimum, maximum);
}
