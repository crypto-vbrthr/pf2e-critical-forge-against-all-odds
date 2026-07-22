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
- ten unique Bloodied Triumphs Attack cards;
- ten unique Bloodied Triumphs Fortitude cards;
- ten unique Bloodied Triumphs Reflex cards;
- ten unique Bloodied Triumphs Will cards;
- five ordinary and five spell critical-hit categories;
- Fortitude, Reflex, and Will deck/category/save-filter isolation;
- saving-actor targeting for every automated Fortitude, Reflex, and Will boon;
- hostile-source targeting for both Will countershock cards;
- unique Fortitude, Reflex, and Will mechanical definitions;
- preservation of all forty published card IDs through the review patch;
- reviewed Attack mechanics for Strike damage, off-guard, Athletics/Intimidation, clumsy, and spell damage;
- poison, disease, mental, illusion, and emotion trigger-trait filters;
- the increased Second Pulse healing value and reduced Will immunity density;
- German Remaster terminology and reviewed German titles;
- Reflex movement, area-resistance, concealment, Acrobatics, AC, and short-immunity coverage;
- Will defense, mental resistance, Perception, reduced immunity, contextual filtering, and hostile-countershock coverage;
- immutable Bloodied context conditions;
- complete filter sets and deck isolation;
- positive versus hostile effect targeting;
- supported Effect Engine component types;
- German and English card/effect localization coverage.

During development, the pack and provider definitions are additionally smoke-tested against the actual Critical Forge `1.0.0-rc` registries. The Foundry smoke test remains necessary because Foundry hook timing, world settings, protected editor rendering, and live diagnostic presentation cannot be reproduced completely by Node tests.

Current development baseline: 46 passing tests with 98.85% measured line coverage.
