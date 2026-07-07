# OpenCode and Model Testing Guide

Use this guide to decide which OpenCode model is good enough for the workshop.

This is not a formal benchmark. It is a practical check: can the model help participants follow the AI coding loop without misleading them?

OpenCode Go is likely the most affordable coding-agent path for many students and participants. The tradeoff is model quality. It may offer capable middle-tier models, but not always the strongest frontier models available in tools like Codex or Claude Code.

For this workshop, the minimum model should be good enough to:

- inspect before editing
- keep changes small
- explain diffs accurately
- suggest useful checks
- avoid confident wrong answers
- help participants recover when stuck

## How to Use This Guide

Test each candidate model with the same questions.

Use the shared chat client project as context. For questions that mention code, give the model the relevant file or ask it to inspect the project first.

## What the Model Under Test Should See

When running OpenCode, send only:

- the student-facing prompt
- the relevant project files
- normal workshop or project context that a participant would have

Do not tell the model that it is being tested, benchmarked, evaluated, scored, compared, or graded.

Do not send:

- this guide
- expected answers
- pass criteria
- scoring rubrics
- question IDs, such as `A1` or `D2`
- model names or cost comparisons
- notes such as "must-pass," "fail the model," or "benchmark"

Use question IDs only in filenames, evaluator notes, and summaries.

This keeps the test close to real student use.

For each question below:

- **Student prompt to send** is the only prompt text that should go to OpenCode.
- **Suggested attachments** are normal project files that a participant could share with the agent.
- **Expected answer** and **Pass criteria** are evaluator-only notes. Do not send them to OpenCode.

Record:

- model name
- tool path, such as OpenCode Go or OpenRouter fallback
- date tested
- whether the model used tool access correctly
- pass, caveat, or fail for each section
- short notes on any wrong or risky answer

## Running OpenCode as a Test Harness

OpenCode can run non-interactive prompts from the command line. This makes it practical to test several models against the same question set.

Use this as a lightweight harness before building any custom eval code.

### 1. Confirm OpenCode is ready

Check the CLI and credentials:

```bash
opencode --help
opencode auth list
```

If no provider or OpenCode Go access is configured, connect it before testing:

```bash
opencode auth login
```

List available model IDs:

```bash
opencode models --refresh
opencode models --verbose
```

Model IDs are used in this format:

```text
provider/model
```

### 2. Run one question against one model

Start with one read-only question.

```bash
MODEL="provider/model"

opencode run \
  --model "$MODEL" \
  --format json \
  --dir workshops/coding-with-ai/materials/project \
  --file workshops/coding-with-ai/materials/project/README.md \
  --file workshops/coding-with-ai/materials/project/src/app.js \
  --file workshops/coding-with-ai/materials/project/src/chat-protocol.js \
  "I used a duplicate name. The app says disconnected and I cannot try again without refreshing. What is happening?"
```

Use `--format json` so raw output can be saved and reviewed later.

For questions about tests, attach the test file too:

```bash
opencode run \
  --model "$MODEL" \
  --format json \
  --dir workshops/coding-with-ai/materials/project \
  --file workshops/coding-with-ai/materials/project/src/chat-protocol.js \
  --file workshops/coding-with-ai/materials/project/test/chat-protocol.test.js \
  "I changed timestamp display. What check should I run?"
```

### 3. Store raw outputs in isolated run folders

Use one folder per test run and one subfolder per model.

Do not let parallel subagents write to the same folder. Give each subagent a unique `RUN_ID` and `BATCH_ID`.

```bash
MODEL="provider/model"
MODEL_SLUG="${MODEL//\//__}"
RUN_ID="$(date +%Y-%m-%d-%H%M%S)"
BATCH_ID="batch-a-setup-workflow"
RUN_DIR="workshops/coding-with-ai/materials/model-testing/runs/$RUN_ID/$MODEL_SLUG/$BATCH_ID"
mkdir -p "$RUN_DIR"
```

Then redirect each output:

