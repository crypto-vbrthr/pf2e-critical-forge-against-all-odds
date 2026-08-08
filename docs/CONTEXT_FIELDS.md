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
giantSlayer.opponentIsThreatening
giantSlayer.opponentThreatEvaluation
giantSlayer.opponentSize
giantSlayer.sizeGap
giantSlayer.opponentIsLarger
giantSlayer.threshold
```

The level gap is always:

```text
opponent level - rolling actor level
```

For saving throws, Critical Forge already assigns the saving actor to `participants.source` and the hostile cause or caster to `participants.target`. The default threshold is +3.

### Threat and size evidence

`giantSlayer.opponentIsThreatening` reuses the exact same current-opponent membership result as Surrounded. It is derived from the already captured `battlefield.hostileThreats` evidence and therefore stays `null` when the snapshot cannot resolve membership rather than guessing. No second scene scan occurs.

`opponentSize` is normalized to PF2e snapshot slugs (`tiny`, `sm`, `med`, `lg`, `huge`, `grg`). `sizeGap` is the signed number of size steps between the rolling actor and opponent, and `opponentIsLarger` is `true` only for a positive gap. Missing or unknown participant sizes produce `null` for the relation fields. These values are evidence for scale-specific cards; Giant-Slayer itself still matches primarily by level gap.


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
| Incoming save context has curse, death, disease, incapacitation, or poison | 1 |

Higher entries replace the lesser entry in the same category. The default matching threshold is 3. On attack rolls, dangerous traits belonging to the acting hero's own attack are ignored so an offensive poison, death, or similar trait cannot inflate its own Narrow Escape score. On saving throws, dangerous incoming attack/spell trait evidence can still contribute. The DC is preserved as evidence but does not yet alter the score because no stable relative-DC baseline has been adopted.

This scoring model now drives the published Narrow Escape cards. The Attack first pass also uses `narrowEscape.score >= 4` and `>= 5` for two escalation results.

## Roll kind

```text
rollKind
```

Possible values are `attack`, `fortitude`, `reflex`, `will`, and `unknown`.
