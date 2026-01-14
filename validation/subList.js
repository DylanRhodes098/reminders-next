import { z } from "zod";

export const listCreate = z.object({
  name: z.string().min(1, "Name required"),
  folderId: z.string().uuid(),
});

export const listUpdate = listCreate.partial().omit({ folderId: true });

export const listUpdateWithId = listUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.name !== undefined) return true;
    return false;
  }, { message: "No fields to update" });

export const listDelete = z.object({
  id: z.string().uuid(),
});

export const optionalListDelete = listDelete.partial();

export default {
  listCreate,
  listUpdate,
  listUpdateWithId,
  listDelete,
  optionalListDelete,
};