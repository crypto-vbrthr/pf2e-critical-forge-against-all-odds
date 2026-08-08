# Changelog

## 0.1.0-dev.36

### Added
- Added **Narrow Escapes Reflex cards 11–20**, bringing Reflex to 20/30, Narrow Escapes to 70/120, and the full add-on to 430/480 planned cards.
- Added content batch 36 with **8 automated Effect Engine results and 2 manual escape results**.
- Added one additional danger-score 4 escalation and one additional danger-score 5 escalation for Reflex.
- Added manual **Leap the Last Gap**, granting an immediate Leap with a Step fallback, and **Tumble Through the Closing Edge**, granting an immediate Tumble Through with +2 and a short Stride fallback when no enemy space can be crossed.
- Added German and English localization for all ten new cards and eight automated effects using the Remaster action names `Springen`, `Schritt`, `Hindurchturnen`, and `Laufen`.

### Review and tests
- Preserved all 420 previously published card IDs and every reviewed first-pass Narrow Escape mechanic.
- Extended Narrow Escape exact-signature and same-gate mechanical-superset audits across all 70 published Narrow Escape cards.
- Confirmed all 17 automated Narrow Escape Reflex effects target the saving actor.
- Confirmed the second Reflex pass adds no resistance or immunity filler.
- Expanded card, pack, runtime, localization, danger-threshold, manual-fallback, and release-check regression coverage for the 20/20/20/10 Narrow Escape layout.
- Verified **253/253 tests** with **99.52% line coverage**, **95.23% branch coverage**, and **98.95% function coverage**.
- Package-local release checks report **1276 localization keys per language**.

### Compatibility
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.35

### Added
- Added **Narrow Escapes Fortitude cards 11–20**, bringing Fortitude to 20/30, Narrow Escapes to 60/120, and the full add-on to 420/480 planned cards.
- Added content batch 35 with **8 automated Effect Engine results and 2 manual escape results**.
- Added one additional danger-score 4 escalation and one additional danger-score 5 escalation for Fortitude.
- Added focused incoming `death` evidence for **Death Flinches First** while keeping the other second-pass Fortitude cards broadly usable.
- Added manual **Muscle Through the Gap**, which turns restraint into an immediate Escape attempt or otherwise a short Stride, and **Get Something Solid Between You**, which can combine a Step with Take Cover when the movement actually creates cover.
- Added German and English localization for all ten new cards and eight automated effects, using the reviewed Remaster action names `Entkommen`, `Laufen`, and `In Deckung gehen`.

### Review and tests
- Preserved all 410 previously published card IDs and every reviewed first-pass Narrow Escape mechanic.
- Extended Narrow Escape exact-signature and same-gate mechanical-superset audits across all 60 published Narrow Escape cards.
- Confirmed all 17 automated Narrow Escape Fortitude effects target the saving actor.
- Confirmed the second Fortitude pass adds no resistance or immunity filler.
- Expanded card, pack, runtime, localization, danger-threshold, filter, manual-fallback, and release-check regression coverage for the 20/20/10/10 Narrow Escape layout.
- Verified **250/250 tests** with **99.51% line coverage**, **95.16% branch coverage**, and **98.93% function coverage**.
- Package-local release checks report **1248 localization keys per language**.

### Compatibility
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.34

### Added
- Added **Narrow Escapes Attack cards 11–20**, bringing Narrow Escapes to 50/120 cards and the full add-on to 410/480 planned cards.
- Added five ordinary critical-hit and five spell-critical cards in content batch 34, with 8 automated Effect Engine results and 2 manual escape actions.
- Added one additional danger-score 4 escalation and one additional danger-score 5 escalation for the Attack deck.
- Added manual **Sprint Through the Reprieve**, allowing an immediate half-Speed Stride away from the target without triggering that target's reactions, and **Hide in the Spell's Wake**, combining an immediate Step with a conditional Hide attempt when cover or concealment is gained.
- Added German and English localization for all ten new cards and eight automated effects.

### Review and tests
- Preserved all 400 previously published card IDs and every reviewed first-pass Narrow Escape mechanic.
- Extended Narrow Escape same-gate mechanical-superset and exact-signature audits across all 50 currently published Narrow Escape cards.
- Confirmed the second Attack pass remains broad rather than filtering on the acting hero's own attack or spell traits.
- Updated pack/runtime contracts and package-local release checks for the 20/10/10/10 Narrow Escape layout.
- Verified **246/246 tests** with **99.50% line coverage**, **95.04% branch coverage**, and **98.90% function coverage**.
- Package-local release checks report **1220 localization keys per language**.

