# How to Learn with AI

## The principle

AI is most useful when it accelerates your understanding — not when it replaces your thinking.

Every time AI generates code you don't understand, you've borrowed a solution without learning the skill. It works today. Next week, in a slightly different context, you're stuck again.

The goal is not to avoid AI. It's to stay in the driver's seat while using it.

## Four patterns that work

The Anthropic study identified interaction patterns associated with higher comprehension scores.

### 1. Conceptual inquiry

Ask AI to explain concepts. Write the code yourself.

Instead of: _"Write me a function that connects to a WebSocket"_

Try: _"What is a WebSocket and how is it different from a normal HTTP request?"_

Then build the connection yourself. Ask follow-up questions when you get stuck on a specific step — not when you want to skip thinking altogether.

**This was the highest-scoring and fastest pattern in the study.**

### 2. Hybrid code-explanation

Ask for code and explanation together. Don't accept code without understanding it.

Instead of: _"Give me the code to parse this JSON"_

Try: _"Show me how to parse this JSON and explain each step"_

Read the explanation. If something isn't clear, ask a follow-up. Only move on when you can describe what each line does.

### 3. Generation-then-comprehension

Let AI generate the code, then ask it to teach you what it produced.

After getting code: _"Walk me through what happens when a message arrives in this code"_

Or: _"What would break if I removed this line?"_

This approach trades speed for understanding — you get the efficiency of AI generation, then immediately do the work of comprehension.

### 4. Intentional debugging

When something breaks, read the error before asking AI to fix it.

Instead of: _"Fix this error"_

Try: _"I'm getting this error in the console: `WebSocket connection to 'ws://localhost:3000' failed`. What does this error mean? What are the likely causes?"_

Then try to fix it yourself based on the explanation. If you're still stuck, ask for a hint — not a solution.

The Anthropic study found the **largest comprehension gap** between AI-assisted and hand-coding groups was on debugging questions. When AI fixes your errors for you, you lose the chance to understand what went wrong — which is often where the deepest learning happens.

---

## How to prompt well

Good prompting is not about magic words. It's about asking specific questions that require you to think.

**Be specific.** Vague questions produce vague answers.

- Weak: "Fix my code"
- Better: "I'm getting `Cannot read properties of undefined (reading 'text')` on line 12. The variable `data` is `{"type": "join", "name": "Ali"}` and I'm trying to access `data.text`. What's happening?"

**Break the problem down.** Don't ask AI to solve the whole thing at once. Ask for one step at a time, then implement it.

**Ask for explanation, not just output.** "Write X" gets you code. "Explain how X works, then show me an example" gets you code you understand.

**Challenge the output.** AI is often right but sometimes wrong. Ask: _"Are there any edge cases this wouldn't handle?"_ or _"What's a simpler way to write this?"_

---

## The rule for accepting code

Before you paste any AI-generated code into your project, apply this test:

> **Can you explain what every line does and why it's there?**

If yes — paste it and move on.

If no — ask the AI to explain the parts you don't understand. Then apply the test again.

This is not about being slow. It's about not accumulating code you can't maintain.

---

## Practical examples by track

### Frontend (HTML/CSS/React)

- "Why does `position: absolute` work differently inside a `relative` parent?"
- "What does `useState` return and why is it an array?"
- "Show me how event delegation works in the DOM with an example"

### Backend (Python / JavaScript)

- "What is the difference between `return` and `yield` in a function?"
- "What does `async` do in front of a function? When do I need it?"
- "What does the `status_code` on this HTTP response tell me?"

### Data Science

- "Why would I use `groupby` instead of a loop here?"
- "What does this `NaN` in my dataset mean and where does it come from?"
- "Explain the difference between correlation and causation in plain language"

---

## A note on getting stuck

Getting stuck means you've reached the edge of what you currently understand. That is exactly where learning happens.

When you hand a hard problem to AI before sitting with it, you skip the moment that would have taught you the most.

Try to stay stuck for a few minutes before asking for help. Ask AI to give you a hint, not a solution. Work through the confusion — that's the work.

## Live demos

After presenting each pattern, the teacher demos it live using the chat client task. This shows students what the pattern looks like in practice — not just in theory.

### Demo 1: Conceptual inquiry

The teacher opens an AI chat and types:

> _"What is a WebSocket? How is it different from a regular HTTP request?"_

After reading the response, the teacher narrates: "Now I know enough to try connecting myself. I'm not going to ask for the code — I'm going to write it."

The teacher writes a few lines of connection code, gets stuck, and asks:

> _"I'm trying to connect to `ws://localhost:3000` in the browser. How does the built-in WebSocket API work?"_

Key point to highlight: two prompts, each specific, each building understanding. Not one big "build me a client."

### Demo 2: Hybrid code-explanation

The teacher types:

> _"Show me how to send a message through a WebSocket in JavaScript, and explain each step."_

After reading the response, the teacher highlights the explanation part: "Notice I didn't just ask for the code. The explanation is what I'm paying attention to."

The teacher reads each line out loud, pauses at one, and asks:

> _"Why do I need to set `ws.onmessage` to a function? What happens if I leave it out?"_

Key point to highlight: you got the code _and_ the explanation in one prompt. But you still have to read the explanation — it doesn't help if you skip it.

### Demo 3: Intentional debugging

The teacher runs code that produces an error (prepared in advance):

```
WebSocket connection to 'ws://localhost:3000' failed
```

Instead of pasting the error and asking for a fix, the teacher types:

> _"What does `WebSocket connection failed` mean in the browser console? What are the common causes?"_

After reading, the teacher says: "OK — the server probably isn't running. Let me check." Then starts the server and retries.

Key point to highlight: reading the error and understanding it took 30 seconds. Blindly asking "fix this" would have skipped the learning.

### Demo 4: Generation-then-comprehension

The teacher asks AI to generate a message-sending function, then immediately follows up:

> _"Walk me through what happens line by line when I call `send_message`."_

Then: _"What would break if I removed the `onmessage` handler?"_

Key point to highlight: the code is already written — now the work is understanding it. This is the minimum before pasting.

## Time

- 25 min — teacher presents patterns with live demos
