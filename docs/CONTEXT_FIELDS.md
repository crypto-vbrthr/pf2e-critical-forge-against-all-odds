# Context Fields

The add-on publishes its runtime evidence below:

```text
extensions.againstAllOdds
```

## Bloodied Triumphs

```text
bloodied.matched
bloodied.hpRatio
bloodied.hpCurrent
bloodied.threshold
bloodied.defeated
```

The condition matches when the rolling actor has more than 0 HP, is not defeated, and its HP ratio is at or below the configured threshold. The default threshold is 0.5.

## Surrounded, Still Standing

```text
surrounded.matched
surrounded.count
surrounded.threshold
surrounded.evaluation
```

`count` is the Critical Forge battlefield result. The condition matches when the count reaches the configured threshold, default 2. A missing count remains `null` and does not become zero by assumption.


### Current opponent membership

```text
extensions.againstAllOdds.surrounded.opponentIsThreatening
extensions.againstAllOdds.surrounded.opponentThreatEvaluation
```

`opponentIsThreatening` is `true` only when the current `participants.target` matches a counted entry in Critical Forge's immutable `battlefield.hostileThreats` evidence. A matching rejected threat, such as an out-of-reach enemy, produces `false`. If only an explicit threat count is available and no per-token evidence exists, the value remains `null` rather than guessing.

The add-on compares actor and token UUID/ID references already present in the snapshot and never performs a second scene scan. This keeps card conditions, Diagnostics 2.0, snapshot replay, and the Card Editor on the same battlefield truth as Critical Forge.

## Giant-Slayer Moments

```text
giantSlayer.matched
giantSlayer.rollerLevel
giantSlayer.opponentLevel
giantSlayer.levelGap
giantSlayer.threshold
```

The level gap is always:

```text
opponent level - rolling actor level
```

For saving throws, Critical Forge already assigns the saving actor to `participants.source` and the hostile cause or caster to `participants.target`. The default threshold is +3.

## Narrow Escapes

```text
narrowEscape.matched
narrowEscape.score
narrowEscape.threshold
narrowEscape.componentIds
narrowEscape.components
narrowEscape.dc
```

The initial danger model is additive:

| Situation | Points |
|---|---:|
| Opponent 1–2 levels higher | 1 |
| Opponent at least 3 levels higher | 2 |
| HP ratio at most 50% | 1 |
| HP ratio at most 25% | 2 |
| Wounded 1 or higher | 1 |
| At least 2 threatening enemies | 1 |
| At least 4 threatening enemies | 2 |
| Attack, spell, or source has curse, death, disease, incapacitation, or poison | 1 |

Higher entries replace the lesser entry in the same category. The default matching threshold is 3. The DC is preserved as evidence but does not yet alter the score because no stable relative-DC baseline has been adopted.

This scoring model has no gameplay effect in `0.1.0-dev.1` because the module contains no cards yet. It can therefore be reviewed and adjusted before Narrow Escape cards are authored.

## Roll kind

```text
rollKind
```

Possible values are `attack`, `fortitude`, `reflex`, `will`, and `unknown`.
