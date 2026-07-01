# 05 - Improve the Working Agreement

## Goal

We want participants to see each task as a chance to make the next task easier.

When a project has repeated friction, record the lesson.

This can go into:

- `AGENTS.md`
- `README.md`
- project setup docs
- testing docs
- review checklists
- coding agent skills or rules

Different tools use different file names. The principle stays the same:

> Put project knowledge where future you and future AI can use it.

In the 60-minute version, keep this simple:

> Write one note that would help future you, a teammate, or an AI agent do the next task better.

## Examples

This does not need to be a big documentation project. One useful note is enough.

If the agent repeatedly breaks CSS layout:

- add browser screenshot checks to the workflow
- document the layout rules
- ask the agent to verify mobile and desktop before finishing

If setup keeps failing:

- document the exact setup commands
- record known environment variables
- add a troubleshooting section

If tests are slow or confusing:

- document which tests to run for common changes
- add a smaller focused test command if possible

## Reflection Prompt

After a task, ask:

> What slowed us down, and what instruction or check would prevent this next time?

Useful agent request:

> Based on what happened in this task, suggest one small update to the project TODO, README, checklist, or agent instructions. Do not edit yet; show me the proposed note first.

## Takeaway

Every stuck point can improve the project workflow.

This helps participants build skill, project memory, and better AI support.
