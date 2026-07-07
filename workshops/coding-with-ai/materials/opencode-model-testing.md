# OpenCode and Model Testing Guide

Use this guide to decide which OpenCode model is good enough for the workshop.

This is not a formal benchmark. It is a practical check: can the model help participants follow the AI coding loop on the same project they will use in class?

The main test should be representative of participant use. Give each model a normal project folder, let it inspect files, and let it edit when the prompt asks for implementation. Score whether it helps the learner understand, verify, and review the work.

OpenCode Go may be an affordable coding-agent path for many students and participants. We should also test free OpenCode models in case paid access is a barrier.

For this workshop, the minimum model should be good enough to:

- inspect before editing
- use the README, AGENTS.md, tests, and source code well
- keep changes small
- explain diffs accurately
- suggest useful checks
- avoid confident wrong answers
- help participants recover when stuck

## Testing Approach

Use disposable workspace folders, not git worktrees or branches.

Each model gets its own folder under the run directory. Each question or task gets a fresh copy of the project inside that model folder. This lets multiple OpenCode instances run in parallel and gives us historical evidence we can check in later.

Default context is the full participant project. The README is allowed. It is part of the real workshop context, and a good model should use it well.

Only run reduced-context checks as a separate robustness test. Do not let those scores drive the default model decision.

## What the Model Under Test Should See

When running OpenCode, send only:

- the student-facing prompt
- the project workspace files a participant would have
- normal workshop or project context

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

## Candidate Models

List available model IDs before each run:

```bash
opencode models --refresh
opencode models --verbose
```

Initial candidates:

| Model | Model ID | Tool path | Status | Notes |
| --- | --- | --- | --- | --- |
| Big Pickle | `opencode/big-pickle` | OpenCode default / Zen | Candidate | Default local OpenCode model |
| DeepSeek V4 Flash | `opencode-go/deepseek-v4-flash` | OpenCode Go | Candidate | Paid OpenCode Go candidate |
| MiMo V2.5 | `opencode-go/mimo-v2.5` | OpenCode Go | Candidate | Paid OpenCode Go candidate |
| DeepSeek V4 Pro | `opencode-go/deepseek-v4-pro` | OpenCode Go | Candidate | Paid OpenCode Go candidate |
| MiniMax M3 | `opencode-go/minimax-m3` | OpenCode Go | Candidate | Paid OpenCode Go candidate |
| MiMo V2.5 Pro | `opencode-go/mimo-v2.5-pro` | OpenCode Go | Candidate | Paid OpenCode Go candidate |
| DeepSeek V4 Flash Free | `opencode/deepseek-v4-flash-free` | OpenCode free | Fallback candidate | Free fallback for participants who cannot use paid OpenCode Go or Zen |
| MiMo V2.5 Free | `opencode/mimo-v2.5-free` | OpenCode free | Fallback candidate | Free fallback for participants who cannot use paid OpenCode Go or Zen |
| Codex or Claude Code comparison | N/A | Optional comparison | Optional | Useful as a quality reference, not an OpenCode student default |

Record for each model:

- model name and exact model ID
- `opencode --version` output
- tool path, such as OpenCode free, OpenCode Go, or Zen
- date tested
- pass, caveat, or fail for each section
- short notes on any wrong or risky answer

## Run Directory Structure

Use one run folder per evaluation pass:

```text
workshops/coding-with-ai/materials/model-testing/runs/<RUN_ID>/
  evaluation-summary.md
  model-decision-matrix.md
  recommended-model.md
  <MODEL_SLUG>/
    metadata.md
    summary.md
    workspaces/
      A1/
      B1/
      G1/
      D2-run1/
      D2-run2/
      D2-run3/
    raw-opencode/
      A1.json
      B1.json
      G1.json
    answers/
      A1.md
      B1.md
      G1.md
    diffs/
      G1.diff
    checks/
      G1-npm-test.txt
    scores/
      A1-score.md
      B1-score.md
      G1-score.md
```

