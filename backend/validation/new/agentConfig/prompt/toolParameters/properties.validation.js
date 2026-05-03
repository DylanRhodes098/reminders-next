import { z } from "zod";

export const propertiesCreate = z.object({
  toolParametersId: z.string().uuid().optional(),
  schema: z.record(z.any()).or(z.array(z.any())).or(z.any()).optional(),
});

export const propertiesUpdate = propertiesCreate.partial();

export const propertiesUpdateWithId = propertiesUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const propertiesDelete = z.object({
  id: z.string().uuid(),
});

export const optionalPropertiesDelete = propertiesDelete.partial();

export default {
  propertiesCreate,
  propertiesUpdate,
  propertiesUpdateWithId,
  propertiesDelete,
  optionalPropertiesDelete,
};
