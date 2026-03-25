# Chat Server — TODO

WebSocket chat server for the cold start and retry exercises.

## Requirements

- [x] Accept WebSocket connections
- [x] Broadcast messages to all connected clients
- [x] Send `join` event when a client connects
- [x] Send `leave` event when a client disconnects
- [x] Add `timestamp` to outgoing messages
- [x] Handle the message format from the API spec:
  - Incoming: `{"type": "message", "text": "..."}`
  - Outgoing: `{"type": "message", "name": "...", "text": "...", "timestamp": "..."}`
  - Join: `{"type": "join", "name": "...", "timestamp": "..."}`
  - Leave: `{"type": "leave", "name": "...", "timestamp": "..."}`

Server also supports `nick` (rename) and `list` (list connected users) message types beyond the base spec.

## Hosting

- [ ] Decide where to host (local machine, cloud VM, etc.)
- [ ] Ensure the `wss://` URL is accessible to students on Zoom
- [ ] Test with multiple simultaneous connections
- [ ] Have a backup plan if the server goes down during the workshop

## Before the workshop

- [ ] Start the server
- [ ] Confirm the URL works from a different network
- [ ] Prepare the connection URL to paste into Zoom chat
