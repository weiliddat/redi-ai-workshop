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

The teacher can remind them: _"If you can't explain the change you made, you haven't learned it."_

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
- "What did you learn about WebSockets that you didn't know 30 minutes ago?"

The contrast between cold start and retry should speak for itself.

## Time

- 15 min — build the feature
- 5 min — debrief
