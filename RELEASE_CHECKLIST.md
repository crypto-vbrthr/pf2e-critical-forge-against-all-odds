# Release Checklist

- [x] Manifest, package, and runtime versions match.
- [x] Critical Forge dependency is declared.
- [x] Four theme packs register through the bound extension API.
- [x] Every theme exposes Attack, Fortitude, Reflex, and Will deck slots.
- [x] Context Provider delegates explicitly to `core-pf2e`.
- [x] Condition Provider fields are namespaced and typed.
- [x] Diagnostic Provider output is serializable.
- [x] Registration rollback is tested.
- [x] Settings refresh uses owned pack replacement.
- [x] German and English localization keys are identical.
- [x] All tests pass.
- [x] JavaScript syntax check passes.
- [x] Archive contains one top-level module directory.
- [ ] Foundry smoke test: all four protected packs visible.
- [ ] Foundry smoke test: context fields visible in the Card Editor.
- [ ] Foundry smoke test: Against-All-Odds evidence visible in Diagnostics 2.0.
