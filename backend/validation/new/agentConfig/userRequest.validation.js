import { z } from "zod";

export const userRequestCreate = z.object({
  agentConfigId: z.string().uuid().optional(),
  buildPromptToLlmId: z.string().uuid().optional(),
  inputId: z.string().uuid().optional(),
});

export const userRequestUpdate = userRequestCreate.partial();

export const userRequestUpdateWithId = userRequestUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const userRequestDelete = z.object({
  id: z.string().uuid(),
});

export const optionalUserRequestDelete = userRequestDelete.partial();

export default {
  userRequestCreate,
  userRequestUpdate,
  userRequestUpdateWithId,
  userRequestDelete,
  optionalUserRequestDelete,
};
