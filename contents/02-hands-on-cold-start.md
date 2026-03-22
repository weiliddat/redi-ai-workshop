# Hands-On: Cold Start

## Setup

The teacher starts a WebSocket chat server and shares the connection details with students.

Students receive:

- The server URL (e.g., `ws://workshop-server.example.com:8080`)
- The API spec (below)
- One instruction: **"Use AI to build a chat client that connects to this server. You should be able to see messages and send your own."**

No guidance on _how_ to use AI. No prompting tips. Just the task.

## API Spec (share with students)

```
WebSocket Chat Server
=====================

Connect to: ws://[server-url]

To send a message:
  {"type": "message", "name": "your-name", "text": "your message"}

You will receive:
  {"type": "message", "name": "sender-name", "text": "message text", "timestamp": "2025-06-15T14:30:00Z"}

When someone joins:
  {"type": "join", "name": "their-name"}

When someone leaves:
  {"type": "leave", "name": "their-name"}

You can use Python or Node.js — your choice.
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

Most won't be able to answer. That's the point. This sets up the motivation for sections 03 (Research) and 04 (How to Learn with AI).

## Time

- 15 min — build and connect
- 5 min — the reveal questions and brief discussion
