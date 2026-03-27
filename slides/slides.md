---
theme: seriph
background: https://cover.sli.dev
title: "AI & Learning: Use AI Without Losing the Skills You're Building"
info: |
  ## ReDI AI Workshop
  A hands-on workshop on using AI effectively as a learning tool.
class: text-center
drawings:
  persist: false
transition: slide-left
duration: 120min
---

# AI & Learning

Use AI without losing the skills you're building

<div class="pt-12">
  <span class="px-2 py-1 rounded text-sm">
    ReDI School — AI Workshop
  </span>
</div>

<!--
Welcome everyone. This is our first time running this workshop — some things might be rough around the edges. Bear with us. Your feedback at the end will help us make it better.
-->

---

# Before we start

**You'll need:**

- Access to an AI chat tool — ChatGPT, Gemini, or Claude
- A modern browser (Chrome, Firefox, Edge)
- Know how to open the browser console (F12)
- VS Code (or any text editor) for editing files
- Keep your webcam on if possible

<v-click>

<div class="mt-8 p-4 bg-orange-500 bg-op-10 rounded">

⚠️ Due to the group size, we won't be able to help individuals one-on-one. If you get stuck during the hands-on parts, **go into a Zoom breakout room** and use AI to help you troubleshoot — that's part of the exercise.

</div>

</v-click>

---

# What AI is

AI coding tools — Claude, ChatGPT, Gemini — are language models.

They predict what text should come next based on patterns in training data.

<v-clicks>

- They do not **understand** code the way you will after practice
- They only know what you **give them** — your message, nothing else
- IDE tools (Copilot, Cursor) see more context, but still work from **guessing based on examples they've seen** — not understanding

</v-clicks>

<!--
They recognise patterns and generate plausible output. In a web chat, the AI sees your message and nothing else — not your project, not your screen, not what you tried before.
-->

---

# What AI is good at

<v-clicks>

- **Generating boilerplate** — scaffolding files, project structure
- **Looking up syntax** — "how do I write a for loop in JavaScript?"
- **Explaining concepts** — "what is a WebSocket?"
- **Translating formats** — JSON to JS objects, SQL to plain English
- **Spotting surface errors** — typos, missing brackets
- **Suggesting next steps** — "what should I do next?"

</v-clicks>

<div v-click class="mt-8 text-lg">

For things with known, repeatable answers — AI is fast and often correct.

</div>

---

# Where AI fails

<v-clicks>

- **Understanding your context** — doesn't know your project, constraints, or what you already tried
- **Knowing what it doesn't know** — gives confident answers even when wrong
- **Debugging complex logic** — guesses aren't reliable without understanding
- **Teaching you** — working code in your editor ≠ understanding why it works

</v-clicks>

<div v-click class="mt-8 text-lg font-bold">

AI does not check whether you learned anything. That part is on you.

</div>

---
layout: center
---

# Why how you use it matters

Two students. Same AI tool. Same task.

<v-clicks>

One pastes the task → gets code → runs it → moves on.
An hour later: can't modify it, can't explain it.

The other asks questions → builds piece by piece → asks AI to explain.
An hour later: can extend it, debug it, teach it.

**Same tool. Completely different result.**

</v-clicks>

<!--
The rest of this workshop is about that difference.
-->

---
layout: center
class: text-center
---

# Hands-On: Cold Start

Build a chat client with AI — no guidance on how

<div class="text-sm op-75 mt-4">~20 minutes</div>

---

# Your task

Use AI to build a browser chat client that connects to a WebSocket server.

**Requirements:**

- One self-contained `index.html` file
- Plain HTML, CSS, and JavaScript — no frameworks, no npm, no Socket.IO
- Use the browser's built-in `WebSocket` API
- You should be able to see messages and send your own

<div class="mt-4 p-4 bg-blue-500 bg-op-10 rounded">

You'll receive the **server URL** and **API spec** separately.

</div>

<!--
No guidance on _how_ to use AI. No prompting tips. Just the task. If students get stuck, repeat: "Make it a single HTML file using the browser's built-in WebSocket API. No frameworks, no npm, no Socket.IO."
-->

---
layout: two-cols
layoutClass: gap-16
---

# API Spec

Connect to: `wss://[server-url]?name=your-name`

**Send a message:**

```json
{"type": "message", "text": "your message"}
```

**Receive a message:**

```json
{"type": "message", "name": "sender",
 "text": "hello", "timestamp": "..."}
```

