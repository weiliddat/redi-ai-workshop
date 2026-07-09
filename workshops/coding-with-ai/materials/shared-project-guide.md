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
- workshop server URL: `wss://quick-badly-amoeba.ngrok-free.app`
- server protocol: same as `workshops/learning-with-ai/materials/chat-server`
- practice task: [`materials/project/PRACTICE_TASK.md`](project/PRACTICE_TASK.md)

Packaging command:

Before packaging, confirm that the server URL in `project/index.html` and the practice slide points to the workshop's ngrok destination. Replace it when this material is reused for another workshop.

```bash
cd workshops/coding-with-ai/materials
rm -rf workshop-chat-client workshop-chat-client.zip
cp -R project workshop-chat-client
zip -r workshop-chat-client.zip workshop-chat-client -x "*/node_modules/*" "*/.DS_Store"
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
- does not require paid services
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

## Task Documentation

[`materials/project/PRACTICE_TASK.md`](project/PRACTICE_TASK.md) is the canonical participant task document. It contains the main task, requirements, AI coding loop, stop point, and optional follow-up tasks.

Keep task instructions there instead of repeating them in this facilitator guide.