Use plain folders for workspaces. Do not use git worktrees. The workspace folders are part of the run record and can be checked in after reviewing for private data.

## Prepare Workspaces

Run shell commands from the repository root unless a step says otherwise.

Use one fresh project copy per question or implementation task:

```bash
MODEL="opencode/mimo-v2.5-free"
MODEL_SLUG="${MODEL//\//__}"
RUN_ID="$(date +%Y-%m-%d-%H%M%S)"
QUESTION_ID="G1"

RUN_ROOT="workshops/coding-with-ai/materials/model-testing/runs/$RUN_ID"
MODEL_DIR="$RUN_ROOT/$MODEL_SLUG"
WORKSPACE="$MODEL_DIR/workspaces/$QUESTION_ID"

mkdir -p "$MODEL_DIR" "$MODEL_DIR/raw-opencode" "$MODEL_DIR/answers" "$MODEL_DIR/diffs" "$MODEL_DIR/checks" "$MODEL_DIR/scores"
cp -R workshops/coding-with-ai/materials/project "$WORKSPACE"
```

For diff-review questions, copy the fixed fixture into that question workspace:

```bash
cp workshops/coding-with-ai/materials/model-testing/fixtures/message-times.diff "$WORKSPACE/message-times.diff"
```

For setup questions that need participant setup notes, copy the setup checklist into the workspace:

```bash
cp workshops/coding-with-ai/materials/participant-setup.md "$WORKSPACE/participant-setup.md"
```

## Run OpenCode

OpenCode `--dir` should point at the disposable workspace.

Put the prompt before the flags. This works reliably with OpenCode 1.17.15:

```bash
opencode run \
  "QUESTION TEXT HERE" \
  --model "$MODEL" \
  --format json \
  --dir "$WORKSPACE" \
  > "$MODEL_DIR/raw-opencode/$QUESTION_ID.json"
```

Do not use `--auto` or permission-skipping flags for the first pass. The point is to see what the model chooses to do in a normal workspace, not to force approvals.

After implementation tasks, save the diff and checks:

```bash
git -C "$WORKSPACE" diff > "$MODEL_DIR/diffs/$QUESTION_ID.diff"
npm --prefix "$WORKSPACE" test > "$MODEL_DIR/checks/$QUESTION_ID-npm-test.txt" 2>&1
```

If the copied project is not a git repository, initialize git inside the workspace before running OpenCode so diffs are easy to capture:

```bash
git -C "$WORKSPACE" init
git -C "$WORKSPACE" add .
git -C "$WORKSPACE" commit -m "Baseline project copy"
```

Use local git config inside the workspace if needed. Do not use real participant data.

## Main Representative Run

The main run uses full project workspaces. Include README, AGENTS.md, practice task, source files, tests, HTML, and CSS.

This asks: can the model help a participant succeed in the workshop project?

The README may contain useful hints or known-bug notes. That is okay. Score whether the model uses the docs and code well, explains the connection clearly, and keeps the work small.

Run all question sets A–G for each candidate model if time allows. If time is limited, prioritize B, D, E, and G.

## Optional Robustness Run

Use reduced-context workspaces only as a secondary check.

This asks: if docs are incomplete, can the model still reason from code?

For a robustness run, copy the project and then remove or redact answer-bearing docs for selected debugging questions. Keep these results separate from the main verdict.

Good robustness questions:

- D2: duplicate-name retry behavior
- D3: duplicate messages
- D4: JSON parse failure

Do not call a model bad only because it used README well in the main run. That is representative workshop behavior.

## Subagent Instructions

Amp subagents can run independent model batches while keeping output folders separate.

Give each subagent:

- one model ID
- one `RUN_ID`
- its model slug
- the question IDs to run
- instructions to create a fresh workspace per question
- instructions to save raw OpenCode output before scoring
- instructions to use at most one realistic participant-style follow-up per scenario when the first answer needs steering

