---
theme: seriph
background: https://cover.sli.dev
title: "Coding with AI: Keep Control of the Code"
info: |
  ## ReDI AI Workshop
  A hands-on workshop on professional AI coding workflows.
class: text-center
drawings:
  persist: false
transition: slide-left
duration: 60min
---

# Coding with AI

AI can help you code faster.
Your job is to make sure the work gets better.

<div class="pt-12">
  <span class="px-2 py-1 rounded text-sm">
    ReDI School — AI Workshop
  </span>
</div>

<!--
Welcome. 60 minutes, hands-on. Most of the time you will be coding, not listening.
-->

---

# Who am I

- **[Your name]** — [role / company]
- [One line: what you build or work on]
- [One line: how AI fits into your daily coding work]

<div class="punchline">

I use this loop every day — today you'll leave with the same workflow.

</div>

<!--
FILL IN before presenting. Keep it under a minute: name, what you do, and that you use AI daily on real work — that's the credibility the room needs, not a CV.
-->

---

# Before we start

You should have:

- Git and Node.js 20+ working
- OpenCode connected, model **MiniMax-M3** under OpenCode Go
- The `workshop-chat-client.zip` downloaded
- A browser

<v-click>

<div class="mt-8 p-4 bg-orange-500 bg-op-10 rounded">

⚠️ Something not working? Tell us **now**, not at minute 30. Raise a hand or post in the Slack thread.

</div>

</v-click>

<!--
Quick scan of the room. Anyone blocked gets paired with a working neighbor — do it now so it doesn't eat practice time.
-->

---
layout: section
---

# Why AI coding needs a workflow

<!--
0:00–0:08. One idea to land: AI makes you faster, but speed is not the same as good project work.
-->

---

# Faster is not the same as better

AI can write a lot of code, quickly.

<v-clicks>

- Who maintains it next month?
- Who explains it in review?
- Who learned something from writing it?

</v-clicks>

<v-click>

<div class="punchline">

**Research lesson 1:** people move faster with AI, but they learn more when they stay active — asking questions, reading code, explaining changes.

</div>

</v-click>

<!--
Anthropic study (Shen & Tamkin 2026), mentioned briefly. Speed without engagement means less understanding — and in project work, understanding is part of the deliverable.
-->

---
layout: two-cols
---

# Projects are long-horizon work

**Research lesson 2:** strong project work depends on memory, feedback, reflection, and adaptation.

That is why professionals use:

- tests and browser checks
- small commits and review
- docs and project instructions

::right::

<div class="pl-4 pt-16">
  <HumanAiGraph />
</div>

<v-click>

<div class="punchline">

This is where humans beat AI: the agent generates options.
**You** compound — context, judgment, and a workflow that improves every week.

</div>

</v-click>

<!--
"Humans Don't Just Sample" — the human role is the feedback loop across tasks, not just this task. The graph is illustrative: AI output per task is roughly flat, while a human who keeps memory, feedback, and reflection compounds over the life of a project. We show it again at the end. References are in the workshop reference list.
-->

---

# After every piece of work, can you…

<v-clicks>

1. explain **what changed** and how it works?
2. name the **assumptions and tradeoffs**?
3. come back tomorrow with a **better setup** than today?

</v-clicks>

<v-click>

<div class="punchline">

This is how developers build judgment — **taste**. Juniors and seniors alike: every diff you can explain sharpens what "good" looks like to you.

</div>

</v-click>

<!--
These three questions are the whole motivation for the loop we teach next. Everything in the workshop serves one of them. Emphasize: this is not homework for juniors — it's how anyone contributing to a codebase learns the decisions behind it and develops taste.
-->

---
layout: section
---

# The AI coding loop

<!--
0:08–0:15. The repeatable model. Keep the sequence clear; don't explain every tool.
-->

---

# One loop, every task

