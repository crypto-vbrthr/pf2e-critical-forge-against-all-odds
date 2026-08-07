# Card Roadmap

Against All Odds plans four themes and four specialized decks per theme. The target is 30 cards per specialized deck, introduced in three reviewed ten-card passes.

| Theme | Attack | Fortitude | Reflex | Will | Theme total |
|---|---:|---:|---:|---:|---:|
| Bloodied Triumphs | **30/30** | **30/30** | **30/30** | **30/30** | **120/120** |
| Surrounded, Still Standing | **20/30** | **20/30** | **20/30** | **20/30** | **80/120** |
| Giant-Slayer Moments | 0/30 | 0/30 | 0/30 | 0/30 | 0/120 |
| Narrow Escapes | 0/30 | 0/30 | 0/30 | 0/30 | 0/120 |

The full target is 480 cards. Cards are introduced in controlled batches rather than as one monolithic change.

## Completed sequence

1. Foundation and trigger smoke test. **Complete.**
2. Bloodied Triumphs Attack, first pass: 10 cards. **Complete in 0.1.0-dev.3.**
3. Bloodied Triumphs Fortitude, first pass: 10 cards. **Complete in 0.1.0-dev.4.**
4. Bloodied Triumphs Reflex, first pass: 10 cards. **Complete in 0.1.0-dev.5.**
5. Bloodied Triumphs Will, first pass: 10 cards. **Complete in 0.1.0-dev.6.**
6. Review the first 40 Bloodied Triumphs cards for balance, overlap, targeting, terminology, and automation. **Complete in 0.1.0-dev.6.1.**

## Next content milestones

1. Review the first 40 **Surrounded, Still Standing** cards for balance, overlap, targeting, threat scaling, and automation. **Complete in `0.1.0-dev.15.1`, including current-opponent threat membership and the 25% cross-theme duplicate ceiling.**
2. Surrounded Attack, second pass: 10 cards. **Complete in `0.1.0-dev.16`.**
3. Surrounded Fortitude, second pass: 10 cards. **Complete in `0.1.0-dev.17`.**
4. Surrounded Reflex, second pass: 10 cards. **Complete in `0.1.0-dev.18`.**
5. Surrounded Will, second pass: 10 cards. **Complete in `0.1.0-dev.19`.**
6. Review the first 80 **Surrounded, Still Standing** cards before the final passes. **Complete in `0.1.0-dev.19.1`; internal exact-effect duplication is now monitored and the two review adjustments preserve all card IDs.**
7. Repeat the process for **Giant-Slayer Moments** and **Narrow Escapes**.
8. Perform cross-pack duplicate-concept, effect, localization, and diagnostic audits.

Bloodied Triumphs is complete at 120/120 cards after three reviewed passes.

Every card will:

- use the matching specialized deck;
- include the corresponding dynamic `matched` condition;
- use the saving actor as positive recipient for save cards;
- use the hostile source as hostile target for save cards;
- remain diagnosable and simulatable through Critical Forge;
- receive tests for normalization, selection, targeting, localization, and effect validity.