Example subagent instruction:

```text
Run OpenCode model testing for MODEL=opencode/mimo-v2.5-free.

Use RUN_ID=2026-07-07-opencode-workspace-eval-1.

Question IDs: A1, A2, A3, B1, B2, B3, D2, D3, D4, E1, E2, E3, G1, G2.

For each question:
1. Create a fresh plain-folder workspace under workshops/coding-with-ai/materials/model-testing/runs/<RUN_ID>/<MODEL_SLUG>/workspaces/<QUESTION_ID>/.
2. Copy workshops/coding-with-ai/materials/project into that workspace.
3. Copy any extra fixture file needed by the question into the workspace.
4. Run opencode with the student prompt only, `--format json`, and `--dir` pointing at the workspace.
5. Save raw output to raw-opencode/<QUESTION_ID>.json.
6. Extract the final answer to answers/<QUESTION_ID>.md when practical.
7. For implementation tasks, save git diff to diffs/<QUESTION_ID>.diff and test output to checks/<QUESTION_ID>-npm-test.txt.
8. If the first answer is close but incomplete, unclear, too broad, unverified, or too eager to edit, ask one realistic participant-style follow-up in the same workspace. Save it as raw-opencode/<QUESTION_ID>-followup.json and answers/<QUESTION_ID>-followup.md.
9. For follow-up prompts, continue in the same workspace as the original question so the model can respond to its previous answer or patch.
10. Score the first answer and follow-up recovery in scores/<QUESTION_ID>-score.md using this guide.

Do not send this guide, scoring notes, or question IDs to OpenCode.
Do not use git worktrees.
Do not use --auto or permission-skipping flags on the first pass.
Do not use expert-only follow-ups. The follow-up should sound like something a participant could learn to ask during the workshop.
Return the output folder, completed questions, failed commands, score summary, and manual-review concerns.
```

Ask each subagent to return:

```text
Model:
Questions run:
Output folder:
Workspace folders created:
Files written:
Failed commands:
Score summary:
Major caveats:
Anything that needs manual review:
```

## Recommendation Rule

Recommend the lowest-cost model that passes the must-pass checks in the main representative run.

Do not recommend a model only because it writes code quickly. A model that confidently explains code incorrectly is worse for this workshop than a slower model that keeps learners oriented.

## Must-Pass Checks

A model is acceptable for the workshop if it passes these checks:

1. **Project inspection:** It looks at relevant files before proposing or making a change.
2. **Small plan:** It gives a short, focused plan instead of a broad rewrite.
3. **Patch quality:** It makes a small change that fits the existing project.
4. **Verification:** It suggests or runs `npm test` for JavaScript logic changes, and suggests browser checks for UI changes.
5. **Diff explanation:** It explains the actual diff, not a generic version of the task.
6. **Debugging honesty:** It names likely causes without inventing facts not present in the project.
7. **Student support:** It explains at a level useful for someone with early project experience.

Fail the model if it repeatedly — meaning twice or more anywhere in the main run — does any of the following:

- edits without inspecting
- rewrites the whole app for a small task
- skips the check step
- claims code exists when it does not
- claims tests passed without evidence
- hides uncertainty
- gives commands that do not match the project
- encourages committing code before review

## Scoring

Use a simple score for each question:

- **2 = Pass:** Correct, useful, and fits the workshop workflow.
- **1 = Caveat:** Mostly useful, but needs facilitator correction.
- **0 = Fail:** Wrong, risky, misleading, too broad, or unsupported by the project.

Score answer-only questions on the final answer and tool behavior.

Score implementation questions on:

- final answer
- files changed
- diff size and focus
- test output
- whether the explanation matches the diff

If a model edits during a question that explicitly says “do not edit,” score that question as a caveat or fail depending on the size and risk of the edit.

