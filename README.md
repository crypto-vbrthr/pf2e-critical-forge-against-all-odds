# PF2E Critical Forge: Against All Odds

**Against All Odds** is an optional context-sensitive card expansion for **PF2E Critical Forge**. It contributes four thematic packs, each with separate Attack, Fortitude, Reflex, and Will decks:

- Bloodied Triumphs
- Surrounded, Still Standing
- Giant-Slayer Moments
- Narrow Escapes

Version `0.1.0-dev.9` completes the second Reflex content pass for Bloodied Triumphs. Attack, Fortitude, and Reflex now each contain 20 of their planned 30 cards, while Will remains at 10. Bloodied Triumphs now contains 70 of its planned 120 cards. The registration-contract regression coverage introduced in `0.1.0-dev.8.1` remains active.

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

Bloodied Triumphs now contains seventy cards:

- twenty Attack-deck cards, split evenly between ordinary and spell critical hits;
- twenty Fortitude-deck cards for critically successful Fortitude saves;
- twenty Reflex-deck cards for critically successful Reflex saves;
- ten Will-deck cards for critically successful Will saves;
- sixty-three automated Effect Engine cards;
- seven explicit manual cards.

The first ten-card pass has been reviewed across all four decks, and the Attack, Fortitude, and Reflex decks have completed their second ten-card passes. The final Bloodied Triumphs target is 30 cards in each category, or 120 cards in total. Several specialized cards now additionally require matching effect traits such as poison, disease, mental, illusion, or emotion.

Every card requires `extensions.againstAllOdds.bloodied.matched == true`. Attack cards remain isolated to `attack`; save cards remain isolated to their matching specialized deck and require the corresponding save filter.
