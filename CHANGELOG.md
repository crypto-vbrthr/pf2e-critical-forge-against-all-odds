# Changelog

## 0.1.0-dev.15

### Added
- Added the first ten **Surrounded, Still Standing** Will-deck cards for critically successful Will saves.
- Added resolve, Will-DC reinforcement, fear reversal, mental resistance, controlled-condition protection, Wisdom/Charisma presence, and one manual Demoralize counter-moment.
- Added two stronger Will results that require at least three or four currently threatening enemies.
- Added German and English localization for all ten cards and nine automated effects.

### Tests
- Raised the automated suite to 99 tests with Will count, save/deck isolation, dynamic-gate, nested-threat, target-role, mental/fear filter, mechanical-coverage, localization, and Forge-contract coverage.
- Revalidated Bloodied Triumphs at 120 cards and Surrounded, Still Standing at 40 cards against the actual Critical Forge `1.0.0-rc` normalizer, validator, selection matcher, and Effect Engine.

### Compatibility
- Existing 150 published card IDs are unchanged; this build only adds ten Surrounded Will IDs.
- Card, pack, effect, diagnostic, API, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.14

### Added
- Added the first ten **Surrounded, Still Standing** Reflex-deck cards for critically successful Reflex saves.
- Added crowded-field Acrobatics, concealment, anti-flanking protection, precision resistance, hostile-source counter-openings, Perception reinforcement, and one manual reaction-safe escape result.
- Added two stronger Reflex results that require at least three or four currently threatening enemies.
- Added German and English localization for all ten cards and nine automated effects.

### Tests
- Raised the automated suite to 92 tests with Reflex count, save/deck isolation, dynamic-gate, nested-threat, target-role, mechanical-coverage, localization, and Forge-contract coverage.
- Revalidated Bloodied Triumphs at 120 cards and Surrounded, Still Standing at 30 cards against the actual Critical Forge `1.0.0-rc` normalizer, validator, selection matcher, and Effect Engine.

### Compatibility
- Existing 140 published card IDs are unchanged; this build only adds ten Surrounded Reflex IDs.
- Card, pack, effect, diagnostic, API, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.12

### Added
- Began **Surrounded, Still Standing** with the first ten Attack-deck cards.
- Added five ordinary critical-hit and five spell critical-hit results focused on holding the center, disrupting an encirclement, exploiting formation gaps, and creating tactical space.
- Added stronger contextual results that require at least three or four currently threatening enemies.
- Extended the shared card factory with theme-specific Surrounded card definitions while preserving all existing Bloodied Triumphs output and IDs.

### Tests
- Added first-pass Surrounded card-count, 5/5 category split, dynamic-gate, nested-threat, target-role, localization, tone/impact, filter, and effect-schema coverage.
- Extended pack/runtime/release contracts so the Surrounded Attack deck must register exactly ten cards while the other three Surrounded decks remain empty.

### Compatibility
- Bloodied Triumphs remains unchanged at 120/120 cards.
- Card, pack, effect, diagnostic, and extension-contract schemas remain unchanged.

## 0.1.0-dev.11

### Added
- Completed the third and final ten-card pass for all four Bloodied Triumphs decks, bringing the theme to 120/120 cards.
- Completed the Attack deck at 15 ordinary critical-hit cards and 15 spell critical-hit cards.
- Added contextual melee/ranged, bludgeoning/slashing/piercing, light/sonic/cold/electricity/acid, quarter-health, wounded, battlefield-threat, fear, illusion, emotion, auditory, linguistic, curse, and incapacitation results.
- Added additive condition-group authoring in the add-on card factory so new cards can combine the permanent Bloodied gate with extra runtime evidence without rewriting existing cards.
- Added four new manual tactical results, preserving the overall 90% automated / 10% manual distribution.

### Tests
- Raised the automated suite to 72 tests with final-pass count, 15/15 Attack split, context-group, targeting, manual/automated ratio, no-new-immunity, and contextual-filter coverage.
- Preserved the first 80 cards on their original simple Bloodied condition while validating grouped conditions only on cards that need additional evidence.
- Revalidated German/English localization parity and all supported tone/impact values.

### Compatibility
- Existing 80 card IDs are unchanged; this build adds forty final-pass IDs.
- Critical Card schema 1, Card Pack schema 1, Effect Definition schema 2, and Extension Contract 1 remain unchanged.

## 0.1.0-dev.10.1

### Reviewed
- Applied the eighty-card Bloodied Triumphs review without changing any published card ID.
- Corrected German rules terminology from `Umstandsbonus` / `Umstandsmalus` to **Situationsbonus** / **Situationsmalus**.
- Corrected **Thought Strikes Back** so persistent mental damage uses unlimited effect duration and therefore ends through normal persistent-damage recovery rather than an artificial one-round cap.
- Expanded **Flesh Remembers** text to state the dying-value protection that accompanies regeneration.
- Reworked **The Last Reserve** from a second temporary-Hit-Point card into resistance 1 to all damage for 1 round.
- Reclassified **Pain Becomes Authority** from moderate to strong.

