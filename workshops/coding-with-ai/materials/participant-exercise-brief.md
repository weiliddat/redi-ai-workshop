# Practice Exercise Brief

Keep this open during practice. It has everything you need for the next 20 minutes.

## Setup

You should already have the chat client from the zip. If not, ask a helper now.

```bash
cd workshop-chat-client
git init
git add .
git commit -m "Start workshop chat client"
npm test
npm start
```

Then open `http://localhost:5173` and connect to the facilitator's server URL (shared on screen).

## Starting baseline

Everyone starts from the same files: the unzipped `workshop-chat-client` with your own first commit. If `git status` is not clean, ask a helper before you continue.

## Your task: show message times

The server sends a `timestamp` field with most events. The client ignores it. Make chat messages and system events show a short local time, such as `10:42`.

Full task details: [PRACTICE_TASK.md](project/PRACTICE_TASK.md) in your project folder.

## Acceptance criteria

- A chat message shows the sender name and a short time.
- Join, leave, nickname, and online-list events show a short time when the server provides one.
- Error messages still work when there is no timestamp.
- Existing tests pass: `npm test`
- At least one new or updated test covers the time formatting.
- The change looks right in the browser.

## Work the loop

1. Confirm a clean `git status`.
2. Create a branch: ask the agent for the command if unsure.
3. Ask the agent to inspect before editing. Try this prompt:

   ```text
   Inspect this chat client before editing. I want to show a short local time for server events that include a timestamp. Keep the change small. First explain which files you would change and why. Do not edit yet.
   ```

4. Ask for a short plan.
5. Ask for the smallest change.
6. Run the check: `npm test`, then look at the result in the browser.
7. Read the diff: `git diff`. Can you explain every changed line?
8. If you have time: ask the agent to quiz you on the change.
9. Commit with a message that says why.
10. Note one lesson you learned. You will share it in pair review.

The [AI coding checklist](ai-coding-checklist.md) has more useful prompts for each step.

## Watch out for

- The time must come from the server's `timestamp` field, not from when your browser renders the message. Agents get this wrong. Check the diff.
- If the agent changes files you did not ask about, read the diff and ask why.
- If a fix fails twice, stop. Ask the agent to explain the failure before changing more code.

## Stop point

At the facilitator's call (around minute 50): **commit what you have, even if unfinished.** An honest work-in-progress commit is part of the exercise.

Before pair review, be ready to explain:

- what changed
- how you checked it
- what you would watch for in review

## Finished early?

Add one small follow-up in a **separate commit**:

- fix the rejected-connection bug (see "Known bug for practice" in the project README), or
- show a clearer empty-state message before the first chat event, or
- add one test for an event type you did not touch.

## Privacy rule

Use only this workshop project and workshop data with AI tools. Do not paste private project, client, or personal data into an AI tool.