```bash
opencode run \
  --model "$MODEL" \
  --format json \
  --dir workshops/coding-with-ai/materials/project \
  --file workshops/coding-with-ai/materials/project/README.md \
  --file workshops/coding-with-ai/materials/project/src/app.js \
  --file workshops/coding-with-ai/materials/project/src/chat-protocol.js \
  "QUESTION TEXT HERE" \
  > "$RUN_DIR/D2.json"
```

Save every OpenCode response, even if it is clearly wrong. Failed outputs are useful evidence when choosing a model.

Recommended folder contents:

```text
metadata.md                 # model, date, command, files attached, evaluator notes
prompts/
  A1.md
  A2.md
raw-opencode/
  A1.json
  A2.json
  D2.json
answers/
  A1.md                     # optional extracted answer for easier reading
  A2.md
scores/
  A1-score.md               # manual or reviewer-assisted score
  A2-score.md
summary.md                  # final batch summary
```

If you do not extract answers into separate Markdown files, keep the raw JSON files and score from those directly.

Do not commit raw outputs until you have checked that they contain no credentials, local paths you do not want to share, or private data.

### 4. Use a persistent OpenCode server for many runs

For a larger test batch, start OpenCode once:

```bash
opencode serve --port 4096 --hostname 127.0.0.1
```

Then attach each run to it:

```bash
opencode run \
  --attach http://localhost:4096 \
  --model "$MODEL" \
  --format json \
  --dir workshops/coding-with-ai/materials/project \
  --file workshops/coding-with-ai/materials/project/README.md \
  "What should I do first after unzipping the project?"
```

This can reduce repeated startup time.

### 5. Use Amp subagents to parallelize model testing

Amp subagents can run independent batches while you keep the scoring consistent.

This is ready for parallel subagents if each subagent has:

- one model or one model/question-set pair
- a unique `RUN_ID` and `BATCH_ID`
- its own output folder
- a clear list of question IDs to run
- instructions to save raw OpenCode output before summarizing

Good batch split:

- subagent 1: Model A, question sets A and B
- subagent 2: Model A, question sets C and D
- subagent 3: Model B, question sets A and B
- subagent 4: Model B, question sets C and D

Example Amp subagent instruction. This is for the Amp worker only; do not copy it into an OpenCode prompt.

```text
Run OpenCode model testing for MODEL=provider/model.

Question IDs: A1, A2, A3, B1, B2, B3.

Use RUN_ID=2026-07-07-opencode-eval-1 and BATCH_ID=model-a-setup-workflow.

For each question:
1. Save the prompt to prompts/<question-id>.md.
2. Run opencode with --format json and the relevant --file attachments.
3. Save raw output to raw-opencode/<question-id>.json.
4. If convenient, extract the answer to answers/<question-id>.md.
5. Write scores/<question-id>-score.md with pass/caveat/fail notes against the guide.

Do not edit project files. Do not use permission-skipping flags. Return the output folder and any failed commands.
```

Ask each subagent to return:

```text
Model:
Questions run:
Commands used:
Output folder:
Files written:
Failed commands:
Likely pass/caveat/fail notes:
Anything that needs manual review:
```

Do the final scoring yourself using the rubric in this guide, or use a separate reviewer agent that is not the model being tested. Do not let the model under test grade its own answers.

Save final scoring and comparison outside the per-subagent folders:

```text
workshops/coding-with-ai/materials/model-testing/runs/<RUN_ID>/
  evaluation-summary.md
  model-decision-matrix.md
  recommended-model.md
```

The final files should cite the raw outputs they are based on, for example `raw-opencode/D2.json` or `scores/D2-score.md`.

### 6. Keep early harnesses read-only

For the first model comparison, prefer explanation, planning, and debugging questions.

Avoid auto-approving edits or shell commands until you trust the model path. Do not use permission-skipping flags for the first pass.

If you later test edit behavior, run it in a disposable copy of the project and reset between runs.

## Recommendation Rule

Recommend the lowest-cost model that passes the must-pass checks.

Do not recommend a model only because it writes code quickly. A model that confidently explains the code incorrectly is worse for this workshop than a slower or less polished model.

## Must-Pass Checks

A model is acceptable for the workshop if it passes these checks:

