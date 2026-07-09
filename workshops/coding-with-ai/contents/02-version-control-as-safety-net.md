# 02 - Version Control as Your Safety Net

## Goal

We want participants to see Git as a safety net, not as an expert-only tool.

Small commits make AI work safer because they make changes easier to inspect, explain, undo, and review.

This is not a full Git lesson. Participants need the idea of diffs and commits. If they forget the exact command, they can ask the agent.

## Core Message

Ask the agent to work in small steps, and commit after each step that makes sense on its own.

During the demo, contrast one focused request with one broad request that asks the agent to change too much at once.

## Minimal Git Concepts

- **Diff:** the exact change before you accept it.
- **Commit:** a checkpoint you can explain, review, and return to.

## What to Show

- Start from a clean Git status.
- Ask the agent to inspect before editing.
- Write a short plan and ask the agent to evaluate it.
- Decide which feedback to use and revise the plan.
- Ask the agent to implement your revised plan as one focused change.
- Read the diff before committing.
- Commit with a message that explains why the change was made.

The [AI coding checklist](../materials/ai-coding-checklist.md) gives participants the full loop and useful agent requests during practice.

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
