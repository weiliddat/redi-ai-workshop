# 04 - Build the Feedback Loop

## Goal

We want participants to ask AI for verification, not only implementation.

The key question is:

> How will we know this is correct?

The agent can help with routine steps: checking Git status, finding test commands, running tests, opening the app, checking a browser page, writing a TODO, or suggesting a commit message. The participant still decides what to accept.

## Checks to Consider

Use the strongest feedback available for the task:

- tests for logic
- type checks and linters for code quality
- browser checks or screenshots for frontend behavior
- logs for backend behavior
- human review for project judgment
- acceptance criteria for usefulness

In the workshop, choose one useful check. The point is not to teach every testing tool. The point is to ask, "How will we know this is correct?"

The [AI coding checklist](../materials/ai-coding-checklist.md) covers where the check fits in the full loop.

## Demo

Show a small bug fix in the project.

First, ask AI to fix it without running checks.

Then repeat with the AI coding loop:

- reproduce the bug
- add or run a test
- make the smallest fix
- run the test again
- inspect the diff
- commit

## Prompt Support

Use the verification prompts in the [AI coding checklist](../materials/ai-coding-checklist.md) during the demo and practice.

## Takeaway

Do not ask only, "Can AI write this?"

Ask, "How will we know this is correct?"
