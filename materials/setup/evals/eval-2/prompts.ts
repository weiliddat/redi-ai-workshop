export interface Prompt {
	id: string;
	category:
		| "conceptual"
		| "code-explanation"
		| "debugging"
		| "feature-extension";
	messages: { role: "user" | "system"; content: string }[];
}

const BASELINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>WebSocket Chat</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }

    h1 {
      margin-bottom: 10px;
    }

    .controls {
      margin-bottom: 10px;
    }

    .controls input {
      margin-right: 5px;
      padding: 5px;
    }

    .controls button {
      padding: 5px 10px;
    }

    #status {
      margin-bottom: 10px;
      font-weight: bold;
    }

    #messages {
      border: 1px solid #ccc;
      height: 300px;
      overflow-y: auto;
      padding: 5px;
      margin-bottom: 10px;
      background: #fafafa;
    }

    .message {
      margin-bottom: 5px;
      white-space: pre-wrap;
    }

    #chatForm input {
      width: 80%;
      padding: 5px;
    }

    #chatForm button {
      padding: 5px 10px;
    }
  </style>
</head>
<body>
  <h1>WebSocket Chat</h1>

  <div class="controls">
    <input id="serverUrl" type="text" value="ws://localhost:3000" />
    <input id="nameInput" type="text" placeholder="Your name" />
    <button id="connectBtn">Connect</button>
    <button id="disconnectBtn" disabled>Disconnect</button>
  </div>

  <div id="status">Disconnected</div>

  <div id="messages"></div>

  <form id="chatForm">
    <input id="messageInput" type="text" placeholder="Type a message..." autocomplete="off" />
    <button type="submit">Send</button>
  </form>

  <script>
    let socket = null;

    const serverUrlInput = document.getElementById('serverUrl');
    const nameInput = document.getElementById('nameInput');
    const connectBtn = document.getElementById('connectBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const statusEl = document.getElementById('status');
    const messagesEl = document.getElementById('messages');
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');

    function setStatus(text) {
      statusEl.textContent = text;
    }

    function addMessage(text) {
      const div = document.createElement('div');
      div.className = 'message';
      div.textContent = text;
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function connect() {
      const baseUrl = serverUrlInput.value.trim();
      const name = nameInput.value.trim();

      if (!baseUrl || !name) {
        alert('Please enter server URL and name');
        return;
      }

      const url = baseUrl + '?name=' + encodeURIComponent(name);

      socket = new WebSocket(url);

      socket.onopen = () => {
        setStatus('Connected');
        connectBtn.disabled = true;
        disconnectBtn.disabled = false;
      };

      socket.onclose = () => {
        setStatus('Disconnected');
        connectBtn.disabled = false;
        disconnectBtn.disabled = true;
        socket = null;
      };

      socket.onerror = () => {
        setStatus('Disconnected');
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          const time = new Date(data.timestamp || Date.now()).toLocaleTimeString();

          if (data.type === 'message') {
            addMessage(\`[\${time}] \${data.name}: \${data.text}\`);
          } else if (data.type === 'join') {
            addMessage(\`[\${time}] \${data.name} joined\`);
          } else if (data.type === 'leave') {
            addMessage(\`[\${time}] \${data.name} left\`);
          } else if (data.type === 'error') {
            addMessage(\`[ERROR] \${data.message}\`);
          }
        } catch (e) {
          addMessage('Invalid message received');
        }
      };
    }

    function disconnect() {
      if (socket) {
        socket.close();
      }
    }

    connectBtn.addEventListener('click', connect);
    disconnectBtn.addEventListener('click', disconnect);

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }

      const text = messageInput.value.trim();
      if (!text) return;

      socket.send(JSON.stringify({
        type: 'message',
        text: text
      }));

      messageInput.value = '';
    });
  </script>
</body>
</html>`;

const EXTENDED_API_SPEC = `Additional Commands
===================

Change your display name (/nick):

  Client → Server:
    {"type": "nick", "name": "new-name"}

  Server → Client (broadcast to all):
    {"type": "nick", "oldName": "Alice", "name": "AliceNew", "timestamp": "2025-06-15T14:30:00Z"}

  The new name must also be unique. If it's taken:
    {"type": "error", "message": "name already taken"}

List connected users (/list):

  Client → Server:
    {"type": "list"}

  Server → Client (to you only):
    {"type": "list", "names": ["Alice", "Bob", "Charlie"], "timestamp": "2025-06-15T14:30:00Z"}

  The list includes your own name. Order is not guaranteed.`;

export const PROMPTS: Prompt[] = [
	// Conceptual — single sanity check (most nuanced of the three)
	{
		id: "C2",
		category: "conceptual",
		messages: [
			{
				role: "user",
				content:
					"What is a callback function? Why do I pass a function to `ws.onmessage` instead of just writing the code directly?",
			},
		],
	},

	// Code explanation — counterfactual reasoning + common misconception
	{
		id: "E2",
		category: "code-explanation",
		messages: [
			{
				role: "user",
				content: `Here is my chat client code:\n\n${BASELINE_HTML}`,
			},
			{
				role: "user",
				content: "What would break if I removed the `onmessage` handler?",
			},
		],
	},
	{
		id: "E3",
		category: "code-explanation",
		messages: [
			{
				role: "user",
				content: `Here is my chat client code:\n\n${BASELINE_HTML}`,
			},
			{
				role: "user",
				content:
					"Why do we need `JSON.stringify` when sending a message? Can't I just send the object directly?",
			},
		],
	},

	// Debugging — specific errors with verifiable causes + a harder discriminator
	{
		id: "D1",
		category: "debugging",
		messages: [
			{
				role: "user",
				content:
					"I'm getting `WebSocket connection to 'ws://localhost:3000' failed` in the browser console. What does this mean?",
			},
		],
	},
	{
		id: "D3",
		category: "debugging",
		messages: [
			{
				role: "user",
				content:
					"I see `Uncaught SyntaxError: Unexpected token` in the console when a message arrives. What is happening?",
			},
		],
	},
	{
		id: "D4",
		category: "debugging",
		messages: [
			{
				role: "user",
				content: `Here is my chat client code:\n\n${BASELINE_HTML}\n\nWhen I send a message, it appears twice in my chat window. Why?`,
			},
		],
	},

	// Feature extension — trap (timestamp already partly implemented) + multi-step spec mapping
	{
		id: "F1",
		category: "feature-extension",
		messages: [
			{
				role: "user",
				content: `Here is my chat client code:\n\n${BASELINE_HTML}\n\nHere is the extended API spec:\n\n${EXTENDED_API_SPEC}`,
			},
			{
				role: "user",
				content:
					"How do I show a timestamp next to each message? Explain each step.",
			},
		],
	},
	{
		id: "F2",
		category: "feature-extension",
		messages: [
			{
				role: "user",
				content: `Here is my chat client code:\n\n${BASELINE_HTML}\n\nHere is the extended API spec:\n\n${EXTENDED_API_SPEC}`,
			},
			{
				role: "user",
				content:
					"How do I add a `/nick` command that changes my display name? Walk me through what needs to change.",
			},
		],
	},
];