1. **Project inspection:** It looks at the relevant files before proposing a change.
2. **Small plan:** It gives a short, focused plan instead of a broad rewrite.
3. **Patch quality:** It proposes a small change that fits the existing project.
4. **Verification:** It suggests or runs `npm test` for JavaScript logic changes.
5. **Diff explanation:** It explains the actual diff, not a generic version of the task.
6. **Debugging honesty:** It names likely causes without inventing facts not present in the code.
7. **Student support:** It explains at a level useful for someone with early project experience.

Fail the model if it repeatedly:

- edits without inspecting
- rewrites the whole app for a small task
- skips the check step
- claims code exists when it does not
- hides uncertainty
- gives commands that do not match the project
- encourages committing code before review

## Scoring

Use a simple score for each question:

- **2 = Pass:** Correct, useful, and fits the workshop workflow.
- **1 = Caveat:** Mostly useful, but needs facilitator correction.
- **0 = Fail:** Wrong, risky, misleading, or too broad.

Suggested thresholds:

- **Recommend:** at least 80% overall, and no must-pass failure.
- **Usable with caveats:** at least 65% overall, no dangerous failure, and facilitator knows the caveats.
- **Do not use:** below 65%, or any repeated confident wrong explanation.

## Question Set A: Setup and First Run

These questions test whether the model can help participants get started without taking over.

### A1. What should I do first after unzipping the project?

Student prompt to send:

```text
What should I do first after unzipping the workshop chat client project?
```

Suggested attachments:

- `README.md`

Expected answer:

- points to the project README
- says to initialize Git and make the first commit
- runs or suggests `npm test`
- starts the app with `npm start`
- does not ask the student to clone a repo

Pass criteria:

- The answer follows the zip-first workflow.
- It keeps Git, test, and browser check in the right order.

### A2. `git commit` says, “Please tell me who you are.” What should I do?

Student prompt to send:

```text
I am setting up the workshop project and `git commit` says, “Please tell me who you are.” What should I do?
```

Suggested attachments:

- `README.md`
- `../participant-setup.md`

Expected answer:

- explains that Git needs `user.name` and `user.email`
- points to the participant setup checklist if available
- gives correct `git config --global` commands if asked
- tells the student to retry the commit after configuring Git

Pass criteria:

- The answer fixes the setup problem without changing project files.

### A3. `npm test` passes. Does that prove the app works?

Student prompt to send:

```text
`npm test` passes. Does that prove the chat app works, or should I check something else too?
```

Suggested attachments:

- `README.md`
- `package.json`

Expected answer:

- says no, tests cover only part of the app
- explains that browser behavior and server connection still need checking
- suggests opening `http://localhost:5173` and connecting to the facilitator's server

Pass criteria:

- The model distinguishes automated tests from manual/browser checks.

## Question Set B: Version Control and Small Changes

These questions test whether the model supports safe project workflow.

### B1. Inspect before editing

Student prompt to send:

```text
I want to show message times in the chat client. Can you inspect the project and tell me which files you would change before editing? Do not edit yet.
```

Suggested attachments:

- `README.md`
- `PRACTICE_TASK.md`
- `src/app.js`
- `src/chat-protocol.js`
- `test/chat-protocol.test.js`

Expected answer:

- inspects or asks to inspect relevant files
- identifies `src/chat-protocol.js`, `src/app.js`, tests, or README depending on the task
- explains why those files matter
- does not edit yet

Pass criteria:

- The model respects “inspect before editing.”

### B2. I want to show message times. Give me a short plan, not code yet.

Student prompt to send:

```text
I want to show message times in the chat client. Give me a short plan, not code yet.
```

Suggested attachments:

- `README.md`
- `PRACTICE_TASK.md`
- `src/app.js`
- `src/chat-protocol.js`
- `test/chat-protocol.test.js`

Expected answer:

- mentions using the existing `timestamp` field from server events
- plans a small formatting function or display change
- plans to update or add tests
- plans `npm test` and a browser check

Pass criteria:

- The plan is small and matches the existing app.
- It does not propose a framework, backend change, or full rewrite.

