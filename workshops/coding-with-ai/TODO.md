# TODO

Dry run: Thursday. Workshop: Friday. Work is ordered by day, hardest deadline first.

Requirements live in `requirements.md`. Selection criteria live in `materials/shared-project-guide.md`.

## Monday — decisions that block everything else

- [ ] Decide the AI tool setup now: OpenCode auth path, or the OpenRouter fallback.
  - The comms cannot go out with "we will confirm the setup later" again. This was the top failure in the last retro.
  - If using a shared OpenRouter key: set a spend cap and check per-key rate limits for 15-25 concurrent users.

- [x] Choose and pin the shared project.
  - Use `materials/project`: a prepared browser chat client distributed as a zip.
  - Participants initialize Git after unzipping and start from their own first commit.

- [x] Define one practice task plus one stretch task.
  - Practice task: show short local times for chat events. See `materials/project/PRACTICE_TASK.md`.
  - Stretch task: add one small follow-up in a separate commit. See `materials/shared-project-guide.md`.

## Tuesday — comms out, participant materials done

- [ ] Send the participant setup email with a proof-of-success step.
  - Exact install and auth steps, download the chat client zip, then: "run `opencode` and ask it to say hello; reply with a screenshot."
  - This is the single highest-leverage item. Setup failure is the one risk that can sink the 60 minutes, and email-time is the last chance to catch it before Friday.
  - Keep `comms/participant-update-week-before.md` aligned with `materials/participant-setup.md`.

- [ ] Write the participant exercise brief.
  - Setup, starting baseline, task, acceptance criteria, checklist link, privacy note, and stop point.
  - Mark loop steps 8 ("quiz me") and 10 ("record a lesson") as "if you have time," or make the lesson note the pair-review activity.

- [ ] Do a solo run of the practice task with the actual model before writing the runbook.
  - Latency and one-shot behavior will surprise you; this decides whether the 22-minute practice slot is realistic.

## Wednesday — teacher runbook, ready for the dry run

- [ ] Write the teacher runbook.
  - Name which ONE demo happens in the 60-minute version (contents 02 and 04 each describe a demo; only one fits).
  - Include 60 seconds of "how to read a diff" in the demo (what +/- mean, where to look first, what an unrelated change looks like).
  - Hard call at 0:50: "commit what you have, even unfinished" before pair review.
  - Demo prompts, exact commands, expected outputs, timing, common failures, room-check prompt.

- [ ] Define the AI-failure fallback.
  - Simplest: facilitator screen-shares the loop (or a pre-recorded terminal session) and stragglers follow along.

- [ ] Add one closing feedback question to the wrap-up: "which step of the loop will you actually use?"

## Thursday — dry run

- [ ] Run the full 60 minutes against the runbook.
  - Confirm setup, timing, task size, check commands, fallback path, stretch task, and participant instructions.
  - If using a shared key, test concurrent load during the dry run.

- [ ] Same day: fix only what the dry run breaks. Timing trims and instruction wording first; no new content.

## Friday morning — final checks

- [ ] Chase participants who have not sent the setup screenshot; pair them with someone who has a working setup.
- [ ] Confirm the pinned commit, key/auth, and fallback still work.

## Cut for this run (revisit for the next one)

- Expanding the checklist into a worksheet.
- Extra "understand what you accept" example from the Learning with AI workshop.
- Project-memory example in Part 05.
- Reworking contents 02/04 demos for a longer version.
- Reworking the opening hook (the room check already breaks up the first 15 minutes).
