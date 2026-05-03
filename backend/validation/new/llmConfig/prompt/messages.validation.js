import { z } from "zod";

export const messagesCreate = z.object({
  promptId: z.string().uuid().optional(),
  role: z.string().optional(),
  content: z.string().optional(),
  promptInputId: z.string().uuid().optional(),
  promptOutputId: z.string().uuid().optional(),
  builtPromptToLlmId: z.string().uuid().optional(),
  llmResponseId: z.string().uuid().optional(),
});

export const messagesUpdate = messagesCreate.partial();

export const messagesUpdateWithId = messagesUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const messagesDelete = z.object({
  id: z.string().uuid(),
});

export const optionalMessagesDelete = messagesDelete.partial();

export default {
  messagesCreate,
  messagesUpdate,
  messagesUpdateWithId,
  messagesDelete,
  optionalMessagesDelete,
};
