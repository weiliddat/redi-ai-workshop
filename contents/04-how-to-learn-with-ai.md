# How to Learn with AI

## The principle

AI is most useful when it accelerates your understanding — not when it replaces your thinking.

Every time AI generates code you don't understand, you've borrowed a solution without learning the skill. It works today. Next week, in a slightly different context, you're stuck again.

The goal is not to avoid AI. It's to stay in the driver's seat while using it.

## Three patterns that work

The Anthropic study found three interaction patterns where students scored significantly higher on comprehension.

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

---

## How to prompt well

Good prompting is not about magic words. It's about asking specific questions that require you to think.

**Be specific.** Vague questions produce vague answers.

- Weak: "Fix my code"
- Better: "I'm getting a `KeyError` on line 12. The dict is `{'name': 'Ali'}` and I'm trying to access `user['email']`. What's happening?"

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

### Backend (Python)

- "What is the difference between `return` and `yield` in a function?"
- "Why do we use `with open(...)` instead of just `open(...)`?"
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

## Time

- 20 min — teacher presents with examples and live prompting demonstration
- 5 min — students try one rewrite of a prompt they used in the cold start activity
