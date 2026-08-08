# Testing

Run:

```bash
npm test
npm run test:coverage
npm run quality:check
```

The test suite covers:

- all four theme metrics and threshold boundaries;
- zero-HP exclusion for Bloodied Triumphs;
- missing battlefield data;
- save and attack roll-kind resolution;
- additive Narrow Escape evidence;
- context delegation to `core-pf2e`;
- immutable report enrichment;
- typed and unique Condition Provider fields;
- serializable Diagnostic Provider output;
- four packs and sixteen specialized deck slots;
- enabled-state mapping;
- extension-contract registration;
- capability rejection;
- owned-resource rollback;
- atomic pack refresh;
- settings registration and clamping;
- version metadata and localization parity;
- thirty unique Bloodied Triumphs Attack cards, split 15/15 between ordinary and spell critical hits;
- thirty unique Bloodied Triumphs Fortitude cards;
- thirty unique Bloodied Triumphs Reflex cards;
- thirty unique Bloodied Triumphs Will cards;
- fifteen ordinary and fifteen spell critical-hit categories in the Attack deck;
- Fortitude, Reflex, and Will deck/category/save-filter isolation;
- saving-actor targeting for every automated Fortitude boon and explicit hostile-source targeting for Reflex/Will countermoves;
- hostile-source targeting for all eight Will countershock cards;
- unique Fortitude, Reflex, and Will mechanical definitions, including second-pass regeneration and healing-received reinforcement;
- preservation of all first- and second-pass IDs plus forty additive final-pass IDs;
- final-pass weapon damage-type and spell-trait filtering for melee/ranged, bludgeoning, slashing, piercing, light, sonic, cold, electricity, and acid results;
- poison, disease, mental, illusion, emotion, death, inhaled, and void trigger filters;
- the increased Second Pulse healing value and reduced Will immunity density;
- German Remaster terminology and reviewed German titles;
- Reflex movement, area-resistance, concealment, Acrobatics, AC, restraint protection, critical-hit resistance, persistent-damage resistance, Dexterity-based checks, attack momentum, and short-immunity coverage;
- Will defense, mental resistance, Perception, reduced immunity, contextual filtering, and hostile-countershock coverage;
- immutable Bloodied context conditions plus additive quarter-health, wounded, and battlefield-threat condition groups;
- complete filter sets and deck isolation;
- positive versus hostile effect targeting;
- supported Effect Engine component types;
- German and English card/effect localization coverage.

- thirty Surrounded, Still Standing Attack cards after three passes, split 15/15 between ordinary and spell critical hits;
- thirty Surrounded Fortitude, Reflex, and Will cards with matching save/deck isolation;
- a stable 120-card Surrounded total with 100 automated and 20 manual results;
- final-pass batch `20` for all forty final Surrounded cards;
- exactly one new three-threat and one new four-threat escalation per final deck;
- final Fortitude, Reflex, and Will passes adding no resistance or immunity series;
- dynamic Surrounded gating plus nested three- and four-threat conditions across all four decks;
- current-opponent membership resolution from immutable `battlefield.hostileThreats` evidence, including counted, rejected, missing, and explicit-count-only cases;
- target-centric Surrounded cards requiring `surrounded.opponentIsThreatening == true`;
- a cross-theme regression contract limiting exact automated Surrounded/Bloodied effect duplication to 25%;
- an internal Surrounded duplicate-signature contract limiting exact automated duplicates to the two reviewed intentional pairs;
- review assertions for **Arc Through the Crowd** impact and **Four Steps, One Misstep** mechanics;
- final-pass manual movement, Shove/Escape, reaction-denial, ally-support, and formation-break results;
- Surrounded localization, source/target roles, tone/impact, filter, and schema-2 effect contracts.
- thirty Giant-Slayer Attack cards after three passes, split 15/15 between ordinary and spell critical hits;
- thirty Giant-Slayer Fortitude, Reflex, and Will critical-success cards after three passes with matching save/deck isolation;
- a complete 120-card Giant-Slayer set with 99 automated and 21 manual results;
- final content batch `29`, with eight automated and two manual results in each final deck;
- the dynamic Giant-Slayer gate on every published Giant-Slayer card;
- +4 and +5 level-gap escalation conditions across all three Giant-Slayer passes, ending with three +4 and three +5 escalation cards in every completed deck;
- the first Attack pass keeps nine automated effects plus one manual result; the second Attack pass adds eight automated effects plus manual Tumble Through and ally-Step results; the second Fortitude pass adds eight automated effects plus manual Shove and Escape/Step results; the second Reflex and Will passes each add eight automated and two manual results;
- saver/source targeting for Fortitude and Reflex boons and explicit hostile-target roles for Giant-Slayer counterpressure;
- no resistance or immunity filler in the final Giant-Slayer Fortitude, Reflex, or Will passes;
- Giant-Slayer localization, tone/impact, immutable filter, and schema-2 effect contracts;
- exact automated-effect uniqueness for all 120 Giant-Slayer cards against Bloodied, Surrounded, and one another;
- a strict same-gate mechanical-superset regression contract across the complete Giant-Slayer set;
- final manual Trip and Sense Motive cards preserving normal PF2e prerequisites/retry restrictions while explicitly overriding only what their card text grants.
- Giant-Slayer current-opponent threat evidence reusing the immutable Battlefield snapshot, including remote/rejected opponents;
- canonical PF2e participant-size normalization, unknown-safe larger-opponent relations, and explicit `sizeGap >= 2` gating for second-pass scale geometry;
- physical Fortitude/Reflex counterplay requiring the actual threatening opponent;
- observer-relative concealed remaining manual rather than becoming a global actor condition;
- mental Giant-Slayer Will filtering and mindless-target exclusions;
- the final 120-card Will counterpressure audit keeping Pressure Rebounds and Certainty Collapses Inward mechanically distinct;
- German Giant-Slayer Remaster terminology, including Kraftlos, Auf dem Falschen Fuß, and Größenkategorie.

