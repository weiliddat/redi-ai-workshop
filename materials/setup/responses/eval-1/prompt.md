Build a browser chat client that connects to a WebSocket server.

Requirements:
- A single, self-contained `index.html` file using plain HTML, CSS, and JavaScript — no external packages, frameworks, build tools, or Socket.IO
- Use the browser's built-in `WebSocket` API
- Include input fields for the server URL (default `ws://localhost:3000`) and the user's name
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
