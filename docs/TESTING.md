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
- twenty Giant-Slayer Attack cards after two passes, split 10/10 between ordinary and spell critical hits;
- ten first-pass Giant-Slayer Fortitude critical-success cards with matching save/deck isolation;
- ten first-pass Giant-Slayer Reflex critical-success cards with matching save/deck isolation;
- the dynamic Giant-Slayer gate on every published Giant-Slayer card;
- +4 and +5 level-gap escalation conditions in every first-pass Giant-Slayer deck, plus one additional +4 and +5 escalation in the second Attack pass;
- the first Attack pass keeps nine automated effects plus one manual result; the second Attack pass adds eight automated effects plus manual Tumble Through and ally-Step results; Fortitude and Will remain 9/1 and the reviewed Reflex pass remains 8/2;
- saver/source targeting for Fortitude and Reflex boons and explicit hostile-target roles for Giant-Slayer counterpressure;
- no resistance or immunity filler in the first Giant-Slayer Fortitude or Reflex pass or the second Giant-Slayer Attack pass;
- Giant-Slayer localization, tone/impact, immutable filter, and schema-2 effect contracts;
- exact automated-effect uniqueness for published Giant-Slayer cards against Bloodied, Surrounded, and earlier Giant-Slayer mechanics.
- Giant-Slayer current-opponent threat evidence reusing the immutable Battlefield snapshot, including remote/rejected opponents;
- canonical PF2e participant-size normalization, unknown-safe larger-opponent relations, and explicit `sizeGap >= 2` gating for second-pass scale geometry;
- physical Fortitude/Reflex counterplay requiring the actual threatening opponent;
- observer-relative concealed remaining manual rather than becoming a global actor condition;
- mental Giant-Slayer Will filtering and mindless-target exclusions.

During development, the pack and provider definitions are additionally smoke-tested against the actual Critical Forge `1.0.0-rc` registries. The Foundry smoke test remains necessary because Foundry hook timing, world settings, protected editor rendering, and live diagnostic presentation cannot be reproduced completely by Node tests.

Current `0.1.0-dev.25` baseline: **167/167 tests**, **99.45% line coverage**, **94.25% branch coverage**, and **98.44% function coverage**. The current build contains **290 published cards and 251 automated card effects**. The package-local release and schema checks cover all add-on contracts available in this workspace; the direct integration smoke test against the actual Critical Forge `1.0.0-rc` pack validator should be repeated in the integrated Critical Forge/Foundry workspace before tagging. Existing matcher regression coverage still verifies that remote sources cannot trigger physical Giant-Slayer counterplay, same-size bosses do not receive scale-only cards, larger bosses do, and mental Will results require the matching context.

