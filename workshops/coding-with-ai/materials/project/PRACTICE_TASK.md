# Practice Tasks

Keep this file open during the workshop. It contains the main task, the AI coding loop, and optional tasks you can try during or after the workshop.

## Before you start

Follow the setup instructions in `README.md`.

Confirm that:

- `npm test` passes
- the client opens at `http://localhost:5173`
- `git status` is clean

## Main task: show message times

The server sends a `timestamp` field with most events. The client ignores it.

Update the client so chat messages and system events show a short local time, such as `10:42`.

Keep the change small.

### Requirements

- A chat message shows the sender name and a short time.
- Join, leave, nickname, and online-list events show a short time when the server provides one.
- Error messages still work when there is no timestamp.
- Existing tests pass with `npm test`.
- At least one new or updated test covers time formatting.
- The change looks correct in the browser.

### Watch out

The time must come from the server's `timestamp` field, not from when the browser renders the message. Check this in the diff.

## Work the AI coding loop

1. Confirm a clean `git status`.
2. Ask the agent to inspect before editing:

   ```text
   Inspect this chat client before editing. I want to show a short local time for server events that include a timestamp. Keep the change small. First explain which files you would change and why. Do not edit yet.
   ```

3. Write a short plan in your own words. A high-level plan is enough. Ask the agent to evaluate it:

   ```text
   Here is my plan: [write your plan]. Evaluate it against the task and the code you inspected. Tell me what I missed or should change. Do not edit yet.
   ```

   If you are unsure, ask AI questions or ask it to explain a few options first. The point is to stay involved and choose the plan, not to already know the perfect solution.

4. Decide which feedback to accept, revise your plan, then ask the agent to implement it:

   ```text
   Implement my revised plan. Keep the change focused and do not refactor unrelated code.
   ```

5. Run `npm test`, then check the result in the browser.
6. Read `git diff`. Can you explain every changed line?
7. If you have time, ask the agent to quiz you on the change.
8. Commit with a message that explains why.
9. Note one lesson you would add to the project documentation.

If the agent changes files you did not ask about, read the diff and ask why. If a fix fails twice, stop and ask the agent to explain the failure before changing more code.

## Stop point

At the facilitator's call, commit what you have, even if it is unfinished. An honest work-in-progress commit is part of the exercise.

Before pair review, be ready to explain:

- your plan and one AI suggestion you accepted or rejected
- what changed
- how you checked it
- what you would watch for in review

## Optional follow-up tasks

Try one follow-up in a separate commit during or after the workshop.

### Return to the join form after a rejected connection

When the server rejects a connection, the client shows a disconnect message but does not return to the join form.

Make the error visible near the join form and let the user try again without refreshing. Clicking **Disconnect** should still return to the join form.

### Update the connected name after `/nick`

After `/nick NewName`, the header still says `Connected as OldName`.

Update the header to show `Connected as NewName` after a successful nickname change by the current participant.

Another participant's nickname change must not change your header.

### Improve the empty state

Show a clear message before the first chat event arrives.

### Add another event test

Add a test for an event type that the existing tests do not cover.

### Improve the project documentation

If something slowed you down, add one short setup note or project instruction that would make the next task easier.
