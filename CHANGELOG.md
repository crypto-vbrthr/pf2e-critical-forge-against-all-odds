# Changelog

## 0.1.0-dev.6

### Added

- Added the first ten Bloodied Triumphs cards to the specialized Will deck.
- Added nine automated resolve effects and one manual condition-reduction result.
- Added Will and Will DC reinforcement, mental resistance, Perception reinforcement, short immunities to frightened, controlled, illusion, emotion, and confused, plus one hostile-source countershock.
- Added German and English card and effect localization.
- Added Will deck isolation, saving-actor targeting, hostile-source targeting, localization, uniqueness, and release-contract tests.

### Roadmap

- Completed the first ten-card pass across all four Bloodied Triumphs categories.
- Raised the documented final target to 30 cards per deck: 120 cards per theme and 480 cards across the full add-on.

### Compatibility

- Continues to use Critical Card schema 1, Critical Card Pack schema 1, Effect Definition schema 2, and Extension Contract 1.
- The remaining twelve specialized decks stay empty by design, while Bloodied Triumphs begins its second ten-card pass after review.

## 0.1.0-dev.5

### Added

- Added ten Bloodied Triumphs cards to the specialized Reflex deck.
- Added nine automated evasion effects and one manual two-Step repositioning result.
- Added Reflex and Reflex DC reinforcement, concealment, movement, area-damage resistance, AC reinforcement, Acrobatics reinforcement, and short immunities to off-guard, prone, and immobilized.
- Added German and English card and effect localization.
- Added Reflex deck isolation, saving-actor targeting, localization, component, uniqueness, and release-contract tests.

### Compatibility

- Continues to use Critical Card schema 1, Critical Card Pack schema 1, Effect Definition schema 2, and Extension Contract 1.
- Attack, Fortitude, and Reflex are now complete for Bloodied Triumphs; the remaining thirteen specialized decks remain empty by design.

## 0.1.0-dev.4

### Added

- Added ten Bloodied Triumphs cards to the specialized Fortitude deck.
- Added nine automated endurance effects and one manual persistent-damage recovery result.
- Added temporary Hit Points, Fortitude and Fortitude DC reinforcement, physical, poison, and bleed resistance, fast healing, and short condition immunities.
- Added German and English card and effect localization.
- Added Fortitude deck isolation, saving-actor targeting, localization, component, and uniqueness tests.

### Compatibility

- Continues to use Critical Card schema 1, Critical Card Pack schema 1, Effect Definition schema 2, and Extension Contract 1.
- Attack and Fortitude are now complete for Bloodied Triumphs; the remaining fourteen specialized decks remain empty by design.

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
