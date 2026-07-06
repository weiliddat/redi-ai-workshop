# Workshop Chat Client

This is the shared project for the Coding with AI workshop.

You will use it to practice a professional AI coding workflow:

1. start from a clean project
2. create a Git repo
3. ask the AI to inspect before editing
4. make one small change
5. run a check
6. read the diff
7. commit your work

The facilitator runs the chat server. You only run the client.

## What this project does

This is a browser chat client for the workshop chat server.

It can:

- connect to a WebSocket chat server
- send and receive messages
- show join and leave events
- show server errors
- request the current user list
- change your nickname with `/nick NewName`

## Requirements

Before the workshop, complete the participant setup checklist from the workshop materials.

## First setup

After you unzip the project:

```bash
cd workshop-chat-client
git init
git add .
git commit -m "Start workshop chat client"
npm test
npm start
```

If `git commit` asks who you are, check the Git setup instructions in the participant setup checklist.

Then open:

```text
http://localhost:5173
```

Use the server URL given by the facilitator. For local testing, the default is:

```text
ws://localhost:3000
```

## Useful commands

```bash
npm start
```

Starts a small local web server for the client.

```bash
npm test
```

Runs the client tests.

```bash
git status
git diff
```

Shows what changed before you commit.

## Chat server protocol

Connect to the server with your name in the URL:

```text
ws://localhost:3000?name=YourName
```

Send a chat message:

```json
{ "type": "message", "text": "Hello" }
```

Change nickname:

```json
{ "type": "nick", "name": "NewName" }
```

Request the user list:

```json
{ "type": "list" }
```

The server sends events like these:

```json
{ "type": "join", "name": "Sam", "timestamp": "2026-07-06T10:00:00.000Z" }
{ "type": "message", "name": "Sam", "text": "Hello", "timestamp": "2026-07-06T10:01:00.000Z" }
{ "type": "leave", "name": "Sam", "timestamp": "2026-07-06T10:02:00.000Z" }
{ "type": "nick", "oldName": "Sam", "name": "Samira", "timestamp": "2026-07-06T10:03:00.000Z" }
{ "type": "list", "names": ["Samira", "Mina"], "timestamp": "2026-07-06T10:04:00.000Z" }
{ "type": "error", "message": "name already taken" }
```

## Known bug for practice

If the server rejects your connection, for example because the name is already taken, the client shows a disconnect message but does not return you to the join form.

For the workshop baseline, this bug is intentional. It is useful for practicing the AI coding loop because it has clear user impact and a small fix.

Workaround: refresh the page and connect again with a different name.

## Privacy rule

Use only this workshop project and workshop data with AI tools.

Do not paste private project, client, or personal data into an AI tool unless the project owner has confirmed it is allowed.
