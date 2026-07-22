# Card Roadmap

Against All Odds plans four themes and four specialized decks per theme.

| Theme | Attack | Fortitude | Reflex | Will |
|---|---:|---:|---:|---:|
| Bloodied Triumphs | **10/10** | 0/10 | 0/10 | 0/10 |
| Surrounded, Still Standing | 0/10 | 0/10 | 0/10 | 0/10 |
| Giant-Slayer Moments | 0/10 | 0/10 | 0/10 | 0/10 |
| Narrow Escapes | 0/10 | 0/10 | 0/10 | 0/10 |

The initial target is 160 cards. Cards will be introduced in reviewed batches rather than as one monolithic change.

## Planned sequence

1. Foundation and trigger smoke test. **Complete.**
2. Bloodied Triumphs Attack deck: 10 cards. **Complete in 0.1.0-dev.3.**
3. Bloodied Triumphs save decks: 30 cards.
4. Surrounded, Still Standing: 40 cards.
5. Giant-Slayer Moments: 40 cards.
6. Narrow Escapes: 40 cards.
7. Cross-pack balance and duplicate-concept review.
8. Localization, effect audit, diagnostic audit, and release candidate.

Every card will:

- use the matching specialized deck;
- include the corresponding dynamic `matched` condition;
- use the saving actor as positive recipient for save cards;
- use the hostile source as hostile target for save cards;
- remain diagnosable and simulatable through Critical Forge;
- receive tests for normalization, selection, targeting, and effect validity.
