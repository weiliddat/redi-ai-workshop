# Eval 3: Novice-Shaped Prompts

Test how each model handles messy, vague prompts that reflect how students actually type.

## Setup

For prompts N1–N3, send each as a standalone message — no prior context.

For N4 and N5, you need to provide broken code or a browser console error. Use the examples below.

---

## Prompts

**N1:**
> it works but i dont understand what onmessage does here

(Send as a standalone message — no code attached. The model has to decide whether to ask for context or make reasonable assumptions.)

**N2:**

Paste the working chat client from Eval 1, then ask:

> can you make this show when people join but keep my code

**N3:**
> why does it say refused??

(Send standalone. No error message, no code, no context.)

**N4:**

Paste this broken code, then ask: "i changed something and now nothing works"

```javascript
<!DOCTYPE html>
<html>
<head><title>Chat</title></head>
<body>
  <input id="url" value="ws://localhost:3000">
  <input id="name" placeholder="Your name">
  <button onclick="connect()">Connect</button>
  <div id="messages"></div>
  <input id="msg" placeholder="Type a message">
  <button onclick="send()">Send</button>
  <script>
    let ws;
    function connect() {
      const url = document.getElementById('url').value;
      const name = document.getElementById('name').value;
      ws = new WebSocket(url + '?name=' + name);
      ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        const div = document.createElement('div');
        div.textContent = data.name + ': ' + data.text;
        document.getElementById('messages').appendChild(div);
      };
    }
    function send() {
      const msg = document.getElementById('msg').value;
      ws.send(msg);
      document.getElementById('msg').value = '';
    }
  </script>
</body>
</html>
```

(The bug: `ws.send(msg)` sends a raw string instead of `JSON.stringify({type: "message", text: msg})`. The model should identify this, not suggest a full rewrite.)

**N5:**

Paste only this browser console error, no other context:

> what is this error
>
> ```
> Uncaught SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
>     at JSON.parse (<anonymous>)
>     at WebSocket.ws.onmessage (index.html:34:28)
> ```

---

## What to check

For each response, evaluate:

1. **Asks clarifying questions or makes reasonable assumptions?** — Does it handle the missing context gracefully?
2. **Gives a useful answer despite the vague prompt?** — Does the response actually help, or is it generic filler?
3. **Avoids dumping a full rewrite?** — Does it make a targeted fix/explanation, or rewrite everything from scratch?
4. **Right level — not too advanced, not patronizing?** — Would a student with 6–12 months of coding feel respected and helped?

## Pass criteria

The model should handle messy prompts gracefully. It doesn't need to be perfect — but it should not hallucinate causes, give irrelevant answers, or overwhelm students with jargon.
