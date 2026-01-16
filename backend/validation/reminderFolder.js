import { z } from "zod";

export const reminderFolderCreate = z.object({
  name: z.string().min(1, "Name required"),
  subListId: z.string().uuid("SubList ID must be a valid UUID"),
});

export const reminderFolderUpdate = reminderFolderCreate.partial();

export const reminderFolderUpdateWithId = reminderFolderUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return d.name !== undefined || d.subListId !== undefined;
  }, { message: "No fields to update" });

export const reminderFolderDelete = z.object({
  id: z.string().uuid(),
});

export const optionalReminderFolderDelete = reminderFolderDelete.partial();

export default {
  reminderFolderCreate,
  reminderFolderUpdate,
  reminderFolderUpdateWithId,
  reminderFolderDelete,
  optionalReminderFolderDelete,
};
