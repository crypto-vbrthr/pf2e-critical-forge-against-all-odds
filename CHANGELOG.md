# Changelog

## 0.1.0-dev.3

### Added

- Added the first ten playable Bloodied Triumphs cards to the specialized Attack deck.
- Added five ordinary critical-hit cards and five critical spell-hit cards.
- Added nine automated Effect Engine definitions and one manual immediate-Step result.
- Added German and English card and effect localization.
- Added structural, localization, condition, targeting, and deck-isolation tests for the first card batch.

### Compatibility

- Continues to use Critical Card schema 1, Critical Card Pack schema 1, Effect Definition schema 2, and Extension Contract 1.
- The other fifteen specialized decks remain empty by design.

## 0.1.0-dev.2

### Changed

- Renamed the module ID to `pf2e-critical-forge-against-all-odds` to match the established Critical Forge add-on family.
- Renamed the Foundry title to **PF2E Critical Forge: Against All Odds**.
- Updated settings namespaces, pack IDs, provider IDs, repository URLs, tests, documentation, and the manual-installation path to the canonical name.
- Raised the Critical Forge baseline to `1.0.0-rc`; the extension contract still validates API version, schemas, and required capabilities at runtime.
- Aligned the archive layout with Arcane Backlash and the Critical Forge release packages by placing `module.json` at the archive root.

### Migration

- Remove the obsolete development folder `pf2e-against-all-odds` before installing this build. No world-data migration is required because the earlier package was not a supported release.

## 0.1.0-dev.1

### Added

- Bound Critical Forge extension registration.
- Four theme packs with Attack, Fortitude, Reflex, and Will deck slots.
- PF2e context provider that delegates to `core-pf2e` and adds Against-All-Odds metrics.
- Typed Condition Provider fields for the visual Critical Card Editor.
- Diagnostic Provider evidence for Diagnostics 2.0.
- World settings for pack activation and trigger thresholds.
- Initial additive Narrow Escape danger-score model.
- German and English localization.
- Unit, contract, localization, metadata, settings, and rollback tests.

### Compatibility

- Requires PF2E Critical Forge `1.0.0-rc` or newer.
- Uses Critical Card schema 1, Critical Card Pack schema 1, Effect Definition schema 2, and Extension Contract 1.
- No migration is required.

### Content status

- This version contains infrastructure and sixteen empty specialized deck slots.
- Playable cards begin with the next development milestone.
