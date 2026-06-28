# 04 - Build the Feedback Loop

## Goal

Teach participants to ask AI for verification, not only implementation.

Good AI coding is a loop:

1. inspect
2. plan
3. change
4. test
5. review
6. commit
7. reflect

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

Then repeat with a loop:

- reproduce the bug
- add or run a test
- make the smallest fix
- run the test again
- inspect the diff
- commit

## Prompts to Use

- "Before editing, tell me how you will verify this."
- "Add the smallest useful test for this behavior."
- "Run the app and check the page in the browser."
- "Take a screenshot and compare it with the expected result."
- "If the test fails, explain the failure before changing code again."

## Takeaway

Do not ask only, "Can AI write this?"

Ask, "How will we know this is correct?"
