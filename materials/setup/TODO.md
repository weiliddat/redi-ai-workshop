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

Can the model produce a working browser chat client from the API spec?

### Test prompt

Use the API spec and the sample prompt from `contents/02-hands-on-cold-start.md`.

### What to check

Use `agent-browser` for browser control during this eval so the run steps are consistent and reproducible.

- [ ] Does the generated code run without errors?
- [ ] Does it connect to the WebSocket server?
- [ ] Does it send and receive messages correctly?
- [ ] Does it handle the JSON message format from the spec?
- [ ] Does it work as a single HTML file with no install step?
- [ ] Does it avoid frameworks and Socket.IO?

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

## Eval 3: Novice-shaped prompts

Students won't prompt cleanly. Test with messy, realistic prompts to see how models handle them.

### Test prompts

- [ ] "it works but i dont understand what await is here"
- [ ] "can you make this show when people join but keep my code"
- [ ] "why does it say refused??"
- [ ] "i changed something and now nothing works" (paste broken code)
- [ ] "what is this error" (paste just the traceback, no context)

### What to check

- [ ] Does the model ask clarifying questions or make reasonable assumptions?
- [ ] Does it give a useful answer despite the vague prompt?
- [ ] Does it avoid dumping a full rewrite when only a small fix is needed?
- [ ] Does it stay at the right level — not too advanced, not patronizing?

### Pass criteria

The model should handle messy prompts gracefully. It doesn't need to be perfect — but it should not hallucinate causes, give irrelevant answers, or overwhelm students with jargon.

---

## Eval 4: Conversation continuity (section 05)

The retry section depends on the model working with the student's existing code. Test whether the model can make small changes without rewriting everything.

### Test prompts

Paste a working chat client, then ask:

- [ ] "Add timestamps next to each message. Change as little as possible."
- [ ] "Add a /nick command. Don't rewrite the whole program — show only what changes and explain why."
- [ ] "Now also show a notification when someone joins. Keep my existing code."

Then test multi-turn continuity:

- [ ] After 3-4 exchanges, does the model still remember the original code?
- [ ] If you paste updated code, does it pick up from the new version correctly?
- [ ] Does it avoid contradicting its own earlier explanations?

### What to check

- [ ] Does it make **minimal, targeted changes** instead of full rewrites?
- [ ] Does it explain what changed and why?
- [ ] Does it maintain context across multiple messages?

### Pass criteria

The model should modify existing code incrementally and explain each change. Full rewrites on simple feature additions are a fail — students need to see what changed, not start over.

---

## Eval 5: Rate limits under workshop load

Can free models handle 20 students chatting simultaneously for ~60 minutes?

- [ ] Check OpenRouter free model rate limits (per-user? per-IP? global?)
- [ ] Estimate messages per student: ~20-30 messages across sections 02, 04, 05
- [ ] Test: send 10 rapid messages in a row — does it throttle?
- [ ] If using OpenRouter chat UI: does each student's account get independent limits?

---

## Decision matrix

After testing, fill in:

| Model                   | Eval 1: Code works? | Eval 2: Explains correctly? | Eval 3: Novice prompts? | Eval 4: Continuity? | Eval 5: Rate limits? | Recommend? |
| ----------------------- | ------------------- | --------------------------- | ----------------------- | ------------------- | -------------------- | ---------- |
| MiniMax M2.5 (free)     |                     |                             |                         |                     |                      |            |
| Nemotron 3 Super (free) |                     |                             |                         |                     |                      |            |
| Step 3.5 Flash (free)   |                     |                             |                         |                     |                      |            |
| MiniMax M2.7            |                     |                             |                         |                     |                      |            |
| GLM 4.7 Flash           |                     |                             |                         |                     |                      |            |
| MiMo-V2-Flash           |                     |                             |                         |                     |                      |            |
| Qwen3.5 Flash           |                     |                             |                         |                     |                      |            |
| Gemini (free)           |                     |                             |                         |                     |                      |            |
| ChatGPT (free)          |                     |                             |                         |                     |                      |            |
| Claude (free)           |                     |                             |                         |                     |                      |            |

---

## General TODOs

### OpenRouter setup

- [ ] Pick one validated primary model + one backup model based on eval results
- [ ] Update `materials/setup/openrouter-setup.md` with the specific model names
- [ ] Decide how to use the $100-200 budget — one cheap paid model as emergency rescue for teacher/stuck students, rather than spreading across many options
- [ ] Test OpenRouter chat UI for setup friction: how long does sign-up → first message take for someone unfamiliar?
- [ ] Add OpenRouter setup to pre-workshop comms so students arrive with a working account, not setting up live

### Student environment preflight

- [ ] Create a preflight checklist for students: verify Python or Node.js runs, install `websockets` (Python) or `ws` (Node), run a test script
- [ ] Consider providing a `requirements.txt` and/or `package.json` so install is one command
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
