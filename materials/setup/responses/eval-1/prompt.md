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

## Evaluation Criteria

We evaluated model outputs across five areas. The goal: a student can open the file, connect to the teacher's server, and chat — without debugging.

### 1. Spec Adherence

- Connects with `?name=` query parameter
- Sends `{"type": "message", "text": "..."}` format
- Handles all four inbound types: `message`, `join`, `leave`, `error`
- Reads the correct fields (`data.text` for messages, `data.message` for errors, `data.name` for sender)

### 2. Server Compatibility

- Uses the browser's built-in `WebSocket` API (not Socket.IO)
- Works with the provided `server.js` — no field mismatches or broken flows
- Handles the server closing the connection after an error (e.g., duplicate name)
- No local echo — the server broadcasts your own messages back, so adding them locally causes duplicates

### 3. Requirements Compliance

- Single, self-contained `index.html` — no frameworks, build tools, or npm
- Includes input fields for server URL (default `ws://localhost:3000`) and user name
- No intermediate connection states (no "Connecting..." — just connected or disconnected)
- Plain styling — no animations, toasts, dark themes, CSS transitions, or external font imports

### 4. Code Quality (One-Shot)

- **Security**: Uses `textContent` or escapes HTML — never `innerHTML` with untrusted server data (XSS risk)
- **Usability**: Enter key sends messages (a `<form>` handles this natively); auto-scroll keeps latest messages visible
- **Robustness**: Proper URL construction, safe disconnect handling

### 5. Workshop Viability (Non-Technical)

This is a classroom with mixed technical backgrounds. The output must work on first try with zero debugging.

- **No over-engineering.** Extra features (dark mode, status dots, Google Fonts) violate the "plain" and "self-contained" constraints. They also add code that students didn't ask for and may not understand.
- **No fragile patterns.** State machines that leave inputs disabled after a failed connection, or `innerHTML` that destroys the setup form, force students to debug framework-level problems instead of learning.
- **Minimal complexity.** Uniform message rendering (no "own vs. other" styling), straightforward connect/disconnect logic. Less code means fewer places for things to break.

### Failure Modes

**Deal-breakers** — the chat client doesn't work:

- UI lockout — inputs or buttons stuck disabled after a connection attempt
- DOM destruction — `innerHTML` wiping the setup form or event listeners
- Syntax errors — typos in event handlers (e.g., `e/key` instead of `e.key`)

**Flaws, but still functional** — the client works, these are noted but not automatic fails:

- Duplicate messages — local echo when the server already broadcasts (confusing, but chat still works)
- XSS vulnerability — rendering untrusted data with `innerHTML` (security issue, but won't break the demo)
- Over-styled output — dark themes, animations, external fonts (violates constraints, but client still connects and chats)
