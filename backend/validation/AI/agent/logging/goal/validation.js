import { z } from "zod";

export const goalCreate = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().optional().nullable(),
  priority: z.number().int().positive().optional(),
  successCriteria: z.any().optional(),
  constraints: z.any().optional(),
});

export const goalUpdate = goalCreate.partial();

export const goalUpdateWithId = goalUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const goalDelete = z.object({
  id: z.string().uuid(),
});

export default {
  goalCreate,
  goalUpdate,
  goalUpdateWithId,
  goalDelete,
};

