# Hands-On: Cold Start

## Setup

The teacher starts a WebSocket chat server and shares the connection details with students.

Students receive:

- The server URL (e.g., `wss://workshop-server.example.com`)
- The API spec (below)
- One instruction: **"Use AI to build a chat client that connects to this server. You should be able to see messages and send your own."**

No guidance on _how_ to use AI. No prompting tips. Just the task.

<!-- TODO: Decide whether students use Node.js / Python CLI clients, or a simple browser-based starting point (HTML + native WebSocket API, no install needed). Browser avoids package installation friction and keeps the exercise focused on AI interaction, not setup. -->

## API Spec (share with students)

```
WebSocket Chat Server
=====================

This server uses the standard WebSocket protocol (not Socket.IO).

Connect to: wss://[server-url]?name=your-name

  Your client should ask the user for a name on startup,
  then connect with that name in the URL.

  Names must be unique. If the name is already taken,
  the server sends an error and closes the connection:
  {"type": "error", "message": "name already taken"}

To send a message:
  {"type": "message", "text": "your message"}

You will receive:
  {"type": "message", "name": "sender-name", "text": "message text", "timestamp": "2025-06-15T14:30:00Z"}

When someone joins:
  {"type": "join", "name": "their-name", "timestamp": "2025-06-15T14:30:00Z"}

When someone leaves:
  {"type": "leave", "name": "their-name", "timestamp": "2025-06-15T14:30:05Z"}

All events are broadcast to every connected client (including the sender, when still connected).
All messages from the server include a timestamp.
Messages are plain text only.
```

## What will happen

Most students will:

1. Paste the API spec into ChatGPT / Claude
2. Get a working script back
3. Run it, connect, send "hello"
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

## Time

- 15 min — build and connect
- 5 min — the reveal questions and brief discussion
