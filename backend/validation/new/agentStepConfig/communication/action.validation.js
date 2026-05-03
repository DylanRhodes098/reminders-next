import { z } from "zod";

export const actionCreate = z.object({
  communicationId: z.string().uuid().optional(),
  type: z.string().optional(),
  name: z.string().min(1, "Name required"),
  data: z.record(z.any()).or(z.array(z.any())).or(z.any()).optional(),
  stateUpdateId: z.string().uuid().optional(),
});

export const actionUpdate = actionCreate.partial();

export const actionUpdateWithId = actionUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const actionDelete = z.object({
  id: z.string().uuid(),
});

export const optionalActionDelete = actionDelete.partial();

export default {
  actionCreate,
  actionUpdate,
  actionUpdateWithId,
  actionDelete,
  optionalActionDelete,
};
