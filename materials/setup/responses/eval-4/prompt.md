# Eval 4: Conversation Continuity

Test whether each model can work with a student's existing code across multiple turns — making small changes without rewriting everything.

## Setup

Start a new conversation. Paste the working chat client from Eval 1 as the first message with a brief intro: "Here is my working chat client."

Then send the prompts below **sequentially in the same conversation**, waiting for each response before sending the next.

Also paste the extended API spec (below) when sending T2.

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
```

---

## Prompts

**T1:**
> Add timestamps next to each message. Change as little as possible.

**T2:**

(Paste the extended API spec above along with this message)

> Add a /nick command. Don't rewrite the whole program — show only what changes and explain why.

**T3:**
> Now also show a notification when someone joins. Keep my existing code.

**T4:**

(After 3 turns of changes, check continuity by asking:)

> Can you show me the full updated code with all three changes?

**T5:**

(Paste a slightly modified version of the code — e.g., change a variable name or add a comment — then ask:)

> I made a small tweak. Can you add a /list command that shows all connected users? Here's the API for it:
>
> ```
> Client → Server:
>   {"type": "list"}
>
> Server → Client (to you only):
>   {"type": "list", "names": ["Alice", "Bob", "Charlie"], "timestamp": "2025-06-15T14:30:00Z"}
> ```

---

## What to check

For each response, evaluate:

1. **Minimal, targeted changes?** — Does it show only what changed, or does it rewrite the whole file?
2. **Explains what changed and why?** — Does the student know what was added and the reason for each change?
3. **Maintains context across turns?** — After 3–4 exchanges, does the model still track the original code and accumulated changes?
4. **Picks up new code correctly?** — When you paste updated code (T5), does it work from the new version, not an older one?
5. **No contradictions?** — Does it avoid contradicting its own earlier explanations?

## Pass criteria

The model should modify existing code incrementally and explain each change. Full rewrites on simple feature additions are a fail — students need to see what changed, not start over.
