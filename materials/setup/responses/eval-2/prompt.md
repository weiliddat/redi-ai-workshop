# Eval 2: Explanation Quality

Test whether each model can explain concepts correctly when students ask follow-up questions during sections 04 and 05.

## Setup

For **conceptual** and **debugging** prompts, send each prompt on its own — no prior context needed.

For **code explanation** prompts, first paste a working chat client from Eval 1 (use the ChatGPT output as the baseline), then ask the follow-up question.

For **feature extension** prompts, paste the same working client and the extended API spec from section 05.

---

## Prompts

### Conceptual questions

Send each as a standalone message:

**C1:**
> What is a WebSocket? How is it different from a normal HTTP request?

**C2:**
> What is a callback function? Why do I pass a function to `ws.onmessage` instead of just writing the code directly?

**C3:**
> What is JSON and why do we use `JSON.parse` instead of just reading the string?

---

### Code explanation

Paste the working chat client first, then ask:

**E1:**
> Walk me through what happens line by line when a message arrives

**E2:**
> What would break if I removed the `onmessage` handler?

**E3:**
> Why do we need `JSON.stringify` when sending a message? Can't I just send the object directly?

---

### Debugging

Send each as a standalone message:

**D1:**
> I'm getting `WebSocket connection to 'ws://localhost:3000' failed` in the browser console. What does this mean?

**D2:**
> My code connects but I don't see any messages. What could be wrong?

**D3:**
> I see `Uncaught SyntaxError: Unexpected token` in the console when a message arrives. What is happening?

---

### Feature extension

Paste the working chat client and the extended API spec below, then ask:

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

**F2:**
> How do I add a `/nick` command that changes my display name? Walk me through what needs to change.

---

## What to check

For each response, evaluate:

1. **Factually correct?** — This is the main risk with weaker models. Flag any confident wrong claims.
2. **Clear for a 6–12 month learner?** — Would someone who's been coding for 6–12 months follow this?
3. **Actually explains, or just restates the code?** — Does it teach the concept, or just narrate what the code does in slightly different words?
4. **Debugging: right cause?** — Does the model identify the actual likely cause, or hallucinate a plausible-sounding but wrong one?

## Pass criteria

Explanations should be correct and understandable. Minor imprecision is OK. Confidently wrong explanations are a deal-breaker — that's worse than a student not having access at all.
