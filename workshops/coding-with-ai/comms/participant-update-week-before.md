# Slack Setup Message

Hi everyone!

For Friday’s workshop, we need you to install some tools and subscribe to an affordable AI coding subscription.

We will all work on the same provided project.

The goal is to practice using an AI coding agent while still checking, understanding, and owning the code we accept.

I will post a setup screenshot in this thread showing the expected result for:

- `git --version`
- `node --version`
- `npm --version`
- OpenCode

If your setup looks similar, you do not need to reply.

If you get stuck or your output looks different, reply in this thread.

## Install/check the required tools

- Git: <https://git-scm.com/downloads>
- Node.js 20 or newer: <https://nodejs.org/>
- A paid coding agent
  - If you already subscribe to Claude Code or Codex, you can use those.
  - Otherwise I recommend OpenCode: <https://opencode.ai/download>
  - If you like using software in the terminal, install the CLI version.
  - Otherwise, for ease of use, install the desktop version.
- Optional: VSCode or another code editor: <https://code.visualstudio.com/download>
- Browser, which you probably already have: Google Chrome: <https://www.google.com/chrome/>

## Instructions to install / subscribe to OpenCode

1. Subscribe to OpenCode Go: <https://opencode.ai/go>

   OpenCode Go is $5 for the first month, then $10/month. You can cancel immediately after the workshop if you are unsure.

   Subscribe, then copy your OpenCode Go API key.

2. Open OpenCode to connect it to OpenCode Go.

   For the CLI version, type:

   ```text
   /connect
   ```

   You should see a popup letting you select **OpenCode Go**. Paste your API key there.

   For the desktop version, click the gear icon on the bottom left, then click **Providers**. You should see **OpenCode Go** listed there. Paste your API key there.

3. Test that OpenCode is working.

   In the main chat window, type:

   ```text
   /model
   ```

   A popup should show different AI models.

   Under **OpenCode Go**, select **MiniMax-M3**.

   Type this in the chat window and hit enter:

   ```text
   Hello
   ```

   You should see it greet back.

Setup problems are normal. Please send them early so we can fix them before Friday.
