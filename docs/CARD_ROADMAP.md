# Card Roadmap

Against All Odds plans four themes and four specialized decks per theme.

| Theme | Attack | Fortitude | Reflex | Will |
|---|---:|---:|---:|---:|
| Bloodied Triumphs | 10 | 10 | 10 | 10 |
| Surrounded, Still Standing | 10 | 10 | 10 | 10 |
| Giant-Slayer Moments | 10 | 10 | 10 | 10 |
| Narrow Escapes | 10 | 10 | 10 | 10 |

The initial target is 160 cards. Cards will be introduced in reviewed batches rather than as one monolithic change.

## Planned sequence

1. Foundation and trigger smoke test.
2. Bloodied Triumphs: 40 cards.
3. Surrounded, Still Standing: 40 cards.
4. Giant-Slayer Moments: 40 cards.
5. Narrow Escapes: 40 cards.
6. Cross-pack balance and duplicate-concept review.
7. Localization, effect audit, diagnostic audit, and release candidate.

Every card will:

- use the matching specialized deck;
- include the corresponding dynamic `matched` condition;
- use the saving actor as positive recipient for save cards;
- use the hostile source as hostile target for save cards;
- remain diagnosable and simulatable through Critical Forge;
- receive tests for normalization, selection, targeting, and effect validity.
