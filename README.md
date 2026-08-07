# PF2E Critical Forge: Against All Odds

**Against All Odds** is an optional context-sensitive card expansion for **PF2E Critical Forge**. It contributes four thematic packs, each with separate Attack, Fortitude, Reflex, and Will decks:

- Bloodied Triumphs
- Surrounded, Still Standing
- Giant-Slayer Moments
- Narrow Escapes

Version `0.1.0-dev.20` completes **Surrounded, Still Standing** at 120 cards while keeping **Bloodied Triumphs** complete at 120 cards. The final Surrounded pass adds forty formation-focused results across Attack, Fortitude, Reflex, and Will, with more movement, reaction interaction, ally support, and opponent-in-ring conditions instead of expanding resistance or immunity series. All previously published card IDs remain unchanged.

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

Against All Odds therefore currently contains 240/480 planned cards across two complete themes.

All three reviewed Bloodied ten-card passes are complete. The final pass deliberately adds fewer immunities and more context-sensitive results, including quarter-health, wounded, battlefield-threat, weapon damage-type, spell-trait, elemental-damage, fear, curse, auditory, linguistic, and incapacitation gates.

Every Bloodied Triumphs card requires `extensions.againstAllOdds.bloodied.matched == true`. Every published Surrounded card requires `extensions.againstAllOdds.surrounded.matched == true`. Attack cards remain isolated to `attack`; the Fortitude, Reflex, and Will cards remain isolated to their matching specialized deck and require the corresponding save filter. Stronger Surrounded results can additionally inspect `extensions.againstAllOdds.surrounded.count`. Target-centric Surrounded cards may also require `extensions.againstAllOdds.surrounded.opponentIsThreatening == true`, which is derived from the Critical Forge `battlefield.hostileThreats` snapshot rather than from a second scene scan.
