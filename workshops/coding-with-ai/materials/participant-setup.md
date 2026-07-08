# Participant Setup

Please do this before the workshop.

If something does not work, tell the facilitator in Slack before the session. Setup problems are much easier to fix before class.

## What you need

Install and check these tools:

- Git: <https://git-scm.com/downloads>
- Node.js 20 or newer: <https://nodejs.org/>
- A paid coding agent
  - If you already subscribe to Claude Code or Codex, you can use those.
  - Otherwise, use OpenCode: <https://opencode.ai/download>
  - If you use OpenCode, use OpenCode Go for model access: <https://opencode.ai/go>
- Browser, which you probably already have. Google Chrome: <https://www.google.com/chrome/>
- the workshop chat client zip, when the facilitator sends it

If you cannot get your coding agent working, tell the facilitator. If OpenCode Go does not work, we will use MiMo V2.5 Pro or MiMo V2.5 Free as the fallback.

## 1. Check Git

In your terminal, run:

```bash
git --version
git config --global user.name
git config --global user.email
```

If Git does not show your name and email, set them:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the email you normally use for Git work. If you do not want to use a personal email during the workshop, ask the facilitator what placeholder to use.

## 2. Check Node.js

Run:

```bash
node --version
npm --version
```

Node should be version 20 or newer.

If your version is older, install the current LTS version from <https://nodejs.org/>.

Participants need Node.js to run the provided project checks with `npm test` and start the local client with `npm start`.

## 3. Check Chrome

Open Google Chrome.

We will use the browser to check the chat client during the workshop.

## 4. Optional: install a code editor

You do not need a code editor for the workshop if OpenCode is working. OpenCode can inspect files, edit code, and show diffs.

If you already use VSCode or another editor, you can keep it open as a backup. If you want to install VSCode, use <https://code.visualstudio.com/download>.

## 5. Install or check your paid coding agent

If you already subscribe to Claude Code or Codex, you can use that for the workshop.

Otherwise, install OpenCode from <https://opencode.ai/download>.

If you like using software in the terminal, install the CLI version.

Otherwise, for ease of use, install the desktop version.

## 6. Connect OpenCode to OpenCode Go

If you are using Claude Code or Codex, skip this section.

Subscribe to OpenCode Go at <https://opencode.ai/go>.

OpenCode Go is $5 for the first month, then $10/month. You can cancel immediately after the workshop if you are unsure.

After subscribing, copy your OpenCode Go API key.

If you install the CLI version, check it runs:

```bash
opencode --version
```

If your terminal says `opencode: command not found`, close and reopen the terminal, then try again.

If you installed the CLI version, start OpenCode:

```bash
opencode
```

Then type:

```text
/connect
```

Choose **OpenCode Go** and paste your API key.

Do not post your API key in public Slack channels or share it outside the workshop.

If you installed the desktop version, open OpenCode and connect the **OpenCode Go** provider there.

Inside OpenCode, open the model selector. In the CLI, type:

```text
/model
```

Under **OpenCode Go**, choose **MiniMax-M3**.

If MiniMax-M3 is not available, tell the facilitator. We will use one of the fallback models.

## 7. Check your setup against the facilitator screenshot

After your coding agent starts, ask it:

```text
Hello
```

Compare your setup with the facilitator's screenshot in Slack. It should show the expected result for:

- `git --version`
- `node --version`
- `npm --version`
- OpenCode

If your setup reaches the same state, you do not need to reply.

If something fails or looks different, reply in Slack with the step that failed and a screenshot of the error.

This is not a test of your coding skill. It helps us find setup problems early without asking everyone to post a screenshot.

## 8. Check the workshop project

When the facilitator sends the chat client zip, download it.

You do not need to clone a repository before the workshop. We will create the Git repo from the unzipped project together.

If you want to check the project opens, unzip it and run:

```bash
cd workshop-chat-client
npm test
npm start
```

Then open:

```text
http://localhost:5173
```

It is okay if you cannot connect to the chat server yet. The facilitator will run the server during the workshop.

## Privacy rule

Use only the workshop project and workshop data with AI tools.

Do not paste private project, client, or personal data into an AI tool unless the project owner has confirmed it is allowed.

## Setup help message

If something fails, send this in Slack:

```text
I need setup help.
My computer is: macOS / Windows / Linux
The step that failed is:
The error message is:
Screenshot attached:
```
