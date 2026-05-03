import { z } from "zod";

export const toolExecutionsCreate = z.object({
  agentConfigId: z.string().uuid().optional(),
  success: z.boolean().optional(),
  error: z.string().optional(),
});

export const toolExecutionsUpdate = toolExecutionsCreate.partial();

export const toolExecutionsUpdateWithId = toolExecutionsUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const toolExecutionsDelete = z.object({
  id: z.string().uuid(),
});

export const optionalToolExecutionsDelete = toolExecutionsDelete.partial();

export default {
  toolExecutionsCreate,
  toolExecutionsUpdate,
  toolExecutionsUpdateWithId,
  toolExecutionsDelete,
  optionalToolExecutionsDelete,
};
