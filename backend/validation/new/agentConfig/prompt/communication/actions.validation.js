import { z } from "zod";

export const actionsCreate = z.object({
  communicationId: z.string().uuid().optional(),
  type: z.string().optional(),
  name: z.string().min(1, "Name required"),
  data: z.record(z.any()).or(z.array(z.any())).or(z.any()).optional(),
  buildPromptToLlmId: z.string().uuid().optional(),
  receivePromptFromLlmId: z.string().uuid().optional(),
});

export const actionsUpdate = actionsCreate.partial();

export const actionsUpdateWithId = actionsUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const actionsDelete = z.object({
  id: z.string().uuid(),
});

export const optionalActionsDelete = actionsDelete.partial();

export default {
  actionsCreate,
  actionsUpdate,
  actionsUpdateWithId,
  actionsDelete,
  optionalActionsDelete,
};
