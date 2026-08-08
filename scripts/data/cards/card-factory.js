import { MODULE_ID, THEME_IDS } from "../../constants.js";

export const AGAINST_ALL_ODDS_PACK_IDS = Object.freeze({
  bloodiedTriumphs: `${MODULE_ID}.${THEME_IDS.BLOODIED}`,
  surroundedStillStanding: `${MODULE_ID}.${THEME_IDS.SURROUNDED}`,
  giantSlayerMoments: `${MODULE_ID}.${THEME_IDS.GIANT_SLAYER}`,
  narrowEscapes: `${MODULE_ID}.${THEME_IDS.NARROW_ESCAPE}`
});

const FILTER_KEYS = Object.freeze([
  "damageTypes",
  "weaponGroups",
  "attackTraits",
  "excludedAttackTraits",
  "saveTypes",
  "spellTraditions",
  "spellTraits",
  "sourceTraits",
  "targetTraits",
  "excludedSourceTraits",
  "excludedTargetTraits"
]);

const BLOODIED_CONDITION = Object.freeze({
  type: "condition",
  field: "extensions.againstAllOdds.bloodied.matched",
  operator: "eq",
  value: true
});

const SURROUNDED_CONDITION = Object.freeze({
  type: "condition",
  field: "extensions.againstAllOdds.surrounded.matched",
  operator: "eq",
  value: true
});

const GIANT_SLAYER_CONDITION = Object.freeze({
  type: "condition",
  field: "extensions.againstAllOdds.giantSlayer.matched",
  operator: "eq",
  value: true
});

function unique(values = []) {
  return [...new Set(values.map((value) => String(value).trim()).filter(Boolean))];
}

function freezeFilters(filters = {}) {
  return Object.freeze(Object.fromEntries(
    FILTER_KEYS.map((key) => [key, Object.freeze(unique(filters[key] ?? []))])
  ));
}

function freezeConditionTree(value) {
  if (Array.isArray(value)) return Object.freeze(value.map((entry) => freezeConditionTree(entry)));
  if (!value || typeof value !== "object") return value;
  return Object.freeze(Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [key, freezeConditionTree(nested)])
  ));
}

function combineConditions(baseCondition, extraConditions) {
  const extras = extraConditions == null
    ? []
    : Array.isArray(extraConditions)
      ? extraConditions
      : [extraConditions];
  if (!extras.length) return baseCondition;
  return freezeConditionTree({
    type: "group",
    mode: "all",
    conditions: [baseCondition, ...extras]
  });
}

function combineBloodiedConditions(extraConditions) {
  return combineConditions(BLOODIED_CONDITION, extraConditions);
}

function combineSurroundedConditions(extraConditions) {
  return combineConditions(SURROUNDED_CONDITION, extraConditions);
}

function combineGiantSlayerConditions(extraConditions) {
  return combineConditions(GIANT_SLAYER_CONDITION, extraConditions);
}

function freezeEffect(effect, { themeToken, deckToken, localizationKey, fallbackTitle }) {
  if (!effect) return null;
  return Object.freeze({
    target: effect.target ?? "source",
    nameKey: `PF2E_AGAINST_ALL_ODDS.Effects.${themeToken}.${deckToken}.${localizationKey}.Name`,
    fallbackName: effect.fallbackName ?? fallbackTitle,
    definition: Object.freeze({
      schemaVersion: 2,
      duration: Object.freeze({ ...effect.duration }),
      components: Object.freeze((effect.components ?? []).map((component) => Object.freeze({
        ...component,
        ...(Array.isArray(component.selector) ? { selector: Object.freeze([...component.selector]) } : {}),
        ...(Array.isArray(component.predicate) ? { predicate: Object.freeze([...component.predicate]) } : {}),
        ...(Array.isArray(component.deactivatedBy) ? { deactivatedBy: Object.freeze([...component.deactivatedBy]) } : {})
      })))
    })
  });
}

