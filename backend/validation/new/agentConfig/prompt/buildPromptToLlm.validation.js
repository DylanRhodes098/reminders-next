import { z } from "zod";

export const buildPromptToLlmCreate = z.object({
  promptId: z.string().uuid().optional(),
  languageId: z.string().uuid().optional(),
});

export const buildPromptToLlmUpdate = buildPromptToLlmCreate.partial();

export const buildPromptToLlmUpdateWithId = buildPromptToLlmUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const buildPromptToLlmDelete = z.object({
  id: z.string().uuid(),
});

export const optionalBuildPromptToLlmDelete = buildPromptToLlmDelete.partial();

export default {
  buildPromptToLlmCreate,
  buildPromptToLlmUpdate,
  buildPromptToLlmUpdateWithId,
  buildPromptToLlmDelete,
  optionalBuildPromptToLlmDelete,
};
