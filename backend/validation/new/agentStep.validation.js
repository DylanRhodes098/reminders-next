import { z } from "zod";

export const agentStepCreate = z.object({
  iteration: z.number().int().optional(),
});

export const agentStepUpdate = agentStepCreate.partial();

export const agentStepUpdateWithId = agentStepUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const agentStepDelete = z.object({
  id: z.string().uuid(),
});

export const optionalAgentStepDelete = agentStepDelete.partial();

export default {
  agentStepCreate,
  agentStepUpdate,
  agentStepUpdateWithId,
  agentStepDelete,
  optionalAgentStepDelete,
};
