# 02 - Version Control as Your Safety Net

## Goal

We want participants to see Git as a safety net, not as an expert-only tool.

Small commits make AI work safer because they make changes easier to inspect, explain, undo, and review.

This is not a full Git lesson. Participants need the idea of branches, diffs, and commits. If they forget the exact command, they can ask the agent.

## Core Habit

Ask the agent to work in small steps, and commit after each step that makes sense on its own.

Good request:

> Make only the validation change first. Do not refactor anything else. After the change, show me the diff and suggest a commit message.

Poor request:

> Improve this page and fix anything you find.

## What Participants Should Do

- Create a branch for the task
- Ask the agent to inspect before editing
- Change one topic at a time
- Read the diff before committing
- Commit after each meaningful step
- Use commit messages that explain the reason, not only the file changed

## Useful Agent Requests

- "Check that I am on a safe branch for this task. If not, suggest the Git command."
- "Before editing, inspect the relevant files and tell me what you found."
- "Make only the smallest useful change. Do not refactor unrelated code."
- "Show me the diff and explain it in plain language."
- "Suggest a commit message that explains why this changed."

## Minimal Git Concepts

- **Branch:** a safe workspace for one task.
- **Diff:** the exact change before you accept it.
- **Commit:** a checkpoint you can explain, review, and return to.

## Demo

If there is time, show the same task in two ways:

1. one large AI-generated change
2. three small commits with clear diffs

Compare:

- Which one is easier to review?
- Which one is easier to undo?
- Which one helps the participant explain the work to another person?

## Takeaway

Frequent commits are not only for experts.

They are how you protect yourself while learning and shipping real work with AI.