function defineBloodiedCard({
  id,
  localizationKey,
  category,
  deckType,
  deckToken,
  tone,
  impact,
  fallbackTitle,
  fallbackDescription,
  weight = 1,
  tags = [],
  filters = {},
  effect = null,
  extraConditions = null,
  contentBatch
}) {
  return Object.freeze({
    schemaVersion: 1,
    id: `${MODULE_ID}.bloodied-triumphs.${deckType}.${id}`,
    packId: AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs,
    category,
    deckType,
    tone,
    impact,
    titleKey: `PF2E_AGAINST_ALL_ODDS.Cards.BloodiedTriumphs.${deckToken}.${localizationKey}.Title`,
    descriptionKey: `PF2E_AGAINST_ALL_ODDS.Cards.BloodiedTriumphs.${deckToken}.${localizationKey}.Description`,
    fallbackTitle,
    fallbackDescription,
    weight,
    tags: Object.freeze([
      "against-all-odds",
      "bloodied-triumphs",
      deckType,
      "critical-success",
      ...unique(tags)
    ]),
    filters: freezeFilters(filters),
    conditions: combineBloodiedConditions(extraConditions),
    effect: freezeEffect(effect, { themeToken: "BloodiedTriumphs", deckToken, localizationKey, fallbackTitle }),
    metadata: Object.freeze({
      collection: "bloodied-triumphs",
      deck: deckType,
      contentBatch
    })
  });
}

export function defineBloodiedAttackCard(options) {
  if (!["criticalHit", "spellCriticalHit"].includes(options.category)) {
    throw new TypeError(`Bloodied attack cards require an attack critical-success category: ${options.category}`);
  }

  return defineBloodiedCard({
    ...options,
    deckType: "attack",
    deckToken: "Attack",
    contentBatch: options.contentBatch ?? 1,
    tags: [options.category === "spellCriticalHit" ? "spell" : "strike", ...(options.tags ?? [])]
  });
}

export function defineBloodiedFortitudeCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Bloodied Fortitude cards require savingThrowCriticalSuccess: ${options.category}`);
  }

  return defineBloodiedCard({
    ...options,
    category: "savingThrowCriticalSuccess",
    deckType: "fortitude",
    deckToken: "Fortitude",
    contentBatch: options.contentBatch ?? 2,
    tags: ["save", "fortitude", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["fortitude"] }
  });
}

export function defineBloodiedReflexCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Bloodied Reflex cards require savingThrowCriticalSuccess: ${options.category}`);
  }

  return defineBloodiedCard({
    ...options,
    category: "savingThrowCriticalSuccess",
    deckType: "reflex",
    deckToken: "Reflex",
    contentBatch: options.contentBatch ?? 3,
    tags: ["save", "reflex", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["reflex"] }
  });
}

export function defineBloodiedWillCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Bloodied Will cards require savingThrowCriticalSuccess: ${options.category}`);
  }

  return defineBloodiedCard({
    ...options,
    category: "savingThrowCriticalSuccess",
    deckType: "will",
    deckToken: "Will",
    contentBatch: options.contentBatch ?? 4,
    tags: ["save", "will", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["will"] }
  });
}


function defineSurroundedCard({
  id,
  localizationKey,
  category,
  deckType,
  deckToken,
  tone,
  impact,
  fallbackTitle,
  fallbackDescription,
  weight = 1,
  tags = [],
  filters = {},
  effect = null,
  extraConditions = null,
  contentBatch
}) {
  return Object.freeze({
    schemaVersion: 1,
    id: `${MODULE_ID}.surrounded-still-standing.${deckType}.${id}`,
    packId: AGAINST_ALL_ODDS_PACK_IDS.surroundedStillStanding,
    category,
    deckType,
    tone,
    impact,
    titleKey: `PF2E_AGAINST_ALL_ODDS.Cards.SurroundedStillStanding.${deckToken}.${localizationKey}.Title`,
    descriptionKey: `PF2E_AGAINST_ALL_ODDS.Cards.SurroundedStillStanding.${deckToken}.${localizationKey}.Description`,
    fallbackTitle,
    fallbackDescription,
    weight,
    tags: Object.freeze([
      "against-all-odds",
      "surrounded-still-standing",
      deckType,
      "critical-success",
      ...unique(tags)
    ]),
    filters: freezeFilters(filters),
    conditions: combineSurroundedConditions(extraConditions),
    effect: freezeEffect(effect, { themeToken: "SurroundedStillStanding", deckToken, localizationKey, fallbackTitle }),
    metadata: Object.freeze({
      collection: "surrounded-still-standing",
      deck: deckType,
      contentBatch
    })
  });
}

export function defineSurroundedAttackCard(options) {
  if (!["criticalHit", "spellCriticalHit"].includes(options.category)) {
    throw new TypeError(`Surrounded attack cards require an attack critical-success category: ${options.category}`);
  }

  return defineSurroundedCard({
    ...options,
    deckType: "attack",
    deckToken: "Attack",
    contentBatch: options.contentBatch ?? 13,
    tags: [options.category === "spellCriticalHit" ? "spell" : "strike", ...(options.tags ?? [])]
  });
}

export function defineSurroundedFortitudeCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Surrounded Fortitude cards require savingThrowCriticalSuccess: ${options.category}`);
  }
  return defineSurroundedCard({
    ...options, category: "savingThrowCriticalSuccess", deckType: "fortitude", deckToken: "Fortitude",
    contentBatch: options.contentBatch ?? 14, tags: ["save", "fortitude", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["fortitude"] }
  });
}