### Compatibility
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.33.1

- Completed the first **40-card Narrow Escapes review** without changing any published card ID or card mechanic.
- Confirmed the balanced 10/10/10/10 deck layout, 36 automated / 4 manual split, and exactly one danger-score 4 plus one danger-score 5 escalation per deck.
- Added a complete Narrow Escapes same-gate mechanical-superset regression audit; the reviewed 36 automated effects contain no strict same-gate supersets and remain exact-signature distinct.
- Normalized all German Narrow Escapes status-modifier wording to the Remaster term **Zustandsbonus**.
- Updated Narrow Escapes architecture, context-field, roadmap, testing, and release documentation to include the completed Will first pass and 40-card review.
- Verified **243/243 tests** with **99.49% line coverage**, **94.96% branch coverage**, and **98.88% function coverage**; package-local release checks report **1192 localization keys per language**.

## 0.1.0-dev.33

### Added
- Added the first ten **Narrow Escapes Will** cards, completing the first 40-card Narrow Escapes pass and bringing the full add-on to 400/480 planned cards.
- Added nine automated Effect Engine results and one manual **Seek / Suchen** result centered on reclaiming agency after a critical Will success, spotting the exit once panic clears, and turning mental survival into immediate momentum.
- Added danger-score 4 and 5 escalation for two stronger Will results.
- Added focused incoming **fear** and **mental** gates for **Panic Spends Its Last Breath** and **The Mental Grip Slips** while leaving the remaining Will pool broadly available.
- Added German and English localization for all ten Will cards and nine automated effects.
- Wired the Narrow Escape Will deck into the protected multi-deck pack and added a matching Will card factory path.

### Tests
- Added Will count, unique-ID, save/deck isolation, batch-33, 9/1 automation, danger escalation, fear/mental-filter, immutable-filter, localization, German terminology, saver-targeting, and cross-theme exact-signature uniqueness coverage.
- Extended package-local release checks to cover both Narrow Escape Reflex and Will first-pass contracts.
- Updated runtime and pack contracts for the 10/10/10/10 Narrow Escape first-pass layout.
- Verified **239/239 tests** with **99.51% line coverage**, **94.91% branch coverage**, and **98.86% function coverage**.
- Package-local release checks report **1192 localization keys per language**.

### Compatibility
- All 390 previously published card IDs remain unchanged; this build adds ten Narrow Escape Will IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.32

### Added
- Added the first ten **Narrow Escapes Reflex** cards, bringing Narrow Escapes to 30/120 cards and the full add-on to 390/480 planned cards.
- Added nine automated Effect Engine results and one manual two-Step escape result centered on turning a critical Reflex success into immediate distance, positioning, and a surviving route.
- Added danger-score 4 and 5 escalation for two stronger Reflex results.
- Added **The Finishing Blow Misses**, gated to incoming incapacitation trait evidence.
- Added German and English localization for all ten Reflex cards and nine automated effects.
- Wired the Narrow Escape Reflex deck into the protected multi-deck pack.

### Tests
- Added Reflex count, unique-ID, save/deck isolation, batch-32, 9/1 automation, danger escalation, incapacitation-filter, immutable-filter, localization, German terminology, saver-targeting, and cross-theme exact-signature uniqueness coverage.
- Updated runtime and pack contracts for the 10/10/10/0 Narrow Escape deck layout.
- Verified **230/230 tests** with **99.51% line coverage**, **95.07% branch coverage**, and **98.82% function coverage**.
- Package-local release checks report **1163 localization keys per language**.

### Compatibility
- All 380 previously published card IDs remain unchanged; this build adds ten Narrow Escape Reflex IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.31

### Added
- Added the first ten **Narrow Escapes Fortitude** cards, bringing Narrow Escapes to 20/120 cards and the full add-on to 380/480 planned cards.
- Added nine automated Effect Engine results and one manual Stand / Step result centered on surviving bodily collapse long enough to escape.
- Added danger-score 4 and 5 escalation for two stronger Fortitude results.
- Added **The Toxin Loses the Race**, gated to incoming poison evidence and granting poison resistance plus a Fortitude bonus to the saving actor.
- Added German and English localization for all ten Fortitude cards and nine automated effects.
- Wired the Narrow Escape Fortitude deck into the protected multi-deck pack.

