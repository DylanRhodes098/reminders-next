import { z } from "zod";

export const remindersCreate = z.object({
  note: z.string().min(1, "Note required"),
  date_of_reminder: z.coerce.date()
    .refine((d) => d > new Date(), { message: "Date must be in the future" })
    .optional()
    .nullable(),
  reminderFolderId: z.string().uuid().optional().nullable(),
  subListId: z.string().uuid(),
});

export const remindersUpdate = remindersCreate
  .partial()
  .omit({ subListId: true });

export const remindersUpdateWithId = remindersUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.note !== undefined) return true;
    if (d.date_of_reminder !== undefined) return true;
    return false;
  }, { message: "No fields to update" });

export const remindersDelete = z.object({
  id: z.string().uuid(),
});

export const optionalRemindersDelete = remindersDelete.partial();

export default {
  remindersCreate,
  remindersUpdate,
  remindersUpdateWithId,
  remindersDelete,
  optionalRemindersDelete,
};
