## Tool Contract: getHephaestusStatus

`getHephaestusStatus` is a server-side AI SDK tool used by Argamemnon inside Olympus Domain. It checks the status of Hephaestus, the planned video production agent for generating, reviewing, and preparing short-form video outputs.

For this assignment, the tool returns mocked structured data because Hephaestus is still in production and has not been fully integrated into Olympus Domain yet. Hephaestus is planned to use an LLM in the future, but the current goal of this assignment is to demonstrate tool calling, structured output, tool lifecycle states, and UI rendering.

### Tool name

`getHephaestusStatus`

### Purpose

To let Argamemnon check the current status of Hephaestus and display the result as a structured UI card instead of plain text or raw JSON.

### Input schema

```ts
{
  projectName: string;
  includeReviewStatus?: boolean;
  simulateFailure?: boolean;
}