### Tests
- Added Fortitude count, unique-ID, save/deck isolation, batch-31, 9/1 automation, danger escalation, poison-filter, immutable-filter, localization, German terminology, saver-targeting, and cross-theme exact-signature uniqueness coverage.
- Updated runtime, pack, and release-contract tests for the 10/10/0/0 Narrow Escape deck layout.
- Verified **221/221 tests** with **99.52% line coverage**, **95.11% branch coverage**, and **98.79% function coverage**.
- Package-local release checks report **1134 localization keys per language**.

### Compatibility
- All 370 previously published card IDs remain unchanged; this build adds ten Narrow Escape Fortitude IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.30

### Added
- Began **Narrow Escapes** with the first ten Attack-deck cards.
- Added five ordinary critical-hit and five spell critical-hit cards, with nine automated Effect Engine results and one manual Raise a Shield / Step result.
- Added danger-score escalation at 4 and 5 for two stronger Narrow Escape results.
- Added German and English localization for all ten cards and nine automated effects.
- Wired the Narrow Escape Attack deck into the pack registry and marked the theme as in progress.

### Context review
- Corrected the initial Narrow Escape danger model for Attack rolls: dangerous traits on the acting hero's own attack no longer contribute to the danger score. This prevents poison, death, disease, incapacitation, or curse traits on the successful attack from manufacturing the danger required to trigger Narrow Escapes.
- Saving-throw contexts continue to count dangerous incoming attack/spell trait evidence.

### Tests
- Added Narrow Escape count, ID, 5/5 category split, dynamic gate, batch-30, 9/1 automation, danger-score escalation, immutable filter, localization, German terminology, and cross-theme exact-signature uniqueness coverage.
- Added regression coverage for the Attack-roll dangerous-trait correction.
- Verified **212/212 tests** with **99.52% line coverage**, **95.15% branch coverage**, and **98.74% function coverage**.
- Existing 360 published card IDs remain unchanged; this build adds ten Narrow Escape Attack IDs.

### Compatibility
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.29.1

### Review
- Completed the final **120-card Giant-Slayer Moments** review across Attack, Fortitude, Reflex, and Will.
- Preserved all 360 published card IDs, all 120 Giant-Slayer IDs, deck counts, automation/manual splits, level-gap escalation counts, and existing public schemas.
- Reworked **Certainty Collapses Inward** so it no longer repeats the same frightened + stupefied counterpressure core as **Pressure Rebounds**. It now turns a resisted mental assault into an exposed hostile source: off-guard with a -1 circumstance penalty to attack rolls and class DC for 1 round.
- Normalized German Giant-Slayer Remaster terminology: `enfeebled` is consistently **Kraftlos**, `off-guard` is consistently **Auf dem Falschen Fuß**, and size language consistently uses **Größenkategorie** rather than Größenstufe.

### Tests
- Added targeted regression coverage for the separated Will counterpressure lanes and German Remaster terminology across the full Giant-Slayer localization tree.
- Renamed the strict same-gate mechanical-superset audit to reflect that it now covers the complete 120-card Giant-Slayer set.
- Verified **202/202 tests** with **99.53% line coverage**, **95.09% branch coverage**, and **98.70% function coverage**.

### Compatibility
- No card IDs were added, removed, or renamed.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.29

### Added
- Completed **Giant-Slayer Moments** with the final forty-card pass: ten Attack, ten Fortitude, ten Reflex, and ten Will cards.
- Finished Giant-Slayer at 30/30 cards per specialized deck and 120/120 cards total.
- Finalized Attack at fifteen ordinary and fifteen spell critical hits.
- Added eight automated and two manual results to every final deck, for a complete Giant-Slayer total of 99 automated and 21 manual results.
- Added one final +4 and one final +5 level-gap escalation to each deck, bringing every completed Giant-Slayer deck to three +4 and three +5 escalation cards across its three passes.
- Added final threat-, larger-opponent-, size-gap-, mental-, auditory-, and mindless-aware gates without introducing resistance or immunity filler in the final save passes.
- Added German and English localization for all forty cards and thirty-two automated effects.
- Marked the Giant-Slayer pack metadata as complete.

