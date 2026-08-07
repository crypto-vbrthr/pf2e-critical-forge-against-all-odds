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

- twenty Surrounded, Still Standing Attack cards after two passes, split 10/10 between ordinary and spell critical hits;
- twenty Surrounded, Still Standing Fortitude cards after two passes with Fortitude save isolation, batch separation, current-opponent gating, and three/four-threat escalation;
- ten first-pass Surrounded, Still Standing Reflex cards with Reflex save isolation;
- ten first-pass Surrounded, Still Standing Will cards with Will save isolation;
- dynamic Surrounded gating plus three- and four-threat nested conditions across all four published Surrounded decks;
- current-opponent membership resolution from immutable `battlefield.hostileThreats` evidence, including counted, rejected, missing, and explicit-count-only cases;
- target-centric Surrounded cards requiring `surrounded.opponentIsThreatening == true`;
- a cross-theme regression contract limiting exact automated Surrounded/Bloodied effect duplication to 25%;
- Surrounded Will resolve, fear reversal, mental-defense, presence, target-role, and manual Demoralize coverage;
- Surrounded localization, saving-actor/hostile-source target roles, tone/impact, filter, and schema-2 effect contracts.

During development, the pack and provider definitions are additionally smoke-tested against the actual Critical Forge `1.0.0-rc` registries. The Foundry smoke test remains necessary because Foundry hook timing, world settings, protected editor rendering, and live diagnostic presentation cannot be reproduced completely by Node tests.

Current development baseline: 112 passing tests, with 99.34% line coverage in `npm run test:coverage`. The release also performs a direct validation pass against the Critical Forge RC pack and Effect Engine contracts before packaging.

- Surrounded Reflex two-pass count, save/deck isolation, dynamic gating, 3-/4-threat escalation, current-opponent threat membership, source/target roles, ring-geometry/mobility mechanics, and localization.