export function defineSurroundedReflexCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Surrounded Reflex cards require savingThrowCriticalSuccess: ${options.category}`);
  }
  return defineSurroundedCard({
    ...options, category: "savingThrowCriticalSuccess", deckType: "reflex", deckToken: "Reflex",
    contentBatch: options.contentBatch ?? 15, tags: ["save", "reflex", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["reflex"] }
  });
}

export function defineSurroundedWillCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Surrounded Will cards require savingThrowCriticalSuccess: ${options.category}`);
  }
  return defineSurroundedCard({
    ...options, category: "savingThrowCriticalSuccess", deckType: "will", deckToken: "Will",
    contentBatch: options.contentBatch ?? 16, tags: ["save", "will", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["will"] }
  });
}


function defineGiantSlayerCard({
  id,
  localizationKey,
  category,
  deckType,
  deckToken,
  tone,
  impact,
  fallbackTitle,
  fallbackDescription,
  weight = 1,
  tags = [],
  filters = {},
  effect = null,
  extraConditions = null,
  contentBatch
}) {
  return Object.freeze({
    schemaVersion: 1,
    id: `${MODULE_ID}.giant-slayer-moments.${deckType}.${id}`,
    packId: AGAINST_ALL_ODDS_PACK_IDS.giantSlayerMoments,
    category,
    deckType,
    tone,
    impact,
    titleKey: `PF2E_AGAINST_ALL_ODDS.Cards.GiantSlayerMoments.${deckToken}.${localizationKey}.Title`,
    descriptionKey: `PF2E_AGAINST_ALL_ODDS.Cards.GiantSlayerMoments.${deckToken}.${localizationKey}.Description`,
    fallbackTitle,
    fallbackDescription,
    weight,
    tags: Object.freeze([
      "against-all-odds",
      "giant-slayer-moments",
      deckType,
      "critical-success",
      ...unique(tags)
    ]),
    filters: freezeFilters(filters),
    conditions: combineGiantSlayerConditions(extraConditions),
    effect: freezeEffect(effect, { themeToken: "GiantSlayerMoments", deckToken, localizationKey, fallbackTitle }),
    metadata: Object.freeze({ collection: "giant-slayer-moments", deck: deckType, contentBatch })
  });
}

export function defineGiantSlayerAttackCard(options) {
  if (!["criticalHit", "spellCriticalHit"].includes(options.category)) {
    throw new TypeError(`Giant-Slayer attack cards require an attack critical-success category: ${options.category}`);
  }
  return defineGiantSlayerCard({
    ...options, deckType: "attack", deckToken: "Attack", contentBatch: options.contentBatch ?? 21,
    tags: [options.category === "spellCriticalHit" ? "spell" : "strike", ...(options.tags ?? [])]
  });
}

export function defineGiantSlayerFortitudeCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Giant-Slayer Fortitude cards require savingThrowCriticalSuccess: ${options.category}`);
  }
  return defineGiantSlayerCard({
    ...options, category: "savingThrowCriticalSuccess", deckType: "fortitude", deckToken: "Fortitude",
    contentBatch: options.contentBatch ?? 22, tags: ["save", "fortitude", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["fortitude"] }
  });
}

export function defineGiantSlayerReflexCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Giant-Slayer Reflex cards require savingThrowCriticalSuccess: ${options.category}`);
  }
  return defineGiantSlayerCard({
    ...options, category: "savingThrowCriticalSuccess", deckType: "reflex", deckToken: "Reflex",
    contentBatch: options.contentBatch ?? 23, tags: ["save", "reflex", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["reflex"] }
  });
}

export function defineGiantSlayerWillCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Giant-Slayer Will cards require savingThrowCriticalSuccess: ${options.category}`);
  }
  return defineGiantSlayerCard({
    ...options, category: "savingThrowCriticalSuccess", deckType: "will", deckToken: "Will",
    contentBatch: options.contentBatch ?? 24, tags: ["save", "will", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["will"] }
  });
}

const NARROW_ESCAPE_CONDITION = Object.freeze({
  type: "condition",
  field: "extensions.againstAllOdds.narrowEscape.matched",
  operator: "eq",
  value: true
});

function combineNarrowEscapeConditions(extraConditions) {
  return combineConditions(NARROW_ESCAPE_CONDITION, extraConditions);
}

function defineNarrowEscapeCard({
  id,
  localizationKey,
  category,
  deckType,
  deckToken,
  tone,
  impact,
  fallbackTitle,
  fallbackDescription,
  weight = 1,
  tags = [],
  filters = {},
  effect = null,
  extraConditions = null,
  contentBatch
}) {
  return Object.freeze({
    schemaVersion: 1,
    id: `${MODULE_ID}.narrow-escapes.${deckType}.${id}`,
    packId: AGAINST_ALL_ODDS_PACK_IDS.narrowEscapes,
    category,
    deckType,
    tone,
    impact,
    titleKey: `PF2E_AGAINST_ALL_ODDS.Cards.NarrowEscapes.${deckToken}.${localizationKey}.Title`,
    descriptionKey: `PF2E_AGAINST_ALL_ODDS.Cards.NarrowEscapes.${deckToken}.${localizationKey}.Description`,
    fallbackTitle,
    fallbackDescription,
    weight,
    tags: Object.freeze([
      "against-all-odds",
      "narrow-escapes",
      deckType,
      "critical-success",
      ...unique(tags)
    ]),
    filters: freezeFilters(filters),
    conditions: combineNarrowEscapeConditions(extraConditions),
    effect: freezeEffect(effect, { themeToken: "NarrowEscapes", deckToken, localizationKey, fallbackTitle }),
    metadata: Object.freeze({ collection: "narrow-escapes", deck: deckType, contentBatch })
  });
}

export function defineNarrowEscapeAttackCard(options) {
  if (!["criticalHit", "spellCriticalHit"].includes(options.category)) {
    throw new TypeError(`Narrow Escape attack cards require an attack critical-success category: ${options.category}`);
  }
  return defineNarrowEscapeCard({
    ...options, deckType: "attack", deckToken: "Attack", contentBatch: options.contentBatch ?? 30,
    tags: [options.category === "spellCriticalHit" ? "spell" : "strike", ...(options.tags ?? [])]
  });
}

export function defineNarrowEscapeFortitudeCard(options) {
  if (options.category && options.category !== "savingThrowCriticalSuccess") {
    throw new TypeError(`Narrow Escape Fortitude cards require savingThrowCriticalSuccess: ${options.category}`);
  }
  return defineNarrowEscapeCard({
    ...options, category: "savingThrowCriticalSuccess", deckType: "fortitude", deckToken: "Fortitude",
    contentBatch: options.contentBatch ?? 31, tags: ["save", "fortitude", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["fortitude"] }
  });
}
