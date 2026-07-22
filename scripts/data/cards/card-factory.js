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

function freezeEffect(effect, localizationKey, fallbackTitle) {
  if (!effect) return null;
  return Object.freeze({
    target: effect.target ?? "source",
    nameKey: `PF2E_AGAINST_ALL_ODDS.Effects.BloodiedTriumphs.Attack.${localizationKey}.Name`,
    fallbackName: effect.fallbackName ?? fallbackTitle,
    definition: Object.freeze({
      schemaVersion: 2,
      duration: Object.freeze({ ...effect.duration }),
      components: Object.freeze((effect.components ?? []).map((component) => Object.freeze({ ...component })))
    })
  });
}

export function defineBloodiedAttackCard({
  id,
  localizationKey,
  category,
  tone,
  impact,
  fallbackTitle,
  fallbackDescription,
  weight = 1,
  tags = [],
  filters = {},
  effect = null
}) {
  if (!["criticalHit", "spellCriticalHit"].includes(category)) {
    throw new TypeError(`Bloodied attack cards require an attack critical-success category: ${category}`);
  }

  return Object.freeze({
    schemaVersion: 1,
    id: `${MODULE_ID}.bloodied-triumphs.attack.${id}`,
    packId: AGAINST_ALL_ODDS_PACK_IDS.bloodiedTriumphs,
    category,
    deckType: "attack",
    tone,
    impact,
    titleKey: `PF2E_AGAINST_ALL_ODDS.Cards.BloodiedTriumphs.Attack.${localizationKey}.Title`,
    descriptionKey: `PF2E_AGAINST_ALL_ODDS.Cards.BloodiedTriumphs.Attack.${localizationKey}.Description`,
    fallbackTitle,
    fallbackDescription,
    weight,
    tags: Object.freeze([
      "against-all-odds",
      "bloodied-triumphs",
      "attack",
      "critical-success",
      category === "spellCriticalHit" ? "spell" : "strike",
      ...unique(tags)
    ]),
    filters: freezeFilters(filters),
    conditions: BLOODIED_CONDITION,
    effect: freezeEffect(effect, localizationKey, fallbackTitle),
    metadata: Object.freeze({
      collection: "bloodied-triumphs",
      deck: "attack",
      contentBatch: 1
    })
  });
}
