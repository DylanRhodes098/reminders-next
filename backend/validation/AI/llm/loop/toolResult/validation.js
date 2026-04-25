import { z } from "zod";

export const toolResultCreate = z.object({
  toolCallId: z.string().uuid(),
  ok: z.boolean(),
  data: z.any().optional(),
  error: z.any().optional(),
  latencyMs: z.number().int().nonnegative().optional(),
  completedAt: z.union([z.string().datetime(), z.date()]).optional(),
});

export const toolResultUpdate = toolResultCreate.partial();

export const toolResultUpdateWithId = toolResultUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const toolResultDelete = z.object({
  id: z.string().uuid(),
});

export default {
  toolResultCreate,
  toolResultUpdate,
  toolResultUpdateWithId,
  toolResultDelete,
};