If a model edits during an implementation task, that is expected. Score whether the edit is correct, small, and verified.

### Use one participant-style follow-up when useful

The workshop teaches participants to steer agents. The evaluation should test that loop, not only the model's first answer.

For each scenario, the evaluator may ask **one** realistic participant-style follow-up when the first answer is close but needs steering.

Use a follow-up when the first answer is:

- mostly right but unclear
- too broad for the task
- missing a verification step
- not connected clearly to files or code
- making a small, reviewable mistake
- editing too early after a planning or explanation prompt
- passing tests but not yet validating browser behavior

Do not use a follow-up to rescue an answer that is unsafe, confidently hallucinated, a large unrelated rewrite, or completely pointed at the wrong problem. Score that as a fail.

The follow-up should sound like something a participant could learn to ask, not like an expert code review. Examples:

```text
Please do not edit yet. First explain what you found, which files matter, and the smallest change you recommend. Wait for my approval before changing files.
```

```text
Can you point to the file and function that support your answer, and explain it in simpler language?
```

```text
Can you make this smaller? Please keep the existing structure and change only what is needed for this task.
```

```text
The tests pass. What browser check should I do to confirm the user-facing behavior?
```

```text
Please review your own diff before I accept it. Does it handle the main user flow and the edge case we discussed? If not, make the smallest adjustment and explain what changed.
```

```text
This check failed. Please read the error, explain what it means, and suggest the smallest next step.
```

### Score recovery after feedback

Do not judge only the first answer when a realistic follow-up could catch a small issue.

For important questions, record two scores:

- **First turn:** what the model did before feedback.
- **Recovery:** whether the model improved after a participant-style follow-up.

A model can be suitable if it makes small, reviewable mistakes and then recovers after clear feedback. A model is risky if it repeats the same mistake, ignores the feedback, edits without permission again, or cannot explain its own diff.

Use follow-up prompts to test recoverability, not to rescue every bad answer. Keep the follow-up realistic: it should be something a participant could learn to ask during the workshop.

### Repeat runs

Model output varies between runs. One run per question is enough for easy setup questions, but not for questions that decide the verdict.

- Run debugging questions D2, D3, and D4 three times.
- Run implementation tasks G1 and G2 at least twice for finalists.
- Use one participant-style follow-up for any scenario where the first answer is close but needs steering.
- For implementation tasks, strongly consider a validation follow-up for finalists or any model whose first patch passes tests but may not cover browser behavior.
- If a model is close to a recommendation threshold, rerun the questions that scored 1 before deciding.

## Question Set A: Setup and First Run

These questions test whether the model can help participants get started without taking over.

### A1. What should I do first after unzipping the project?

Student prompt to send:

```text
What should I do first after unzipping the workshop chat client project?
```

Workspace context: full project.

Expected answer:

- points to the project README
- says to initialize Git and make the first commit
- runs or suggests `npm test`
- starts the app with `npm start`
- does not ask the student to clone a repo

### A2. `git commit` says, “Please tell me who you are.” What should I do?

Student prompt to send:

```text
I am setting up the workshop project and `git commit` says, “Please tell me who you are.” What should I do?
```

Workspace context: full project plus `participant-setup.md` copied into the workspace.

Expected answer:

- explains that Git needs `user.name` and `user.email`
- points to the participant setup checklist if useful
- gives correct `git config --global` commands if asked
- tells the student to retry the commit after configuring Git

### A3. `npm test` passes. Does that prove the app works?

Student prompt to send:

```text
`npm test` passes. Does that prove the chat app works, or should I check something else too?
```

Workspace context: full project.

Expected answer:

- says no, tests cover only part of the app
- explains that browser behavior and server connection still need checking
- suggests opening `http://localhost:5173` and connecting to the facilitator's server

## Question Set B: Version Control and Small Changes

These questions test whether the model supports safe project workflow.

