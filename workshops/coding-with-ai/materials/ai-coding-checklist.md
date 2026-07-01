# AI Coding Checklist

Use this checklist when working with an AI coding agent.

## Start

- [ ] I am on the right branch
- [ ] I know the smallest useful change
- [ ] I told the agent what should stay unchanged
- [ ] I asked the agent to inspect before editing
- [ ] I asked the agent for help with Git or setup commands if I was unsure

Useful agent requests:

- "Make only the validation change first. Do not refactor anything else. After the change, show me the diff and suggest a commit message."
- "Check that I am on a safe branch for this task. If not, suggest the Git command."
- "Before editing, inspect the relevant files and tell me what you found."
- "Make only the smallest useful change. Do not refactor unrelated code."

Avoid broad requests like:

> Improve this page and fix anything you find.

## During the Change

- [ ] The agent made one focused change
- [ ] I read the diff
- [ ] I can explain what changed
- [ ] I can explain why it changed
- [ ] I asked what could break

Useful agent requests:

- "Explain this change at the level of a junior developer."
- "What assumptions did you make?"
- "What could break because of this?"
- "Ask me two questions to check whether I understand this diff."
- "Point to the exact lines I should review carefully."

## Verification

- [ ] I ran the most relevant test or check
- [ ] I checked the app manually if needed
- [ ] I used a browser or screenshot check for visual changes
- [ ] I understood any failure before asking for another fix

Useful agent requests:

- "Before editing, tell me how you will verify this."
- "Find the most relevant test or check command for this change."
- "Add the smallest useful test for this behavior."
- "Run the app and check the page in the browser."
- "Take a screenshot and compare it with the expected result."
- "If the test fails, explain the failure before changing code again."

## Finish

- [ ] I committed the change
- [ ] The commit message explains the reason
- [ ] I wrote down any lesson that should become project documentation
- [ ] I know what to ask another person to review

Useful agent requests:

- "Show me the diff and explain it in plain language."
- "Suggest a commit message that explains why this changed."
- "Based on what happened in this task, suggest one small update to the project TODO, README, checklist, or agent instructions. Do not edit yet; show me the proposed note first."
