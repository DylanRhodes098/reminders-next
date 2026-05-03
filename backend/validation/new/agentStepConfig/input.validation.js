import { z } from "zod";

export const inputCreate = z.object({
  agentStepId: z.string().uuid().optional(),
});

export const inputUpdate = inputCreate.partial();

export const inputUpdateWithId = inputUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const inputDelete = z.object({
  id: z.string().uuid(),
});

export const optionalInputDelete = inputDelete.partial();

export default {
  inputCreate,
  inputUpdate,
  inputUpdateWithId,
  inputDelete,
  optionalInputDelete,
};
