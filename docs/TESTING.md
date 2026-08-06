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
- twenty unique Bloodied Triumphs Attack cards, split 10/10 between ordinary and spell critical hits;
- twenty unique Bloodied Triumphs Fortitude cards;
- twenty unique Bloodied Triumphs Reflex cards;
- ten unique Bloodied Triumphs Will cards;
- ten ordinary and ten spell critical-hit categories in the Attack deck;
- Fortitude, Reflex, and Will deck/category/save-filter isolation;
- saving-actor targeting for every automated Fortitude, Reflex, and Will boon;
- hostile-source targeting for both Will countershock cards;
- unique Fortitude, Reflex, and Will mechanical definitions, including second-pass regeneration and healing-received reinforcement;
- preservation of the reviewed first forty card IDs plus ten additive second-pass Attack IDs, ten additive second-pass Fortitude IDs, and ten additive second-pass Reflex IDs;
- reviewed first-pass Attack mechanics plus second-pass persistent damage, weakness, slowed, enfeebled, spell DC, stupefied, and movement-control coverage;
- poison, disease, mental, illusion, emotion, death, inhaled, and void trigger filters;
- the increased Second Pulse healing value and reduced Will immunity density;
- German Remaster terminology and reviewed German titles;
- Reflex movement, area-resistance, concealment, Acrobatics, AC, restraint protection, critical-hit resistance, persistent-damage resistance, Dexterity-based checks, attack momentum, and short-immunity coverage;
- Will defense, mental resistance, Perception, reduced immunity, contextual filtering, and hostile-countershock coverage;
- immutable Bloodied context conditions;
- complete filter sets and deck isolation;
- positive versus hostile effect targeting;
- supported Effect Engine component types;
- German and English card/effect localization coverage.

During development, the pack and provider definitions are additionally smoke-tested against the actual Critical Forge `1.0.0-rc` registries. The Foundry smoke test remains necessary because Foundry hook timing, world settings, protected editor rendering, and live diagnostic presentation cannot be reproduced completely by Node tests.

Current development baseline: 59 passing tests. The release also performs a direct validation pass against the Critical Forge RC pack and Effect Engine contracts before packaging.