1. Confirm a clean start, create a **branch**
2. Ask the agent to **inspect before editing**
3. Ask for a short **plan**
4. Make **one small change** — a 1–2 hour chunk of work, not a whole feature
5. Run one useful **check**
6. Read the **diff** — can you explain it?
7. **Commit** with a message that says why
8. Record one **lesson** for next time

<!--
Participants don't memorize this — they get it again in the exercise brief and the checklist. The skill is noticing when you skip a step and going back.
-->

---
layout: two-cols
---

# Git is your safety net

<div class="text-xl mt-8">

**Branch** — a safe workspace for one task

**Diff** — the exact change, before you accept it

**Commit** — a checkpoint you can explain and return to

</div>

::right::

<div class="pl-4 pt-14">

<svg viewBox="0 0 420 190" class="w-full" style="max-width: 440px; font-size: 13px">
  <!-- main line -->
  <line x1="30" y1="60" x2="390" y2="60" stroke="#5b8a9e" stroke-width="2.5" />
  <circle cx="60" cy="60" r="8" fill="#5b8a9e" />
  <circle cx="130" cy="60" r="8" fill="#5b8a9e" />
  <circle cx="200" cy="60" r="8" fill="#5b8a9e" />
  <text x="30" y="40" fill="#5b8a9e" style="font-size: 14px; font-weight: bold">main</text>
  <!-- branch -->
  <path d="M 200 60 Q 235 60 250 95 L 260 110" fill="none" stroke="#c08552" stroke-width="2.5" />
  <line x1="260" y1="110" x2="380" y2="110" stroke="#c08552" stroke-width="2.5" />
  <circle cx="280" cy="110" r="8" fill="#c08552" />
  <circle cx="350" cy="110" r="8" fill="#c08552" />
  <text x="240" y="140" fill="#c08552" style="font-size: 14px; font-weight: bold">fix-message-times</text>
  <!-- diff tag on latest branch commit -->
  <rect x="322" y="150" width="56" height="26" rx="5" fill="none" stroke="#999" stroke-width="1.5" />
  <text x="332" y="168" fill="#7cb87c" style="font-size: 13px; font-family: monospace">+3</text>
  <text x="354" y="168" fill="#d47c7c" style="font-size: 13px; font-family: monospace">−1</text>
  <line x1="350" y1="150" x2="350" y2="122" stroke="#999" stroke-width="1" stroke-dasharray="3,3" />
  <text x="386" y="168" fill="#999" style="font-size: 12px">diff</text>
  <!-- commit label -->
  <line x1="280" y1="98" x2="280" y2="78" stroke="#999" stroke-width="1" stroke-dasharray="3,3" />
  <text x="272" y="70" fill="#999" style="font-size: 12px">commit</text>
</svg>

</div>

<v-click>

<div class="punchline">

Forgot the command? **Ask the agent.** Knowing what the step is for matters more.

</div>

</v-click>

<!--
Not a Git lesson. Three concepts, one breath each. Small commits make AI work safer: easier to inspect, undo, and explain.
-->

---

# Ask small, not broad

<div class="grid grid-cols-2 gap-4 mt-6">

<div class="p-4 bg-red-500 bg-op-10 rounded">

❌ *"Improve this page and fix anything you find."*

Ten changed files. No idea which one mattered.

</div>

<div class="p-4 bg-green-500 bg-op-10 rounded">

✅ *"Make only the smallest change so a rejected connection shows the error and lets me retry. Do not refactor anything else."*

One focused diff you can actually read.

</div>

</div>

<!--
This is the 02 contrast, compressed. The size test: if you can't review the diff, the task was too big.
-->

---

# Who already knows this?

Hands up:

- Used Git on a real project?
- Used a coding agent — OpenCode, Claude Code, Codex?
- Written a test?
- Done a browser check or code review?

<v-click>

<div class="punchline">

If you raised a hand: **sit near someone newer** and help during practice.
In a non-technical role? **Sit next to a technical person** and pair.
Guide with questions — don't take the keyboard.

