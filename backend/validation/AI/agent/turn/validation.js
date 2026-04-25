import { z } from "zod";

export const agentTurnRequest = z.object({
  agentId: z.string().uuid(),
  runId: z.string().uuid().optional(),
  userText: z.string().min(1),

  // Optional overrides (handy while iterating)
  systemPrompt: z.string().min(1).optional(),
  maxIterations: z.number().int().min(1).max(50).optional(),
  llmClientConfigId: z.string().uuid().optional(),
});

export default {
  agentTurnRequest,
};

