import { z } from "zod";

export const usageMetricsCreate = z.object({
  promptTokens: z.number().int().nonnegative().optional(),
  completionTokens: z.number().int().nonnegative().optional(),
  totalTokens: z.number().int().nonnegative().optional(),
  estimatedCost: z.number().nonnegative().optional(),
  llmLatencyMs: z.number().int().nonnegative().optional(),
  toolLatencyMs: z.number().int().nonnegative().optional(),
  totalLatencyMs: z.number().int().nonnegative().optional(),
});

export const usageMetricsUpdate = usageMetricsCreate.partial();

export const usageMetricsUpdateWithId = usageMetricsUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const usageMetricsDelete = z.object({
  id: z.string().uuid(),
});

export default {
  usageMetricsCreate,
  usageMetricsUpdate,
  usageMetricsUpdateWithId,
  usageMetricsDelete,
};

