export interface Model {
  id: string;
  label: string;
  source: "free" | "cheap" | "web-free";
}

export const MODELS: Model[] = [
  // Free on OpenRouter
  { id: "minimax/minimax-m2.5", label: "minimax-m2.5", source: "free" },
  { id: "nvidia/nemotron-3-super-120b-a12b", label: "nemotron-3-super", source: "free" },
  { id: "stepfun/step-3.5-flash", label: "step-3.5-flash", source: "free" },

  // Cheap on OpenRouter
  { id: "minimax/minimax-m2.7", label: "minimax-m2.7", source: "cheap" },
  { id: "z-ai/glm-4.7-flash", label: "glm-4.7-flash", source: "cheap" },
  { id: "xiaomi/mimo-v2-flash", label: "mimo-v2-flash", source: "cheap" },
  { id: "qwen/qwen3.5-flash-02-23", label: "qwen3.5-flash", source: "cheap" },

  // // Free-tier web chat equivalents (closest OpenRouter IDs — may need verification)
  { id: "google/gemini-3-flash-preview", label: "gemini-3-flash", source: "web-free" },
  { id: "openai/gpt-5.3-chat", label: "chatgpt-5.3", source: "web-free" },
  { id: "anthropic/claude-sonnet-4.6", label: "claude-sonnet-4.6", source: "web-free" },
];
