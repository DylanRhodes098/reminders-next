import { z } from "zod";

export const llmResponseCreate = z.object({
  agentStepId: z.string().uuid().optional(),
});

export const llmResponseUpdate = llmResponseCreate.partial();

export const llmResponseUpdateWithId = llmResponseUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const llmResponseDelete = z.object({
  id: z.string().uuid(),
});

export const optionalLlmResponseDelete = llmResponseDelete.partial();

export default {
  llmResponseCreate,
  llmResponseUpdate,
  llmResponseUpdateWithId,
  llmResponseDelete,
  optionalLlmResponseDelete,
};
