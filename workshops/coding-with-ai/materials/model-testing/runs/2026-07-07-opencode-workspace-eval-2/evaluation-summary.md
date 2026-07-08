# OpenCode workspace evaluation summary

Run ID: `2026-07-07-opencode-workspace-eval-2`
Date tested: 2026-07-07
OpenCode version: `1.17.15`

This run followed `workshops/coding-with-ai/materials/opencode-model-testing.md` using full disposable copies of the workshop chat client project. Each model ran the same question set: A1, A2, A3, B1, B2, B3, D2, D3, D4, E1, E2, E3, G1, and G2.

Each subagent received the same instructions except for `MODEL=`. OpenCode was given only the student-facing prompt plus workspace files. The guide, scores, question IDs, expected answers, model names, and benchmark language were not sent to OpenCode.

## Overall result

`codex` with `gpt-5.5` is the strongest harness/model comparison from this run. Among OpenCode candidates, `opencode-go/minimax-m3` remains the strongest candidate. It had the best combination of first-turn score, recoverability after realistic participant follow-up, correct fixture handling, and implementation quality.

No model was a clean pass. Every candidate needs facilitator review for at least one workshop-critical behavior. The common weak spots were:

- timestamp tasks: several models used browser/render time instead of the server event `timestamp`
- duplicate-name retry: several models let the user retry but lost the specific server error message
- debugging prompts: some models edited too early or gave plausible causes before checking the actual code
- verification prompts: some models said only `npm test` and missed browser checks
- fixture prompts: some models failed to read `message-times.diff` unless explicitly steered

## Model summaries

| Model | First-turn score | Recovery-adjusted notes | Summary |
| --- | ---: | --- | --- |
| `codex__gpt-5.5` | 26/28 | No follow-ups needed | Strongest run by a wide margin. Correctly handled D2/D3/D4, B3/E3 fixtures, and G1/G2 implementation with tests. Browser checks were attempted but blocked by environment. |
| `opencode-go/minimax-m3` | 20/28 | Recovered B2, D3, D4, and G1; G2 passed first turn | Best candidate. Good fixture handling and implementation. Needs browser validation and facilitator warning about generic first answers. |
| `opencode-go/mimo-v2.5-pro` | 21/28 | Recovered D3, E1, E3, and G1; G2 remained caveated | Strong but uneven. Higher first-turn score than MiniMax, but G2 used browser time first and still lacked timestamp test coverage after follow-up. |
| `opencode__deepseek-v4-flash-free` | 18/28 | Recovered B3 and D3; G2 did not recover | Useful for basic prompts, but failed the timestamp implementation requirement. Fallback only at best. |
| `opencode__big-pickle` | 17/28 | Recovered D3, E1, and G1 | Usable for some tasks, but hallucinated D3 first turn, missed E1 checks, and had too-eager behavior on D2. |
| `opencode-go/deepseek-v4-pro` | 17/28 | Recovered E1 and E3; D2 partial recovery; G2 did not recover | Usable for explanation/workflow prompts, but not recommended as default. It edited during D2 and confidently defended an incorrect G2 timestamp implementation. |
| `opencode__mimo-v2.5-free` | 16/28 | Recovered E1, E3, G1, and G2 | Good recovery on implementation, but needed too much steering and sometimes claimed checks without evidence. |
| `opencode-go/deepseek-v4-flash` | 16/28 | Best-after-follow-up 23/28, but B3 and G2 failed | Recovered many prompts, but repeated timestamp-source mistakes and edited during answer-only debugging prompts. |
| `opencode-go/mimo-v2.5` | 13/28 | Best-after-follow-up 19/28 | Weakest paid OpenCode Go candidate in this run. Missed fixtures, hallucinated D3, and needed too much facilitator correction. |

## Implementation checks

All final G1/G2 `npm test` checks reported by subagents passed, but that is not enough to accept the implementation results. Browser checks were not performed in this run.

Manual review should focus on:

1. G1 duplicate-name flow: WebSocket opens, server sends an error, socket closes, setup panel reappears, and the specific server error remains visible.
2. G2 timestamp display: uses the server event timestamp, has useful test coverage, and looks acceptable in the browser.
3. Answer-only debugging prompts: confirm whether the model edited too early.

## Important limitations

- D2, D3, and D4 were not repeated three times in this run.
- G1 and G2 were not repeated twice for finalists.
- Browser validation was not run.
- Some subagents used follow-ups when a first answer was close but incomplete, following the guide's participant-style recovery rule.
- The original `opencode-go/deepseek-v4-pro` artifacts were removed and rerun after abnormal hangs. The rerun completed without failed commands.
- `codex__gpt-5.5` used Codex CLI JSONL output, not OpenCode JSON output. The command pattern is recorded in `codex__gpt-5.5/metadata.md`.
