# Practice Task: Show Message Times

## Goal

Make the chat easier to follow by showing the time for each server event.

The server already sends a `timestamp` field for most events. The current client ignores it.

## Task

Update the client so chat messages and system events show a short local time, such as `10:42`.

Keep the change small.

## Acceptance Criteria

- A chat message shows the sender name and a short time.
- Join, leave, nickname, and online-list events show a short time when the server provides one.
- Error messages still work even when there is no timestamp.
- Existing tests pass.
- Add or update at least one test for the timestamp formatting behavior.

## Suggested Check

```bash
npm test
```

Then run the client and check it in the browser:

```bash
npm start
```

## Prompt You Can Try

```text
Inspect this chat client before editing. I want to show a short local time for server events that include a timestamp. Keep the change small. First explain which files you would change and why. Do not edit yet.
```

After you understand the plan, ask the agent to make the smallest change and run the check.

## Stop Point

Before committing, explain:

- what changed
- how you checked it
- what you would watch for in review

## Optional Bug Task

If the facilitator chooses a bug-fix exercise instead, fix this known bug:

When the server rejects a connection, for example because the name is already taken, the client shows a disconnect message but does not return to the join form.

Acceptance criteria:

- A rejected connection shows a useful error near the join form.
- The participant can change the name or server URL and try again without refreshing the page.
- Clicking the **Disconnect** button still returns to the join form.
- Existing tests pass.
- Add or update a small test if the changed logic can be tested without browser automation.

Good practice tasks have:

- a clear user impact
- a small code change
- a check you can run
- a diff you can explain before committing
