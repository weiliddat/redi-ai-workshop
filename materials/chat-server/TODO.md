# Chat Server — TODO

WebSocket chat server for the cold start and retry exercises.

## Requirements

- [ ] Accept WebSocket connections
- [ ] Broadcast messages to all connected clients
- [ ] Send `join` event when a client connects
- [ ] Send `leave` event when a client disconnects
- [ ] Add `timestamp` to outgoing messages
- [ ] Handle the message format from the API spec:
  - Incoming: `{"type": "message", "name": "...", "text": "..."}`
  - Outgoing: `{"type": "message", "name": "...", "text": "...", "timestamp": "..."}`
  - Join: `{"type": "join", "name": "..."}`
  - Leave: `{"type": "leave", "name": "..."}`

## Hosting

- [ ] Decide where to host (local machine, cloud VM, etc.)
- [ ] Ensure the `ws://` URL is accessible to students on Zoom
- [ ] Test with multiple simultaneous connections
- [ ] Have a backup plan if the server goes down during the workshop

## Before the workshop

- [ ] Start the server
- [ ] Confirm the URL works from a different network
- [ ] Prepare the connection URL to paste into Zoom chat