### Rules review
- **Bring the Weight Down** preserves the normal prerequisites of *Trip / Zu Fall bringen* but explicitly overrides only its normal size restriction and supplies a Step fallback when the maneuver cannot be attempted.
- **Read the Claim Behind the Threat** preserves the normal repeat-attempt restriction of *Sense Motive / Motiv erkennen* while allowing the immediate free-action attempt granted by the card.
- Final automated definitions were adjusted until exact-signature uniqueness against Bloodied Triumphs, Surrounded, Still Standing, and prior Giant-Slayer cards remained clean.
- The strict same-gate mechanical-superset regression check remains clean across the complete 120-card Giant-Slayer set.

### Tests
- Added final-pass count, ID, 15/15 Attack split, batch-29, 8/2 automation, +4/+5 escalation, threat/size, mental/auditory, no-resistance/immunity, and manual PF2e-action restriction coverage.
- Updated runtime, pack, and release contracts for the completed 30/30/30/30 Giant-Slayer layout.

### Compatibility
- All 320 previously published card IDs remain unchanged; this build adds forty final Giant-Slayer IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.28.1

### Review
- Reviewed the 80 published Giant-Slayer cards for balance, overlap, exact effect duplication, same-gate mechanical supersets, targeting, PF2e action interactions, and German terminology.
- Preserved all 320 published card IDs while tightening Fortitude overlap, prone/stupefied interactions, mindless exclusions, threat gating, and manual Shove fallback behavior.

## 0.1.0-dev.28

### Added
- Added the second ten-card **Giant-Slayer Moments** Will pass, bringing Will to 20/30 and the theme to 80/120 cards.
- Added eight automated and two manual results centered on defying overwhelming authority, turning mental pressure back on the hostile source, strengthening an ally's resolve, and answering with Bon Mot.
- Added one new +4 and one new +5 level-gap escalation while keeping the base +3 Giant-Slayer pool broad.
- Added reviewed `mental` trigger gates and mindless-target exclusions for backlash, doubt, and social-pressure results.
- Added temporary Hit Points and new Will/spell/class-DC counterplay without adding resistance or immunity filler.
- Added German and English localization for all ten cards and eight automated effects.

### Tests
- Added second-pass Will count/content-batch, 8/2 automation split, +4/+5 escalation, mental/mindless gating, saver/hostile target-role, manual ally/verbal counterplay, no-resistance/immunity, localization, and exact-signature uniqueness coverage.
- Updated runtime and release contracts for the 20/20/20/20 Giant-Slayer deck layout.
- Current automated test and coverage totals are recorded in `RELEASE_CHECKLIST.md` and `docs/TESTING.md`.

### Compatibility
- All 310 previously published card IDs remain unchanged; this build adds ten new Giant-Slayer Will IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.27

### Added
- Added the second ten-card **Giant-Slayer Moments** Reflex pass, bringing Reflex to 20/30 and the theme to 70/120 cards.
- Added eight automated and two manual results centered on slipping inside oversized attack arcs, exploiting size-gap routes, stealing momentum, and forcing a stronger foe to overcommit.
- Added one new +4 and one new +5 level-gap escalation while keeping the base +3 Giant-Slayer pool broad.
- Added reviewed current-melee-threat, larger-opponent, and `sizeGap >= 2` gates for physical dead-angle and scale-specific movement results.
- Added two explicit manual movement moments: a 10-foot route through a two-size-step gap and a half-Speed escape line that ignores reactions from the hostile source.
- Added German and English localization for all ten cards and eight automated effects.

### Tests
- Added second-pass Reflex count/content-batch, 8/2 automation split, +4/+5 escalation, threat/size/size-gap gating, saver/hostile target-role, manual movement, no-resistance/immunity, localization, and exact-signature uniqueness coverage.
- Updated runtime and release contracts for the 20/20/20/10 Giant-Slayer deck layout.
- Verified 179/179 tests with 99.49% line coverage, 94.64% branch coverage, and 98.55% function coverage; package-local release checks report 936 localization keys per language.

### Compatibility
- All 300 previously published card IDs remain unchanged; this build adds ten new Giant-Slayer Reflex IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.26