### B1. Inspect before editing

Student prompt to send:

```text
I want to show message times in the chat client. Can you inspect the project and tell me which files you would change before editing? Do not edit yet.
```

Workspace context: full project.

Expected answer:

- reads relevant files using its own tools
- identifies likely files, such as `src/chat-protocol.js`, `src/app.js`, and tests
- explains why those files matter
- does not edit yet

### B2. I want to show message times. Give me a short plan, not code yet.

Student prompt to send:

```text
I want to show message times in the chat client. Give me a short plan, not code yet.
```

Workspace context: full project.

Expected answer:

- mentions using the existing `timestamp` field from server events
- plans a small formatting function or display change
- plans to update or add tests
- plans `npm test` and a browser check
- does not propose a framework, backend change, or full rewrite

### B3. What should I check before committing?

Student prompt to send:

```text
I made the change for message times. Here is my diff. What should I check before I commit?
```

Workspace context: full project plus `message-times.diff` copied into the workspace.

Expected answer:

- reviews the fixture diff, not a generic task
- suggests `git status` and `git diff`
- suggests relevant test output
- suggests a browser check because the UI changed
- explains the diff briefly and accurately

## Question Set C: Understanding the Code

These questions test whether the model explains accurately.

### C1. Explain `buildConnectionUrl`

Student prompt to send:

```text
I found a function called `buildConnectionUrl` in `src/chat-protocol.js`. Can you explain what it does in plain language?
```

Workspace context: full project.

Expected answer:

- explains trimming the server URL and display name
- explains validation errors for missing values
- explains adding the `name` query parameter
- does not claim it opens the WebSocket connection

### C2. Explain blank message handling

Student prompt to send:

```text
In `createOutgoingMessage`, why does the function return `null` when the input is blank?
```

Workspace context: full project.

Expected answer:

- explains that blank messages should not be sent
- connects the return value to the caller skipping the send
- mentions `/nick` handling if relevant

### C3. Explain `describeChatEvent`

Student prompt to send:

```text
Can you explain what `describeChatEvent` is responsible for, and what parts of the app it does not control?
```

Workspace context: full project.

Expected answer:

- explains that it converts server events into display data
- names examples: `join`, `leave`, `message`, `nick`, `list`, `error`
- says it does not update the DOM or send data to the server

## Question Set D: Debugging

These questions catch hallucination and weak code reading.

For the main run, use full project context. The README is part of the participant experience.

### D1. I see “Could not connect to the server.” What should I check?

Student prompt to send:

```text
I see “Could not connect to the server” when I try to join the chat. What should I check first?
```

Workspace context: full project.

Expected answer:

- server URL is correct
- facilitator server is running
- `ws://` vs `wss://` matches the provided URL
- network or browser console details
- does not immediately blame the client code without evidence

### D2. I used a duplicate name. The app says disconnected and I cannot try again without refreshing. What is happening?

Student prompt to send:

```text
I used a duplicate name. The app says disconnected and I cannot try again without refreshing. What is happening?
```

Workspace context: full project.

Expected answer:

- uses the README known-bug note if it finds it
- connects the note to the client code
- explains that the server can send an error and close the socket
- says the UI does not return to the join form after close
- suggests a small fix: preserve the server error, show the setup panel, allow retry
- does not suggest changing the facilitator server as the first fix

### Example D2 follow-up: steer the agent to explain before editing

This is an example of the general participant-style follow-up rule. Run something like this in the same workspace if D2 edits too early, gives a vague answer, or jumps straight to a solution.

Student prompt to send:

```text
Please do not edit yet. First show me which files and code path explain the duplicate-name retry bug. Then propose the smallest fix and the checks we should run. Wait for my approval before changing files.
```

Workspace context: same workspace as D2.

Expected answer:

- stops editing if it started
- names the relevant code path in `src/app.js`
- explains the server error → close → UI stuck flow
- proposes a small client-side fix
- suggests `npm test` and a browser check against the duplicate-name flow
- waits for approval before editing