::right::

<div class="mt-12"></div>

**Someone joined:**

```json
{"type": "join", "name": "their-name",
 "timestamp": "..."}
```

**Someone left:**

```json
{"type": "leave", "name": "their-name",
 "timestamp": "..."}
```

**Error:**

```json
{"type": "error", "message": "error text"}
```

<!--
All events are broadcast to every connected client. All messages include a timestamp. Names must be unique.
-->

---
layout: center
---

# ⏱️ Go build it

You have **15 minutes**.

Use whatever AI tool you like.

<div class="mt-8 text-sm op-75">

We'll ask some questions when you're done.

</div>

---

# Let's talk about what you built

<v-clicks>

- **What is a WebSocket?** How is it different from a normal HTTP request?
- **What happens if the server disconnects?** Does your client notice?
- **How would you add timestamps** next to each message?
- **What happens if two people join with the same name?**
- **What does the server store about you?** What does your client store?

</v-clicks>

<div v-click class="mt-8 p-4 bg-orange-500 bg-op-10 rounded text-lg">

If you can't answer these — that's OK. That's the point.

The AI answered these questions before you had a chance to think about them.

</div>

<!--
Most won't be able to answer. This sets up the motivation for the research findings and the learning patterns.
-->

---
layout: center
class: text-center
---

# What the Research Shows

What happens when developers learn with AI?

<div class="text-sm op-75 mt-4">~12 minutes</div>

---

# The study

In early 2026, Anthropic (the company behind Claude) published a controlled study on AI and learning.

<v-clicks>

- **52 junior developers** with Python experience
- Task: learn a new, unfamiliar Python library and build something with it
- Half used AI. Half wrote code by hand.
- Afterwards, everyone took a comprehension quiz.

</v-clicks>

---
layout: center
---

# The result

<div class="text-5xl font-bold">

The AI group scored **17% lower**.

</div>

<v-clicks>

<div class="mt-8 text-xl">

50% average (AI) vs. 67% (hand-coding)

</div>

<div class="mt-4 text-xl">

Speed gain from AI? **~2 minutes.** Basically no meaningful advantage.

</div>

<div class="mt-4 text-lg op-80">

Not faster. Understood less.

</div>

</v-clicks>

---

# That was you, 20 minutes ago

<v-clicks>

1. Pasted the API spec into an AI tool
2. Got working code back
3. Ran it, connected, sent a message
4. Felt like you'd completed the task

</v-clicks>

<div v-click class="mt-8 text-lg">

Then the questions came — and most couldn't answer.

Not because you're not capable. Because the AI answered before you had a chance to think.

</div>

---

# Three patterns that hurt learning

<v-clicks>

**Giving AI the whole task** — paste → accept → move on. No thinking. Little retained.

**Giving up when it gets hard** — start with questions, but hand everything to AI when you get stuck. You stop engaging right when learning would happen.

**Asking AI to fix every error** — when something breaks, ask AI instead of reading the error yourself. The messages stop meaning anything.

</v-clicks>

<div v-click class="mt-4 op-80">

These aren't mistakes. They're the natural path of least resistance.

</div>

---
layout: center
---

# The key finding

**How** you interact with AI determines how much you retain — not **whether** you use it.

<v-click>

Participants who asked conceptual questions and wrote code themselves scored **highest** on the quiz.

They also finished **fastest**.

</v-click>

<v-click>

> "Cognitive effort — and even getting painfully stuck — is likely important for fostering mastery."

</v-click>

<!--
Important caveat: this is a strong signal, not a final verdict. The study used junior devs, measured short-term comprehension, and used a sidebar chat tool. The takeaway still holds — how you use AI while learning matters — but the research is early.
-->

---
layout: center
class: text-center
---

# How to Learn with AI

Four patterns that preserve learning

<div class="text-sm op-75 mt-4">~25 minutes — with live demos</div>

---

# The principle

AI is most useful when it **accelerates your understanding** — not when it replaces your thinking.

<v-click>

Every time AI generates code you don't understand, you've **borrowed** a solution without learning the skill.

It works today. Next week, in a slightly different context, you're stuck again.

</v-click>

<v-click>

<div class="mt-8 text-xl font-bold">

The goal is to stay in the driver's seat while using AI.

</div>

</v-click>

---

# Pattern 1: Conceptual Inquiry

Ask AI to explain concepts. Write the code yourself.

