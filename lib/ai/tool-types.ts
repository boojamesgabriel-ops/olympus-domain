export type HephaestusStatusInput = {
    projectName: String;
    includeReviewStatus?: boolean;
    simulateFailure?: boolean;
};

export type HephaestusStatusOutput = {
    agentName: string;
    status: "idle" | "rendering" | "waiting_for_approval" | "error";
    currentTask: string;
    progress: number;
    estimatedCompletion: string;
    requiresApproval: boolean;
    summary: string;
};

export function isHephaestusStatusOutput(
  value: unknown,
): value is HephaestusStatusOutput {
  if (!value || typeof value !== "object") return false;

  const output = value as Partial<HephaestusStatusOutput>;

  return (
    typeof output.agentName === "string" &&
    typeof output.status === "string" &&
    typeof output.currentTask === "string" &&
    typeof output.progress === "number" &&
    typeof output.estimatedCompletion === "string" &&
    typeof output.requiresApproval === "boolean" &&
    typeof output.summary === "string"
  );
}

export function isHephaestusStatusInput(
  value: unknown,
): value is HephaestusStatusInput {
  if (!value || typeof value !== "object") return false;

  const input = value as Partial<HephaestusStatusInput>;

  return typeof input.projectName === "string";
}