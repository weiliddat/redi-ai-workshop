import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { OpenRouter } from "@openrouter/sdk";
import { MODELS } from "../models.js";
import { PROMPTS } from "./prompts.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESPONSES_DIR = join(__dirname, "responses");

const client = new OpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
});

async function runPrompt(
	modelId: string,
	messages: { role: string; content: string }[],
) {
	const result = client.callModel({
		model: modelId,
		provider: { sort: "throughput" },
		reasoning: { enabled: true, effort: "medium" },
		input: messages.map((m) => ({
			role: m.role as "user" | "system",
			content: m.content,
		})),
	});

	const text = await result.getText();
	const response = await result.getResponse();

	return {
		text,
		inputTokens: response.usage?.inputTokens ?? 0,
		outputTokens: response.usage?.outputTokens ?? 0,
	};
}

async function main() {
	if (!process.env.OPENROUTER_API_KEY) {
		console.error("Error: OPENROUTER_API_KEY environment variable is required");
		process.exit(1);
	}

	for (const model of MODELS) {
		const modelDir = join(RESPONSES_DIR, model.label);
		mkdirSync(modelDir, { recursive: true });

		for (const prompt of PROMPTS) {
			const outFile = join(modelDir, `${prompt.id}.md`);

			if (existsSync(outFile)) {
				process.stderr.write(
					`[${model.label}] ${prompt.id}... skipped (exists)\n`,
				);
				continue;
			}

			process.stderr.write(`[${model.label}] ${prompt.id}...`);

			try {
				const { text, inputTokens, outputTokens } = await runPrompt(
					model.id,
					prompt.messages,
				);
				const timestamp = new Date().toISOString();

				const content = [
					"---",
					`model: ${model.id}`,
					`prompt: ${prompt.id}`,
					`category: ${prompt.category}`,
					`timestamp: ${timestamp}`,
					`input_tokens: ${inputTokens}`,
					`output_tokens: ${outputTokens}`,
					"---",
					"",
					text,
					"",
				].join("\n");

				writeFileSync(outFile, content);
				process.stderr.write(` done (${outputTokens} tokens)\n`);
			} catch (err) {
				console.error(err);
			}
		}
	}

	process.stderr.write("\nDone.\n");
}

main();
