# Teacher Runbook

The minute-by-minute script for the 60-minute workshop. Content files in `contents/` explain what to teach and why; this file says what to do and when.

## The one demo

This run demos the **rejected-connection bug fix** (the demo from content 04), run once through the full loop.

Why this demo and not the broad-vs-focused contrast from content 02:

- It has visible user impact: the room watches a real bug disappear in the browser.
- It shows verification, the weakest habit in the room.
- It keeps the timestamp task fresh for practice.
- The 02 contrast still happens, as one sentence during the demo, not a second run.

Side effect: the bug-fix stretch task becomes easier for participants who watched closely. That is fine.

## Before the workshop

1. Package and verify the zip per [shared-project-guide.md](shared-project-guide.md): unzip it fresh, then run `npm test` and `npm start`.
2. Start the chat server from `workshops/learning-with-ai/materials/chat-server` and start the ngrok tunnel.
3. Confirm that `wss://quick-badly-amoeba.ngrok-free.app` connects to the server. The same URL should be prefilled in the chat client and shown on the practice slide. Replace it in both places when this material is reused with another destination.
4. Confirm OpenCode auth works and `/model` shows **MiniMax-M3** under OpenCode Go.
5. Confirm the recorded demo plays. This is the AI-failure fallback.
6. Smoke-check the duplicate-name flow and one timestamped chat event in the browser.
7. If using a shared key, confirm that two OpenCode sessions can run at the same time.

## Timing

| Time | Section | Hard call |
| ---- | ------- | --------- |
| 0:00 | Why AI coding needs a workflow | |
| 0:08 | The AI coding loop | |
| 0:15 | Who already knows this? (room check) | Start the demo inspect prompt in the background now |
| 0:20 | Demo: fix the rejected-connection bug | Stop demo at 0:30 even if unfinished |
| 0:30 | Practice: show message times | |
| 0:50 | | **"Commit what you have, even unfinished."** Say it to the whole room. |
| 0:52 | Pair review | |
| 0:57 | Wrap-up + feedback question | |

## 0:00 — Why AI coding needs a workflow (8 min)

Teach from [contents/01](../contents/01-ai-in-project-work.md). One idea to land: AI makes you faster, but speed is not the same as good project work. The loop keeps you in control.

## 0:08 — The AI coding loop (7 min)

Teach from [contents/02](../contents/02-version-control-as-safety-net.md)–[05](../contents/05-improve-the-working-agreement.md), compressed to the loop itself: clean start, inspect, write a plan, evaluate the feedback, decide what to use, implement the revised plan, check, review the diff, commit, record one lesson.

Name the two Git concepts in one breath each: diff (the exact change before you accept it), commit (a checkpoint you can explain and return to).

## 0:15 — Room check (5 min)

Ask, hands up: "Who has used Git on a real project? Who has used a coding agent like OpenCode, Claude Code, or Codex? Who has written a test? Who has done a browser check or code review?"

Ask the experienced hands to sit near someone newer and help during practice — questions, not keyboard. Point helpers to the [reviewer and facilitator guide](reviewer-facilitator-guide.md).

**While the room re-sorts, start the demo's inspect prompt in your OpenCode session.** This hides the first latency wait.

## 0:20 — Demo (10 min)

Fix the rejected-connection bug using the full loop. Narrate each loop step by name as you do it.

Setup on screen: `workshop-chat-client` fresh from the zip, first commit made, server running, two browser tabs open.

1. **Show the bug (1 min).** Connect in tab one as `Sam`. Connect in tab two as `Sam`. Tab two shows a disconnect message and a dead end. Say: "Real bug, clear user impact, small fix. This is the size of task you give an agent."
2. **Clean status (30 s).**
   ```bash
   git status
   ```
3. **Inspect before editing (90 s).** Show the response to the prompt you started at 0:15:
   ```text
   When the server rejects my connection because the name is already taken, the client shows a disconnect message but does not return me to the join form. Inspect the client before editing and tell me which files are involved and why. Do not edit yet.
   ```
   Expected: it names `src/app.js` for connection state, close handling, and join form visibility.
   One-sentence contrast (this is the 02 demo, compressed): "The lazy version is 'improve this page and fix anything you find.' You'd get ten changed files and no idea which one fixed the bug."
