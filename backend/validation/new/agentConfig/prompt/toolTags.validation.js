import { z } from "zod";

export const toolTagsCreate = z.object({
  promptId: z.string().uuid().optional(),
  value: z.string().optional(),
  toolsId: z.string().uuid().optional(),
});

export const toolTagsUpdate = toolTagsCreate.partial();

export const toolTagsUpdateWithId = toolTagsUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const toolTagsDelete = z.object({
  id: z.string().uuid(),
});

export const optionalToolTagsDelete = toolTagsDelete.partial();

export default {
  toolTagsCreate,
  toolTagsUpdate,
  toolTagsUpdateWithId,
  toolTagsDelete,
  optionalToolTagsDelete,
};
