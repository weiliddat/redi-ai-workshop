# 02 - Version Control as Your Safety Net

## Goal

Teach participants to use Git as a normal part of coding with AI.

Small commits make AI work safer because they make changes easier to inspect, explain, undo, and review.

## Core Habit

Ask the agent to work in small steps.

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

## Demo

Show the same task in two ways:

1. one large AI-generated change
2. three small commits with clear diffs

Compare:

- Which one is easier to review?
- Which one is easier to undo?
- Which one helps the participant explain the work to another person?

## Takeaway

Frequent commits are not only for experts.

They are how you protect yourself while learning and shipping real work.