<div class="mt-4"></div>

<v-click>

❌ _"Write me a function that connects to a WebSocket"_

</v-click>

<v-click>

✅ _"What is a WebSocket and how is it different from a normal HTTP request?"_

</v-click>

<v-click>

Then build the connection yourself. Ask follow-ups when stuck on a specific step — not when you want to skip thinking.

</v-click>

<v-click>

<div class="mt-8 p-4 bg-green-500 bg-op-10 rounded">

**This was the highest-scoring and fastest pattern in the study.**

</div>

</v-click>

<!--
Demo: Open AI chat, ask "What is a WebSocket? How is it different from HTTP?" Read, then write connection code yourself. Get stuck, ask a specific follow-up. Two prompts, each building understanding — not one big "build me a client."
-->

---

# Pattern 2: Hybrid Code-Explanation

Ask for code **and** explanation together.

<div class="mt-4"></div>

<v-click>

❌ _"Give me the code to parse this JSON"_

</v-click>

<v-click>

✅ _"Show me how to parse this JSON and explain each step"_

</v-click>

<v-click>

Read the explanation. If something isn't clear, ask a follow-up.

Only move on when you can describe what each line does.

</v-click>

<!--
Demo: Ask "Show me how to send a message through a WebSocket in JavaScript, and explain each step." Highlight the explanation part. Then ask: "Why do I need to set ws.onmessage to a function? What happens if I leave it out?"
-->

---

# Pattern 3: Generation-then-Comprehension

Let AI generate the code, then ask it to teach you what it produced.

<div class="mt-4"></div>

<v-click>

After getting code, ask:

_"Walk me through what happens when a message arrives in this code"_

_"What would break if I removed this line?"_

</v-click>

<v-click>

<div class="mt-8">

You get the efficiency of AI generation, then immediately do the work of comprehension.

</div>

</v-click>

<!--
Demo: Ask AI to generate a message-sending function. Then immediately: "Walk me through what happens line by line when I call send_message." Then: "What would break if I removed the onmessage handler?" The code is written — the work is understanding it.
-->

---

# Pattern 4: Intentional Debugging

When something breaks, **read the error** before asking AI to fix it.

<div class="mt-4"></div>

<v-click>

❌ _"Fix this error"_

</v-click>

<v-click>

✅ _"I'm getting `WebSocket connection failed` in the console. What does this error mean? What are the likely causes?"_

</v-click>

<v-click>

Then try to fix it yourself. If still stuck, ask for a **hint** — not a solution.

</v-click>

<v-click>

<div class="mt-4 p-4 bg-orange-500 bg-op-10 rounded">

The **largest comprehension gap** in the study was on debugging questions. When AI fixes your errors for you, you lose the deepest learning moments.

</div>

</v-click>

<!--
Demo: Run code that produces "WebSocket connection failed". Instead of "fix this", ask "What does this error mean? Common causes?" Read, diagnose: "Server probably isn't running." Check and retry. 30 seconds of understanding vs. blind "fix this".
-->

---

# Prompting well

Good prompting is not magic words. It's asking questions that make you think.

<v-clicks>

**Be specific.** Vague questions → vague answers.

**Break it down.** One step at a time, then implement it.

**Ask for explanation.** "Write X" gets code. "Explain how X works, then show me" gets code you understand.

</v-clicks>

<!--
Example to show verbally: instead of "Fix my code", try "I'm getting 'Cannot read properties of undefined' on line 12. The variable is {"type": "join", "name": "Ali"} and I'm accessing data.text. What's happening?"
-->

---
layout: center
class: text-center
---

# ☕ Break

5 minutes — think about how you'll approach the retry differently.

---
layout: center
class: text-center
---

# Hands-On: Retry

Same task. New approach.

<div class="text-sm op-75 mt-4">~30 minutes</div>

---

# Your task: add a feature

Pick one and add it to your chat client:

<v-clicks>

- 🕐 **Show a timestamp** next to each message
- ✏️ **Add `/nick`** — change your display name
- 🔔 **Show notifications** when someone joins or leaves
- 📋 **Add `/list`** — show who's currently in the chat

</v-clicks>

<v-click>

<div class="mt-8 p-4 bg-blue-500 bg-op-10 rounded text-lg">

**This time, before you accept any code from AI, make sure you can explain what it does and why.**

</div>

</v-click>

---
layout: two-cols
layoutClass: gap-16
---

