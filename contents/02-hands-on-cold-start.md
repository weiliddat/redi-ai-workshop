# Hands-On: Cold Start

## Setup

The teacher starts a WebSocket chat server and shares the connection details with students.

Students receive:

- The server URL (e.g., `wss://quick-badly-amoeba.ngrok-free.app`)
- The API spec (below)
- One instruction: **"Use AI to build a browser chat client that connects to this server. It should run as a single HTML file in the browser. You should be able to see messages and send your own."**

No guidance on _how_ to use AI. No prompting tips. Just the task.

Use a browser-based client for the cold start activity.

Why:

- No package installation or Python/Node.js setup
- Lower chance of students getting blocked on environment issues
- Keeps the exercise focused on AI use and basic WebSocket behavior, not tooling

Tell students they should ask AI for:

- One self-contained `index.html` file
- Plain HTML, CSS, and JavaScript
- The browser's built-in `WebSocket` API
- No frameworks
- No build tools
- No Socket.IO

If students get stuck, the teacher can repeat this constraint out loud:

> "Make it a single HTML file using the browser's built-in WebSocket API. No frameworks, no npm, no Socket.IO."

Node.js and Python clients can remain fallback options for students who already have those environments working, but the default path for section 02 should be browser-only.

## Sample Prompt

Build a browser chat client that connects to a WebSocket server.

Requirements:

- A single, self-contained `index.html` file using plain HTML, CSS, and JavaScript — no external packages, frameworks, build tools, or Socket.IO
- Use the browser's built-in `WebSocket` API
- Include input fields for the server URL (default `wss://quick-badly-amoeba.ngrok-free.app`) and the user's name
- Only display messages received from the server — do not add local echo (the server already broadcasts your messages back to you)
- Display all chat messages the same way — no need to style your own messages differently from others
- Keep the connection logic simple — just connected or disconnected, no intermediate states
- Keep styling plain — no animations, loading indicators, or toast notifications

## API Spec

```
WebSocket Chat Server
=====================

This server uses the standard WebSocket protocol (not Socket.IO).

Connection
----------

Connect to: wss://[server-url]?name=your-name

  Your client should ask the user for a name on startup,
  then connect with that name in the URL.

  Names must be unique. If the name is already taken,
  the server sends an error and closes the connection.

Client → Server
----------------

Send a message:
  {"type": "message", "text": "your message"}

Server → Client
----------------

Chat message:
  {"type": "message", "name": "sender-name", "text": "message text", "timestamp": "2025-06-15T14:30:00Z"}

Someone joined:
  {"type": "join", "name": "their-name", "timestamp": "2025-06-15T14:30:00Z"}

Someone left:
  {"type": "leave", "name": "their-name", "timestamp": "2025-06-15T14:30:05Z"}

Error:
  {"type": "error", "message": "error text"}

  If the server sends an error, show it to the user.
  The server may close the connection after sending an error.

Notes
-----

All events are broadcast to every connected client (including the sender, when still connected).
All messages from the server include a timestamp.
Messages are plain text only.
```

## What will happen

Most students will:

1. Paste the API spec into ChatGPT / Claude
2. Get a working HTML file back
3. Open it in the browser, connect, send "hello"
4. See their message appear — feel accomplished

This is the "delegation" pattern from the Anthropic study — a working result, but little understanding of how it works.

## The reveal (teacher-led, after the activity)

Once students are connected and chatting, the teacher asks the room:

- "What is a WebSocket? How is it different from a normal HTTP request?"
- "What happens in your code if the server disconnects?"
- "How would you change your client to show timestamps next to each message?"
- "What happens if two people join with the same name? What does the server store about you, and what does your client store? What does your client do if it gets an error back?"
- "What happens if the server stops responding — not disconnects, just goes silent? Does your client notice?"

Most won't be able to answer. That's the point. This sets up the motivation for sections 03 (Research) and 04 (How to Learn with AI).

### Teacher notes: what can go wrong with AI output

During testing, different models produced code with bugs that students wouldn't be able to catch without understanding the underlying concepts:

- **Duplicate messages.** Some models add "local echo" — showing your message immediately before the server sends it back. The server *also* broadcasts your message to you, so every sent message appears twice. A student who doesn't understand the server echo behavior can't diagnose this.
- **Inverted UI state.** One model's `onopen` handler *disabled* the Send button instead of enabling it. The client connects successfully but the student can't type anything. The bug is one line, but you'd need to understand WebSocket lifecycle events to find it.
- **Destructive error recovery.** One model replaced the connection form's HTML on connect, so if the server rejected the name (duplicate), the form was gone and the student had to reload the page.
- **Over-engineering.** One model generated 350+ lines of CSS with a dark theme, custom fonts loaded from Google's CDN, and animated transitions — for a simple chat client. The student gets a polished-looking result but can't walk through the code when asked.

These aren't edge cases. They came from models students are likely to use. The common thread: **if you can't read the code, you can't tell when the AI gets it wrong.** This is useful to reference during the section 03 discussion if students push back with "but my code works."

## Time

- 15 min — build and connect
- 5 min — the reveal questions and brief discussion
