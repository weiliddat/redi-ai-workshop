# Chat Server — TODO

WebSocket chat server for the cold start and retry exercises.

## Requirements

- [x] Accept WebSocket connections
- [x] Broadcast messages to all connected clients
- [x] Send `join` event when a client connects
- [x] Send `leave` event when a client disconnects
- [x] Add `timestamp` to outgoing messages
- [x] Support `nick` rename events for the retry exercise
- [x] Support `list` requests for connected-user lookups
- [x] Handle the message format from the API spec:
  - Incoming: `{"type": "message", "text": "..."}`
  - Outgoing: `{"type": "message", "name": "...", "text": "...", "timestamp": "..."}`
  - Join: `{"type": "join", "name": "...", "timestamp": "..."}`
  - Leave: `{"type": "leave", "name": "...", "timestamp": "..."}`
  - Nick in: `{"type": "nick", "name": "..."}`
  - Nick out: `{"type": "nick", "oldName": "...", "name": "...", "timestamp": "..."}`
  - List in: `{"type": "list"}`
  - List out: `{"type": "list", "names": ["..."], "timestamp": "..."}`

Workshop hosting and run-of-show tasks live in `materials/setup/TODO.md`.
