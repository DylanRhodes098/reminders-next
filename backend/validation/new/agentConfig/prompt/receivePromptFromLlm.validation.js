import { z } from "zod";

export const receivePromptFromLlmCreate = z.object({
  promptId: z.string().uuid().optional(),
  languageId: z.string().uuid().optional(),
});

export const receivePromptFromLlmUpdate = receivePromptFromLlmCreate.partial();

export const receivePromptFromLlmUpdateWithId = receivePromptFromLlmUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const receivePromptFromLlmDelete = z.object({
  id: z.string().uuid(),
});

export const optionalReceivePromptFromLlmDelete = receivePromptFromLlmDelete.partial();

export default {
  receivePromptFromLlmCreate,
  receivePromptFromLlmUpdate,
  receivePromptFromLlmUpdateWithId,
  receivePromptFromLlmDelete,
  optionalReceivePromptFromLlmDelete,
};
