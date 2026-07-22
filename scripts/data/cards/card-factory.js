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

function unique(values = []) {
  return [...new Set(values.map((value) => String(value).trim()).filter(Boolean))];
}

function freezeFilters(filters = {}) {
  return Object.freeze(Object.fromEntries(
    FILTER_KEYS.map((key) => [key, Object.freeze(unique(filters[key] ?? []))])
  ));
}

function freezeEffect(effect, { deckToken, localizationKey, fallbackTitle }) {
  if (!effect) return null;
  return Object.freeze({
    target: effect.target ?? "source",
    nameKey: `PF2E_AGAINST_ALL_ODDS.Effects.BloodiedTriumphs.${deckToken}.${localizationKey}.Name`,
    fallbackName: effect.fallbackName ?? fallbackTitle,
    definition: Object.freeze({
      schemaVersion: 2,
      duration: Object.freeze({ ...effect.duration }),
      components: Object.freeze((effect.components ?? []).map((component) => Object.freeze({
        ...component,
        ...(Array.isArray(component.selector) ? { selector: Object.freeze([...component.selector]) } : {}),
        ...(Array.isArray(component.predicate) ? { predicate: Object.freeze([...component.predicate]) } : {})
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
    conditions: BLOODIED_CONDITION,
    effect: freezeEffect(effect, { deckToken, localizationKey, fallbackTitle }),
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
    contentBatch: 1,
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
    contentBatch: 2,
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
    contentBatch: 3,
    tags: ["save", "reflex", ...(options.tags ?? [])],
    filters: { ...options.filters, saveTypes: ["reflex"] }
  });
}
