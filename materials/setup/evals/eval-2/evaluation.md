# Eval 2: Explanation Quality — Results

Tests whether each model gives accurate, clear explanations when students ask follow-up questions. The key risk: models that confidently give wrong answers — that's worse than no AI at all.

## Summary Table

| Model             | C2  | E2  | E3  | D1  | D3  | D4  | F1  | F2  | Score |
| ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | ----- |
| chatgpt-5.3       | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | 8/8   |
| claude-sonnet-4.6 | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | 8/8   |
| gemini-3-flash    | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | 8/8   |
| qwen3.5-flash     | ✅  | ✅  | ✅  | ✅  | ❌  | ✅  | ✅  | ✅  | 7/8   |
| step-3.5-flash    | ✅  | ✅  | ❌  | ✅  | ✅  | ✅  | ✅  | ✅  | 7/8   |
| glm-4.7-flash     | ✅  | ✅  | ❌  | ✅  | ✅  | ✅  | ✅  | ✅  | 7/8   |
| minimax-m2.7      | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ✅  | ✅  | 7/8   |
| minimax-m2.5      | ✅  | ❌  | ✅  | ✅  | ✅  | ✅  | ❌  | ✅  | 6/8   |
| nemotron-3-super  | ✅  | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ✅  | 6/8   |
| mimo-v2-flash     | ✅  | ✅  | ✅  | ✅  | ❌  | ❌  | ❌  | ✅  | 5/8   |

## Detailed Commentary

### chatgpt-5.3 — 8/8

- **C2**: ✅ — Good callback explanation with phone-number analogy. Appropriate for the audience.
- **E2**: ✅ — Correctly identifies no local echo; client becomes "write-only."
- **E3**: ✅ — Correctly explains `[object Object]` coercion and why the server can't parse it. Minor hedge about "throw an error" but leads with the right answer.
- **D1**: ✅ — Leads with server not running. Correctly frames as environment problem.
- **D3**: ✅ — Leads with `JSON.parse` on non-JSON data. Clear examples and debugging advice.
- **D4**: ✅ — Reads the code, notes no local echo, concludes server sends twice. Includes practical verification steps.
- **F1**: ✅ — Immediately recognizes timestamps are already implemented. Offers optional improvements.
- **F2**: ✅ — All three changes correct. Intercepts `/nick` in existing input, correct message shapes.

### claude-sonnet-4.6 — 8/8

- **C2**: ✅ — Restaurant analogy, clear sync vs async contrast. Well-pitched for the audience.
- **E2**: ✅ — Correctly states nothing displays. Calls it "typing into a void."
- **E3**: ✅ — Correctly explains `.toString()` → `"[object Object]"` coercion. No false TypeError claim.
- **D1**: ✅ — Leads with "server isn't running." Correct framing.
- **D3**: ✅ — Leads immediately with `JSON.parse` on non-JSON data.
- **D4**: ✅ — Correctly reads the code, notes no local echo, concludes server sends twice.
- **F1**: ✅ — Opens with "your code already receives timestamps and formats them."
- **F2**: ✅ — All three changes correct with matching API spec shapes.

### gemini-3-flash — 8/8

- **C2**: ✅ — Pizza-order analogy, A/B/C breakdown of async concepts. Clear and well-structured.
- **E2**: ✅ — Correctly states nothing displays, you're "deaf."
- **E3**: ✅ — Correctly explains `[object Object]` coercion via `.toString()`. No false claims.
- **D1**: ✅ — Leads with server not running. Some noise with Vite/HMR details but core is correct.
- **D3**: ✅ — Opens with `JSON.parse` on non-JSON data with concrete example.
- **D4**: ✅ — Notes no local echo in submit handler. Slightly messy framing about "server broadcasting back" but self-corrects to conclude server sends twice.
- **F1**: ✅ — Recognizes existing timestamp implementation. Suggests cosmetic improvements only.
- **F2**: ✅ — All three changes present with correct message shapes.

### qwen3.5-flash — 7/8

- **C2**: ✅ — Good "why" structure. Slightly misleading fake polling API but core concept is well taught.
- **E2**: ✅ — Correctly states messages "vanish into the void." Enumerates what's lost.
- **E3**: ✅ — Gets the core right: `[object Object]` coercion. No false TypeError claim.
- **D1**: ✅ — Leads with server not running. Some unnecessary complexity but correct.
- **D3**: ❌ — Leads with `eval()` and `new Function()` as primary causes, burying `JSON.parse` as the third item. Would send a learner down the wrong path.
- **D4**: ✅ — Correctly reads the code, identifies no local echo, concludes server sends twice.
- **F1**: ✅ — Immediately recognizes timestamps are already implemented.
- **F2**: ✅ — All three changes correct. Handles multi-word names and local state sync.

### step-3.5-flash — 7/8

