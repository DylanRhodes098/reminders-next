import { z } from "zod";

export const promptInputCreate = z.object({
  llmConfigId: z.string().uuid().optional(),
});

export const promptInputUpdate = promptInputCreate.partial();

export const promptInputUpdateWithId = promptInputUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const promptInputDelete = z.object({
  id: z.string().uuid(),
});

export const optionalPromptInputDelete = promptInputDelete.partial();

export default {
  promptInputCreate,
  promptInputUpdate,
  promptInputUpdateWithId,
  promptInputDelete,
  optionalPromptInputDelete,
};
