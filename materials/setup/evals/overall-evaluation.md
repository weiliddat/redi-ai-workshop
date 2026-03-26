# Overall Model Evaluation

Combined results from Eval 1 (code generation) and Eval 2 (explanation quality) to determine which models to recommend for the workshop chat client activity.

## What we tested

- **Eval 1 — Cold start task:** Can the model produce a working browser chat client from the API spec and a sample prompt?
- **Eval 2 — Explanation quality:** Does the model give accurate, clear explanations when students ask follow-up questions? The key risk: models that confidently give wrong answers — that's worse than no AI at all.

D4 and F1 are the hard discriminators in Eval 2. D4 tests whether the model reads the provided code and notices there's no local echo (instead of inventing a cause). F1 tests whether the model notices timestamps are already implemented (instead of explaining how to add them from scratch). Both catch models that don't read the code they're given.

## Combined Results

| Model | Eval 1 | Eval 2 | D4 | F1 | Verdict |
|---|---|---|---|---|---|
| ChatGPT (free web) | ✅ Cleanest output | 8/8 | ✅ | ✅ | ⭐ Recommend |
| Gemini (free web) | ✅ Pass (minor XSS caveat) | 8/8 | ✅ | ✅ | ⭐ Recommend |
| Step 3.5 Flash (free) | ✅ Pass | 7/8 | ✅ | ✅ | ⭐ Recommend |
| Claude (free web) | ⚠️ Over-engineered | 8/8 | ✅ | ✅ | Usable with caveats |
| MiniMax M2.5 (free) | ✅ Pass | 6/8 | ✅ | ❌ | Not recommended |
| MiniMax M2.7 (cheap) | ⚠️ Pass on retry | 7/8 | ❌ | ✅ | Not recommended |
| Nemotron 3 Super (free) | ✅ Pass | 6/8 | ❌ | ❌ | Not recommended |
| MiMo-V2-Flash (cheap) | ✅ Pass | 5/8 | ❌ | ❌ | Not recommended |
| GLM 4.7 Flash (cheap) | ❌ Fail both rounds | 7/8 | ✅ | ✅ | Not recommended |
| Qwen3.5 Flash (cheap) | ❌ Fail both rounds | 7/8 | ✅ | ✅ | Not recommended |

## Recommendations

### Recommend to students

These models passed both evals without major issues:

1. **ChatGPT** (free web) — Perfect on both evals. Cleanest code generation, no confident wrong answers. The safest choice.
2. **Gemini** (free web) — Perfect explanations, solid code gen. The XSS caveat (`innerHTML` with unsanitized data) won't matter in a controlled classroom but is worth noting.
3. **Step 3.5 Flash** (free on OpenRouter) — Strong on both evals. Only miss was E3 (claimed `send()` throws a TypeError with an object — it actually silently coerces to `"[object Object]"`). A single factual error in a less critical scenario.

### Usable with caveats

4. **Claude** (free web) — Explanations are flawless (8/8), but code gen is over-engineered: 350+ lines of CSS, external Google Fonts dependency, dark theme, and prompt violations. Students will spend more time reading CSS than JavaScript in sections 04/05. If students choose Claude, they should know the generated code will be harder to walk through.

### Not recommended

**Failed code generation (Eval 1):**

- **GLM 4.7 Flash** — Produced broken code in both rounds (inverted UI state, destructive DOM manipulation). Students would spend the entire exercise debugging instead of learning.
- **Qwen3.5 Flash** — Duplicate messages in Round 1, syntax error and double-name bug in Round 2. Neither output works without manual fixes.

**Failed explanation quality (Eval 2):**

- **Nemotron 3 Super** — Clean code gen but failed both hard discriminators. Fabricated a "local-echo line" that doesn't exist in the code (D4) and gave a nonsensical fix for timestamps that are already working (F1). Exactly the kind of confident wrong answer the workshop warns about.
- **MiMo-V2-Flash** — Solid code gen but worst explanation score (5/8). Confidently claimed the code adds messages locally on send (D4, it doesn't), rewrote working timestamps from scratch (F1), and led with unlikely causes for a common error (D3). A student relying on this model for help would be actively misled.
- **MiniMax M2.5** — Good code gen but missed F1 (told students to add timestamps that already exist) and E2 (claimed you'd still see your own messages without `onmessage`). The "didn't read the code" pattern is risky for students who can't yet verify the model's claims.
- **MiniMax M2.7** — Required a retry for working code gen. Failed D4 (claimed a single server broadcast causes duplicates, without recognizing that one broadcast = one message). The wrong mental model would mislead students debugging real issues.
