# Eval 2: Explanation Quality

Test whether each model gives accurate, clear explanations when students ask follow-up questions during sections 04 and 05.

The goal is to catch models that confidently give wrong answers — that's worse than no AI at all.

## Setup

For **conceptual** and **debugging** prompts (without code), send each prompt on its own — no prior context needed.

For **code explanation** and **debugging with code** prompts, first paste the baseline chat client, then ask the question.

For **feature extension** prompts, paste the baseline chat client and the extended API spec, then ask.

---

## Prompts

### Conceptual (sanity check)

Single check — callbacks are the most likely to get a subtly wrong or hand-wavy answer.

**C2:**

> What is a callback function? Why do I pass a function to `ws.onmessage` instead of just writing the code directly?

---

### Code explanation

Tests counterfactual reasoning and whether the model can correct a common misconception.

**E2:**

> What would break if I removed the `onmessage` handler?

**E3:**

> Why do we need `JSON.stringify` when sending a message? Can't I just send the object directly?

---

### Debugging

D1 and D3 have specific errors with verifiable root causes. D4 is a harder discriminator — weak models tend to hallucinate the cause.

**D1:**

> I'm getting `WebSocket connection to 'ws://localhost:3000' failed` in the browser console. What does this mean?

**D3:**

> I see `Uncaught SyntaxError: Unexpected token` in the console when a message arrives. What is happening?

**D4** (paste the baseline chat client, then ask):

> When I send a message, it appears twice in my chat window. Why?

Expected: The model should recognize that the server broadcasts messages back to the sender, so the client shows it once from the local echo and once from the server — or that there's no local echo and the server sends it back, depending on the code. A weak model might invent a wrong cause (e.g., "the event listener is registered twice").

---

### Feature extension

Paste the baseline chat client and the extended API spec below, then ask.

```
Additional Commands
===================

Change your display name (/nick):

  Client → Server:
    {"type": "nick", "name": "new-name"}

  Server → Client (broadcast to all):
    {"type": "nick", "oldName": "Alice", "name": "AliceNew", "timestamp": "2025-06-15T14:30:00Z"}

  The new name must also be unique. If it's taken:
    {"type": "error", "message": "name already taken"}

List connected users (/list):

  Client → Server:
    {"type": "list"}

  Server → Client (to you only):
    {"type": "list", "names": ["Alice", "Bob", "Charlie"], "timestamp": "2025-06-15T14:30:00Z"}

  The list includes your own name. Order is not guaranteed.
```

**F1:**

> How do I show a timestamp next to each message? Explain each step.

Note: The baseline code already formats timestamps. A good model should notice this and clarify what's already there vs. what needs to change.

**F2:**

> How do I add a `/nick` command that changes my display name? Walk me through what needs to change.

---

## What to check

For each response:

1. **Factually correct?** — Flag any confident wrong claims. This is the main risk with weaker models.
2. **Clear for a 6–12 month learner?** — Would someone coding for 6–12 months follow this?
3. **Actually explains, or just restates the code?** — Does it teach the concept, or narrate what the code does in different words?
4. **Debugging: right cause?** — Does the model identify the actual likely cause, or hallucinate a plausible-sounding but wrong one?

## Pass criteria

Explanations should be correct and understandable. Minor imprecision is OK. Confidently wrong explanations are a deal-breaker.
