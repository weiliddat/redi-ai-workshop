import readline from "readline";
import WebSocket from "ws";

const SERVER_URL = process.env.SERVER_URL || "ws://localhost:3000";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name? ", (name) => {
  const ws = new WebSocket(`${SERVER_URL}?name=${encodeURIComponent(name)}`);

  ws.on("open", () => {
    console.log(`Connected to ${SERVER_URL} as ${name}`);
    rl.on("line", (text) => {
      if (text.trim()) {
        ws.send(JSON.stringify({ type: "message", text }));
      }
    });
  });

  ws.on("message", (data) => {
    const msg = JSON.parse(data);
    switch (msg.type) {
      case "message":
        console.log(`[${msg.name}] ${msg.text}`);
        break;
      case "join":
        console.log(`--- ${msg.name} joined ---`);
        break;
      case "leave":
        console.log(`--- ${msg.name} left ---`);
        break;
      case "error":
        console.log(`Error: ${msg.message || msg.text}`);
        break;
    }
  });

  ws.on("close", () => {
    console.log("Disconnected from server.");
    process.exit(0);
  });

  ws.on("error", (err) => {
    console.error(`Connection error: ${err.message}`);
    process.exit(1);
  });
});
