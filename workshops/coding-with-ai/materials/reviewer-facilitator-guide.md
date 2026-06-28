# Reviewer and Facilitator Guide

Use this guide during the coding-with-AI workshop or in follow-up sessions.

## What to Look For

The participant should not only produce code.

They should show a professional workflow:

- small scoped changes
- clear diffs
- regular commits
- active understanding
- relevant tests or checks
- project instructions that improve over time

## Useful Review Questions

- What is the smallest version of this change?
- Which files did the agent inspect before editing?
- Can you explain this diff without reading the agent response?
- What did you run to check the change?
- What could break because of this?
- What should we document so this is easier next time?

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