Score first-turn D2 and follow-up recovery separately. A strong recovery is a good sign for the workshop because participants will practice steering the agent.

### D3. My message appears twice. Why?

Student prompt to send:

```text
When I send a chat message, it appears twice in my chat window. Why might that happen?
```

Workspace context: full project.

Expected answer:

- checks whether the client adds a local message and also receives the server broadcast
- reads the actual code before deciding
- if the baseline client is unchanged, says the client does not locally echo sent messages
- suggests checking whether two browser tabs or duplicate connections are open

### D4. `JSON.parse` fails when a message arrives

Student prompt to send:

```text
The browser console says `JSON.parse` failed when a chat message arrived. What should I check first?
```

Workspace context: full project.

Expected answer:

- explains that the client expects JSON strings from the server
- suggests checking the raw incoming data and server protocol
- mentions malformed JSON or a non-workshop server URL as likely causes
- does not recommend catching and ignoring all errors as the only fix

## Question Set E: Verification and Feedback Loop

These questions test whether the model can help participants verify work.

### E1. I changed timestamp display. What check should I run?

Student prompt to send:

```text
I changed how message times are displayed. What check should I run?
```

Workspace context: full project.

Expected answer:

- run `npm test`
- add or update a test for timestamp formatting if logic changed
- run the app and check in Chrome
- connect to the chat server and inspect real messages

### E2. The tests pass but the browser looks wrong. What should I do next?

Student prompt to send:

```text
The tests pass, but the chat page looks wrong in the browser. What should I do next?
```

Workspace context: full project.

Expected answer:

- says tests do not cover every UI detail
- suggests checking the browser console
- suggests inspecting the DOM or CSS
- asks what changed in the diff
- avoids random large rewrites

### E3. Check whether I understand my diff

Student prompt to send:

```text
Before I commit, ask me a few questions to check whether I understand my changes. Here is my diff. The tests pass.
```

Workspace context: full project plus `message-times.diff` copied into the workspace.

Expected answer:

- asks about what changed and why
- asks which files changed
- asks how the test proves the behavior
- asks what remains untested
- asks what could break

## Question Set F: Project Memory

These questions test whether the model supports better future work.

### F1. What note should we add to project docs after fixing the duplicate-name retry bug?

Student prompt to send:

```text
We fixed the duplicate-name retry bug. What short note should we add to the project docs so future students or AI agents understand this behavior?
```

Workspace context: full project. If a previous implementation workspace exists for G1, include the saved diff or changed files in this workspace.

Expected answer:

- proposes a short note about server rejection and retry behavior
- suggests where to put it, such as README or AGENTS.md
- keeps the note useful for future participants or agents

### F2. We got stuck because the model edited too many files. What instruction should we add?

Student prompt to send:

```text
We got stuck because the AI changed too many files for a small task. What instruction should we add so this is less likely next time?
```

Workspace context: full project.

Expected answer:

- suggests a project instruction like “inspect first, make one focused change, and avoid rewrites unless asked”
- connects it to `AGENTS.md` or the checklist
- does not blame the student

## Question Set G: Implementation Tasks

These tasks test whether the model can make a small, correct change and explain it.

Run these in fresh workspaces. Save raw output, final diff, and test output.

### G1. Fix duplicate-name retry behavior

Student prompt to send:

```text
When I join with a duplicate name, the app says disconnected and I cannot try again without refreshing. Please inspect the project, make the smallest fix, run the relevant check, and explain what changed.
```

Workspace context: full project.

Expected result:

- inspects README and relevant code before editing
- keeps server behavior unchanged
- updates client behavior so the user can try again after rejection
- preserves or shows the server error clearly
- keeps the change small
- runs or suggests `npm test`
- explains the diff in learner-friendly language

### Example G1 follow-up: ask the model to validate its own fix

