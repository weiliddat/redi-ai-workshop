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

## Evaluation Criteria

The goal: a student can open the file, connect to the teacher's server, and chat — without debugging.

### Pass/Fail Criteria

These determine whether the output works in a 15-minute classroom exercise.

**1. Spec adherence** — does it follow the API?

- Connects with `?name=` query parameter
- Sends `{"type": "message", "text": "..."}` format
- Handles all four inbound types: `message`, `join`, `leave`, `error`
- Reads the correct fields (`data.text` for messages, `data.message` for errors, `data.name` for sender)

**2. Server compatibility** — does it work with the server?

- Uses the browser's built-in `WebSocket` API (not Socket.IO)
- No field mismatches or broken message flows
- Handles the server closing the connection after an error (e.g., duplicate name)

**3. Requirements compliance** — does it follow the prompt constraints?

- Single, self-contained `index.html` — no frameworks, build tools, npm, or external CDN imports
- Includes input fields for server URL and user name
- No local echo — the server broadcasts your own messages back, so adding them locally causes duplicates

**4. No blockers** — can a student use it without debugging?

- No syntax or runtime errors that prevent the client from working
- UI remains usable after errors — a failed connection (e.g., duplicate name) should not leave the client in a state where the student has to reload the page
- Core controls (connect, disconnect, send) work when they should

### Noted but Not Scored

These are worth documenting but don't affect the pass/fail result. In a controlled classroom with a known server, they won't prevent students from completing the exercise.

- **XSS** — `innerHTML` with unsanitized server data is a bad practice, but won't break the demo. If a student sends `<script>` tags as a message, that's a teaching moment, not a failure.
- **Missing Enter-key support** — annoying if absent, but the Send button still works.
- **No auto-scroll** — minor usability issue in a 15-minute exercise.
- **Over-styling** — dark themes, animations, intermediate "Connecting..." states, own-vs-other message styling. These violate prompt constraints and add code students didn't ask for, but the client still connects and chats.
- **Code patterns** — `innerHTML +=`, `var` instead of `const`/`let`, IIFE wrappers. Not ideal, but functional.