### B3. What should I check before committing?

Student prompt to send:

```text
I made the change for message times. What should I check before I commit?
```

Suggested attachments:

- `README.md`
- `PRACTICE_TASK.md`

Expected answer:

- `git status`
- `git diff`
- relevant test result
- browser check if the UI changed
- a short explanation of the diff

Pass criteria:

- The model reinforces review before commit.

## Question Set C: Understanding the Code

These questions test whether the model explains accurately.

### C1. Explain `buildConnectionUrl`

Student prompt to send:

```text
I found a function called `buildConnectionUrl` in `src/chat-protocol.js`. Can you explain what it does in plain language?
```

Suggested attachments:

- `src/chat-protocol.js`

Expected answer:

- explains trimming the server URL and display name
- explains validation errors for missing values
- explains adding the `name` query parameter
- does not claim it opens the WebSocket connection

Pass criteria:

- The explanation matches the function's actual responsibility.

### C2. Explain blank message handling

Student prompt to send:

```text
In `createOutgoingMessage`, why does the function return `null` when the input is blank?
```

Suggested attachments:

- `src/chat-protocol.js`
- `src/app.js`

Expected answer:

- explains that blank messages should not be sent
- connects the return value to the caller skipping the send
- mentions `/nick` handling if relevant

Pass criteria:

- The explanation connects the helper function to user behavior.

### C3. Explain `describeChatEvent`

Student prompt to send:

```text
Can you explain what `describeChatEvent` is responsible for, and what parts of the app it does not control?
```

Suggested attachments:

- `src/chat-protocol.js`
- `src/app.js`

Expected answer:

- explains that it converts server events into display data
- names examples: `join`, `leave`, `message`, `nick`, `list`, `error`
- says it does not update the DOM or send data to the server

Pass criteria:

- The model separates data formatting from UI rendering.

## Question Set D: Debugging

These questions catch hallucination and weak code reading.

### D1. I see “Could not connect to the server.” What should I check?

Student prompt to send:

```text
I see “Could not connect to the server” when I try to join the chat. What should I check first?
```

Suggested attachments:

- `README.md`
- `src/app.js`

Expected answer:

- server URL is correct
- facilitator server is running
- `ws://` vs `wss://` matches the provided URL
- network or browser console details
- does not immediately blame the client code without evidence

Pass criteria:

- The model gives likely causes and a practical order of checks.

### D2. I used a duplicate name. The app says disconnected and I cannot try again without refreshing. What is happening?

Student prompt to send:

```text
I used a duplicate name. The app says disconnected and I cannot try again without refreshing. What is happening?
```

Suggested attachments:

- `README.md`
- `src/app.js`
- `src/chat-protocol.js`

Optional variant: run the same prompt without `README.md` to test whether the model can infer the issue from code and behavior instead of reading the known-bug note.

Expected answer:

- explains that the server can send an error and close the socket
- identifies this as the intentional baseline bug if project docs are available
- says the UI does not return to the join form after close
- suggests a small fix: preserve the server error, show the setup panel, allow retry

Pass criteria:

- The model reads the client/server behavior correctly.
- It does not suggest changing the facilitator server as the first fix.

### D3. My message appears twice. Why?

Student prompt to send:

```text
When I send a chat message, it appears twice in my chat window. Why might that happen?
```

Suggested attachments:

- `src/app.js`
- `src/chat-protocol.js`

Expected answer:

- checks whether the client adds a local message and also receives the server broadcast
- reads the actual code before deciding
- if the baseline client is unchanged, says the client does not locally echo sent messages
- suggests checking whether two browser tabs or duplicate connections are open

Pass criteria:

- The model does not invent a local echo line that does not exist.

### D4. `JSON.parse` fails when a message arrives

Student prompt to send:

```text
The browser console says `JSON.parse` failed when a chat message arrived. What should I check first?
```

Suggested attachments:

- `README.md`
- `src/app.js`
- `src/chat-protocol.js`

Expected answer:

- explains that the client expects JSON strings from the server
- suggests checking the raw incoming data and server protocol
- mentions malformed JSON or a non-workshop server URL as likely causes
- does not recommend catching and ignoring all errors as the only fix

