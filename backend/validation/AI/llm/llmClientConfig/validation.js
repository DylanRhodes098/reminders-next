import { z } from "zod";

export const llmClientConfigCreate = z.object({
  provider: z.string().min(1),
  model: z.string().min(1),
  apiKeyRef: z.string().optional().nullable(),
  temperature: z.number().optional(),
  topP: z.number().optional(),
  maxInputTokens: z.number().int().positive().optional().nullable(),
  maxOutputTokens: z.number().int().positive().optional().nullable(),
  timeoutMs: z.number().int().positive().optional(),
  retryPolicy: z.any().optional(),
});

export const llmClientConfigUpdate = llmClientConfigCreate.partial();

export const llmClientConfigUpdateWithId = llmClientConfigUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const llmClientConfigDelete = z.object({
  id: z.string().uuid(),
});

export default {
  llmClientConfigCreate,
  llmClientConfigUpdate,
  llmClientConfigUpdateWithId,
  llmClientConfigDelete,
};

