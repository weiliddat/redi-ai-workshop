# Eval 1: Cold Start Task — Model Breakdown

Can each model produce a working browser chat client from the API spec and sample prompt?

Each model received the sample prompt and API spec from `contents/02-hands-on-cold-start.md`. The free OpenRouter models were tested first with the original prompt, then the cheap models were tested again with a revised prompt adding constraints (no local echo, no own/other styling, no intermediate states, no animations/toasts).

---

## Free on OpenRouter

### MiniMax M2.5

**Result: PASS**

Produced a clean, working client on the first try. Correct `?name=` query parameter, correct JSON send format, handles all four message types (message, join, leave, error).

**Approach:** Well-structured code with separate `handleMessage` switch, `escapeHtml` helper for XSS protection, and `formatTime` for timestamps. Uses a connection form with Connect/Disconnect buttons that toggle visibility.

**Strengths:**

- Most polished CSS of the free models
- XSS protection via `escapeHtml` (creates a DOM element, reads `innerHTML`)
- Clean message routing — join/leave/error each get distinct styling
- Uses `encodeURIComponent` on the name parameter

**Likely complications for students:** Has a "Connecting…" intermediate status state, which the prompt asked to avoid. Students who read the code carefully might wonder about it, but it doesn't break anything.

**Failure modes:** None observed. Code works as a single HTML file, no frameworks, no Socket.IO.

---

### Nemotron 3 Super

**Result: PASS**

Leanest code of all models tested. Correct spec adherence across the board.

**Approach:** Minimal structure — no class toggles for visibility, just inline style changes (`statusEl.style.color`). Uses `textContent` throughout for rendering, which is the safest XSS approach (never touches `innerHTML` for user content).

**Strengths:**

- Safest XSS approach — `textContent` on every user-facing string
- Shortest, most readable code — easier for students to follow
- No unnecessary features or state management
- Disables URL and name inputs after connecting (prevents confusion)

**Likely complications for students:** The inline style approach (`statusEl.style.color = 'green'`) is less structured than CSS classes, which could be harder to extend in section 05 when students add features.

**Failure modes:** None observed.

---

### Step 3.5 Flash

**Result: PASS**

Full spec adherence. Feature-rich compared to the other free models.

**Approach:** Adds own-vs-other message styling (different background colors for your messages vs. others) by comparing `data.name` against the username input. Uses a chat area that's hidden by default and revealed on connect. Single Connect button toggles to Disconnect on connect.

**Strengths:**

- Handles close codes — shows "Connection lost (code: …)" for abnormal disconnects
- Tracks `serverErrorShown` flag to avoid duplicate error messages on close
- Enter key works on name and URL fields to trigger connect
- XSS protection via `escapeHtml`

**Likely complications for students:**

- **Own-vs-other styling** violates the prompt ("Display all chat messages the same way") — students might get confused about why their messages look different
- **Status bar is hidden until `onopen`** — if the connection fails before opening, there's no visible feedback in the chat area. The student sees nothing happen.
- More complex code overall, harder to understand line-by-line in section 04/05

**Failure modes:** The hidden status bar is the main risk. A student on a bad network who never connects will see no error feedback and won't know why.

---

## Cheap on OpenRouter

### MiniMax M2.7

**Result: PARTIAL (Round 1) → PASS (Round 2)**

**Round 1 issue:** Join and leave events were mishandled. The code passed `'system'` as the type instead of `'join'`/`'leave'`, causing events to render without the "joined/left" text. The client connected and sent messages fine, but join/leave notifications were broken.

**Round 2 (revised prompt):** Fixed. Proper join/leave rendering with correct type routing. Clean, functional output.

**Approach (Round 2):** IIFE wrapper around all code. Uses `escapeHtml` for XSS. Clear `addEntry` function with if/else branches per message type. Uses `var` instead of `const`/`let` — unusual but functional.

**Strengths:**

