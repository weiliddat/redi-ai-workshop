# Recommended model

Run ID: `2026-07-07-opencode-workspace-eval-2`

## Provisional recommendation: `opencode-go/minimax-m3`

Use `opencode-go/minimax-m3` as the provisional default for the coding-with-AI workshop, pending finalist repeat runs and browser validation.

For a state-of-the-art comparison, `codex__gpt-5.5` scored much higher: 26/28 first turn with no follow-ups needed. This suggests the eval tasks are reasonable, not too hard in themselves. The OpenCode recommendation is still separate because Codex may not match the workshop's cost/access constraints.

Why:

- It had the best overall balance of correct workflow support and implementation quality.
- It handled the diff-review fixture well on the first turn.
- It passed G2 on the first turn with tests.
- It recovered G1 after a realistic participant-style follow-up, preserving the duplicate-name server error and passing tests.
- Its failures were mostly teachable workflow issues: generic first answers, imprecise browser-check wording, and needing a follow-up to inspect/validate.

## Required checks before finalizing

Before making this the final workshop default, rerun the finalist checks from the guide:

1. Run D2, D3, and D4 three times for `opencode-go/minimax-m3`.
2. Run G1 and G2 at least twice for `opencode-go/minimax-m3`.
3. Browser-test G1 with the real duplicate-name flow.
4. Browser-test G2 with real chat messages and confirm timestamp display is readable.
5. Compare against `opencode-go/mimo-v2.5-pro` if cost, speed, or access differs meaningfully.

## Backup choices

- `opencode-go/mimo-v2.5-pro`: strongest backup if MiniMax access or repeat runs disappoint. It recovered well, but the G2 timestamp implementation remained caveated.
- `opencode/big-pickle`: possible local/Zen fallback with facilitator guidance, but it was less reliable on debugging and verification prompts.
- `opencode/mimo-v2.5-free`: free fallback candidate if participants cannot use paid OpenCode Go. It needs more steering and should not be treated as the default if a paid candidate is available.

## Do not use as default from this run

- `opencode-go/deepseek-v4-pro`: rerun completed cleanly, but G2 failed the timestamp implementation and the follow-up hallucinated that server events lack timestamps.
- `opencode-go/deepseek-v4-flash`: repeated timestamp-source mistakes and edited during answer-only debugging prompts.
- `opencode-go/mimo-v2.5`: lowest first-turn score and too much facilitator correction required.
- `opencode/deepseek-v4-flash-free`: failed the G2 timestamp implementation and did not recover.
