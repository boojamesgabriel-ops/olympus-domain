import { createGoogle } from "@ai-sdk/google";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import {
  ARGAMEMNON_MODEL,
  ARGAMEMNON_SYSTEM_PROMPT,
} from "@/lib/ai/config";
import { olympusTools } from "@/lib/ai/tools";

export const maxDuration = 30;

const google = createGoogle({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY,
});

type ChatMessagePart = {
    type?: string;
    text?: string;
};

type ChatMessage = {
    role?: string;
    parts?: ChatMessagePart[];
};

function getLatestUserMessageText(messages: ChatMessage[]) {
    const latestUserMessage = messages.findLast((message) => message.role === "user");

    return latestUserMessage?.parts
        ?.filter((part) => part.type === "text")
        .map((part) => part.text ?? "")
        .join("")
        .toLowerCase() ?? "";
}

export async function POST(request: Request) {
    const { messages } = await request.json();
    const latestUserMessageText = getLatestUserMessageText(messages);

    if (latestUserMessageText.includes("test api error")) {
        return new Response("Test API error triggered.", { status: 500 });
    }

    if (latestUserMessageText.includes("test rate limit")) {
        return new Response("Test rate limit triggered.", { status: 429 });
    }

    const result = streamText({
        model: google(ARGAMEMNON_MODEL),
        system: `${ARGAMEMNON_SYSTEM_PROMPT}

        When the user asks about Hephaestus, video rendering, approval status, or production progress, call getHephaestusStatus.
        After the tool returns, summarize the result briefly in plain language.`,
        messages: await convertToModelMessages(messages),
        tools: olympusTools,
        stopWhen: stepCountIs(3),
    });

    return result.toUIMessageStreamResponse();
}
