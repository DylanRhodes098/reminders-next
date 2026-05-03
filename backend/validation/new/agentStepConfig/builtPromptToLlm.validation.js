import { z } from "zod";

export const builtPromptToLlmCreate = z.object({
  agentStepId: z.string().uuid().optional(),
});

export const builtPromptToLlmUpdate = builtPromptToLlmCreate.partial();

export const builtPromptToLlmUpdateWithId = builtPromptToLlmUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const builtPromptToLlmDelete = z.object({
  id: z.string().uuid(),
});

export const optionalBuiltPromptToLlmDelete = builtPromptToLlmDelete.partial();

export default {
  builtPromptToLlmCreate,
  builtPromptToLlmUpdate,
  builtPromptToLlmUpdateWithId,
  builtPromptToLlmDelete,
  optionalBuiltPromptToLlmDelete,
};
