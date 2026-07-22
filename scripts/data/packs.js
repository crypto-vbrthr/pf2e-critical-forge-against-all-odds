import {
  MODULE_ID,
  MODULE_VERSION,
  SPECIALIZED_DECK_TYPES,
  THEME_IDS
} from "../constants.js";

const THEMES = Object.freeze([
  Object.freeze({
    id: THEME_IDS.BLOODIED,
    token: "BloodiedTriumphs",
    fallbackTitle: "Bloodied Triumphs",
    fallbackDescription: "Critical moments achieved while the acting hero is bloodied.",
    setting: "enableBloodiedTriumphs",
    conditionPath: "extensions.againstAllOdds.bloodied.matched"
  }),
  Object.freeze({
    id: THEME_IDS.SURROUNDED,
    token: "SurroundedStillStanding",
    fallbackTitle: "Surrounded, Still Standing",
    fallbackDescription: "Critical moments achieved while threatened by several enemies.",
    setting: "enableSurroundedStillStanding",
    conditionPath: "extensions.againstAllOdds.surrounded.matched"
  }),
  Object.freeze({
    id: THEME_IDS.GIANT_SLAYER,
    token: "GiantSlayerMoments",
    fallbackTitle: "Giant-Slayer Moments",
    fallbackDescription: "Critical moments against opponents far beyond the hero's level.",
    setting: "enableGiantSlayerMoments",
    conditionPath: "extensions.againstAllOdds.giantSlayer.matched"
  }),
  Object.freeze({
    id: THEME_IDS.NARROW_ESCAPE,
    token: "NarrowEscapes",
    fallbackTitle: "Narrow Escapes",
    fallbackDescription: "Critical moments achieved under a convergence of dangerous circumstances.",
    setting: "enableNarrowEscapes",
    conditionPath: "extensions.againstAllOdds.narrowEscape.matched"
  })
]);

export function buildAgainstAllOddsPacks(settings = {}) {
  return THEMES.map((theme, index) => Object.freeze({
    schemaVersion: 1,
    id: `${MODULE_ID}.${theme.id}`,
    titleKey: `PF2E_AGAINST_ALL_ODDS.Packs.${theme.token}.Title`,
    descriptionKey: `PF2E_AGAINST_ALL_ODDS.Packs.${theme.token}.Description`,
    fallbackTitle: theme.fallbackTitle,
    fallbackDescription: theme.fallbackDescription,
    version: MODULE_VERSION,
    priority: 40 - index,
    enabled: settings?.[theme.setting] !== false,
    metadata: {
      addOn: MODULE_ID,
      theme: theme.id,
      conditionPath: theme.conditionPath,
      contentStatus: "foundation",
      plannedCardsPerDeck: 10
    },
    decks: Object.fromEntries(SPECIALIZED_DECK_TYPES.map((deckType) => [deckType, { cards: [] }]))
  }));
}

export function listAgainstAllOddsThemes() {
  return THEMES.map((theme) => ({ ...theme }));
}