### Added
- Added the second ten-card **Giant-Slayer Moments** Fortitude pass, bringing Fortitude to 20/30 and the theme to 60/120 cards.
- Added eight automated and two manual results centered on enduring overwhelming force, turning body mass and commitment into leverage, and converting a critical Fortitude success into immediate counterplay.
- Added one new +4 and one new +5 level-gap escalation while keeping the base +3 Giant-Slayer pool broad.
- Added reviewed larger-opponent and current-melee-threat gates for scale-specific bracing, Shove, recovery, and hostile counterpressure.
- Added temporary Hit Points, fast healing, movement pressure, and physical debuffs without adding resistance or immunity filler.
- Added German and English localization for all ten cards and eight automated effects.

### Tests
- Added second-pass Fortitude count/content-batch, 8/2 automation split, +4/+5 escalation, threat/size gating, saver/hostile target-role, manual counterplay, no-resistance/immunity, localization, and exact-signature uniqueness coverage.
- Updated runtime and release contracts for the 20/20/10/10 Giant-Slayer deck layout.
- Verified 173/173 tests with 99.47% line coverage, 94.44% branch coverage, and 98.50% function coverage; package-local release checks report 908 localization keys per language.

### Compatibility
- All 290 previously published card IDs remain unchanged; this build adds ten new Giant-Slayer Fortitude IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.25

### Added
- Added the second ten-card **Giant-Slayer Moments** Attack pass, bringing Attack to 20/30 and the theme to 50/120 cards.
- Added five ordinary critical-hit and five spell-critical-hit results, with eight automated Effect Engine results and two explicit manual tactical moments.
- Added one new +4 and one new +5 level-gap escalation while keeping the base +3 Giant-Slayer pool broad.
- Added reviewed scale-aware counterplay using `opponentIsLarger` and `sizeGap >= 2`, plus melee-only leverage results using `opponentIsThreatening`.
- Added a manual free-action **Tumble Through** result against a larger threatening opponent and a manual ally **Step** opened by a critical spell.
- Added German and English localization for all ten cards and eight automated effects.

### Tests
- Added second-pass Attack count, 5/5 category split, content-batch, automation/manual, escalation, threat/size-evidence, targeting, component-mix, localization, and exact-signature uniqueness coverage.
- Preserved the exact-signature rule: no automated Giant-Slayer mechanic duplicates Bloodied Triumphs, Surrounded, Still Standing, or another published Giant-Slayer effect.
- Updated runtime, pack, and release contracts for the 20/10/10/10 Giant-Slayer deck layout.

### Compatibility
- All 280 previously published card IDs remain unchanged; this build adds ten new Giant-Slayer Attack IDs.
- Critical Forge APIs and card/pack/effect schemas remain unchanged.

## 0.1.0-dev.24.1

### Reviewed
- Reused Critical Forge battlefield threat evidence for Giant-Slayer through additive `giantSlayer.opponentIsThreatening`, `opponentThreatEvaluation`, and diagnostic evidence fields; no second scene scan is performed.
- Added Giant-Slayer size evidence with canonical `opponentSize`, signed `sizeGap`, and nullable `opponentIsLarger` values derived from the existing participant snapshot.
- Bound physical Fortitude and Reflex counterpressure cards to the actual threatening opponent, so a remote caster cannot be knocked prone or physically overextended by an unrelated critical save.
- Reserved six scale-specific first-pass cards for opponents that are genuinely larger than the rolling actor.
- Reworked **Five Levels, One Empty Square** into a manual observer-relative concealed result plus an immediate Step, removing the incorrect global automated `concealed` condition.
- Restricted **Dominance Loses Its Grip** to mental effects and excluded mindless targets from **Their Certainty Misses a Beat**.

### Tests
- Added regression coverage for shared threat evidence, remote opponents, canonical PF2e size ordering, unknown-safe size relations, melee-threat card gates, larger-opponent card gates, observer-relative concealment, mental filtering, and mindless exclusions.
- Verified 163/163 tests with 99.44% line coverage, 94.14% branch coverage, and 98.39% function coverage.
- Revalidated against the actual Critical Forge `1.0.0-rc` pack validator: 280 cards and 243 automated effects are valid. Matcher checks confirm that remote sources cannot trigger physical knockdown/overreach results, same-size bosses do not receive size-only cards, and mental Will cards require the matching context.

