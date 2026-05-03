import { z } from "zod";

export const toolParametersCreate = z.object({
  promptId: z.string().uuid().optional(),
  schema: z.record(z.any()).or(z.array(z.any())).or(z.any()).optional(),
  toolsId: z.string().uuid().optional(),
});

export const toolParametersUpdate = toolParametersCreate.partial();

export const toolParametersUpdateWithId = toolParametersUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const toolParametersDelete = z.object({
  id: z.string().uuid(),
});

export const optionalToolParametersDelete = toolParametersDelete.partial();

export default {
  toolParametersCreate,
  toolParametersUpdate,
  toolParametersUpdateWithId,
  toolParametersDelete,
  optionalToolParametersDelete,
};
