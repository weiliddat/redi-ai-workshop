# Model Benchmark Comparison: Free vs Cheap

This compares the models tested in Eval 1 against published benchmark data from SWE-bench, Terminal-bench, Artificial Analysis, and LiveBench.

## Models

**Free on OpenRouter** (no API credit required):
- MiniMax M2.5
- Nemotron 3 Super
- Step 3.5 Flash

**Cheap on OpenRouter** (paid, low cost):
- MiniMax M2.7
- GLM 4.7 Flash
- MiMo-V2-Flash
- Qwen3.5 Flash

**Free-tier web chat** (comparison group):
- Gemini 3 Fast
- ChatGPT free (GPT-5.4 mini)
- Claude Sonnet 4.6 (free tier)

---

## Benchmark Data

### SWE-bench Verified

SWE-bench measures a model's ability to fix real GitHub issues from popular open-source Python repositories. Higher = better software engineering.

| Model | Category | SWE-bench Verified |
|---|---|---|
| MiniMax M2.5 | Free OR | **80.2%** |
| Claude Sonnet 4.6 | Free web | **79.6%** |
| Gemini 3 Fast | Free web | **78.0%** |
| Step 3.5 Flash | Free OR | **74.4%** |
| MiMo-V2-Flash | Cheap | **73.4%** |
| Qwen3.5 Flash | Cheap | ~69–76% (model-size dependent) |
| Nemotron 3 Super | Free OR | ~60% (no official figure) |
| GLM 4.7 Flash | Cheap | **59.2%** |
| MiniMax M2.7 | Cheap | **56.2%** (SWE-Pro) |
| ChatGPT free (GPT-5.4 mini) | Free web | ~54% (SWE-Pro) |

### LiveCodeBench (coding)

| Model | Category | LiveCodeBench |
|---|---|---|
| Step 3.5 Flash | Free OR | **86.4%** |
| GLM 4.7 Flash | Cheap | **84.9%** |
| MiMo-V2-Flash | Cheap | **80.6%** |
| Nemotron 3 Super | Free OR | ~60% (rank 26/58) |

### Artificial Analysis Intelligence Index

| Model | Category | AA Index |
|---|---|---|
| MiMo-V2-Flash | Cheap | **41** |
| Nemotron 3 Super | Free OR | **36** |

### Terminal-bench / Agentic (TAU2-bench)

| Model | Category | Terminal-bench | TAU2-bench |
|---|---|---|---|
| Claude Sonnet 4.6 | Free web | **59.1%** | — |
| Step 3.5 Flash | Free OR | **51.0%** | **88.2** |
| MiMo-V2-Flash | Cheap | **38.5%** | 79.5–95.3 |
| GLM 4.7 Flash | Cheap | — | **79.5%** |

---

## Eval 1 Results (our workshop task)

| Model | Category | Eval 1 Result |
|---|---|---|
| MiniMax M2.5 | Free OR | ✅ PASS |
| Nemotron 3 Super | Free OR | ✅ PASS |
| Step 3.5 Flash | Free OR | ✅ PASS |
| MiMo-V2-Flash | Cheap | ✅ PASS |
| MiniMax M2.7 | Cheap | ⚠️ PASS on retry |
| GLM 4.7 Flash | Cheap | ❌ FAIL |
| Qwen3.5 Flash | Cheap | ❌ FAIL |
| Gemini 3 Fast | Free web | ✅ PASS |
| ChatGPT free | Free web | ✅ PASS (cleanest) |
| Claude Sonnet 4.6 | Free web | ⚠️ FUNCTIONAL (prompt violations) |

---

## The Most Surprising Finding

### MiniMax M2.5 (free) outperforms its own paid successor (M2.7) by 24 points on SWE-bench

MiniMax M2.5 scores **80.2% on SWE-bench Verified** — higher than every cheap model tested, and even slightly ahead of Claude Sonnet 4.6 (79.6%) and Gemini 3 Fast (78.0%).

MiniMax M2.7 — the supposedly *better*, *paid* model — scores only **56.2%** on the comparable SWE-Pro benchmark.

That's not a small gap. M2.5 (free) is better at real-world software engineering tasks than M2.7 (cheap, paid) by a wide margin. And it showed in Eval 1: M2.5 passed cleanly on the first try; M2.7 needed a revised prompt to fix broken join/leave events.

The benchmark story matches what we saw in practice.

### Runner-up: GLM 4.7 Flash (cheap) failed, despite 84.9% on LiveCodeBench

GLM 4.7 Flash scores **84.9% on LiveCodeBench** — the second highest coding score in this comparison, beating MiMo-V2-Flash and Nemotron 3 Super. On paper, it looks like a strong coder.

In Eval 1, it failed both rounds. Round 1: inverted UI state (connecting disabled the Send button). Round 2: destructive DOM manipulation (replacing the setup form's `innerHTML` with a "Connected" message, making error recovery impossible without a page reload).

This is a good illustration of the difference between **benchmark coding** (algorithmic problem solving, competitive programming) and **practical code generation** (building a correct UI that handles real-world error states). LiveCodeBench measures the former; Eval 1 measures the latter.

### Also notable: Nemotron 3 Super runs at 407 tokens/second — for free

Nemotron 3 Super has modest SWE-bench scores (~60%), but it's the **third-fastest model on the Artificial Analysis leaderboard** at 407 tokens/second. It's available completely free on OpenRouter. For tasks where throughput matters more than frontier-level coding ability, this is a remarkable value proposition.

---

## Summary

The free vs cheap divide in this workshop is essentially inverted from what the pricing suggests:

- **Free OpenRouter models** are frontier-adjacent (M2.5 at 80% SWE-bench, Step 3.5 Flash at 86% LiveCodeBench) because companies offer these free as loss leaders to build developer mindshare.
- **Cheap OpenRouter models** tend to be smaller, cost-optimized models that sacrifice capability for low inference cost. The pricing reflects compute, not capability.

The practical lesson: when choosing a model, benchmark scores and direct task evaluation matter more than price tier.

---

*Sources: MiniMax announcement (minimax.io), NVIDIA/Artificial Analysis (artificialanalysis.ai), Step AI (stepfun.com), BenchLM (benchlm.ai), Awesome Agents comparison (awesomeagents.ai), Artificial Analysis leaderboard.*
