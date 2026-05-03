import { z } from "zod";

export const goalCreate = z.object({
  communicationId: z.string().uuid().optional(),
  name: z.string().min(1, "Name required"),
  description: z.string().optional(),
  priority: z.number().int().optional(),
  agentConfigId: z.string().uuid().optional(),
  buildPromptToLlmId: z.string().uuid().optional(),
  inputId: z.string().uuid().optional(),
});

export const goalUpdate = goalCreate.partial();

export const goalUpdateWithId = goalUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const goalDelete = z.object({
  id: z.string().uuid(),
});

export const optionalGoalDelete = goalDelete.partial();

export default {
  goalCreate,
  goalUpdate,
  goalUpdateWithId,
  goalDelete,
  optionalGoalDelete,
};