This is an example of the general participant-style follow-up rule. Run something like this in the same G1 workspace after the model makes its first implementation, especially if tests pass but the browser flow may still be wrong.

Student prompt to send:

```text
Please review your own fix before I accept it. In the real duplicate-name flow, the WebSocket may open first, then receive a server error message, then close. Does your change handle that event order and let the user try again without refreshing? If not, adjust the smallest part of the fix, rerun the relevant check, and explain the final diff.
```

Workspace context: same workspace as G1, including the model's first patch.

Expected result:

- reasons explicitly about WebSocket `open`, `message`, and `close` order
- notices if the first patch only handles pre-open failures
- adjusts the smallest part of the client code if needed
- preserves the server error for the setup form
- keeps normal disconnect behavior understandable
- runs `npm test` again or explains why only browser verification remains
- recommends a browser check for duplicate-name retry

Score first-turn G1 and follow-up recovery separately. A model that fixes an incomplete first patch after this prompt may still be suitable for the workshop, because this is exactly the feedback loop participants should learn.

### G2. Show message times

Student prompt to send:

```text
I want the chat client to show message times. Please inspect the project, make a small implementation, run the relevant check, and explain what changed.
```

Workspace context: full project.

Expected result:

- uses the existing timestamp field from server events
- changes only the files needed for display and test coverage
- avoids backend or protocol rewrites
- runs or suggests `npm test`
- suggests a browser check
- explains what changed and what remains untested

## Decision Matrix

Use this table when testing models. Fill it from the main representative run, not from reduced-context robustness checks.

| Model | Tool path | Setup | Workflow | Understanding | Debugging | Verification | Project memory | Implementation | Verdict | Notes |
| ----- | --------- | ----- | -------- | ------------- | --------- | ------------ | -------------- | -------------- | ------- | ----- |
| Big Pickle (`opencode/big-pickle`) | OpenCode default / Zen | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Default local OpenCode model |
| DeepSeek V4 Flash (`opencode-go/deepseek-v4-flash`) | OpenCode Go | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Paid OpenCode Go candidate |
| MiMo V2.5 (`opencode-go/mimo-v2.5`) | OpenCode Go | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Paid OpenCode Go candidate |
| DeepSeek V4 Pro (`opencode-go/deepseek-v4-pro`) | OpenCode Go | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Paid OpenCode Go candidate |
| MiniMax M3 (`opencode-go/minimax-m3`) | OpenCode Go | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Paid OpenCode Go candidate |
| MiMo V2.5 Pro (`opencode-go/mimo-v2.5-pro`) | OpenCode Go | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Paid OpenCode Go candidate |
| DeepSeek V4 Flash Free (`opencode/deepseek-v4-flash-free`) | OpenCode free | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Free fallback candidate |
| MiMo V2.5 Free (`opencode/mimo-v2.5-free`) | OpenCode free | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Free fallback candidate |
| Codex or Claude Code comparison | Optional comparison | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Optional quality reference |

Verdicts:

- **Recommend:** use as the default student model.
- **Usable with caveats:** acceptable if the facilitator warns participants about limits.
- **Fallback only:** useful when the preferred path fails.
- **Do not use:** too likely to mislead participants.

## Notes for Facilitators

When testing OpenCode models, pay attention to behavior, not only final answers.

Good signs:

- the model reads files before editing
- it uses README and AGENTS.md without copying blindly
- it asks clarifying questions only when needed
- it makes one small patch
- it runs or suggests the right check
- it explains why the change is correct

Warning signs:

- it rewrites the app for a small UI change
- it changes server protocol without being asked
- it ignores the project README or AGENTS.md
- it claims a test passed without evidence
- it gives confident explanations that do not match the code

The workshop can still work with a middle-tier model if the workflow is strong. The participant should use Git, tests, browser checks, diff review, and pair review to catch model mistakes.
