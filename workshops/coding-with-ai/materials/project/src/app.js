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
const messages = document.querySelector("#messages");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const disconnectButton = document.querySelector("#disconnect");

let socket;
let disconnectRequested = false;

connectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  connect();
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
});

disconnectButton.addEventListener("click", () => {
  disconnectRequested = true;
  socket?.close();
});

function connect() {
  connectError.textContent = "";
  disconnectRequested = false;

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
    messages.replaceChildren();
    messageInput.focus();
  });

  socket.addEventListener("message", (event) => {
    const chatEvent = JSON.parse(event.data);
    addMessage(chatEvent);
  });

  socket.addEventListener("close", () => {
    if (disconnectRequested) {
      setupPanel.classList.remove("hidden");
      chatPanel.classList.add("hidden");
      chatTitle.textContent = "Disconnected";
      socket = undefined;
      return;
    }

    chatTitle.textContent = "Disconnected";
    addMessage({ type: "error", message: "Disconnected from server" });
    socket = undefined;
  });

  socket.addEventListener("error", () => {
    setupPanel.classList.remove("hidden");
    chatPanel.classList.add("hidden");
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
  meta.textContent = `${description.label}: `;

  const text = document.createElement("div");
  text.className = "message-text";
  text.textContent = description.text;

  item.append(meta, text);
  messages.append(item);
  messages.scrollTop = messages.scrollHeight;
}
