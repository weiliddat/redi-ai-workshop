import {
  buildConnectionUrl,
  createOutgoingMessage,
  describeChatEvent,
} from "./chat-protocol.js";

const setupPanel = document.querySelector("#setup-panel");
const chatPanel = document.querySelector("#chat-panel");
const connectForm = document.querySelector("#connect-form");
const connectError = document.querySelector("#connect-error");
const serverUrlInput = document.querySelector("#server-url");
const displayNameInput = document.querySelector("#display-name");
const chatTitle = document.querySelector("#chat-title");
const connectionStatus = document.querySelector("#connection-status");
const messages = document.querySelector("#messages");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const listUsersButton = document.querySelector("#list-users");
const disconnectButton = document.querySelector("#disconnect");

let socket;

connectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  connect();
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
});

listUsersButton.addEventListener("click", () => {
  sendToServer({ type: "list" });
});

disconnectButton.addEventListener("click", () => {
  socket?.close();
});

function connect() {
  connectError.textContent = "";

  let connectionUrl;
  try {
    connectionUrl = buildConnectionUrl(serverUrlInput.value, displayNameInput.value);
  } catch (error) {
    connectError.textContent = error.message;
    return;
  }

  socket = new WebSocket(connectionUrl);

  socket.addEventListener("open", () => {
    setupPanel.classList.add("hidden");
    chatPanel.classList.remove("hidden");
    chatTitle.textContent = `Connected as ${displayNameInput.value.trim()}`;
    connectionStatus.textContent = "Online";
    messageInput.focus();
  });

  socket.addEventListener("message", (event) => {
    const chatEvent = JSON.parse(event.data);
    addMessage(chatEvent);
  });

  socket.addEventListener("close", () => {
    connectionStatus.textContent = "Offline";
    addMessage({ type: "error", message: "Disconnected from server" });
    socket = undefined;
  });

  socket.addEventListener("error", () => {
    connectError.textContent = "Could not connect to the server.";
  });
}

function sendMessage() {
  const outgoing = createOutgoingMessage(messageInput.value);
  if (!outgoing) {
    return;
  }

  sendToServer(outgoing);
  messageInput.value = "";
}

function sendToServer(message) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    addMessage({ type: "error", message: "You are not connected." });
    return;
  }

  socket.send(JSON.stringify(message));
}

function addMessage(event) {
  const description = describeChatEvent(event);
  const item = document.createElement("li");
  item.className = `message ${description.tone}`;

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = description.label;

  const text = document.createElement("div");
  text.className = "message-text";
  text.textContent = description.text;

  item.append(meta, text);
  messages.append(item);
  messages.scrollTop = messages.scrollHeight;
}
