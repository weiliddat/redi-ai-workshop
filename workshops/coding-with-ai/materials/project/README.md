# Workshop Chat Client

This project is a browser chat client for the Coding with AI workshop.

The facilitator runs the chat server. Participants run this client, connect to the server, and use it to send messages and practice small AI-assisted code changes.

The client can:

- connect to a WebSocket chat server
- send and receive messages
- show join and leave events
- show server errors
- request the current user list with `/users`
- change your nickname with `/nick NewName`

## Requirements

- Node.js 20 or newer
- Git
- a browser

## Set up the project

After you unzip the project:

```bash
cd workshop-chat-client
git init
git add .
git commit -m "Start workshop chat client"
npm test
npm start
```

If `git commit` asks who you are, check the Git setup instructions from the workshop.

Open:

```text
http://localhost:5173
```

The server field is prefilled with the workshop server:

```text
wss://quick-badly-amoeba.ngrok-free.app
```

If this project is reused for another workshop, the facilitator may replace that address before creating the zip.

## Useful commands

```bash
npm start
```

Starts the client at `http://localhost:5173`.

```bash
npm test
```

Runs the client tests.

```bash
git status
git diff
```

Shows the current Git state and uncommitted changes.

## Project structure

- `index.html` — page structure
- `styles.css` — page styles
- `src/app.js` — browser UI, WebSocket connection, and event handling
- `src/chat-protocol.js` — connection URLs, outgoing commands, and server-event descriptions
- `test/chat-protocol.test.js` — client tests
- `server.js` — local web server for the client files
- `PRACTICE_TASK.md` — workshop task, AI coding loop, and optional follow-up tasks
- `AGENTS.md` — instructions for AI coding agents working in this project

## Chat server protocol

Connect with your name in the URL:

```text
wss://quick-badly-amoeba.ngrok-free.app?name=YourName
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

In the browser client, type `/users` to send this request.

The server sends events like these:

```json
{ "type": "join", "name": "Sam", "timestamp": "2026-07-06T10:00:00.000Z" }
{ "type": "message", "name": "Sam", "text": "Hello", "timestamp": "2026-07-06T10:01:00.000Z" }
{ "type": "leave", "name": "Sam", "timestamp": "2026-07-06T10:02:00.000Z" }
{ "type": "nick", "oldName": "Sam", "name": "Samira", "timestamp": "2026-07-06T10:03:00.000Z" }
{ "type": "list", "names": ["Samira", "Mina"], "timestamp": "2026-07-06T10:04:00.000Z" }
{ "type": "error", "message": "name already taken" }
```