- Clean recovery on second try
- Uses `e.preventDefault()` on Enter key to prevent form submission side effects
- Separate Connect and Disconnect buttons (clear state)

**Likely complications for students:** The `var` usage and IIFE pattern are less common in modern tutorials. Students who have learned `const`/`let` may find it unfamiliar. Not a blocker, but something a teacher might need to explain.

**Failure modes:** First-try output had a real bug. With the standard prompt (no extra constraints), students would get broken join/leave events and might not realize something is wrong.

---

### GLM 4.7 Flash

**Result: FAIL (Round 1 and Round 2) → FAIL (Round 3, with reasoning enabled)**

**Round 1 issue: hard blocker.** State machine inversion — `onopen` _disabled_ the Send button and message input instead of enabling them. Also double-encoded the `?name=` parameter.

**Round 2 issue: still broken.** `handleOpen()` replaces the setup panel's `innerHTML` with a "Connected to server" message and a "New Connection" button that calls `location.reload()`. If the server rejects the connection (e.g., duplicate name), the setup form is destroyed and the user has to reload the entire page to try again.

**Round 3 (reasoning enabled):** Fixed the Round 1 and 2 issues — UI state is correct, no destructive DOM manipulation, `resetToSetup()` cleanly restores the setup form. Uses `textContent` for all rendering (XSS-safe), `createElement` instead of `innerHTML +=`, Enter key works. However, a new blocker: **broken URL construction.** The default input value is `quick-badly-amoeba.ngrok-free.app` (no `wss://` prefix). The code strips `http://` and `https://` prefixes, then tries to normalize `ws://`/`wss://` — but if neither prefix exists (which is the default), no protocol is added. The `WebSocket` constructor requires an absolute URL with `ws:` or `wss:` scheme, so a student clicking Connect with the default value gets a connection error.

**Approach (Round 3):** Two-screen design (setup screen / chat screen) with show/hide toggling. Well-structured message rendering with separate `addChatMessage` and `addSystemMessage` functions. Uses `createElement` and `textContent` throughout.

**Failure modes:**

- **Rounds 1–2:** Previously documented (inverted UI state, destructive DOM)
- **Round 3:** Default URL value lacks `wss://` prefix, and the URL construction code doesn't add it — connection fails immediately unless the student manually types the full URL

