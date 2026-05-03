import { z } from "zod";

export const stateUpdateCreate = z.object({
  agentStepId: z.string().uuid().optional(),
});

export const stateUpdateUpdate = stateUpdateCreate.partial();

export const stateUpdateUpdateWithId = stateUpdateUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const stateUpdateDelete = z.object({
  id: z.string().uuid(),
});

export const optionalStateUpdateDelete = stateUpdateDelete.partial();

export default {
  stateUpdateCreate,
  stateUpdateUpdate,
  stateUpdateUpdateWithId,
  stateUpdateDelete,
  optionalStateUpdateDelete,
};
