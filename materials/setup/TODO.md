# TODO: Verify Free Models for Workshop

Before recommending free models to students, we need to verify they can actually handle the workshop tasks well enough. This is a mini eval — not a formal benchmark, but enough to catch deal-breakers.

Store results in `materials/setup/responses/eval-N/` with:

- `prompt.md` — the prompt used
- One response file per model (e.g., `chatgpt-free.html`)
- `evaluation.md` — per-model breakdown of results

---

## Models to test

Free on OpenRouter:

- [x] MiniMax M2.5
- [x] Nemotron 3 Super
- [x] Step 3.5 Flash

Cheap on OpenRouter:

- [x] MiniMax M2.7
- [x] GLM 4.7 Flash
- [x] MiMo-V2-Flash
- [x] Qwen3.5 Flash

Free-tier web chat (for comparison):

- [x] Gemini (gemini.google.com, free tier)
- [x] ChatGPT (chatgpt.com, free tier)
- [x] Claude (claude.ai, free tier)

---

## Eval 1: Cold start task (section 02)

Can the model produce a working browser chat client from the API spec?

### Test prompt

Use the API spec and the sample prompt from `contents/02-hands-on-cold-start.md`.

### What to check

- [x] Does the generated code run without errors?
- [x] Does it connect to the WebSocket server?
- [x] Does it send and receive messages correctly?
- [x] Does it handle the JSON message format from the spec?
- [x] Does it work as a single HTML file with no install step?
- [x] Does it avoid frameworks and Socket.IO?
- [ ] Use `agent-browser` for browser control during this eval so the run steps are consistent and reproducible.

Results written up in `materials/setup/responses/eval-1/evaluation.md`. Key findings added to teacher notes in `contents/02-hands-on-cold-start.md`.

### Pass criteria

The code should work on first or second try with minimal manual fixes. Students have 15 minutes and no prompting guidance — the model needs to get it mostly right from a simple prompt.

---

## Eval 2: Explanation quality (sections 04 and 05)

Can the model explain concepts correctly when students ask follow-up questions?

### Test prompts

Consolidated to prompts that actually discriminate between models. See `eval-2/prompt.md` for full details.

**Conceptual (sanity check):**

- [ ] C2: "What is a callback function? Why do I pass a function to `ws.onmessage` instead of just writing the code directly?"

**Code explanation (paste the baseline client, then ask):**

- [ ] E2: "What would break if I removed the `onmessage` handler?"
- [ ] E3: "Why do we need `JSON.stringify` when sending a message? Can't I just send the object directly?"

**Debugging:**

- [ ] D1: "I'm getting `WebSocket connection to 'ws://localhost:3000' failed` in the console. What does this mean?"
- [ ] D3: "I see `Uncaught SyntaxError: Unexpected token` when a message arrives. What is happening?"
- [ ] D4: "When I send a message, it appears twice in my chat window. Why?" (paste baseline client — harder discriminator, weak models hallucinate the cause)

**Feature extension (paste baseline client + extended API spec):**

- [ ] F1: "How do I show a timestamp next to each message? Explain each step." (trap: baseline already formats timestamps)
- [ ] F2: "How do I add a `/nick` command that changes my display name? Walk me through what needs to change."

### What to check

- [ ] Are the explanations **factually correct**? (This is the main risk with weaker models)
- [ ] Are they **clear enough** for someone who's been coding for 6-12 months?
- [ ] Do they **actually explain** or just restate the code in words?
- [ ] For debugging: does the model identify the right cause, or hallucinate?

### Pass criteria

Explanations should be correct and understandable. Minor imprecision is OK. Confidently wrong explanations are a deal-breaker — that's worse than a student not having access at all.

---

## Decision matrix

After testing, fill in:

| Model                   | Eval 1: Code works? | Eval 2: Explains correctly? | Recommend? |
| ----------------------- | ------------------- | --------------------------- | ---------- |
| MiniMax M2.5 (free)     | ✅ PASS             |                             |            |
| Nemotron 3 Super (free) | ✅ PASS             |                             |            |
| Step 3.5 Flash (free)   | ✅ PASS             |                             |            |
| MiniMax M2.7            | ⚠️ PASS on retry    |                             |            |
| GLM 4.7 Flash           | ❌ FAIL             |                             |            |
| MiMo-V2-Flash           | ✅ PASS             |                             |            |
| Qwen3.5 Flash           | ❌ FAIL             |                             |            |
| Gemini (free)           | ✅ PASS             |                             |            |
| ChatGPT (free)          | ✅ PASS             |                             |            |
| Claude (free)           | ⚠️ FUNCTIONAL       |                             |            |

---

## General TODOs

### OpenRouter setup

- [ ] Pick one validated primary model + one backup model based on eval results
- [ ] Update `materials/setup/openrouter-setup.md` with the specific model names
- [ ] Decide how to use the $100-200 budget — one cheap paid model as emergency rescue for teacher/stuck students, rather than spreading across many options
- [ ] Test OpenRouter chat UI for setup friction: how long does sign-up → first message take for someone unfamiliar?
- [ ] Add OpenRouter setup to pre-workshop comms so students arrive with a working account, not setting up live

### Student environment preflight

- [ ] Create a preflight checklist for students: verify browser opens a local HTML file, browser dev console works (F12), test a simple WebSocket connection
- [ ] Add preflight to pre-workshop comms

### Server setup

- [ ] Evaluate running WebSocket server on `wss://` (port 443) instead of `ws://` on a custom port — some networks block non-standard ports or insecure WebSocket traffic
- [ ] Test server connectivity from a restricted network (e.g., mobile hotspot, corporate WiFi)

---

## After validation

Based on eval results, update:

- [ ] `materials/setup/openrouter-setup.md` — fill in validated model names
- [ ] `comms/participant-update-week-before.md` — add OpenRouter setup instructions and preflight checklist
- [ ] `requirements.md` — update student requirements to reflect OpenRouter as primary tool
- [ ] `workshop.md` — adjust any tool references if needed
- [ ] `contents/` files — update any sections that reference specific AI tools
