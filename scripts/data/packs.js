import {
  MODULE_ID,
  MODULE_VERSION,
  SPECIALIZED_DECK_TYPES,
  THEME_IDS
} from "../constants.js";
import { BLOODIED_ATTACK_CARDS } from "./cards/bloodied-attack.js";
import { BLOODIED_FORTITUDE_CARDS } from "./cards/bloodied-fortitude.js";
import { BLOODIED_REFLEX_CARDS } from "./cards/bloodied-reflex.js";
import { BLOODIED_WILL_CARDS } from "./cards/bloodied-will.js";
import { SURROUNDED_ATTACK_CARDS } from "./cards/surrounded-attack.js";
import { SURROUNDED_FORTITUDE_CARDS } from "./cards/surrounded-fortitude.js";
import { SURROUNDED_REFLEX_CARDS } from "./cards/surrounded-reflex.js";
import { SURROUNDED_WILL_CARDS } from "./cards/surrounded-will.js";
import { GIANT_SLAYER_ATTACK_CARDS } from "./cards/giant-slayer-attack.js";
import { GIANT_SLAYER_FORTITUDE_CARDS } from "./cards/giant-slayer-fortitude.js";
import { GIANT_SLAYER_REFLEX_CARDS } from "./cards/giant-slayer-reflex.js";
import { GIANT_SLAYER_WILL_CARDS } from "./cards/giant-slayer-will.js";
import { NARROW_ESCAPE_ATTACK_CARDS } from "./cards/narrow-escape-attack.js";
import { NARROW_ESCAPE_FORTITUDE_CARDS } from "./cards/narrow-escape-fortitude.js";

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
      contentStatus: (theme.id === THEME_IDS.BLOODIED || theme.id === THEME_IDS.SURROUNDED || theme.id === THEME_IDS.GIANT_SLAYER) ? "complete" : "in-progress",
      plannedCardsPerDeck: 30
    },
    decks: Object.fromEntries(SPECIALIZED_DECK_TYPES.map((deckType) => [deckType, {
      cards: theme.id === THEME_IDS.BLOODIED && deckType === "attack"
        ? BLOODIED_ATTACK_CARDS
        : theme.id === THEME_IDS.BLOODIED && deckType === "fortitude"
          ? BLOODIED_FORTITUDE_CARDS
          : theme.id === THEME_IDS.BLOODIED && deckType === "reflex"
            ? BLOODIED_REFLEX_CARDS
            : theme.id === THEME_IDS.BLOODIED && deckType === "will"
              ? BLOODIED_WILL_CARDS
              : theme.id === THEME_IDS.SURROUNDED && deckType === "attack"
                ? SURROUNDED_ATTACK_CARDS
                : theme.id === THEME_IDS.SURROUNDED && deckType === "fortitude"
                  ? SURROUNDED_FORTITUDE_CARDS
                  : theme.id === THEME_IDS.SURROUNDED && deckType === "reflex"
                    ? SURROUNDED_REFLEX_CARDS
                    : theme.id === THEME_IDS.SURROUNDED && deckType === "will"
                      ? SURROUNDED_WILL_CARDS
                      : theme.id === THEME_IDS.GIANT_SLAYER && deckType === "attack"
                        ? GIANT_SLAYER_ATTACK_CARDS
                        : theme.id === THEME_IDS.GIANT_SLAYER && deckType === "fortitude"
                          ? GIANT_SLAYER_FORTITUDE_CARDS
                          : theme.id === THEME_IDS.GIANT_SLAYER && deckType === "reflex"
                            ? GIANT_SLAYER_REFLEX_CARDS
                            : theme.id === THEME_IDS.GIANT_SLAYER && deckType === "will"
                              ? GIANT_SLAYER_WILL_CARDS
                              : theme.id === THEME_IDS.NARROW_ESCAPE && deckType === "attack"
                                ? NARROW_ESCAPE_ATTACK_CARDS
                                : theme.id === THEME_IDS.NARROW_ESCAPE && deckType === "fortitude"
                                  ? NARROW_ESCAPE_FORTITUDE_CARDS
                                  : []
    }]))
  }));
}

export function listAgainstAllOddsThemes() {
  return THEMES.map((theme) => ({ ...theme }));
}
