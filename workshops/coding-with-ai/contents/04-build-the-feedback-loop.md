# 04 - Build the Feedback Loop

## Goal

Teach participants to ask AI for verification, not only implementation.

Good AI coding follows the AI coding loop:

1. branch
2. inspect
3. plan
4. change
5. check
6. review the diff
7. commit
8. record one lesson

The agent can help with routine steps: checking Git status, finding test commands, running tests, opening the app, checking a browser page, writing a TODO, or suggesting a commit message. The participant still decides what to accept.

## Feedback Sources

Use the strongest feedback available for the task:

- tests for logic
- type checks and linters for code quality
- browser checks for frontend behavior
- screenshots for visual changes
- logs for backend behavior
- human review for project judgment
- acceptance criteria for usefulness

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

## Prompts to Use

- "Before editing, tell me how you will verify this."
- "Find the most relevant test or check command for this change."
- "Add the smallest useful test for this behavior."
- "Run the app and check the page in the browser."
- "Take a screenshot and compare it with the expected result."
- "Update the TODO or project notes with the lesson from this task."
- "If the test fails, explain the failure before changing code again."

## Takeaway

Do not ask only, "Can AI write this?"

Ask, "How will we know this is correct?"
