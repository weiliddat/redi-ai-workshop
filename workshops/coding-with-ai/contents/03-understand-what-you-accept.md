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

Good engineers build useful mental models:

- the problem they are solving
- the tools they are using
- the solution they are changing

A mental model is your working explanation of how something behaves. It does not need to be perfect at first. It needs to be strong enough that you can make a prediction, test it, and improve it.

AI makes this easier. If a language feature, framework behavior, data tool, design tool, or command is unclear, ask the agent to test the idea with you. It can create a small temporary script, inspect source code, run a quick experiment, or explain what the result means.

The goal is not to collect AI answers. The goal is to build understanding you can use later.

It matters because:

- you may need to maintain the code later
- another person may ask why you changed something
- bugs may appear after a demo, release, or review
- future tasks build on today's decisions

## Prompt Support

Use the understanding and hypothesis-testing prompts in the [AI coding checklist](../materials/ai-coding-checklist.md) when a diff looks correct but still feels unclear.

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
