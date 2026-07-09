# Coding with AI

## Teaser

> **AI can help you code faster. Your job is to make sure the work gets better.**
>
> A hands-on workshop for people using AI to code on projects.

## Audience

Students, graduates, career switchers, and external learners who use AI to code.

They have enough technical foundation to work on projects, but they are still building professional habits.

Some may work with mentors, teammates, clients, or open-source maintainers.

## Overview

A 60-minute workshop teaching participants how to use AI in project work without losing control of the code.

The hands-on work uses one prepared project.

The project can be:

- a small repo created for the workshop
- a pinned commit from an open-source project

This keeps the workshop manageable and realistic: participants first understand the codebase, then make a focused change, verify it, and commit in small steps.

The workshop focuses on one repeatable AI coding loop:

1. confirm a clean start
2. ask AI to inspect before editing
3. write a short plan, ask AI to evaluate it, and decide which feedback to use
4. ask AI to implement your revised plan
5. run one useful check
6. review and explain the diff
7. commit
8. record one lesson for future work

This loop uses Git, AI agents, checks, and project notes. Participants do not need to memorize every command. They should learn which decisions they own, what to ask for, and how good AI-assisted work looks.

## Schedule

| Time | Duration | Section | Goal |
| ---- | -------- | ------- | ---- |
| 0:00 | 8 min | Why AI Coding Needs a Workflow | Set the context with the two research lessons: stay engaged and build feedback over time |
| 0:08 | 7 min | The AI Coding Loop | Introduce the loop: clean start, inspect, write and revise a plan with AI feedback, implement, check, review the diff, commit, record one lesson |
| 0:15 | 5 min | Who Already Knows This? | Identify participants familiar with Git, agents, tests, or browser checks so they can pair and help |
| 0:20 | 10 min | Facilitator Demo | Show one tiny AI-assisted change using the full AI coding loop |
| 0:30 | 22 min | Practice | Participants apply the AI coding loop to a prepared task |
| 0:52 | 5 min | Pair Review | Participants explain their plan, one AI suggestion they accepted or rejected, their diff, and their check |
| 0:57 | 3 min | Wrap-up | Leave with the checklist and one habit to use in their own projects |

## Structure

1. **Set the context** (01) - AI makes people faster, but speed is not the same as learning or good project work.
2. **Teach the AI coding loop** (02, 03, 04, 05) - Participants see how Git, agent setup, checks, and project memory fit together.
3. **Use the room** - Participants who already know parts of the AI coding loop help others during setup and practice.
4. **Practice the AI coding loop** (06) - Participants make one focused change in the shared project.
5. **Take it back to projects** (07) - Participants leave with a simple repeatable checklist.

## Learning Outcomes

By the end, participants should be able to:

- write a plan for one small change and use AI feedback to improve it
- ask an AI coding agent to implement their plan
- use small commits to keep work reversible
- inspect and explain the diff before accepting it
- ask the agent to run or suggest one useful check
- record one lesson that helps future work

## Core Participant Message

AI can help you code faster. Your job is to keep the work understandable, checked, and easy to continue.

## Writing and Teaching Guidance

Use the workshop content as facilitator notes, not as a script where every sentence has equal weight.

Each section should have one main job:

- **Why AI Coding Needs a Workflow:** create motivation. Connect AI speed to maintainability, learning, and long-term career growth. Mention the research briefly and naturally.
- **The AI Coding Loop:** give participants the repeatable model. Keep the sequence clear.
- **Who Already Knows This?:** use the room. Let experienced participants help others without taking over.
- **Facilitator Demo:** show the loop once. Do not explain every possible tool feature.
- **Practice:** give participants time to try the loop on one small task.
- **Pair Review:** make understanding visible by having participants explain the diff and check.
- **Wrap-up:** send participants away with one habit they can repeat.

When editing the section files:

- sound like a person teaching, not a checklist generator
- use "we" and "you" when it helps the content feel direct
- let some ideas be short supporting notes instead of full sections
- use questions when you want participants to reflect or take ownership
- keep research references concise and practical
- avoid over-standardizing every section into the same format
- keep simple words when they work; for example, use `Goal` for a section goal and `Requirements` for requirements instead of replacing them with explanatory labels
- preserve the human role: participants bring context, judgment, memory, and responsibility for the code they accept
- keep lesson-plan files focused on teaching intent, flow, timing, and facilitator decisions
- put participant-shareable examples, prompt lists, worksheets, checklists, and task briefs in `materials/`
- point from a section file to the relevant material instead of copying long reusable lists into the lesson plan
