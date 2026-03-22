# Hands-On: Retry

## Setup

Students return to the same chat client task — but this time with the prompting and learning strategies from sections 03 and 04.

The teacher gives a new goal:

> **"Add a feature to your chat client. Pick one:"**
>
> - Show a timestamp next to each message
> - Add a `/nick` command that changes your display name
> - Show a notification when someone joins or leaves
>
> **This time, before you accept any code from AI, make sure you can explain what it does and why.**

## What's different this time

Students now know the high-scoring patterns:

- **Conceptual inquiry** — "What is the `on_message` callback doing?" / "Why do we use `json.loads` here?"
- **Hybrid code-explanation** — "Show me the code and explain each part"
- **Generation-then-comprehension** — After getting code, ask "Walk me through what happens when a message arrives"
- **Intentional debugging** — When something breaks, ask "What does this error mean?" before asking for a fix

The teacher can remind them: _"If you can't explain the change you made, you haven't learned it."_

## Teacher demo first

Before students begin, the teacher demos one feature addition live (5 min). This bridges the theory from section 04 into the hands-on task.

**Example: adding timestamps**

The teacher picks a pattern (e.g., hybrid code-explanation) and walks through it in real time:

1. Types: _"How do I get the current time in Python and format it as HH:MM?"_
2. Reads the response, writes the formatting line.
3. Types: _"Show me how to prepend a timestamp to each message in my WebSocket client, and explain what each part does."_
4. Reads the code and explanation, asks a follow-up: _"What does `strftime` stand for?"_
5. Pastes the code and runs it.

Narrate the thinking at each step: why you asked what you asked, what you understood, what you didn't.

Then: "Your turn. Pick a feature. Use any of the four patterns."

## What to watch for

The difference should be visible:

| Cold Start                           | Retry                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| "Make me a chat client" (one prompt) | "What library handles WebSockets in Python?" → "Show me how to connect" → "Now how do I send a message?" |
| Accepted code without reading it     | Asked AI to explain the code                                                                             |
| Got stuck on the modification        | Can describe what they changed and why                                                                   |

## The debrief (teacher-led)

Ask a few students to share:

- "What did you do differently this time?"
- "Can you explain the feature you added?"
- "What did you learn about WebSockets that you didn't know during the cold start?"

If time allows, ask one student to share their screen and walk through what they built. The teacher can model good follow-up questions: _"What does that line do?" / "What would happen if you changed this value?"_

The contrast between cold start and retry should speak for itself.

## Time

- 5 min — teacher demos a feature addition live
- 18 min — students build their feature
- 7 min — debrief and share
