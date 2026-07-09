# AI Coding Checklist

Use this checklist when working with an AI coding agent.

## Start

- [ ] I have a clean Git status
- [ ] I know the smallest useful change
- [ ] I told the agent what should stay unchanged
- [ ] I asked the agent to inspect before editing
- [ ] I asked the agent for help with Git or setup commands if I was unsure

Useful agent requests:

- "Check that my Git status is clean before we start. If not, explain what changed."
- "Before editing, inspect the relevant files and tell me what you found."

Avoid broad requests like:

> Improve this page and fix anything you find.

## Plan

- [ ] I stayed involved by writing at least a high-level plan in my own words
- [ ] I asked the agent to evaluate my plan before editing
- [ ] I decided which feedback to accept and revised my plan
- [ ] I asked the agent to implement my revised plan

Writing your own plan is a useful default, not a rule that AI can never help. Your first plan can be rough. If you are unsure, ask AI questions or ask it to explain a few options. Then decide what makes sense and write the plan you want to follow.

Useful agent requests:

- "Here is my plan: [write your plan]. Evaluate it against the task and the code you inspected. Tell me what I missed or should change. Do not edit yet."
- "I am not sure how to plan this yet. Ask me questions and explain two small options. Do not edit. I will choose and write the plan."
- "Implement my revised plan. Keep the change focused and do not refactor unrelated code."

## During the Change

- [ ] The agent made one focused change
- [ ] I read the diff
- [ ] I can explain what changed
- [ ] I can explain why it changed
- [ ] If something was unclear, I tested one assumption about the code or tools
- [ ] I asked what could break

Useful agent requests:

- "Explain this change at the level of a junior developer."
- "What assumptions did you make?"
- "What could break because of this?"
- "Ask me two questions to check whether I understand this diff."
- "Point to the exact lines I should review carefully."
- "I think this language feature works like this: [explain your guess]. Create a tiny temporary script to test it, run it, and explain the result."
- "Find where this framework behavior is documented or implemented. Show me the relevant source, then explain the behavior in plain language."
- "Before changing the app, make a tiny example that checks whether this API works the way I think."
- "Turn what we learned from this experiment into a short note I could add to project docs."

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

## FAQ

**When should I start a new thread (conversation with the agent) instead of continuing?**  
Start fresh when you begin a new task, or when the thread is long and the agent seems confused. A new thread with a clear request often works better than correcting an old one. Long threads are also slower and cost more.

**Should I use one thread for the whole feature?**  
Prefer one thread per small task. Commit, then start the next task in a new thread.

**The agent forgot something I told it. Why?**  
Long conversations get summarized or drop details. Repeat the important instruction, or put it in the project's agent instructions file (often `AGENTS.md`) so every thread sees it.

**The agent broke something. Should I ask it to fix it, or undo?**  
If the diff (the list of changed lines) is small and you understand the failure, ask for a fix. If you are lost or the agent keeps failing, undo with Git and retry with a smaller, clearer request. This is why you commit often.

**The agent keeps trying the same failing fix. What now?**  
Stop the loop. Ask it to explain the failure before changing code, or investigate one assumption yourself. After two or three failed attempts, step back and rethink the task.

**How big a task can I give in one go?**  
Small enough that you can read and understand the diff. If you cannot review it, it was too big. Split large tasks into steps and commit after each.

**Should I tell the agent how to solve the problem, or just
what I want?**  
Start with what you want and how you will check it worked. Ask the agent to inspect and explain the relevant code. Then write a tentative plan—even a high-level one—and ask for feedback. The plan is a way to stay involved, not proof that you already know the perfect solution.

**The code works but I don't understand it. Can I commit?**  
Not yet. Ask for an explanation at your level, or ask the agent to quiz you on the diff. Understanding is part of the job.

**The agent changed files I didn't ask about. What should I
do?**  
Read the diff and ask why. If the extra changes are not needed, ask the agent to undo them and keep only the focused change.

**How do I know the agent's explanation is correct?**  
Confidence is not correctness. Check it with a test, a tiny experiment script, or the official documentation. You can also ask a second agent (for example Claude, ChatGPT, or Gemini on the web) to review the explanation. If you cannot verify it, treat it as a guess.

**What if I don't know the right technical words?**  
Describe the problem in plain language: what you did, what you expected, what happened. Asking "what does this term mean?" mid-task is normal and useful.

**When do I commit?**  
After every focused change that works. Small commits are easy to review, undo, and explain.

**What belongs in project docs instead of the chat?**  
Anything you want to remember next time: setup steps, lessons learned, project rules, verification commands. Chat threads disappear; docs and agent instructions persist.
