# 03 - Understand What You Accept

## Goal

We want participants to stay mentally involved while AI helps them code.

The rule is simple:

> Do not commit code you cannot explain.

## Research Connection

The Anthropic study found that developers understood less when they let AI do the thinking.

The better pattern was active use:

- ask for explanations
- ask conceptual questions
- read the generated code
- write or modify parts yourself
- debug with understanding, not repeated guessing

In the 60-minute version, use one practical rule:

> Read the diff and explain it before you commit.

## Why It Matters

In a project, understanding is not extra work. It is part of the work.

It matters because:

- you may need to maintain the code later
- another person may ask why you changed something
- bugs may appear after a demo, release, or review
- future tasks build on today's decisions

## Prompt Support

Use the understanding prompts in the [AI coding checklist](../materials/ai-coding-checklist.md) when a diff looks correct but still feels unclear.

## Exercise

If this section is taught separately, give participants an AI-generated diff.

Ask them to write:

- what changed
- why it changed
- what they would test
- what they still do not understand

In the 60-minute version, do this during pair review: each participant explains their diff to another person.

## Takeaway

Your understanding is part of the deliverable.

If you cannot explain the change, keep working before you commit it.