# Extended API Spec

**Change name (`/nick`):**

```json
// Client → Server
{"type": "nick", "name": "new-name"}

// Server → Client (broadcast)
{"type": "nick", "oldName": "Alice",
 "name": "AliceNew", "timestamp": "..."}
```

If name is taken:

```json
{"type": "error", "message": "name already taken"}
```

::right::

<div class="mt-12"></div>

**List users (`/list`):**

```json
// Client → Server
{"type": "list"}

// Server → Client (you only)
{"type": "list",
 "names": ["Alice", "Bob", "Charlie"],
 "timestamp": "..."}
```

<div class="mt-4 text-sm op-75">

Timestamps and join/leave notifications are already in the base spec — you just need to handle them in your client.

</div>

---

# What's different this time

Use the four patterns:

| Pattern | Example prompt |
| --- | --- |
| **Conceptual inquiry** | "What is the `onmessage` callback doing?" |
| **Hybrid code-explanation** | "Show me the code and explain each part" |
| **Generation → comprehension** | "Walk me through what happens when a message arrives" |
| **Intentional debugging** | "What does this error mean?" before "fix this" |

<v-click>

<div class="mt-4 text-lg font-bold">

If you can't explain the change you made, you haven't learned it.

</div>

</v-click>

---
layout: center
---

# First, watch one example

I'll demo adding a feature live — using the patterns we just covered.

Then it's your turn.

<!--
Demo: adding timestamps. Use hybrid code-explanation pattern. Ask "The server sends timestamps like 2025-06-15T14:30:00Z. What format is that?" Read the response. Then: "Show me how to parse that and display it as 14:30 next to each message. Explain each part." Follow up: "What does the Z at the end mean?" Narrate your thinking at each step.
-->

---
layout: center
---

# ⏱️ Your turn

You have **18 minutes**. Pick a feature and build it.

<div class="mt-8 text-sm op-75">

We'll debrief and share when you're done.

</div>

---

# Debrief

<v-clicks>

- **What did you do differently** this time?
- **Can you explain** the feature you added?
- **What did you learn** about WebSockets that you didn't know during the cold start?

</v-clicks>

<v-click>

<div class="mt-8">

| Cold Start | Retry |
| --- | --- |
| "Make me a chat client" (one prompt) | "How do WebSockets work?" → "Show me how to connect" → "How do I send a message?" |
| Accepted code without reading it | Asked AI to explain the code |
| Got stuck on the modification | Can describe what they changed and why |

</div>

</v-click>

---
layout: center
class: text-center
---

# Do's and Don'ts

Practical takeaways

<div class="text-sm op-75 mt-4">~12 minutes</div>

---

# Do's ✅

<v-clicks>

**Ask why, not just what.**

**Break problems into steps.**

**Explain code back to yourself before using it.**

**Use AI to unstick yourself, not to think for you.**

**Keep your hands on the code.**

</v-clicks>

---

# Don'ts ❌

<v-clicks>

**Don't paste the whole task and accept the first output.**

**Don't debug by asking AI to fix your errors.**

**Don't accept code that works but you can't explain.**

**Don't skip the struggle.**

**Don't use AI to avoid the fundamentals.**

</v-clicks>

---
layout: center
---

# The one thing to remember

<div class="text-2xl mt-8">

> **If you can't explain it, you haven't learned it.**

</div>

<v-click>

<div class="mt-8 text-lg">

Learning happens when your brain works through something — not when your eyes pass over it.

Effort and active thinking move something from "I saw it" to "I know it."

</div>

</v-click>

---

# What to do next

You now have the approach.

<v-clicks>

1. Pick one thing you're working on in your track
2. Open your AI tool
3. Try the **conceptual inquiry** pattern — ask why things work, build the answer yourself
4. Compare how you feel at the end versus the cold start

</v-clicks>

<v-click>

<div class="mt-8 text-lg font-bold">

The difference is the point.

</div>

</v-click>

---
layout: center
class: text-center
---

# Questions?

---
layout: center
class: text-center
---

# 📝 Survey

3 minutes, 5 questions — please fill it in now before leaving.

Your feedback helps us improve this workshop.

<div class="mt-8 text-sm op-75">

Link in the chat.

</div>

---
layout: center
class: text-center
---

# Thank you!

Keep your hands on the code. Stay in the driver's seat.

<div class="mt-8 op-75">

ReDI School — AI Workshop

</div>
