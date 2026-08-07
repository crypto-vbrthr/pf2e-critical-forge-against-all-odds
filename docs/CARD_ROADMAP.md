# Card Roadmap

Against All Odds plans four themes and four specialized decks per theme. The target is 30 cards per specialized deck, introduced in three reviewed ten-card passes.

| Theme | Attack | Fortitude | Reflex | Will | Theme total |
|---|---:|---:|---:|---:|---:|
| Bloodied Triumphs | **30/30** | **30/30** | **30/30** | **30/30** | **120/120** |
| Surrounded, Still Standing | **30/30** | **30/30** | **30/30** | **30/30** | **120/120** |
| Giant-Slayer Moments | **20/30** | **20/30** | **20/30** | **20/30** | **80/120** |
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
7. Surrounded final pass: 10 Attack, 10 Fortitude, 10 Reflex, and 10 Will cards. **Complete in `0.1.0-dev.20`; Surrounded is now 120/120.**
8. Giant-Slayer Moments Attack, first pass: 10 cards. **Complete in `0.1.0-dev.21`, with a 5/5 ordinary/spell split and +4/+5 level-gap escalation.**
9. Giant-Slayer Moments Fortitude, first pass: 10 cards. **Complete in `0.1.0-dev.22`, with 9 automated / 1 manual, +4/+5 escalation, and no resistance/immunity filler.**
10. Giant-Slayer Moments Reflex, first pass: 10 cards. **Complete in `0.1.0-dev.23`, with 9 automated / 1 manual, +4/+5 escalation, and no resistance/immunity filler.**
11. Giant-Slayer Moments Will first pass: 10 cards. **Complete in `0.1.0-dev.24`, with 9 automated / 1 manual, +4/+5 escalation, and no resistance/immunity filler.**
12. Review the first 40 Giant-Slayer cards before beginning pass two. **Complete in `0.1.0-dev.24.1`; physical counterplay now uses current-opponent threat membership, scale-specific cards use participant size relations, observer-relative concealment is manual, and Will context filters were tightened without changing IDs.**
13. Giant-Slayer Moments Attack, second pass: 10 cards. **Complete in `0.1.0-dev.25`, with a 5/5 ordinary/spell split, 8 automated / 2 manual results, one additional +4 and +5 escalation, and reviewed threat/size gates.**
14. Giant-Slayer Moments Fortitude, second pass: 10 cards. **Complete in `0.1.0-dev.26`, with 8 automated / 2 manual results, one additional +4 and +5 escalation, reviewed threat/size gates, and no resistance/immunity filler.**
15. Giant-Slayer Moments Reflex, second pass: 10 cards. **Complete in `0.1.0-dev.27`, with 8 automated / 2 manual results, one additional +4 and +5 escalation, reviewed threat/size-gap gates, and no resistance/immunity filler.**
16. Giant-Slayer Moments Will, second pass: 10 cards. **Complete in `0.1.0-dev.28`, with 8 automated / 2 manual results, one additional +4 and +5 escalation, reviewed mental/mindless gates, and no resistance/immunity filler.**
17. Review the 80-card Giant-Slayer milestone, then complete the final pass and repeat the process for **Narrow Escapes**.
18. Perform cross-pack duplicate-concept, effect, localization, and diagnostic audits.

Bloodied Triumphs and Surrounded, Still Standing are complete at 120/120 cards each after three reviewed passes. Giant-Slayer Moments has reached 80/120 cards: Attack, Fortitude, Reflex, and Will are all at 20/30 after their second passes. The next milestone is the dedicated 80-card review before any final-pass cards are added.

Every card will:

- use the matching specialized deck;
- include the corresponding dynamic `matched` condition;
- use the saving actor as positive recipient for save cards;
- use the hostile source as hostile target for save cards;
- remain diagnosable and simulatable through Critical Forge;
- receive tests for normalization, selection, targeting, localization, and effect validity.
