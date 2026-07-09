# TODO

Dry run: Thursday. Workshop: Friday. Work is ordered by day, hardest deadline first.

Requirements live in `requirements.md`. Selection criteria live in `materials/shared-project-guide.md`.

## Monday — decisions that block everything else

- [x] Decide the AI tool setup now: OpenCode auth path, or the OpenRouter fallback.
  - Default: OpenCode Go with MiniMax M3.
  - Fallbacks: MiMo V2.5 Pro, then MiMo V2.5 Free if paid access is a blocker.
  - Keep browser validation and repeat runs in the solo run and dry run.

- [x] Choose and pin the shared project.
  - Use `materials/project`: a prepared browser chat client distributed as a zip.
  - Participants initialize Git after unzipping and start from their own first commit.

- [x] Define one practice task plus one stretch task.
  - Practice task: show short local times for chat events. See `materials/project/PRACTICE_TASK.md`.
  - Stretch task: add one small follow-up in a separate commit. See `materials/shared-project-guide.md`.

## Tuesday — comms out, participant materials done

- [x] Send the participant setup message in Slack.
  - Include install/auth steps, the facilitator setup screenshot, and ask only blocked participants to reply in thread.
  - This is the single highest-leverage item. Setup failure is the one risk that can sink the 60 minutes, and Slack is the last chance to catch it before Friday.
  - Keep `comms/participant-update-week-before.md` aligned with `materials/participant-setup.md`.

- [x] Write the participant exercise brief.
  - Done: `materials/participant-exercise-brief.md`.
  - Loop step 8 marked "if you have time"; the step-10 lesson note is the pair-review activity.

- [ ] Do a solo run of the practice task with the actual model before writing the runbook.
  - Folded into the dry run: follow the "Before the workshop" playbook in `materials/teacher-runbook.md`.
  - It covers the browser checks the model evaluation could not run (G1 duplicate-name flow, G2 timestamp display) and records the fallback session.
  - Fill in the `[DRY RUN]` markers in the runbook the same day.

## Wednesday — teacher runbook, ready for the dry run

- [x] Write the teacher runbook.
  - Done: `materials/teacher-runbook.md`.
  - The ONE demo: the rejected-connection bug fix (content 04's demo); the 02 contrast is one sentence inside it.
  - Includes diff-reading 60 seconds, the 0:50 hard call, prompts, commands, timing, failure table, room-check prompt.
  - Expected outputs and latency have `[DRY RUN]` markers to fill during the dry run.

- [x] Define the AI-failure fallback.
  - In the runbook: pair blocked participants; on wider failure, screen-share the recorded solo-run terminal session. Model fallback order included.

- [x] Add one closing feedback question to the wrap-up: "which step of the loop will you actually use?"
  - Added to `contents/07-wrap-up.md` and the runbook.

## Thursday — dry run

- [ ] Run the full 60 minutes against the runbook.
  - Confirm setup, timing, task size, check commands, fallback path, stretch task, and participant instructions.
  - If using a shared key, test concurrent load during the dry run.

- [ ] Same day: fix only what the dry run breaks. Timing trims and instruction wording first; no new content.

## Friday morning — final checks

- [ ] Check the Slack thread for setup problems; pair blocked participants with someone who has a working setup.
- [ ] Confirm the pinned commit, key/auth, and fallback still work.

## Cut for this run (revisit for the next one)

- Expanding the checklist into a worksheet.
- Extra "understand what you accept" example from the Learning with AI workshop.
- Project-memory example in Part 05.
- Reworking contents 02/04 demos for a longer version.
- Reworking the opening hook (the room check already breaks up the first 15 minutes).
