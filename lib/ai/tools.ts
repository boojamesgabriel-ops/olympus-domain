import { tool } from "ai";
import { z } from "zod";

export const olympusTools = {
    getHephaestusStatus: tool({
        description:
            "Check the current status of Hephaestus, the Olympus video production agent.",
        inputSchema: z.object({
            projectName: z
            .string()
            .describe("The project or agent to check. Usually Hephaestus."),
        includeReviewStatus: z
            .boolean()
            .optional()
            .describe("Whether to include approval/review information."),
        simulateFailure: z
            .boolean()
            .optional()
            .describe("Use true only when testing the UI error state."),
        }),
        execute: async ({ simulateFailure }) => {
            if (simulateFailure) {
                throw new Error("Hephaestus status service is unavailable.");
            }

            return {
                agentName: "Hephaestus",
                status: "waiting_for_approval" as const,
                currentTask: "Launch video v3",
                progress: 62,
                estimatedCompletion: "00:18:47",
                requiresApproval: true,
                summary:
                "Script approved. Hephaestus is waiting for approval before rendering the video.",
            };
        }
    }),
};
