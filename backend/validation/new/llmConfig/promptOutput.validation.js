import { z } from "zod";

export const promptOutputCreate = z.object({
  llmConfigId: z.string().uuid().optional(),
});

export const promptOutputUpdate = promptOutputCreate.partial();

export const promptOutputUpdateWithId = promptOutputUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const promptOutputDelete = z.object({
  id: z.string().uuid(),
});

export const optionalPromptOutputDelete = promptOutputDelete.partial();

export default {
  promptOutputCreate,
  promptOutputUpdate,
  promptOutputUpdateWithId,
  promptOutputDelete,
  optionalPromptOutputDelete,
};