Pass criteria:

- The model explains the contract between client and server.

## Question Set E: Verification and Feedback Loop

These questions test whether the model can help participants verify work.

### E1. I changed timestamp display. What check should I run?

Student prompt to send:

```text
I changed how message times are displayed. What check should I run?
```

Suggested attachments:

- `README.md`
- `PRACTICE_TASK.md`
- `src/chat-protocol.js`
- `test/chat-protocol.test.js`

Expected answer:

- run `npm test`
- add or update a test for timestamp formatting if logic changed
- run the app and check in Chrome
- connect to the chat server and inspect real messages

Pass criteria:

- The model suggests both automated and browser checks.

### E2. The tests pass but the browser looks wrong. What should I do next?

Student prompt to send:

```text
The tests pass, but the chat page looks wrong in the browser. What should I do next?
```

Suggested attachments:

- `README.md`
- `index.html`
- `styles.css`
- `src/app.js`

Expected answer:

- says tests do not cover every UI detail
- suggests checking the browser console
- suggests inspecting the DOM or CSS
- asks what changed in the diff
- avoids random large rewrites

Pass criteria:

- The model helps narrow the problem instead of guessing broadly.

### E3. Check whether I understand my diff

Student prompt to send:

```text
Before I commit, ask me a few questions to check whether I understand my changes.
```

Suggested attachments:

- relevant changed files
- test output or a short description of the check that passed

Expected answer:

- asks about what changed and why
- asks which files changed
- asks how the test proves the behavior
- asks what remains untested
- asks what could break

Pass criteria:

- The questions make participant understanding visible.

## Question Set F: Project Memory

These questions test whether the model supports better future work.

### F1. What note should we add to project docs after fixing the duplicate-name retry bug?

Student prompt to send:

```text
We fixed the duplicate-name retry bug. What short note should we add to the project docs so future students or AI agents understand this behavior?
```

Suggested attachments:

- `README.md`
- `AGENTS.md`
- changed files for the fix

Expected answer:

- proposes a short note about server rejection and retry behavior
- suggests where to put it, such as README or AGENTS.md
- keeps the note useful for future participants or agents

Pass criteria:

- The note is specific and not too broad.

### F2. We got stuck because the model edited too many files. What instruction should we add?

Student prompt to send:

```text
We got stuck because the AI changed too many files for a small task. What instruction should we add so this is less likely next time?
```

Suggested attachments:

- `AGENTS.md`
- `README.md`
- a short summary of what went wrong

Expected answer:

- suggests a project instruction like “inspect first, make one focused change, and avoid rewrites unless asked”
- connects it to `AGENTS.md` or the checklist
- does not blame the student

Pass criteria:

- The answer improves the workflow for next time.

## Minimum Model Decision Matrix

Use this table when testing models.

| Model | Tool path | Setup | Workflow | Understanding | Debugging | Verification | Project memory | Verdict | Notes |
| ----- | --------- | ----- | -------- | ------------- | --------- | ------------ | -------------- | ------- | ----- |
| TBD | OpenCode Go | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| TBD | OpenRouter fallback | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| TBD | Codex or Claude Code comparison | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Optional comparison |

Verdicts:

- **Recommend:** use as the default student model.
- **Usable with caveats:** acceptable if the facilitator warns participants about limits.
- **Fallback only:** useful when the preferred path fails.
- **Do not use:** too likely to mislead participants.

## Notes for Facilitators

When testing OpenCode Go models, pay attention to behavior, not only final answers.

Good signs:

- the model reads files before editing
- it asks clarifying questions only when needed
- it makes one small patch
- it runs or suggests the right check
- it can explain why the change is correct

Warning signs:

- it rewrites the app for a small UI change
- it changes server protocol without being asked
- it ignores the project README or AGENTS.md
- it claims a test passed without running it
- it gives confident explanations that do not match the code

The workshop can still work with a middle-tier model if the workflow is strong. The participant should use Git, tests, browser checks, diff review, and pair review to catch model mistakes.
