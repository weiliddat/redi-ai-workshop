# REDI AI Workshops - AGENTS.md

## Context

This repo contains AI workshop material for REDI students and broader learner audiences.

There are two workshop tracks:

1. `workshops/learning-with-ai/`  
   The original workshop for students who are still learning to program.

2. `workshops/coding-with-ai/`  
   The new workshop for students, graduates, and external learners who use AI to code on projects.

## Shared Audience

REDI students may include migrants, marginalized communities, students, and career switchers.

Assume intelligence and motivation. Do not assume expert-level comfort with AI, Git, tooling, or professional software workflows.

## Learning With AI Track

This track is for mid-journey learners building programming skills.

**Goal:** Give participants the right mindset and practical approach to use AI effectively as a learning tool.

The key research source is the Anthropic study by Shen & Tamkin (2026), listed in `workshops/learning-with-ai/reference.md`.

Main lesson:

AI tools make people faster, but faster does not mean learning happened. Students learn more when they stay cognitively engaged: asking questions, reading code, writing code, and explaining what they accept.

## Coding With AI Track

This track is for people using AI to code in project work.

The audience may include current students, graduates, career switchers, external learners, and people working with mentors, teammates, or clients.

**Goal:** Teach participants a professional workflow for coding with AI on real projects.

The hands-on workshop should use one shared project, not participant-owned projects. This can be a workshop-built repo or a pinned commit from an open-source project. Keep the setup common so the teacher can guide the group through one realistic workflow.

The default coding agent is OpenCode. If cost or account access is a barrier, plan a fallback using OpenRouter with a shared API key and a lower-cost model.

Main principles:

1. **Use version control liberally.**  
   Ask the agent to work in small steps and commit often. This builds the habit of focused work and makes changes easier to review, undo, and explain.

2. **Build understanding while using AI.**  
   Keep the useful lesson from the Anthropic learning paper: do not delegate the thinking. Participants should stay involved by writing or shaping their plan, ask AI to evaluate it, decide which feedback to accept, and understand the code they accept.

3. **Build the loop as you go.**  
   Use tests, browser checks, screenshots, logs, and review. When the participant or agent gets stuck, reflect on what happened and record the lesson in docs, `AGENTS.md`, checklists, or skills so the next task is easier.

Also include the 2026 post "Humans Still Beat AI in the Long Horizon" as a reference for long-horizon work, adaptation, project memory, and feedback loops.

## Writing Style Instructions

Use the `/writing-style` skill when generating or editing workshop content.

Apply the style with the coding-with-AI audience in mind when editing `workshops/coding-with-ai/`:

- plain language
- direct and concise
- short sections
- action-oriented examples
- no unnecessary jargon
- practical workflow over abstract AI theory

## File Structure

```
README.md
AGENTS.md

workshops/
  learning-with-ai/
    README.md
    workshop.md
    requirements.md
    reference.md
    retro.md
    contents/
    comms/
    materials/
    slides/

  coding-with-ai/
    README.md
    workshop.md
    requirements.md
    reference.md
    contents/
    comms/
    materials/
```

## Editing Guidance

- Preserve the original workshop under `workshops/learning-with-ai/` unless the user explicitly asks to change it.
- Put new AI coding workflow material under `workshops/coding-with-ai/`.
- Keep shared repo-level files focused on navigation and contributor guidance.
- Prefer small, focused content files over one large document.
- When drafting exercises, use the prepared project and realistic project tasks: Git diffs, small bug fixes, tests, browser checks, review, and project docs.
