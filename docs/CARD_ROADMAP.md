# Card Roadmap

Against All Odds plans four themes and four specialized decks per theme. The target is 30 cards per specialized deck, introduced in three reviewed ten-card passes.

| Theme | Attack | Fortitude | Reflex | Will | Theme total |
|---|---:|---:|---:|---:|---:|
| Bloodied Triumphs | **30/30** | **30/30** | **30/30** | **30/30** | **120/120** |
| Surrounded, Still Standing | **30/30** | **30/30** | **30/30** | **30/30** | **120/120** |
| Giant-Slayer Moments | **30/30** | **30/30** | **30/30** | **30/30** | **120/120** |
| Narrow Escapes | **20/30** | **20/30** | **20/30** | **20/30** | **80/120** |

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
17. Review the 80-card Giant-Slayer milestone. **Complete in `0.1.0-dev.28.1`; all 320 published IDs are preserved, strict same-gate supersets are removed, PF2e condition/action interactions were rechecked, manual dead-result cases were tightened, and exact automated Giant-Slayer signatures remain unique.**
18. Giant-Slayer Moments final pass: 10 Attack, 10 Fortitude, 10 Reflex, and 10 Will cards. **Complete in `0.1.0-dev.29`; Giant-Slayer is now 120/120 with an 8 automated / 2 manual final batch in every deck, one final +4/+5 escalation pair per deck, reviewed threat/size/mental gates, and no new exact automated signatures.**
19. Final review of all 120 Giant-Slayer cards. **Complete in `0.1.0-dev.29.1`; all IDs and deck structures are preserved, the remaining Will near-duplicate is separated mechanically, German Remaster terminology is normalized, and the complete-set same-gate audit remains clean.**
20. Narrow Escapes Attack, first pass: 10 cards. **Complete in `0.1.0-dev.30`, with a 5/5 ordinary/spell split, 9 automated / 1 manual result, danger-score 4/5 escalation, and an attack-roll danger-model correction.**
21. Narrow Escapes Fortitude, first pass: 10 cards. **Complete in `0.1.0-dev.31`, with 9 automated / 1 manual result, danger-score 4/5 escalation, an incoming-poison gate, and saver-only positive targeting.**
22. Narrow Escapes Reflex, first pass: 10 cards. **Complete in `0.1.0-dev.32`, with 9 automated / 1 manual result, danger-score 4/5 escalation, an incoming-incapacitation gate, and saver-only positive targeting.**
23. Narrow Escapes Will, first pass: 10 cards. **Complete in `0.1.0-dev.33`, with 9 automated / 1 manual Seek result, danger-score 4/5 escalation, focused incoming fear/mental gates, and saver-only positive targeting.**
24. Narrow Escapes first 40-card review. **Complete in `0.1.0-dev.33.1`: all 40 IDs/mechanics preserved, 36 automated / 4 manual split confirmed, one score-4 and one score-5 escalation per deck confirmed, same-gate superset audit clean, and German `Zustandsbonus` terminology normalized.**
25. Narrow Escapes Attack, second pass: cards 11–20. **Complete in `0.1.0-dev.34`, with a 5/5 ordinary/spell split, 8 automated / 2 manual results, one additional score-4 and score-5 escalation, and exact-signature uniqueness preserved.**
26. Narrow Escapes Fortitude, second pass: cards 11–20. **Complete in `0.1.0-dev.35`, with 8 automated / 2 manual results, one additional score-4 and score-5 escalation, a focused incoming-death gate, saver-only positive targeting, and no resistance/immunity filler.**
27. Narrow Escapes Reflex, second pass: cards 11–20. **Complete in `0.1.0-dev.36`, with 8 automated / 2 manual results, one additional score-4 and score-5 escalation, saver-only automated targeting, Leap/Step and Tumble Through/Stride manual routes, and no resistance/immunity filler.**
28. Narrow Escapes Will, second pass: cards 11–20. **Complete in `0.1.0-dev.37`, with 8 automated / 2 manual results, one additional score-4 and score-5 escalation, focused incoming fear/mental gates, saver-only automated targeting, Step and Recall Knowledge manual routes, and no resistance/immunity filler.**
29. Review the first 80 **Narrow Escapes** cards for balance, overlap, danger-score scaling, targeting, terminology, and automation.
30. Continue the reviewed final passes for **Narrow Escapes**.
31. Perform cross-pack duplicate-concept, effect, localization, and diagnostic audits.

Bloodied Triumphs, Surrounded, Still Standing, and Giant-Slayer Moments are each complete at 120/120 cards after three reviewed passes and a final complete-set review. Against All Odds now contains 440/480 planned cards. Narrow Escapes Attack, Fortitude, Reflex, and Will are all at 20/30; the next content milestone is the 80-card Narrow Escapes review.

Every card will:

- use the matching specialized deck;
- include the corresponding dynamic `matched` condition;
- use the saving actor as positive recipient for save cards;
- use the hostile source as hostile target for save cards;
- remain diagnosable and simulatable through Critical Forge;
- receive tests for normalization, selection, targeting, localization, and effect validity.
