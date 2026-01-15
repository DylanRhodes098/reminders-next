import { z } from "zod";

export const subListsCreate = z.object({
  name: z.string().min(1, "Name required"),
  folderId: z.string().uuid(),
});

export const subListsUpdate = subListsCreate.partial().omit({ folderId: true });

export const subListsUpdateWithId = subListsUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.name !== undefined) return true;
    return false;
  }, { message: "No fields to update" });

export const subListsDelete = z.object({
  id: z.string().uuid(),
});

export const optionalSubListsDelete = subListsDelete.partial();

export default {
  subListsCreate,
  subListsUpdate,
  subListsUpdateWithId,
  subListsDelete,
  optionalSubListsDelete,
};