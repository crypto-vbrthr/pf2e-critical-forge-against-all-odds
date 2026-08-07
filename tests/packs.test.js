import test from "node:test";
import assert from "node:assert/strict";
import { buildAgainstAllOddsPacks, listAgainstAllOddsThemes } from "../scripts/data/packs.js";
import { SPECIALIZED_DECK_TYPES } from "../scripts/constants.js";

const enabled = {
  enableBloodiedTriumphs: true,
  enableSurroundedStillStanding: true,
  enableGiantSlayerMoments: true,
  enableNarrowEscapes: true
};

test("the add-on defines four namespaced theme packs", () => {
  const packs = buildAgainstAllOddsPacks(enabled);
  assert.equal(packs.length, 4);
  assert.equal(new Set(packs.map((pack) => pack.id)).size, 4);
  assert.equal(packs.every((pack) => pack.id.startsWith("pf2e-critical-forge-against-all-odds.")), true);
  assert.equal(listAgainstAllOddsThemes().length, 4);
});

test("every theme reserves attack, Fortitude, Reflex, and Will decks", () => {
  for (const pack of buildAgainstAllOddsPacks(enabled)) {
    assert.deepEqual(Object.keys(pack.decks), [...SPECIALIZED_DECK_TYPES]);
    for (const deckType of SPECIALIZED_DECK_TYPES) {
      const expected = pack.id.endsWith("bloodied-triumphs")
        ? 30
        : pack.id.endsWith("surrounded-still-standing") && ["attack", "fortitude", "reflex", "will"].includes(deckType)
          ? 10
          : 0;
      assert.equal(pack.decks[deckType].cards.length, expected);
    }
    assert.equal(pack.metadata.plannedCardsPerDeck, 30);
    assert.equal(pack.metadata.contentStatus, pack.id.endsWith("bloodied-triumphs") ? "complete" : pack.id.endsWith("surrounded-still-standing") ? "in-progress" : "foundation");
  }
});

test("theme enable settings change only the matching pack", () => {
  const packs = buildAgainstAllOddsPacks({ ...enabled, enableNarrowEscapes: false });
  assert.equal(packs.find((pack) => pack.id.endsWith("narrow-escapes")).enabled, false);
  assert.equal(packs.filter((pack) => pack.enabled).length, 3);
});

test("theme metadata names the dynamic condition path used by future cards", () => {
  const paths = buildAgainstAllOddsPacks(enabled).map((pack) => pack.metadata.conditionPath);
  assert.deepEqual(paths, [
    "extensions.againstAllOdds.bloodied.matched",
    "extensions.againstAllOdds.surrounded.matched",
    "extensions.againstAllOdds.giantSlayer.matched",
    "extensions.againstAllOdds.narrowEscape.matched"
  ]);
});
