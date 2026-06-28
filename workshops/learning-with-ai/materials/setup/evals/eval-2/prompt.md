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

Expected: The connection still works and you can still send messages, but incoming messages are silently ignored — the chat window stays empty. The baseline has no local echo, so the client shows nothing at all (not "you'd still see your own messages").

- **Pass:** Explains that send still works but nothing is ever displayed, since the only rendering path is inside `onmessage`.
- **Fail:** Claims you'd still see your own sent messages — the code has no local echo, so removing `onmessage` means zero messages displayed.

**E3:**

> Why do we need `JSON.stringify` when sending a message? Can't I just send the object directly?

Expected: `WebSocket.send()` accepts strings, Blobs, or ArrayBuffers. If you pass a plain JS object, it gets coerced to the string `"[object Object]"` — the call doesn't throw, it silently sends useless data. `JSON.stringify` serializes the object into a proper JSON string the server can parse back.

- **Pass:** Explains the `[object Object]` coercion and why the server can't parse it.
- **Pass:** Gets the core right (send needs a string, stringify preserves structure) even if it doesn't mention `[object Object]` by name.
- **Fail:** Claims `send()` throws a TypeError or is "impossible" with an object — it doesn't throw, it silently does the wrong thing. This is a confident factual error that would mislead a student debugging the issue.

---

### Debugging

D1 and D3 have specific errors with verifiable root causes. D4 is a harder discriminator — weak models tend to hallucinate the cause.

**D1:**

> I'm getting `WebSocket connection to 'ws://localhost:3000' failed` in the browser console. What does this mean?

Expected: The server isn't running or isn't listening on that port. This is a connection/environment problem, not a code bug.

**D3:**

> I see `Uncaught SyntaxError: Unexpected token` in the console when a message arrives. What is happening?

Expected: The context "when a message arrives" points to `JSON.parse()` failing because the server sent non-JSON data (plain text, HTML, empty string, etc.). This prompt is sent without the baseline code, so the model is answering generically.

- **Pass:** Identifies `JSON.parse` on non-JSON data as the primary/most likely cause, even if it lists other possibilities.
- **Pass:** Lists multiple causes but leads with `JSON.parse` and gives it appropriate weight as the most common scenario.
- **Fail:** Leads with unlikely causes (`eval()`, `innerHTML` injection, gzip) without first establishing `JSON.parse` as the most probable explanation. The student is told "when a message arrives" — `JSON.parse` should be the first thing checked, not buried under speculation.

**D4** (paste the baseline chat client, then ask):

> When I send a message, it appears twice in my chat window. Why?

Expected: The baseline code has no local echo — the submit handler calls `socket.send()` but never calls `addMessage()`. Messages only appear via `onmessage`. So seeing a message twice means the **server is sending it twice** (e.g., an explicit echo to the sender plus a broadcast that also includes the sender).

The model should read the code and notice the absence of local echo. Specifically:

- **Pass:** Reads the code, notes there's no local echo, and concludes the server must be sending the message twice.
- **Pass:** Mentions "local echo + server broadcast" as a common cause, but then reads the provided code, notices there's no local echo, and redirects to a server-side cause.
- **Fail:** Confidently claims the code adds the message locally on send — it doesn't.
- **Fail:** Says "the server broadcasts back to you" as the full explanation without recognizing that a single broadcast would only show it once, not twice.
- **Fail:** Invents a wrong cause (e.g., "the event listener is registered twice").

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

Expected: The baseline code already parses and displays timestamps — `const time = new Date(data.timestamp || Date.now()).toLocaleTimeString()` followed by `addMessage(\`[\${time}] ...\`)`. Timestamps are already showing.

- **Pass:** Notices timestamps are already implemented and says so upfront, then offers improvements (formatting, styling, new message types) as optional next steps.
- **Pass:** Acknowledges the existing implementation but suggests enhancements to the display — this is fine as long as it doesn't treat the feature as missing.
- **Fail:** Explains how to add timestamps from scratch without noticing they're already there. This means the model didn't read the code it was given.

**F2:**

> How do I add a `/nick` command that changes my display name? Walk me through what needs to change.

Expected: Three changes, all in the client: (1) detect `/nick <name>` in the message input before sending, (2) send `{"type":"nick","name":"..."}` instead of a regular message, (3) handle the incoming `"nick"` message type in `onmessage` to display the name change. The extended API spec provides the exact message shapes.

- **Pass:** Walks through the three steps using the existing message input and submit handler — no new UI needed.
- **Fail:** Adds a separate input field or UI for nick changes instead of intercepting `/nick` in the existing chat input.
- **Fail:** Gets the send/receive shapes wrong relative to the provided API spec (e.g., ignoring `oldName` in the display, treating the broadcast as a local-only confirmation).

---

## What to check

For each response:

1. **Factually correct?** — Flag any confident wrong claims. This is the main risk with weaker models.
2. **Clear for a 6–12 month learner?** — Would someone coding for 6–12 months follow this?
3. **Actually explains, or just restates the code?** — Does it teach the concept, or narrate what the code does in different words?
4. **Debugging: right cause?** — Does the model identify the actual likely cause, or hallucinate a plausible-sounding but wrong one?

## Pass criteria

Explanations should be correct and understandable. Minor imprecision is OK. Confidently wrong explanations are a deal-breaker.