</div>

</v-click>

<!--
0:15–0:20. While the room re-sorts: START THE DEMO'S INSPECT PROMPT in your OpenCode session now. This hides the first latency wait.
-->

---
layout: section
---

# Demo: fix a real bug

Connect with a name that's already taken → the client shows a disconnect and a dead end.

Watch for the loop steps.

<!--
0:20–0:30. Switch to terminal + two browser tabs. Full script in the teacher runbook: show bug, branch, inspect (already running), smallest change, npm test + browser, diff, commit. Hard stop at 0:30.
-->

---

# Reading a diff

```diff
--- a/src/app.js
+++ b/src/app.js
-  showStatus("Disconnected from server");
+  showStatus(lastServerError || "Disconnected from server");
+  showJoinForm();
```

<v-clicks>

- `-` removed, `+` added
- **File names first** — are these the files you expected?
- Each `+` line: can you say what it does?
- Unrelated change (a rename, a reformat, an untouched-task file)? **Ask why. Ask to undo it.**

</v-clicks>

<!--
60 seconds, during or right after the live diff. This slide is the backup if the live diff is messy. The diff shown is illustrative, not the exact fix.
-->

---
layout: two-cols
---

# Practice: show message times

The server sends a `timestamp`. The client ignores it.
Make events show a short local time, like `10:42`.

**Done when:**

- messages and events show a time
- errors still work without one
- `npm test` passes, one new test
- it looks right in the browser

Follow the **exercise brief** — it has the setup, prompts, and the full loop.

::right::

<div class="pl-6 pt-10">

```text
Server URL:
ws://REPLACE-ME:3000
```

```bash
npm test
npm start   # → localhost:5173
git diff
```

<div class="mt-6 p-3 bg-orange-500 bg-op-10 rounded text-sm">

⚠️ The time must come from the **server's `timestamp`**, not from when your browser renders it. Read your diff.

</div>

</div>

<!--
0:30–0:50. This slide stays up for 20 minutes. Say three things, then circulate: one small task, work the loop, watch the timestamp trap. Failure table is in the runbook.
-->

---
layout: statement
---

# Commit what you have

Even unfinished.

A work-in-progress commit you can explain
beats uncommitted perfect code.

<!--
0:50 hard call. Say it to the whole room. Two minutes, then pair review.
-->

---

# Pair review

Swap with a neighbor. Without reading the agent's output aloud, explain:

1. **What** changed
2. **How** you checked it
3. One **lesson** you'd write down for next time

<!--
0:52–0:57. This is where understanding becomes visible. The lesson note counts as loop step 8 for anyone who skipped it.
-->

---

# Before you commit, ask yourself

<div class="text-xl mt-8">

What is the **smallest useful change**?

How will I **check** it?

Can I **explain the diff** before I commit?

</div>

<v-click>

<div class="punchline">

Take the **AI coding checklist** with you — it has the loop and the prompts for your own projects.

</div>

</v-click>

<!--
0:57–1:00. The three closing questions from the wrap-up. Checklist link goes in Slack.
-->

---
layout: two-cols
---

# This is the day job

The loop is not training wheels.
Branch, inspect, check, review, commit, record —
**this is what engineers do every day.**

The difference over a career:

- your judgment compounds
- your project memory compounds
- your workflow compounds

::right::

<div class="pl-4 pt-16">
  <HumanAiGraph />
</div>

<div class="punchline">

AI gives everyone the same options. The feedback loop is what makes **you** better every week.

</div>

<!--
Close the arc: same graph as the opening. The loop isn't a junior exercise — it's the daily professional workflow, and it's exactly the part AI doesn't do for you.
-->

---
layout: end
---

# One question before you go

**Which step of the loop will you actually use next week?**

Say it out loud or drop it in Slack.

Thank you 🙌

<!--
The feedback answers tell us which habit landed and what to emphasize next run.
-->
