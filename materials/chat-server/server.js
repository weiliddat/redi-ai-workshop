import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: PORT });

// Map of ws -> name
const clients = new Map();

function broadcast(data) {
  const msg = JSON.stringify(data);
  for (const ws of clients.keys()) {
    ws.send(msg);
  }
}

function send(ws, data) {
  ws.send(JSON.stringify(data));
}

function timestamp() {
  return new Date().toISOString();
}

function nameExists(name) {
  for (const n of clients.values()) {
    if (n === name) return true;
  }
  return false;
}

wss.on("connection", (ws, req) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const name = url.searchParams.get("name");

  if (!name) {
    send(ws, { type: "error", message: "name is required" });
    ws.close();
    return;
  }

  if (nameExists(name)) {
    send(ws, { type: "error", message: "name already taken" });
    ws.close();
    return;
  }

  clients.set(ws, name);
  console.log(`+ ${name} connected (${clients.size} online)`);
  broadcast({ type: "join", name, timestamp: timestamp() });

  ws.on("message", (raw) => {
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      send(ws, { type: "error", message: "invalid JSON" });
      return;
    }

    if (data.type === "message") {
      broadcast({
        type: "message",
        name: clients.get(ws),
        text: data.text,
        timestamp: timestamp(),
      });
    } else if (data.type === "nick") {
      const newName = data.name;
      if (!newName) {
        send(ws, { type: "error", message: "name is required" });
        return;
      }
      if (nameExists(newName)) {
        send(ws, { type: "error", message: "name already taken" });
        return;
      }
      const oldName = clients.get(ws);
      clients.set(ws, newName);
      console.log(`~ ${oldName} -> ${newName}`);
      broadcast({
        type: "nick",
        oldName,
        name: newName,
        timestamp: timestamp(),
      });
    } else if (data.type === "list") {
      send(ws, {
        type: "list",
        names: [...clients.values()],
        timestamp: timestamp(),
      });
    } else {
      send(ws, { type: "error", message: `unknown type: ${data.type}` });
    }
  });

  ws.on("close", () => {
    const leftName = clients.get(ws);
    clients.delete(ws);
    console.log(`- ${leftName} disconnected (${clients.size} online)`);
    broadcast({ type: "leave", name: leftName, timestamp: timestamp() });
  });

  ws.on("error", (err) => {
    console.error(`! error from ${clients.get(ws)}:`, err.message);
  });
});

console.log(`Chat server listening on ws://localhost:${PORT}`);
