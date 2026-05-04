import { z } from "zod";

export const llmConfigCreate = z.object({
  name: z.string().min(1, "Name required"),
  apiKey: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  maxTokens: z.number().int().optional().nullable(),
  debug: z.boolean().optional(),
});

export const llmConfigUpdate = llmConfigCreate.partial();

export const llmConfigUpdateWithId = llmConfigUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const llmConfigDelete = z.object({
  id: z.string().uuid(),
});

export const optionalLlmConfigDelete = llmConfigDelete.partial();

export default {
  llmConfigCreate,
  llmConfigUpdate,
  llmConfigUpdateWithId,
  llmConfigDelete,
  optionalLlmConfigDelete,
};
