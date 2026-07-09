# Reviewer and Facilitator Guide

Use this guide during the coding-with-AI workshop or in follow-up sessions.

## What to Look For

The participant should not only produce code.

They should show a professional workflow:

- clean starting point
- small scoped changes
- clear diffs
- regular commits
- active understanding
- relevant tests or checks
- project instructions that improve over time

## Useful Review Questions

- What is the smallest version of this change?
- Which files did the agent inspect before editing?
- What was your plan, and what AI feedback did you accept or reject?
- Can you explain this diff without reading the agent response?
- What did you run to check the change?
- What could break because of this?
- What should we document so this is easier next time?

## Pairing Guidance

At the start of the workshop, ask who already feels comfortable with Git, coding agents, tests, or browser checks.

Invite those participants to pair with someone nearby during practice.

Helpers should not take over the keyboard. They should help the participant use the AI coding loop:

1. start from a clean Git status
2. ask the agent to inspect first
3. write a short plan, ask the agent to evaluate it, and decide which feedback to use
4. ask the agent to implement the participant's revised plan
5. run or choose a check
6. review the diff
7. commit
8. record one lesson

## When to Slow Down

Slow the participant down when:

- the AI changes many unrelated files
- the participant cannot explain the diff
- no check was run
- the participant wants to commit a large unclear change
- project-specific knowledge stays only in the chat history

## Follow-up

After the workshop, review one participant commit.

Check:

- Is the commit focused?
- Is the message clear?
- Is the change verified?
- Does the participant understand it?
- Is there a useful update to docs, `AGENTS.md`, or a checklist?
