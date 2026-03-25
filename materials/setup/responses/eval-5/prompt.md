# Eval 5: Rate Limits Under Workshop Load

Can free models handle 20 students chatting simultaneously for ~60 minutes?

This eval is a research + load test, not a prompt-based eval. No model responses to save — just document findings.

---

## What to check

### OpenRouter free models

- [ ] What are the documented rate limits for free models? (per-user, per-IP, global?)
- [ ] Does each student's OpenRouter account get independent rate limits?
- [ ] Test: send 10 rapid messages in a row to a free model — does it throttle? What's the error?
- [ ] Estimate total load: ~20 students × ~25 messages each = ~500 messages over 60 minutes. Is that within limits?

### OpenRouter chat UI

- [ ] Does the chat UI use the same rate limits as the API?
- [ ] Can a student hit the free tier limit during a single 60-minute session?

### Free-tier web chat (Gemini, ChatGPT, Claude)

- [ ] What are the free-tier rate limits for each? (messages per hour, per day?)
- [ ] Are there known throttling behaviors during heavy use?
- [ ] Would a student sending ~25 messages in 60 minutes hit any limit?

---

## How to test

1. Create a test OpenRouter account (or use existing)
2. Pick the top free model from Eval 1 results
3. Send 10 messages as fast as possible — note any throttling
4. Wait 1 minute, send 10 more — note if limits reset
5. Check OpenRouter docs/dashboard for rate limit details

For web chat models, check their published rate limits and any known throttling reports.

---

## Output

Document findings in `evaluation.md` in this directory. Include:

- Rate limit details per model/platform
- Whether the workshop load (~500 messages across 20 students in 60 min) is feasible
- Recommended fallback if a free model throttles mid-workshop