4. **Write a plan and ask AI to evaluate it (90 s).** Write this plan yourself, then send it:
   ```text
   My plan:
   1. Keep the server unchanged.
   2. Preserve the server's rejection message.
   3. Return the client to the join form after a rejected connection closes.
   4. Keep the normal Disconnect button behavior working.
   5. Add or update the smallest useful test if this logic can be tested without a browser.

   Evaluate my plan against the code you inspected. Tell me what I missed or should change. Do not edit yet.
   ```
   Pause after the response. Say: "AI feedback is input, not a decision. I am still responsible for what we do next."

   Narrate one choice based on the actual response:
   - If the feedback improves the plan, say what you accept and revise.
   - If it adds nothing useful, say why you are keeping the plan unchanged.
5. **Implement the plan (90 s).** Restate the plan you chose, then send:
   ```text
   Here is the plan I want to use: [restate the final plan]. Implement it. Keep the change focused and do not refactor unrelated code.
   ```
6. **Check (1 min).** `npm test`, then the two-tab duplicate-name flow again. The fix works when tab two shows the error and can retry.
7. **Read the diff — teach it (60 s).** `git diff`. Say exactly this much:
   - Lines with `-` were removed, lines with `+` were added.
   - Read the file names first: are these the files you expected from the inspect step?
   - Then read the `+` lines: can you say what each one does?
   - An unrelated change looks like this: a renamed variable, a reformatted block, or a touched file the task didn't need. If you see one, ask the agent why, and ask it to undo what isn't needed.
8. **Commit (30 s).**
   ```bash
   git add .
   git commit -m "Return to join form after rejected connection so users can retry"
   ```
   Point out the message says *why*, not just "fix bug".
9. **Record one lesson (20 s).** Say one instruction or check that would make the next task easier. Do not expand the demo to edit documentation if time is short.

If the agent goes sideways mid-demo: say "this happens," undo with `git checkout .`, and switch to the recording (see fallback). A visible recovery is a better lesson than a perfect demo.

Hard stop at 0:30, even mid-step. Practice time is protected.

## 0:30 — Practice (20 min)

Send participants to the [practice task](project/PRACTICE_TASK.md). Put the server URL and the task link on screen.

Say three things, then get out of the way:

- "One small task: show message times. The practice task has the requirements."
- "Work the loop. If you skip a step, notice it and go back."
- "The trap in this task: agents often use browser time instead of the server's `timestamp` field. Read your diff."

Circulate. Use the review questions from the [reviewer and facilitator guide](reviewer-facilitator-guide.md). Slow anyone down who is about to commit a diff they can't explain.

Known failure modes with MiniMax-M3, from the model evaluation:

| Symptom | What to say |
| ------- | ----------- |
| Generic first answer, no file inspection | "Ask it to inspect the files and point to specific lines before you write your plan." |
| Uses render time, not server `timestamp` | "Where does the time come from? Check the diff against the server event in the README protocol section." |
| Says only `npm test`, skips the browser | "Tests pass — does it look right? Open the browser." |
| Edits during a question you asked | "Read the diff. Ask it to undo anything you didn't ask for." |
| Same failing fix twice | "Stop the loop. Ask it to explain the failure before touching code." |

## 0:50 — Hard call

To the whole room: **"Two minutes. Commit what you have, even unfinished. A work-in-progress commit you can explain beats uncommitted perfect code."**

## 0:52 — Pair review (5 min)

Pairs swap. Each person explains, without reading agent output aloud: their plan, one AI suggestion they accepted or rejected, what changed, how they checked it, and one lesson they'd note for next time.

## 0:57 — Wrap-up (3 min)

From [contents/07](../contents/07-wrap-up.md): the three closing questions, the checklist link, the loop in one breath.

Then the feedback question, answered out loud or in Slack before leaving: **"Which step of the loop will you actually use next week?"**

## AI-failure fallback

If OpenCode, OpenCode Go, or the model fails for the room:

1. Individual failures: pair the blocked participant with a neighbor whose setup works. They drive the loop together.
2. Facilitator or widespread failure: screen-share the recorded terminal session from the solo run and walk the loop over it. Participants follow along and still do the Git, diff-reading, and commit steps on their own machines with hand-written changes if needed.
3. Model fallback order: MiniMax-M3 → MiMo V2.5 Pro → MiMo V2.5 Free (`/model` in OpenCode).

## Friday morning

- Check the Slack thread; pair blocked participants with working setups.
- Re-run steps 1–4 of the pre-workshop checklist.
- Confirm the recording plays.
