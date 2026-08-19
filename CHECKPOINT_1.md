# Checkpoint 1: Error States, Empty States, Edge Cases

## Primary Flow
The primary flow is the Argamemnon streaming chat interface. A user opens Olympus Domain, sends a message, receives a streamed response, and can stop or retry when needed.

## Handled States
- Empty first-run state with starter prompts
- Empty input blocked with disabled send button
- Thinking state before the first streamed token
- API error state using `test api error`
- Rate limit state using `test rate limit`
- Tool failure state for Hephaestus status
- Stop button during streaming
- Mobile layout checked at 375px

## Sabotage Tests
- `test api error` returns a controlled 500 response
- `test rate limit` returns a controlled 429 response
- Hephaestus tool failure can be tested by asking for a simulated failure

## Human Review
During normal happy-path testing, I checked that the chat streamed correctly and did not show console errors. Console errors shown during sabotage tests were expected because the API route intentionally returned failure responses.

## Notes
This is still a learning prototype. Athena and Hephaestus are not fully connected production agents yet, so tool data is mocked where needed.