- **C2**: ✅ — Clear "executed later" framing with timeline visual and analogy. Verbose but correct.
- **E2**: ✅ — Correctly identifies `onmessage` as the only place `addMessage()` is called.
- **E3**: ❌ — Confidently claims `send()` throws a TypeError with an object. It doesn't — it silently coerces to `"[object Object]"`. Wrong mental model that would mislead a student debugging the issue.
- **D1**: ✅ — Leads with server not running. Correct framing.
- **D3**: ✅ — Opens with "trying to parse invalid JSON," focuses on `JSON.parse` as primary cause.
- **D4**: ✅ — Notes no local echo, concludes server sends twice.
- **F1**: ✅ — Immediately recognizes existing timestamp implementation.
- **F2**: ✅ — Correct approach with matching API spec shapes.

### glm-4.7-flash — 7/8

- **C2**: ✅ — Restaurant analogy, good blocking vs. non-blocking comparison.
- **E2**: ✅ — Correctly states nothing displays. Slightly ambiguous wording but doesn't claim local echo.
- **E3**: ❌ — Claims you "can actually send the object directly and it will often work" — wrong. Never mentions `[object Object]` coercion. Would actively mislead a learner into thinking omitting `JSON.stringify` is sometimes fine.
- **D1**: ✅ — Leads with server not running. Good debugging steps.
- **D3**: ✅ — Leads with `JSON.parse` on malformed JSON. Secondary causes are appropriately flagged.
- **D4**: ✅ — Correctly reads code, notes no local echo, concludes server sends twice.
- **F1**: ✅ — Opens with "the timestamp feature is already implemented."
- **F2**: ✅ — Correct interception in existing input with matching message shapes.

### minimax-m2.7 — 7/8

- **C2**: ✅ — Clear explanation with function reference vs. call contrast. Slightly long but well-structured.
- **E2**: ✅ — Correctly states nothing displays. Notes "absolutely no feedback."
- **E3**: ✅ — Core is correct (send needs strings, JSON.stringify converts). Table slightly implies failure rather than silent coercion, but not a hard fail.
- **D1**: ✅ — Correct diagnosis. Extremely verbose (Docker, nginx, IPv6) but core is right.
- **D3**: ✅ — Leads with `JSON.parse` on non-JSON data. Practical debugging steps.
- **D4**: ❌ — Claims a single server broadcast back to you causes the duplicate. Doesn't recognize that one broadcast = one display (no local echo). Offers a wrong fix (filter out your own messages). Fails to identify the actual cause: server sending twice.
- **F1**: ✅ — Opens with "your code already displays timestamps."
- **F2**: ✅ — All three changes correct with right message shapes.

### minimax-m2.5 — 6/8

- **C2**: ✅ — Clear analogies, table of familiar callback patterns. Good depth for the audience.
- **E2**: ❌ — Summary says you'd still "show only the messages you yourself have typed." The code has no local echo — nothing would appear. Contradicts its own earlier analysis.
- **E3**: ✅ — Correctly explains `.toString()` → `"[object Object]"` coercion. No false TypeError.
- **D1**: ✅ — Correct framing as connection/environment problem.
- **D3**: ✅ — Leads with `JSON.parse` on non-JSON data. Practical debugging flow.
- **D4**: ✅ — Correctly reads code, notes no local echo, concludes server sends twice.
- **F1**: ❌ — Provides a full "add timestamps from scratch" guide without noticing they're already implemented. Would waste a learner's time.
- **F2**: ✅ — Correctly implements all three required changes with matching API spec.

### nemotron-3-super — 6/8

- **C2**: ✅ — "Wrong way" vs "right way" comparison with restaurant pager analogy. Clear.
- **E2**: ✅ — Correctly notes "can talk but cannot listen." No false local echo claim.
- **E3**: ✅ — Correctly explains silent coercion to `"[object Object]"`. Clear table format.
- **D1**: ✅ — Correct diagnosis as environment issue.
- **D3**: ✅ — Leads with `JSON.parse()` on non-JSON data.
- **D4**: ❌ — Confidently claims the code has a "local-echo line somewhere else in your real code." The baseline code has NO local echo. Invents a cause that doesn't exist.
- **F1**: ❌ — Fabricates a nonsensical problem (claims `data.name` is the "recipient" and proposes changing it to `data.oldName`). Never notices timestamps are already implemented. Would actively confuse a learner.
- **F2**: ✅ — Correctly intercepts `/nick` in existing input with matching message shapes.

### mimo-v2-flash — 5/8

- **C2**: ✅ — Excellent analogies (restaurant, doorbell). Closure section slightly advanced but not harmful.
- **E2**: ✅ — Correctly identifies send works but nothing displays. No false local echo claim.
- **E3**: ✅ — Correctly explains `[object Object]` coercion. No TypeError claim.
- **D1**: ✅ — Leads with server not running. Socket.io mention is off-track but not misleading.
- **D3**: ❌ — Never identifies `JSON.parse` on non-JSON data as the primary cause. Leads with generic causes and includes non-English text fragment, suggesting poor output quality.
- **D4**: ❌ — Confidently claims "Client A adds the message to the UI" on send. The code has NO local echo. Exactly the kind of confident wrong answer that's worse than no AI.
- **F1**: ❌ — Rewrites timestamp implementation from scratch without noticing it already exists. Would lead a learner to unnecessarily rewrite working code.
- **F2**: ✅ — Provides `/nick` interception in existing input with correct message shapes (also offers separate UI as alternative, but the command approach is present).
