import { createGoogle } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import {
  ARGAMEMNON_MODEL,
  ARGAMEMNON_SYSTEM_PROMPT,
} from "@/lib/ai/config";

export const maxDuration = 30;

const google = createGoogle({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
    const { messages } = await request.json();
    const result = streamText({
        model: google(ARGAMEMNON_MODEL),
        system: ARGAMEMNON_SYSTEM_PROMPT,
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