### Tests
- Added regression coverage for German circumstance terminology, persistent-damage duration, the reviewed Last Reserve mechanic, regeneration disclosure, and the revised impact rating.
- Revalidated the complete eighty-card Bloodied Triumphs pool against the Critical Forge RC contracts.

### Compatibility
- Card IDs, pack IDs, schemas, extension contract, and public API requirements remain unchanged.

## 0.1.0-dev.10

### Added
- Added the second ten-card Bloodied Triumphs Will pass, bringing the Will deck to 20/30 cards and Bloodied Triumphs to 80/120 cards.
- Added hostile-source attack and DC countershocks, Wisdom/Charisma and skill-check reinforcement, fleeing and stupefied protection, persistent mental backlash, Spell/Class DC reinforcement, and one manual suppression result for an ongoing mental effect.
- Added German and English localization for all ten cards and nine automated effects.

### Tests
- Raised the automated suite with second-pass Will count, content-batch, mechanical-diversity, target-role, contextual-filter, localization, and terminology coverage.
- Extended the release contract to require twenty Will cards.
- Revalidated the complete 80-card Bloodied Triumphs pool against the Critical Forge RC pack and effect contracts.

### Compatibility
- Card, pack, effect, diagnostic, and extension-contract schema versions remain unchanged.
- Existing seventy card IDs are unchanged; this build only adds ten new Will IDs.

## 0.1.0-dev.9

### Added
- Added the second ten-card Bloodied Triumphs Reflex pass, bringing the Reflex deck to 20/30 cards.
- Added all-Speed momentum, Reflex-DC reinforcement, protection from grabbed/restrained, critical-hit resistance, Acrobatics/Stealth reinforcement, counterattack momentum, Dexterity-based reinforcement, slowed immunity, persistent-damage resistance, and one manual reaction-safe Stride.
- Added German and English localization for all ten cards and nine automated effects.

### Tests
- Raised the automated suite to 59 tests with second-pass Reflex count, content-batch, mechanical-diversity, saving-actor targeting, localization, and German Remaster-terminology coverage.
- Extended the release contract to require twenty Reflex cards.

### Compatibility
- Card, pack, effect, diagnostic, and extension-contract schema versions remain unchanged.
- Existing sixty card IDs are unchanged; this build only adds ten new Reflex IDs.

## 0.1.0-dev.8.1

### Fixed
- Corrected the `Pain Leaves Room for Healing` card tone from unsupported `hopeful` to supported `dramatic`, which prevented the entire Bloodied Triumphs pack from registering in Foundry.
- Added regression coverage for Critical Forge card tone and impact contract values.

## 0.1.0-dev.8

### Added

- Added the second ten-card Bloodied Triumphs Attack pass, bringing the Attack deck to 20/30 cards.
- Added five ordinary critical-hit cards and five critical spell-hit cards.
- Added persistent bleed and force damage, weapon and spell-damage weaknesses, slowed, enfeebled, stupefied, spell-DC reinforcement, movement suppression, and one aggressive manual Step result.
- Added contextual exclusions for bleed against constructs and oozes and for mental backlash against mindless targets.
- Added German and English localization for all ten new cards and nine automated effects.

### Tests

- Added second-pass card-count, 10/10 category split, content-batch, filter, targeting, component-diversity, and localization coverage.
- Revalidated all fifty published cards against PF2E Critical Forge `1.0.0-rc`.
- Smoke-tested second-pass card selection with Bloodied matched and unmatched snapshots.

### Compatibility

- Card, pack, effect, diagnostic, and extension-contract schema versions remain unchanged.
- The first forty reviewed card IDs are unchanged; this build only adds ten new Attack IDs.

## 0.1.0-dev.6.1

### Changed

- Applied the first forty-card Bloodied Triumphs review without changing any published card ID.
- Reworked five overlapping Attack cards into Strike damage, off-guard, Athletics/Intimidation, clumsy, and spell-damage effects.
- Increased **Second Pulse** from fast healing 2 to fast healing 4 while retaining its strong impact rating.
- Replaced two broad Will immunities with a contextual illusion-defense bonus and an emotion countershock against the hostile source.
- Added effect-trait filters to poison, disease, mental, illusion, and emotion cards so specialized results respond more closely to the triggering effect.
- Corrected German Remaster terminology to **Gesteuert** and **Kraftlos**.
- Polished the German titles **Die Wunde hält das Geflecht** and **Nie dort, wo sie dich erwarten**.

### Tests

- Added regression coverage for stable card IDs, reviewed mechanics, contextual filters, the stronger healing value, reduced Will immunity density, target roles, and German terminology.
- Revalidated all forty cards and automated Effect Definitions against PF2E Critical Forge `1.0.0-rc`.

### Compatibility

- Card, pack, effect, diagnostic, and extension-contract schema versions remain unchanged.
- Existing stored references remain valid because all forty card IDs are preserved.

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
