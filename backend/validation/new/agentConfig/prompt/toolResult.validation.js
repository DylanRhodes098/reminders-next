import { z } from "zod";

export const toolResultCreate = z.object({
  promptId: z.string().uuid().optional(),
  data: z.record(z.any()).or(z.array(z.any())).or(z.any()).optional(),
  success: z.boolean().optional(),
  error: z.string().optional(),
  toolExecutionId: z.string().uuid().optional(),
});

export const toolResultUpdate = toolResultCreate.partial();

export const toolResultUpdateWithId = toolResultUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const toolResultDelete = z.object({
  id: z.string().uuid(),
});

export const optionalToolResultDelete = toolResultDelete.partial();

export default {
  toolResultCreate,
  toolResultUpdate,
  toolResultUpdateWithId,
  toolResultDelete,
  optionalToolResultDelete,
};
