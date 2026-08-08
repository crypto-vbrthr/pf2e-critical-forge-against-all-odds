# Architecture

Against All Odds is a pure Critical Forge extension. It owns content and theme evaluation while Critical Forge continues to own PF2e message interpretation, immutable snapshots, condition evaluation, deck resolution, weighted selection, card presentation, effect validation, application, and diagnostics.

## Registration lifecycle

1. Foundry loads the module and registers world settings during `init`.
2. Critical Forge emits `pf2eCriticalForgeReady`.
3. Against All Odds obtains a module-bound Extension Controller.
4. The controller verifies module, API, schema, capability, and extension-contract requirements.
5. The add-on registers one Context Provider, one Condition Provider, one Diagnostic Provider, and four card packs.
6. A registration error invokes `unregisterAll()` as best-effort rollback.

## Context delegation

The add-on Context Provider has priority 100, but it does not duplicate the PF2e adapter. It explicitly delegates every input to:

```text
pf2e/core-pf2e
```

It clones the returned serializable report, adds `extensions.againstAllOdds`, changes the snapshot provider identity, and returns a newly frozen report. This preserves Critical Forge fixes and future PF2e adapter improvements. Current-opponent threat membership is derived once from the already captured `battlefield.hostileThreats` actor/token identities and reused by both Surrounded and Giant-Slayer. Giant-Slayer also compares the existing `participants.source.size` and `participants.target.size` snapshot values to publish a normalized size relation. No Foundry document is retained and no second scene scan occurs.

## Ownership

All packs and providers are registered through the controller bound to `pf2e-critical-forge-against-all-odds`. The add-on cannot replace or remove resources belonging to Critical Forge, world-managed packs, or other extensions.

## Pack replacement

World settings that enable or disable a theme rebuild all four pack definitions and atomically replace only the add-on's existing packs. Threshold changes are read live by the Context Provider; pack replacement is still safe and keeps the editor state synchronized.


## Card content

Playable cards are immutable schema-1 definitions below `scripts/data/cards/`. The shared card factory supplies complete filter arrays, theme-specific dynamic conditions, localization paths, deck assignment, Effect Definition schema 2 wrappers, and stable metadata. Theme pack construction only places those definitions into the appropriate specialized deck.

Bloodied Triumphs, Surrounded, Still Standing, and Giant-Slayer Moments are complete at 120 stable-ID cards each across their four specialized deck files. Narrow Escapes now contains first-pass Attack, Fortitude, and Reflex decks at ten cards each in their dedicated card files, all wired through the shared factory and their matching specialized decks. Card filters and additive condition groups can bind specialized results to triggering traits, threat-count thresholds, current-opponent threat membership, level-gap escalation, participant size relations, or Narrow Escape danger-score escalation.