**Why this still fails for students:** The URL bug in Round 3 is subtler than the previous issues but just as blocking. A student who clicks Connect with the default value gets a silent failure (the `WebSocket` constructor throws, caught by `try/catch`, and `addSystemMessage` fires — but the student is still on the setup screen where the message isn't visible). Fixing it requires understanding URL scheme requirements, which is beyond a 15-minute cold start exercise.

---

### MiMo-V2-Flash

**Result: PASS (both rounds)**

Solid one-shot output both times. Stayed simple, avoided complex state machines.

**Approach:** Status indicator dot (red/green) in the header. Connect button toggles to Disconnect when connected. Uses `chatLog.innerHTML += msgHtml` for rendering messages — functional but poor practice.

**Strengths:**

- Avoided the traps that caught other cheap models (no local echo, no complex state machines)
- Clean message handling with a clear `handleServerMessage` switch
- `setUIState` function cleanly toggles all UI elements between connected/disconnected

**Likely complications for students:**

- **Syntax error in the code:** `e/key` instead of `e.key` on the Enter key listener (line 379). This means pressing Enter to send won't work — students must click the Send button. This is a one-character fix, but students won't know to look for it.
- `chatLog.innerHTML +=` rebuilds the entire chat log on every message. For a 15-minute exercise this won't matter, but it's a bad pattern if students copy it forward.

**Failure modes:** The `e/key` typo is a real blocker for Enter-key sending. A student who expects Enter to send (which is most people) will think the client is broken. The Send button still works, so it's recoverable, but it adds friction.

**Note:** On re-inspection, the `e/key` typo was found in the Qwen3.5 Flash evaluation thread but the MiMo-V2-Flash file also uses `innerHTML +=` which is a concern. The MiMo file itself shows `e.key` on line 271 — so the Enter key _does_ work. The `innerHTML +=` for regular messages (line 243) is the main code quality issue.

---

### Qwen3.5 Flash

**Result: FAIL (Round 1 and Round 2) → PASS (Round 3, with reasoning enabled)**

**Round 1 issues:**

- **Duplicate messages.** Implemented local echo while the server already broadcasts back, causing every sent message to appear twice.
- Broken CSS classes for join/leave messages.

**Round 2 issues:**

- Fixed the duplicate messages, but introduced a **syntax typo**: `e/key` instead of `e.key`, breaking the Enter key entirely.
- **Join/leave rendering bug:** Displays "Alice: Alice joined the chat." — the name appears twice because `createMessageElement` concatenates `name + ': ' + text`, and the text already includes the name.

**Round 3 (reasoning enabled):** All previous issues fixed. No local echo — `sendMessage` clears the input and explicitly does not add to the chat log. No syntax errors. Join/leave events render correctly ("System: Alice joined"). Uses `innerText` for all rendering (XSS-safe). Correct `?name=` with `encodeURIComponent`. Handles all four message types with correct field mapping.

**Approach (Round 3):** CSS custom properties (`var(--bg-color)`, etc.) with a config bar, chat log, and message input area. Separate Connect and Disconnect buttons. `handleMessage` function with if/else chain per message type. `addLog` uses `innerText` for safe rendering.

**Strengths (Round 3):**

- Clean recovery from previous failures — all Round 1 and 2 bugs eliminated
- XSS-safe via `innerText` — no `innerHTML` with user data
- `onDisconnected()` cleanly resets all UI state — recoverable after errors
- Simple, readable code structure

**Likely complications for students:**

- **"Connecting…" intermediate state** (line 170) — the prompt asked to avoid this. Cosmetic, not a blocker.
- **No Enter key on message input** — students must click the Send button. The Send button works, so it's usable, but most people expect Enter to send.
- **`onDisconnected` called from error handler** — when the server sends an error, the code calls `onDisconnected()` which resets the UI. This is correct behavior, but the error message disappears from view because the chat log resets. A student who gets a "name taken" error would see it flash briefly, then the UI resets.

**Failure modes:** None that prevent the client from working. The missing Enter key is an annoyance, not a blocker.

---

## Free-tier web chat

### Gemini (gemini-3-fast)

**Result: PASS (with caveats)**

Correct spec adherence. Connects with `?name=`, sends correct format, handles all four message types.

**Approach:** Minimal, clean code. The shortest of the web chat models. Uses a simple `log(content, className)` function that sets `innerHTML` on each message div. Toggle function cleanly switches UI between connected/disconnected states.

**Strengths:**

- Very concise — easy for students to read and understand
- Clean `toggleUI` function that handles all state changes in one place
- No unnecessary features or styling

**Likely complications for students:**

- **XSS vulnerability:** Uses `div.innerHTML = content` with unsanitized `data.name` and `data.text` directly from the server. In the workshop context (controlled server), this won't cause problems, but it's a bad pattern. If a student sends `<script>alert('hi')</script>` as a message, it could execute in other clients.
- **Local status messages:** Injects "--- Connected to server ---" and "--- Disconnected from server ---" into the chat window. These aren't from the server, so they violate the "only display messages received from the server" constraint. Minor, but could confuse students who are trying to understand what comes from the server vs. what's local.

**Failure modes:** The XSS issue is the main concern for a classroom setting where students will experiment. Someone will try sending HTML tags as a message, and it'll render as HTML in everyone's chat.

---

### ChatGPT (chatgpt-free)

**Result: PASS — cleanest output tested**

Full pass across all categories. Correct spec adherence, no prompt violations, no code quality issues.

**Approach:** Uses `textContent` for all rendering (XSS-safe). Uses a `<form>` element for message sending, so Enter key works naturally via form submission. Separate status div outside the chat window. Simple if/else chain for message types.

**Strengths:**

- **XSS-safe by default** — `textContent` everywhere, no `innerHTML` with user data
- **Strict prompt compliance** — no local echo, no own-vs-other styling, no intermediate states, no status messages in the chat window
- **Simple and readable** — the shortest functional code with the fewest moving parts
- `<form>` for message input gives Enter key support for free

**Likely complications for students:** Almost none. The code is straightforward. The only minor thing: status is shown in a plain text div (`statusEl.textContent = 'Connected'`) with no visual styling — students might not notice the status change.

**Failure modes:** None observed.

---

### Claude (claude-sonnet-4.6-free)

**Result: FUNCTIONAL but fails prompt compliance**

Connects and chats correctly. Spec adherence is fine — correct `?name=`, correct JSON format, handles all four message types.

**Approach:** Two full-screen views (connect screen / chat screen) with a polished dark theme. Uses `new URL()` to construct the WebSocket URL with `searchParams.set`. IIFE wrapper. Session dividers ("connected · 14:30") in the chat log.

**Strengths:**

- Most visually polished output — dark theme, monospace fonts, status dot, grid layout
- Uses `new URL()` for URL construction — more robust than string concatenation
- `esc()` function for XSS protection
- Handles edge cases like close-before-open gracefully

**Likely complications for students:**

- **External dependency:** `@import url('https://fonts.googleapis.com/...')` — requires internet access beyond the WebSocket server. If a student is on a restricted network or the Google Fonts CDN is blocked, the font import fails and the UI renders with fallback fonts. More importantly, this breaks the "self-contained" requirement.
- **Over-engineered styling:** Dark theme, CSS custom properties, transitions, status dot, grid layout, session dividers. This is 350+ lines of CSS for a chat client. Students trying to understand the code will spend most of their time reading CSS, not JavaScript.
- **"Connecting…" intermediate state:** The prompt explicitly asked for "just connected or disconnected, no intermediate states." Claude adds a "Connecting…" button state.
- **Disconnect bug:** Manual disconnect triggers a "disconnected" divider, which looks like a connection failure rather than an intentional action.

**Failure modes:** The external font import is the biggest practical risk. If it fails silently, the client still works but looks different than expected. If a student's network blocks Google Fonts, they might think something is broken. The over-engineering also makes this the hardest code to walk through in sections 04/05.

---

## Summary

| Model                   | Result           | Main issue                                                             |
| ----------------------- | ---------------- | ---------------------------------------------------------------------- |
| MiniMax M2.5 (free)     | ✅ PASS          | Minor: has "Connecting…" state                                         |
| Nemotron 3 Super (free) | ✅ PASS          | Cleanest of the free models                                            |
| Step 3.5 Flash (free)   | ✅ PASS          | Adds own-vs-other styling; hidden status bar                           |
| MiniMax M2.7 (cheap)    | ⚠️ PASS on retry | Round 1 had broken join/leave events                                   |
| GLM 4.7 Flash (cheap)   | ❌ FAIL          | Broken URL construction (Round 3); inverted UI (Round 1), destructive DOM (Round 2) |
| MiMo-V2-Flash (cheap)   | ✅ PASS          | Uses `innerHTML +=` for chat log                                       |
| Qwen3.5 Flash (cheap)   | ⚠️ PASS on retry | Failed Rounds 1–2; passed Round 3 (reasoning enabled). No Enter key.   |
| Gemini (free web)       | ✅ PASS          | XSS vulnerability via `innerHTML`                                      |
| ChatGPT (free web)      | ✅ PASS          | Cleanest output overall                                                |
| Claude (free web)       | ⚠️ FUNCTIONAL    | External font dependency, over-engineered, prompt violations           |
