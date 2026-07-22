# Card Roadmap

Against All Odds plans four themes and four specialized decks per theme. The target is 30 cards per specialized deck, introduced in three reviewed ten-card passes.

| Theme | Attack | Fortitude | Reflex | Will | Theme total |
|---|---:|---:|---:|---:|---:|
| Bloodied Triumphs | **10/30** | **10/30** | **10/30** | **10/30** | **40/120** |
| Surrounded, Still Standing | 0/30 | 0/30 | 0/30 | 0/30 | 0/120 |
| Giant-Slayer Moments | 0/30 | 0/30 | 0/30 | 0/30 | 0/120 |
| Narrow Escapes | 0/30 | 0/30 | 0/30 | 0/30 | 0/120 |

The full target is 480 cards. Cards are introduced in controlled batches rather than as one monolithic change.

## Completed sequence

1. Foundation and trigger smoke test. **Complete.**
2. Bloodied Triumphs Attack, first pass: 10 cards. **Complete in 0.1.0-dev.3.**
3. Bloodied Triumphs Fortitude, first pass: 10 cards. **Complete in 0.1.0-dev.4.**
4. Bloodied Triumphs Reflex, first pass: 10 cards. **Complete in 0.1.0-dev.5.**
5. Bloodied Triumphs Will, first pass: 10 cards. **Complete in 0.1.0-dev.6.**

## Next content milestones

1. Review the first 40 Bloodied Triumphs cards for balance, overlap, targeting, and automation.
2. Add the second ten-card pass to Attack, Fortitude, Reflex, and Will.
3. Review the resulting 80-card Bloodied Triumphs pool.
4. Add the third ten-card pass to reach 30 cards per deck and 120 cards for the theme.
5. Repeat the three-pass process for Surrounded, Giant-Slayer, and Narrow Escapes.
6. Perform cross-pack duplicate-concept, effect, localization, and diagnostic audits.

Every card will:

- use the matching specialized deck;
- include the corresponding dynamic `matched` condition;
- use the saving actor as positive recipient for save cards;
- use the hostile source as hostile target for save cards;
- remain diagnosable and simulatable through Critical Forge;
- receive tests for normalization, selection, targeting, localization, and effect validity.
