# TODO: Verify Free Models for Workshop

Before recommending free models to students, we need to verify they can actually handle the workshop tasks well enough. This is a mini eval — not a formal benchmark, but enough to catch deal-breakers.

---

## Models to test

Free on OpenRouter:

- [ ] MiniMax M2.5
- [ ] Nemotron 3 Super
- [ ] Step 3.5 Flash

Cheap on OpenRouter:

- [ ] MiniMax M2.7
- [ ] GLM 4.7 Flash
- [ ] MiMo-V2-Flash
- [ ] Qwen3.5 Flash

Free-tier web chat (for comparison):

- [ ] Gemini (gemini.google.com, free tier)
- [ ] ChatGPT (chatgpt.com, free tier)
- [ ] Claude (claude.ai, free tier)

---

## Eval 1: Cold start task (section 02)

Can the model produce a working WebSocket chat client from the API spec?

### Test prompt

Paste the API spec from `contents/02-hands-on-cold-start.md` and add:

> "Use AI to build a chat client that connects to this server. You should be able to see messages and send your own."

### What to check

- [ ] Does the generated code run without errors?
- [ ] Does it connect to the WebSocket server?
- [ ] Does it send and receive messages correctly?
- [ ] Does it handle the JSON message format from the spec?
- [ ] Python and Node.js — test both

### Pass criteria

The code should work on first or second try with minimal manual fixes. Students have 15 minutes and no prompting guidance — the model needs to get it mostly right from a simple prompt.

---

## Eval 2: Explanation quality (sections 04 and 05)

Can the model explain concepts correctly when students ask follow-up questions?

### Test prompts

These simulate the kinds of questions students will ask during sections 04 and 05. Test each one and check correctness.

**Conceptual questions:**

- [ ] "What is a WebSocket? How is it different from a normal HTTP request?"
- [ ] "What does `async` mean in Python? Why do I need it for WebSockets?"
- [ ] "What is JSON and why do we use `json.loads` instead of just reading the string?"

**Code explanation (paste the generated client from Eval 1, then ask):**

- [ ] "Walk me through what happens line by line when a message arrives"
- [ ] "What would break if I removed the `await` on this line?"
- [ ] "Why do we need `json.dumps` when sending a message?"

**Debugging (use these common errors):**

- [ ] "I'm getting `ConnectionRefusedError: [Errno 111] Connection refused`. What does this mean?"
- [ ] "My code connects but I don't see any messages. What could be wrong?"
- [ ] "I see `json.decoder.JSONDecodeError`. What is happening?"

**Feature extension (section 05 retry task):**

- [ ] "How do I show a timestamp next to each message? Explain each step."
- [ ] "How do I add a `/nick` command that changes my display name? Walk me through what needs to change."

### What to check

- [ ] Are the explanations **factually correct**? (This is the main risk with weaker models)
- [ ] Are they **clear enough** for someone who's been coding for 6-12 months?
- [ ] Do they **actually explain** or just restate the code in words?
- [ ] For debugging: does the model identify the right cause, or hallucinate?

### Pass criteria

Explanations should be correct and understandable. Minor imprecision is OK. Confidently wrong explanations are a deal-breaker — that's worse than a student not having access at all.

---

## Eval 3: Rate limits under workshop load

Can free models handle 20 students chatting simultaneously for ~60 minutes?

- [ ] Check OpenRouter free model rate limits (per-user? per-IP? global?)
- [ ] Estimate messages per student: ~20-30 messages across sections 02, 04, 05
- [ ] Test: send 10 rapid messages in a row — does it throttle?
- [ ] If using OpenRouter chat UI: does each student's account get independent limits?

---

## Decision matrix

After testing, fill in:

| Model                   | Eval 1: Code works? | Eval 2: Explains correctly? | Eval 3: Rate limits OK? | Recommend? |
| ----------------------- | ------------------- | --------------------------- | ----------------------- | ---------- |
| MiniMax M2.5 (free)     |                     |                             |                         |            |
| Nemotron 3 Super (free) |                     |                             |                         |            |
| Step 3.5 Flash (free)   |                     |                             |                         |            |
| MiniMax M2.7            |                     |                             |                         |            |
| GLM 4.7 Flash           |                     |                             |                         |            |
| MiMo-V2-Flash           |                     |                             |                         |            |
| Qwen3.5 Flash           |                     |                             |                         |            |
| Gemini (free)           |                     |                             |                         |            |
| ChatGPT (free)          |                     |                             |                         |            |
| Claude (free)           |                     |                             |                         |            |

---

## Outcome

Based on results, update:

- [ ] `materials/setup/openrouter-setup.md` — adjust recommended models
- [ ] `comms/participant-update-week-before.md` — fill in the AI tool setup section
- [ ] `requirements.md` — finalize tool recommendations
