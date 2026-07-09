# 06 - Practice

## Goal

Now participants try the AI coding loop on one small project task.

The task should be small enough to finish in about 20 minutes, with a few minutes left to explain the diff to someone else.

Everyone starts from the same baseline. This makes it easier to compare approaches, debug setup problems, and review commits together.

For this workshop, everyone uses the prepared chat client in `materials/project`. Participants receive it as a zip before class, unzip it, initialize Git, and make the first commit themselves.

## AI Coding Loop

Use this sequence as a guide. The point is not to move perfectly. The point is to notice when you skip a step and return to the loop.

1. Confirm the starting baseline and a clean Git status.
2. Create or confirm a branch.
3. Ask AI to inspect the relevant files.
4. Ask AI for a short plan.
5. Make one focused change.
6. Run the best available check.
7. Read the diff.
8. Ask AI to quiz you on the change.
9. Commit with a clear message.
10. Write one lesson you would add to project notes or instructions.

Use the [AI coding checklist](../materials/ai-coding-checklist.md) during practice.

## Before Practice Starts

Share the [participant exercise brief](../materials/participant-exercise-brief.md). It gives participants only what they need to act:

- starting baseline
- target task
- acceptance criteria
- check command or manual check
- reminder to keep the change small

If participants are less comfortable with Git or the agent, they can ask the agent for the command or next step. The important part is that they understand what the step is for.

## Practice Task

Use the prepared chat client task: [Show Message Times](../materials/project/PRACTICE_TASK.md).

Do not choose participant-owned projects during the workshop.

Practice setup:

Use the setup commands in the project README. Do not copy them into the lesson plan; the README is the canonical source for participant project setup.

Then participants open `http://localhost:5173` and connect to the facilitator's chat server.

If the facilitator wants a bug-fix exercise, use the rejected-connection bug described in the project README and `PRACTICE_TASK.md`: after a duplicate name or other rejected connection, the client should return to the join form so the participant can try again without refreshing.

## Helper Role

Participants who already know Git, agents, tests, or browser checks can help someone nearby.

Helpers should ask questions, not take over the keyboard. Use the [reviewer and facilitator guide](../materials/reviewer-facilitator-guide.md) for the questions and review points.

## Practice Output

By the end, each participant or pair should have:

- a focused diff they can explain
- one check result
- a commit or draft commit message
- one lesson they would add to project notes or instructions

## Takeaway

The goal is not to finish a large feature.

The goal is to practice the AI coding loop until it feels repeatable.
