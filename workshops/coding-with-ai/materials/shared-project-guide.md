# Shared Project Guide

Use one shared project for the workshop.

This keeps the workshop focused. The teacher can prepare one setup path, one target change, and one set of feedback loops.

## Chosen Project

Use the prepared chat client in [`materials/project`](project/).

This is a small browser client for the chat server from the Learning with AI workshop. The facilitator runs the server. Participants receive a zip of the client, initialize their own Git repo, and work from the same baseline.

Starting point:

- project path: `workshops/coding-with-ai/materials/project`
- distribution format: zip the project with a top-level folder named `workshop-chat-client`
- participant folder after unzip: `workshop-chat-client`
- participant project setup commands: see [`materials/project/README.md`](project/README.md)
- check command: `npm test`
- browser check: open `http://localhost:5173` and connect to the facilitator's WebSocket server
- server protocol: same as `workshops/learning-with-ai/materials/chat-server`
- practice task: [`materials/project/PRACTICE_TASK.md`](project/PRACTICE_TASK.md)

Packaging command:

```bash
cd workshops/coding-with-ai/materials
rm -rf workshop-chat-client workshop-chat-client.zip
cp -R project workshop-chat-client
zip -r workshop-chat-client.zip workshop-chat-client -x "*/node_modules/*"
rm -rf workshop-chat-client
```

Before sending the zip, unzip it once and confirm this works:

```bash
cd workshop-chat-client
npm test
```

## Project Options

Option 1: build a small repo for the workshop.

Use this when you want full control over:

- setup time
- task difficulty
- tests
- browser checks
- expected solution paths

Option 2: use a pinned commit from an open-source project.

Use this when you want a task that feels closer to real project work:

- understand an unfamiliar codebase
- identify the right files
- make a focused change
- run the existing checks
- commit small steps

## Selection Criteria

Choose a project that:

- installs in less than 10 minutes
- has a clear README
- has at least one useful test, linter, or browser check
- has a task small enough for a 20-minute exercise
- does not require private data or paid services
- works on common student laptops

## Starting Baseline

Use the exact same starting files.

For this workshop run, the distributed zip is the pinned baseline. After unzipping, participants create the first commit themselves so they can practice the Git safety net from the start. Their commit SHAs will be different because each person commits at a different time.

Write down:

- zip filename
- expected top-level folder name
- link to the canonical setup commands
- test or check commands
- target task
- acceptance criteria
- expected files participants may inspect

## Good Practice Task

The task should require understanding, not only editing one obvious line.

For this run, the default practice task asks participants to show short local times for chat events. It is small, but it touches the real client flow: server event data, display text, tests, and a browser check.

There is also an intentional reconnect bug in the baseline: after a rejected connection, such as a duplicate name, the client does not return to the join form. Use this as the bug-fix exercise if you want participants to practice fixing a visible user problem instead of adding timestamps.

Good examples:

- fix a small UI bug
- add one validation rule
- improve one error message
- add one missing test
- update one setup instruction
- refactor one confusing function without changing behavior

Avoid tasks that need large product decisions, secrets, deployment access, or long debugging.

## Stretch Task

If participants finish early, ask them to add one small follow-up in a separate commit:

- show a clearer empty-state message before the first chat event, or
- add one extra test for an event type they did not touch, or
- fix the rejected-connection bug in a separate commit, or
- improve the README with one setup problem they hit and how they fixed it.
