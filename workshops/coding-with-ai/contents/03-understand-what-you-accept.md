# 03 - Understand What You Accept

## Goal

Connect the learning research to project work.

Participants should leave with a clear rule:

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

## Project Translation

In projects, understanding matters because:

- you may need to maintain the code later
- another person may ask why you changed something
- bugs may appear after a demo, release, or review
- future tasks build on today's decisions

## Prompts to Use

- "Explain this change at the level of a junior developer."
- "What assumptions did you make?"
- "What could break because of this?"
- "Ask me two questions to check whether I understand this diff."
- "Point to the exact lines I should review carefully."

## Exercise

Give participants an AI-generated diff.

Ask them to write:

- what changed
- why it changed
- what they would test
- what they still do not understand

In the 60-minute version, do this during pair review: each participant explains their diff to another person.

## Takeaway

Your understanding is part of the deliverable.

If you cannot explain the change, keep working before you commit it.
