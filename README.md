# PF2E Critical Forge: Against All Odds

**Against All Odds** is an optional context-sensitive card expansion for **PF2E Critical Forge**. It contributes four thematic packs, each with separate Attack, Fortitude, Reflex, and Will decks:

- Bloodied Triumphs
- Surrounded, Still Standing
- Giant-Slayer Moments
- Narrow Escapes

Version `0.1.0-dev.38.1` completes the **final 120-card Narrow Escapes review**. All 120 IDs and the 30/30/30/30 deck structure are preserved. Three same-gate near-duplicates that differed mainly by modifier type have been separated mechanically, and the regression suite now audits same-gate conceptual footprints in addition to exact canonical signatures and strict mechanical supersets. Documentation has also been synchronized with the completed 120-card theme.

> **Development-package rename:** Remove any earlier `pf2e-against-all-odds` folder before installing this build. The canonical module ID is now `pf2e-critical-forge-against-all-odds`.


## Manual installation

After extraction, the manifest must be located exactly here:

```text
{Foundry user data}/Data/modules/pf2e-critical-forge-against-all-odds/module.json
```

The Foundry manifest requires PF2E Critical Forge `1.0.0-rc` or newer. At world start, the extension contract additionally verifies API version, schemas, battlefield-threat support, and all other required capabilities.

## Requirements

- Foundry VTT 14
- Pathfinder Second Edition 8.1.2 or newer
- PF2E Critical Forge `1.0.0-rc` or newer

## Current runtime fields

The add-on extends the Critical Forge snapshot below:

```text
extensions.againstAllOdds
```

It provides dynamic trigger results for:

- `bloodied.matched`
- `surrounded.matched`
- `giantSlayer.matched`
- `narrowEscape.matched`

All values and thresholds are visible through Diagnostics 2.0 and available in the visual Critical Card Editor.

## Compatibility

Against All Odds uses only the public Critical Forge extension contract. It does not patch Critical Forge internals or change Critical Card, Card Pack, Effect, or Diagnostic schemas.

See:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/CONTEXT_FIELDS.md`](docs/CONTEXT_FIELDS.md)
- [`docs/CARD_ROADMAP.md`](docs/CARD_ROADMAP.md)
- [`docs/TESTING.md`](docs/TESTING.md)

## Current playable cards

Bloodied Triumphs is complete at 120 cards:

- thirty Attack-deck cards, split evenly between 15 ordinary and 15 spell critical hits;
- thirty Fortitude-deck cards for critically successful Fortitude saves;
- thirty Reflex-deck cards for critically successful Reflex saves;
- thirty Will-deck cards for critically successful Will saves;
- 108 automated Effect Engine cards;
- 12 explicit manual cards.

Surrounded, Still Standing is complete at 120 cards:

- thirty Attack-deck cards, split evenly between 15 ordinary and 15 spell critical hits;
- thirty Fortitude-deck cards for critically successful Fortitude saves;
- thirty Reflex-deck cards for critically successful Reflex saves;
- thirty Will-deck cards for critically successful Will saves;
- 100 automated Effect Engine cards and 20 explicit manual tactical results;
- final-pass escalation remains sparse, with exactly one three-threat and one four-threat result added per deck;
- formation-specific target effects can require the current opponent itself to be a counted melee threat;
- exact automated effect overlap with Bloodied Triumphs remains limited to the nine reviewed legacy signatures, while internal exact duplicates remain limited to the two intentional reviewed pairs.

Giant-Slayer Moments is complete at 120/120 cards:

- 30/30 Attack cards, split evenly between 15 ordinary and 15 spell critical hits, with 25 automated effects and five manual tactical results;
- 30/30 Fortitude cards for critically successful Fortitude saves, with 25 automated effects and five manual tactical results;
- 30/30 Reflex cards for critically successful Reflex saves, with 24 automated effects and six manual tactical results;
- 30/30 Will cards for critically successful Will saves, with 25 automated effects and five manual tactical results;
- 99 automated Effect Engine results and 21 explicit manual tactical results across the complete theme;
- every Giant-Slayer card requires `extensions.againstAllOdds.giantSlayer.matched == true`;
- each completed deck now contains three +4 and three +5 level-gap escalation cards across its three passes;
- physical counterplay uses `opponentIsThreatening`, `opponentIsLarger`, or `sizeGap >= 2` only when the fiction actually depends on melee geometry or scale;
- mental backlash requires matching `mental` or `auditory` trigger evidence where appropriate, and mindless foes remain excluded from doubt, social-pressure, and mind-reading results;
- the final Fortitude, Reflex, and Will passes add no resistance or immunity filler;
- exact automated Giant-Slayer signatures remain distinct from Bloodied Triumphs, Surrounded, Still Standing, and one another, while the same-gate superset regression contract remains clean.

Against All Odds now contains **480/480 planned cards**, with **407 automated Effect Engine results and 73 explicit manual results**. All four 120-card themes are content-complete.

Narrow Escapes is complete at 120/120 cards:

- 30/30 Attack cards, split 15/15 between ordinary and spell critical hits, with 25 automated results and 5 manual escape results;
- 30/30 Fortitude cards for critically successful Fortitude saves, with 25 automated results and 5 manual escape results;
- 30/30 Reflex cards for critically successful Reflex saves, with 25 automated results and 5 manual escape results;
- 30/30 Will cards for critically successful Will saves, with 25 automated results and 5 manual escape/support results;
- every Narrow Escape card requires `extensions.againstAllOdds.narrowEscape.matched == true`;
- every completed deck contains exactly three danger-score 4 and three danger-score 5 escalation cards across its three passes;
- the final pass adds focused `disease`, `inhaled`, `fear`, `mental`, and `auditory` incoming-trait gates only to cards whose fiction depends on that evidence;
- automated Fortitude, Reflex, and Will results remain on the saving actor, while Attack continues to mix self-preservation with hostile pursuit disruption;
- the acting hero's own dangerous attack traits do not contribute to the Narrow Escape danger score on attack rolls, while dangerous incoming save traits remain valid danger evidence;
- the canonical effect audit normalizes component order, selector order, predicates, and object fields and reports no exact automated duplicates against the three earlier themes or within Narrow Escapes;
- the strict same-gate mechanical-superset audit remains clean across all 120 Narrow Escape cards;
- the final review also rejects same-gate conceptual duplicates that use the same mechanical selector footprint with only modifier-type reshuffling;
- the final 40 cards add no new resistance or immunity filler and preserve all 440 previously published card IDs.

All three reviewed Bloodied ten-card passes are complete. The final pass deliberately adds fewer immunities and more context-sensitive results, including quarter-health, wounded, battlefield-threat, weapon damage-type, spell-trait, elemental-damage, fear, curse, auditory, linguistic, and incapacitation gates.

Every Bloodied Triumphs card requires `extensions.againstAllOdds.bloodied.matched == true`. Every published Surrounded card requires `extensions.againstAllOdds.surrounded.matched == true`. Every published Giant-Slayer card requires `extensions.againstAllOdds.giantSlayer.matched == true`. Attack cards remain isolated to `attack`; the Fortitude, Reflex, and Will cards remain isolated to their matching specialized deck and require the corresponding save filter. Stronger Surrounded results can additionally inspect `extensions.againstAllOdds.surrounded.count`. Target-centric Surrounded cards may also require `extensions.againstAllOdds.surrounded.opponentIsThreatening == true`. Giant-Slayer reuses the same immutable threat evidence as `giantSlayer.opponentIsThreatening` and additionally exposes `opponentSize`, `sizeGap`, and `opponentIsLarger` from the existing participant snapshot. None of these fields performs a second scene scan.
