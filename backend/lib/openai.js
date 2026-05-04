import OpenAI from "openai";

export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-nano";

let client;

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return client;
}

export async function createChatReply(message) {
  const openai = getOpenAIClient();

  const response = await openai.responses.create({
    model: OPENAI_MODEL,
    input: message,
  });

  return response.output_text?.trim() || "";
}
