# AI Workshop — AGENTS.md

## Context

This is a remote AI workshop for a non-profit that teaches tech and software skills.

**Audience:**

- Migrants, marginalized communities, students, career switchers
- Currently learning software skills (Frontend: HTML/React/CSS, Backend: Python, Data Science)
- Mid-journey learners — they have some technical foundation but are not experts
- Mixed technical backgrounds and comfort levels with AI

**Goal:** Give participants the right mindset and practical approach to use and learn with AI effectively.

## Why This Workshop Exists

AI tools make people faster — but faster doesn't mean learning happened. The Anthropic study (Shen & Tamkin, 2026 — see `reference.md`) ran a controlled experiment where developers learned a new Python library with and without AI assistance. Key findings:

- **AI users scored ~17% lower** on conceptual understanding, code reading, and debugging — with no significant speed gains on average.
- The study identified **six AI interaction patterns**. Three led to poor learning (24–39% quiz scores): heavy delegation, copy-pasting generated code, and using AI to debug repeatedly without understanding. Three preserved learning (65–86% quiz scores): asking conceptual questions, requesting explanations, and writing your own code while using AI only for clarification.
- The dividing line was **cognitive engagement**. Participants who let AI do the thinking learned less. Participants who stayed actively involved — thinking, questioning, writing — learned just as well as the no-AI group, sometimes faster.
- Even self-perception shifted: the no-AI group reported *higher* self-reported learning, despite finding tasks harder.

The lesson isn't "don't use AI." It's that **how you use AI determines whether you learn.** This workshop teaches participants to use AI in ways that preserve and accelerate skill formation — not replace it.

## Writing Style Instructions

Use the `/writing-style` skill when generating or editing workshop content.

## File Structure

```
workshop.md              — Workshop details: schedule, structure, goal of each part
requirements.md          — What the coordinator, teacher, and students need to prepare
reference.md             — Research, articles, and sources used in the workshop
contents/
  01-what-ai-can-do.md        — What AI is, what it can and can't do
  02-hands-on-cold-start.md   — Unguided activity before prompting instruction
  03-what-research-shows.md   — Anthropic study findings, connects to cold start experience
  04-how-to-learn-with-ai.md  — Integrated approach: prompting + learning strategies, with live demos of each pattern
  05-hands-on-retry.md        — Retry with prompting and learning strategies applied, teacher-led demos
  06-dos-and-donts.md         — Practical guidelines and pitfalls
comms/
  participant-update-week-before.md — Pre-workshop communication to participants
materials/
  chat-client/                — Frontend chat client for hands-on exercises
  chat-server/                — Backend chat server for hands-on exercises
  setup/                      — Setup scripts and configuration
```