### Compatibility
- All 280 published card IDs remain unchanged.
- Critical Forge APIs and card/pack/effect schemas remain unchanged.
- Context Provider and Condition/Diagnostic Provider versions advance additively to 1.2.0.

## 0.1.0-dev.24

### Added
- Added the first ten **Giant-Slayer Moments** Will-deck cards for critically successful Will saves.
- Added 9 automated effects and 1 manual Demoralize counter-moment, with one +4 and one +5 level-gap escalation result.
- Added German and English localization for the complete first Giant-Slayer Will pass.

### Changed
- Extended the Giant-Slayer pack registry so Attack, Fortitude, Reflex, and Will now each expose ten cards.
- Giant-Slayer has reached the first 40-card review milestone at 10/10/10/10.

### Tests
- Added Giant-Slayer Will count, deck/save isolation, dynamic gate, +4/+5 escalation, automation split, target-role, no-resistance/immunity, localization, presentation, and exact-signature uniqueness tests.
- Updated runtime, pack, and release contracts for the 10/10/10/10 Giant-Slayer deck layout.
- Revalidated the add-on against the actual Critical Forge `1.0.0-rc` pack validator and matcher before packaging: 280 cards and 244 automated effects valid; Giant-Slayer Will selection yields 0/8/9/10 cards at level gaps +2/+3/+4/+5.

### Compatibility
- Existing 270 published card IDs remain unchanged; this build adds ten Giant-Slayer Will IDs.

## 0.1.0-dev.23

### Added
- Added the first ten **Giant-Slayer Moments** Reflex-deck cards for critically successful Reflex saves.
- Added nine automated Effect Engine results and one manual dead-angle result allowing an immediate Step or Take Cover, with the Step protected from reactions by the hostile source.
- Added blind-spot, overshoot, momentum, balance, movement, and positioning mechanics designed around evading a substantially higher-level opponent rather than repeating Surrounded mobility patterns.
- Added one +4 level-gap escalation and one +5 level-gap escalation.
- Added German and English localization for all ten cards and nine automated effects.
- Extended the Giant-Slayer pack registry so Attack, Fortitude, and Reflex now each expose ten cards.

### Tests
- Added Giant-Slayer Reflex count, save/deck isolation, dynamic gate, +4/+5 escalation, automation split, target-role, no-resistance/immunity, localization, presentation, and exact-signature uniqueness tests.
- Updated runtime, pack, and release contracts for the 10/10/10/0 Giant-Slayer deck layout.
- Revalidated the add-on against the actual Critical Forge `1.0.0-rc` pack validator and matcher before packaging: 270 cards and 235 automated effects valid; Giant-Slayer Reflex selection yields 0/8/9/10 cards at level gaps +2/+3/+4/+5.
- Verified 148/148 tests with 99.30% line coverage, 93.95% branch coverage, and 98.11% function coverage.

### Compatibility
- Existing 260 published card IDs remain unchanged; this build adds ten Giant-Slayer Reflex IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.22

### Added
- Added the first ten **Giant-Slayer Moments** Fortitude-deck cards for critically successful Fortitude saves.
- Added nine automated Effect Engine results and one manual free-action Step that closes distance toward the stronger hostile source.
- Added physical counterpressure mechanics that turn overwhelming force, mass, and overcommitment against the higher-level opponent without adding a resistance or immunity series.
- Added one +4 level-gap escalation and one +5 level-gap escalation.
- Added German and English localization for all ten cards and nine automated effects.
- Extended the Giant-Slayer pack registry so Attack and Fortitude now each expose ten cards.

### Tests
- Added Giant-Slayer Fortitude count, deck/save isolation, dynamic gate, +4/+5 escalation, target-role, no-resistance/immunity, localization, presentation, and exact-signature uniqueness tests.
- Updated runtime, pack, and release contracts for the 10/10/0/0 Giant-Slayer deck layout.
- Revalidated the add-on against the actual Critical Forge `1.0.0-rc` pack validator and matcher before packaging: 260 cards and 226 automated effects valid; Giant-Slayer Fortitude selection yields 0/8/9/10 cards at level gaps +2/+3/+4/+5.
- Verified 139/139 tests with 99.17% line coverage, 94.04% branch coverage, and 97.87% function coverage.

### Compatibility
- Existing 250 published card IDs remain unchanged; this build adds ten Giant-Slayer Fortitude IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.21

