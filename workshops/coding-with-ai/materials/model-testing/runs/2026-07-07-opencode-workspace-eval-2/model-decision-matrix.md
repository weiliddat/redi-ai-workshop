# Model decision matrix

Run ID: `2026-07-07-opencode-workspace-eval-2`

Verdicts are based on the main representative run using full project workspaces. They should be treated as provisional until finalist repeat runs and browser checks are complete.

| Model | Tool path | Setup | Workflow | Understanding | Debugging | Verification | Project memory | Implementation | Verdict | Notes |
| ----- | --------- | ----- | -------- | ------------- | --------- | ------------ | -------------- | -------------- | ------- | ----- |
| Codex GPT-5.5 (`codex__gpt-5.5`) | Codex CLI | Pass | Pass/caveat | Not tested | Pass | Pass | Not tested | Pass | Strong comparison baseline | 26/28 first turn. Browser checks blocked by environment, but G1/G2 tests and diffs were strong. |
| MiniMax M3 (`opencode-go/minimax-m3`) | OpenCode Go | Caveat | Pass | Not tested | Caveat, recovers | Pass | Not tested | Pass after G1 follow-up; G2 pass | Recommend provisionally | Best overall balance. Needs browser validation and repeat finalist runs. |
| MiMo V2.5 Pro (`opencode-go/mimo-v2.5-pro`) | OpenCode Go | Pass/caveat | Caveat | Not tested | Pass/caveat, recovers | Caveat, recovers | Not tested | Caveat; G1 recovers, G2 remains caveated | Usable with caveats | Strong first-turn score, but G2 timestamp implementation/test coverage stayed weak. |
| Big Pickle (`opencode/big-pickle`) | OpenCode default / Zen | Pass/caveat | Caveat | Not tested | Caveat; D3 recovers | Caveat; E1 recovers | Not tested | Caveat; G1 recovers, G2 caveat | Usable with caveats | Helpful but inconsistent; watch hallucinated causes and too-eager edits. |
| DeepSeek V4 Pro (`opencode-go/deepseek-v4-pro`) | OpenCode Go | Pass/caveat | Pass/caveat | Not tested | Mixed; D2 edited too early | Pass/caveat; E3 recovers | Not tested | G1 caveat, G2 fail | Do not use as default | Rerun completed, but G2 failed and follow-up hallucinated that server events lack timestamps. |
| MiMo V2.5 Free (`opencode/mimo-v2.5-free`) | OpenCode free | Pass/caveat | Caveat | Not tested | Caveat | Caveat, recovers | Not tested | Recovers on G1/G2 | Fallback only | Good recovery but too dependent on steering for default use. |
| DeepSeek V4 Flash Free (`opencode/deepseek-v4-flash-free`) | OpenCode free | Pass/caveat | Caveat | Not tested | Caveat | Caveat | Not tested | G1 caveat, G2 fail | Fallback only / do not use for implementation | Basic guidance is useful; implementation judgment failed timestamp source. |
| DeepSeek V4 Flash (`opencode-go/deepseek-v4-flash`) | OpenCode Go | Pass/caveat | Mixed | Not tested | Fail first turn but recovers | Mixed | Not tested | G1 caveat, G2 fail | Do not use as default | Repeated timestamp-source mistakes and edited during answer-only debugging prompts. |
| MiMo V2.5 (`opencode-go/mimo-v2.5`) | OpenCode Go | Pass/caveat | Mixed | Not tested | Weak | Mixed | Not tested | Caveat/fail | Do not use as default | Lowest first-turn score; missed fixtures and hallucinated likely causes. |

## Ranking for next-step testing

1. `opencode-go/minimax-m3`
2. `opencode-go/mimo-v2.5-pro`
3. `opencode/big-pickle`
4. `opencode/mimo-v2.5-free`
5. `opencode/deepseek-v4-flash-free`
6. `opencode-go/deepseek-v4-pro`
7. `opencode-go/deepseek-v4-flash`
8. `opencode-go/mimo-v2.5`

## Missing sections

Question sets C and F were not included in this run, matching the reduced question set given to every subagent. The `Project memory` column is therefore `Not tested` for all models.

## Harness comparison note

`codex__gpt-5.5` was added as a state-of-the-art harness/model comparison after the OpenCode candidate run. It is not an OpenCode student default candidate, but it is useful evidence that the eval tasks are not inherently too hard for a stronger coding harness/model.