- ten Narrow Escape Attack cards in content batch `30`, split 5/5 between ordinary and spell critical hits;
- ten Narrow Escape Fortitude cards in content batch `31`, isolated to critical Fortitude successes;
- ten Narrow Escape Reflex cards in content batch `32`, isolated to critical Reflex successes;
- ten Narrow Escape Will cards in content batch `33`, isolated to critical Will successes;
- the dynamic Narrow Escape gate on every published Narrow Escape card;
- nine automated and one manual result in each first-pass Narrow Escape deck;
- danger-score 4 and 5 escalation conditions in all four first-pass Narrow Escape decks;
- an incoming-poison filter for **The Toxin Loses the Race**, an incoming-incapacitation filter for **The Finishing Blow Misses**, and focused incoming fear/mental filters for the two matching Will cards without broad over-filtering on the remaining cards;
- saver/source targeting for every automated Narrow Escape Fortitude, Reflex, and Will result;
- exact automated-signature uniqueness across all published Narrow Escape effects and against all earlier Bloodied, Surrounded, and Giant-Slayer effects;
- attack-roll danger scoring excluding the acting hero's own dangerous offensive traits while preserving dangerous incoming save evidence;
- German and English Narrow Escape card/effect localization and reviewed Remaster terminology, including Zähigkeits-SG, Schnelle Heilung, Liegend, Aufstehen, Willens-SG, Furchteffekt, Mentalen Schaden, and the simple action Suchen;

During development, the pack and provider definitions are additionally smoke-tested against the actual Critical Forge `1.0.0-rc` registries. The Foundry smoke test remains necessary because Foundry hook timing, world settings, protected editor rendering, and live diagnostic presentation cannot be reproduced completely by Node tests.

Current `0.1.0-dev.33.1` baseline: **243/243 tests**, **99.49% line coverage**, **94.96% branch coverage**, and **98.88% function coverage**. The current build contains **400 published cards and 343 automated card effects**; Narrow Escapes contributes **40 cards, 36 automated effects, and 4 manual results** across all four specialized decks. All four first-pass decks keep exact automated signatures distinct from earlier published cards, Fortitude, Reflex, and Will preserve the saving actor as recipient for every positive automated effect, and the Attack danger-score regression guard continues to prevent the hero's own dangerous offensive traits from inflating Narrow Escape danger. The package-local release and schema checks cover all add-on contracts available in this workspace; the direct integration smoke test against the actual Critical Forge `1.0.0-rc` pack validator should be repeated in the integrated Critical Forge/Foundry workspace before tagging.

