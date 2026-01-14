import { z } from "zod";

export const folderCreate = z.object({
  name: z.string().min(1, "Name required"),

});

export const folderUpdate = folderCreate.partial();

export const folderUpdateWithId = folderUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return d.name !== undefined;
  }, { message: "No fields to update" });

export const folderDelete = z.object({
  id: z.string().uuid(),
});

export const optionalFolderDelete = folderDelete.partial();

export default {
  folderCreate,
  folderUpdate,
  folderUpdateWithId,
  folderDelete,
  optionalFolderDelete,
};