### Added
- Began **Giant-Slayer Moments** with the first ten Attack-deck cards.
- Added five ordinary critical-hit and five spell-critical-hit results focused on exploiting the defenses, reach, scale, and overconfidence of opponents at least three levels above the acting hero.
- Added one +4 level-gap escalation and one +5 level-gap escalation.
- Added nine automated Effect Engine results and one manual Recall Knowledge result.
- Added German and English localization for all ten cards and nine automated effects.
- Extended the shared card factory and pack registry with Giant-Slayer Attack support while leaving the three save decks reserved and empty.

### Tests
- Added Giant-Slayer count, 5/5 category split, dynamic gate, level-gap escalation, automation split, filter, localization, and effect-schema tests.
- Added a first-pass exact-signature regression check preventing Giant-Slayer from copying existing Bloodied or Surrounded automated mechanics.
- Revalidated the add-on against the actual Critical Forge `1.0.0-rc` pack validator and matcher before packaging: 250 cards and 217 automated effects valid; Giant-Slayer selection yields 0/8/9/10 first-pass Attack cards at level gaps +2/+3/+4/+5.
- Verified 130/130 tests with 99.03% line coverage, 94.13% branch coverage, and 97.61% function coverage.

### Compatibility
- Existing 240 published card IDs remain unchanged; this build adds ten Giant-Slayer Attack IDs.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.20

- Completed **Surrounded, Still Standing** with the final forty-card pass: ten Attack, ten Fortitude, ten Reflex, and ten Will cards.
- Surrounded now contains 120/120 cards, with thirty cards in each specialized deck and a 15/15 ordinary/spell critical split in Attack.
- Added formation-focused manual results for repositioning, reaction denial, Shove/Escape interactions, ally support, and exploiting the enemy ring.
- Kept final-pass escalation sparse: each deck adds exactly one three-threat and one four-threat result.
- Added no new resistance or immunity series to the final Fortitude, Reflex, or Will passes.
- Preserved all previously published card IDs and the reviewed `opponentIsThreatening` behavior.
- Kept exact Bloodied/Surrounded automated effect overlap at nine legacy signatures and internal Surrounded duplicates at the two intentional reviewed pairs.
- Marked Surrounded pack metadata as complete and expanded regression coverage for the 120-card contract.
- Verified 123/123 add-on tests, 99.45% line coverage, 94.13% branch coverage, and 97.98% function coverage.
- Validated all 240 published cards and the 208 automated card effects through the actual Critical Forge `1.0.0-rc` pack validator path before packaging.

## 0.1.0-dev.19.1

### Reviewed
- Reclassified **Arc Through the Crowd** as `strong` to match its team-wide AC-and-save debuff.
- Reworked **Four Steps, One Misstep** so the four-threat Reflex escalation now makes a threatening foe off-guard and penalizes its attack rolls instead of duplicating **One Foe Becomes the Gap**.
- Preserved every published card ID and all deck counts.

### Tests
- Added a regression contract that monitors exact automated effect duplication inside Surrounded, Still Standing and permits only the two remaining intentional pairs.
- Added explicit review assertions for the Arc Through the Crowd impact and Four Steps, One Misstep effect definition.

### Compatibility
- All 200 published card IDs remain unchanged.
- Card, pack, effect, diagnostic, API, context-provider, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.19

### Added
- Added the second ten-card **Surrounded, Still Standing** Will pass, bringing the Will deck to 20/30 cards and the theme to 80/120 cards.
- Added nine automated and one manual result focused on mental composure under encirclement, current-opponent counterpressure, fear/mental context, ally support, Will/Perception pressure, and class-DC awareness.
- Added one three-threat and one four-threat escalation result; four direct counterpressure cards require the current hostile source to be a counted melee threat.
- Added German and English localization for all ten cards and nine automated effects.

### Tests
- Added second-pass Will count/content-batch, no-new-resistance/immunity-series, target-role, threat escalation, current-opponent gating, fear/mental filter, ally-support, localization, and cross-theme duplication coverage.
- Revalidated the complete add-on against the actual Critical Forge `1.0.0-rc` pack, matcher, and Effect Engine contracts before packaging.

### Compatibility
- Existing 190 published card IDs remain unchanged; this build adds ten Surrounded Will IDs.
- Card, pack, effect, diagnostic, API, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.18

