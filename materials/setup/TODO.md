# TODO: Verify Free Models for Workshop

Before recommending free models to students, we need to verify they can actually handle the workshop tasks well enough. This is a mini eval — not a formal benchmark, but enough to catch deal-breakers.

Status: Eval 1 and Eval 2 are complete. Remaining items are rollout decisions and workshop setup updates.

Store results in `materials/setup/evals/eval-N/` with:

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

Results written up in `materials/setup/evals/eval-1/evaluation.md`. Key findings added to teacher notes in `contents/02-hands-on-cold-start.md`.

### Pass criteria

The code should work on first or second try with minimal manual fixes. Students have 15 minutes and no prompting guidance — the model needs to get it mostly right from a simple prompt.

---

## Eval 2: Explanation quality (sections 04 and 05)

Can the model explain concepts correctly when students ask follow-up questions?

### Test prompts

Consolidated to prompts that actually discriminate between models. See `eval-2/prompt.md` for full details.

**Conceptual (sanity check):**

- [x] C2: "What is a callback function? Why do I pass a function to `ws.onmessage` instead of just writing the code directly?"

**Code explanation (paste the baseline client, then ask):**

- [x] E2: "What would break if I removed the `onmessage` handler?"
- [x] E3: "Why do we need `JSON.stringify` when sending a message? Can't I just send the object directly?"

**Debugging:**

- [x] D1: "I'm getting `WebSocket connection to 'ws://localhost:3000' failed` in the console. What does this mean?"
- [x] D3: "I see `Uncaught SyntaxError: Unexpected token` when a message arrives. What is happening?"
- [x] D4: "When I send a message, it appears twice in my chat window. Why?" (paste baseline client — harder discriminator, weak models hallucinate the cause)

**Feature extension (paste baseline client + extended API spec):**

- [x] F1: "How do I show a timestamp next to each message? Explain each step." (trap: baseline already formats timestamps)
- [x] F2: "How do I add a `/nick` command that changes my display name? Walk me through what needs to change."

### What to check

- [x] Are the explanations **factually correct**? (This is the main risk with weaker models)
- [x] Are they **clear enough** for someone who's been coding for 6-12 months?
- [x] Do they **actually explain** or just restate the code in words?
- [x] For debugging: does the model identify the right cause, or hallucinate?

Results written up in `materials/setup/evals/eval-2/evaluation.md`. Combined recommendations are in `materials/setup/evals/overall-evaluation.md`.

### Pass criteria

Explanations should be correct and understandable. Minor imprecision is OK. Confidently wrong explanations are a deal-breaker — that's worse than a student not having access at all.

---

## Decision matrix

Completed from the combined Eval 1 + Eval 2 results:

| Model                   | Eval 1: Code works? | Eval 2: Explains correctly? | Recommend? |
| ----------------------- | ------------------- | --------------------------- | ---------- |
| MiniMax M2.5 (free)     | ✅ PASS             | 6/8                         | No         |
| Nemotron 3 Super (free) | ✅ PASS             | 6/8                         | No         |
| Step 3.5 Flash (free)   | ✅ PASS             | 7/8                         | Yes        |
| MiniMax M2.7            | ⚠️ PASS on retry    | 7/8                         | No         |
| GLM 4.7 Flash           | ❌ FAIL             | 7/8                         | No         |
| MiMo-V2-Flash           | ✅ PASS             | 5/8                         | No         |
| Qwen3.5 Flash           | ❌ FAIL             | 7/8                         | No         |
| Gemini (free)           | ✅ PASS             | 8/8                         | Yes        |
| ChatGPT (free)          | ✅ PASS             | 8/8                         | Yes        |
| Claude (free)           | ⚠️ FUNCTIONAL       | 8/8                         | Caveat     |

---

## General TODOs

### OpenRouter backup

- [x] Decide the role: OpenRouter is the backup path, not the default student tool
- [x] Update `materials/setup/openrouter-setup.md` with the validated OpenRouter model: `Step 3.5 Flash`
- [x] Add the OpenRouter backup path to participant comms
- [ ] Decide how to use the $100-200 budget — keep one paid fallback for teacher rescue if needed
- [ ] Test OpenRouter chat UI once end-to-end so we know the backup signup flow is smooth

### Student environment preflight

- [ ] Create a preflight checklist for students: verify browser opens a local HTML file, browser dev console works (F12), test a simple WebSocket connection
- [ ] Add preflight to pre-workshop comms

### Workshop server setup

- [x] Decide the workshop hosting approach: run the chat server locally and expose it with ngrok over `wss://`
- [x] Validate that the shared `wss://` URL works for the chat client
- [x] Test the server with multiple simultaneous connections
- [ ] Test server connectivity from a restricted network (e.g., mobile hotspot, corporate WiFi)
- [ ] Write down the backup plan if the server goes down during the workshop
- [ ] Before the workshop: start the server
- [ ] Before the workshop: confirm the URL works from a different network
- [ ] Before the workshop: prepare the connection URL to paste into Zoom chat

---

## After validation

Based on eval results, update:

- [x] `materials/setup/openrouter-setup.md` — fill in validated model names and backup role
- [x] `comms/participant-update-week-before.md` — replace the placeholder with tested model recommendations
- [x] `comms/participant-reminder-pre-workshop.md` — mention OpenRouter as the backup path
- [ ] Participant comms — add the preflight checklist
- [x] `requirements.md` — update the requirements to reflect the validated model list
- [x] `workshop.md` — reviewed; no tool-specific changes needed
- [x] `contents/` files — update sections that reference specific AI tools
