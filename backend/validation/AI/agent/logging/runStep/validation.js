import { z } from "zod";

export const runStepCreate = z.object({
  runId: z.string().uuid(),
  type: z.string().min(1),
  payload: z.any().optional(),
  timestamp: z.union([z.string().datetime(), z.date()]).optional(),
});

export const runStepUpdate = runStepCreate.partial();

export const runStepUpdateWithId = runStepUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const runStepDelete = z.object({
  id: z.string().uuid(),
});

export default {
  runStepCreate,
  runStepUpdate,
  runStepUpdateWithId,
  runStepDelete,
};