### Added
- Added the second ten-card **Surrounded, Still Standing** Reflex pass, bringing the Reflex deck to 20/30 cards and the theme to 70/120 cards.
- Added nine automated and one manual result focused on ring geometry, current-opponent misdirection, movement momentum, Acrobatics, Perception disruption, and reaction-safe Tumble Through play.
- Added one three-threat and one four-threat escalation result; four formation-specific cards require the current hostile source to be a counted melee threat.
- Added German and English localization for all ten cards and nine automated effects.

### Tests
- Added second-pass Reflex count/content-batch, no-new-resistance/immunity-series, threat escalation, current-opponent gating, target-role, mechanical-coverage, and localization regression coverage.
- Revalidated the complete add-on against the actual Critical Forge `1.0.0-rc` pack, matcher, and Effect Engine contracts before packaging.

### Compatibility
- Existing 180 published card IDs remain unchanged; this build adds ten Surrounded Reflex IDs.
- Card, pack, effect, diagnostic, API, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.17

### Added
- Added the second ten-card **Surrounded, Still Standing** Fortitude pass, bringing the Fortitude deck to 20/30 cards and the theme to 60/120 cards.
- Added eight automated and two manual results focused on bracing, formation leverage, current-opponent counterpressure, Escape/Step recovery, and using threatening enemies as obstacles.
- Added one three-threat and one four-threat escalation card; the four-threat result additionally requires the current hostile source to be a counted melee threat.
- Added German and English localization for all ten cards and eight automated effects.

### Tests
- Added second-pass Fortitude count/content-batch, automation split, threat escalation, target-role, no-new-resistance/immunity-series, localization, and current-opponent gating coverage.
- Revalidated the complete add-on against the actual Critical Forge `1.0.0-rc` pack, matcher, and Effect Engine contracts before packaging.

### Compatibility
- Existing 170 published card IDs remain unchanged; this build adds ten Surrounded Fortitude IDs.
- Card, pack, effect, diagnostic, API, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.16

### Added
- Added the second ten-card **Surrounded, Still Standing** Attack pass, bringing the Attack deck to 20/30 cards and the theme to 50/120 cards.
- Added five ordinary critical-hit and five spell critical-hit results focused on formation geometry, bottlenecks, ring pressure, and tactical escape.
- Added six new target-centric results that require `surrounded.opponentIsThreatening == true`, plus two three-threat and two four-threat escalation cards.
- Added German and English localization for all ten cards and eight automated effects.

### Tests
- Raised the add-on suite to 107 tests with second-pass count, 10/10 Attack split, content-batch, manual/automated split, threat-gating, three/four-threat escalation, localization, and cross-theme duplication coverage.
- Revalidated the full add-on against the actual Critical Forge `1.0.0-rc` pack, matcher, and Effect Engine contracts before packaging.

### Compatibility
- Existing 160 published card IDs remain unchanged; this build adds ten Surrounded Attack IDs.
- Card, pack, effect, diagnostic, API, and extension-contract schema versions remain unchanged.

## 0.1.0-dev.15.1

### Reviewed
- Added `extensions.againstAllOdds.surrounded.opponentIsThreatening` so Surrounded cards can distinguish the current target/source from other melee threats in the ring.
- Added current-opponent threat evidence to the Condition Provider and Diagnostics payload.
- Bound eight target-centric Surrounded cards to the new opponent-threat condition so remote enemies are no longer treated as part of the encirclement.
- Reworked fifteen first-pass Surrounded automated effects while preserving every published card ID. Exact automated effect duplication with Bloodied Triumphs drops from 24/36 (66.7%) to 9/36 (25%).
- Reclassified **Three Blades, One Focus** as moderate and broadened it into a mixed attack/Perception formation-reading result.

### Tests
- Added opponent-threat identity tests for counted and out-of-reach scene threats plus explicit-count unknown-state coverage.
- Added Condition Provider coverage for the new boolean/evaluation fields.
- Added card-level regression coverage for all eight opponent-threat gates and a maximum 25% exact-effect duplication contract against Bloodied Triumphs.

### Compatibility
- All 160 published card IDs remain unchanged.
- Card, pack, effect, diagnostic, API, and extension-contract schema versions remain unchanged.
- Context Provider version advances additively to 1.1.0; no Critical Forge change or data migration is required.

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
