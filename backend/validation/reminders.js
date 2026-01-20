import { z } from "zod";

const optionalDate = z.preprocess((v) => {
  if (v === null || v === undefined || v === "") return undefined;
  return v;
}, z.coerce.date().refine((d) => d > new Date(), { message: "Date must be in the future" }));

export const remindersCreate = z.object({
  note: z.string().min(1, "Note required"),
  date_of_reminder: optionalDate.optional(),
  reminderFolderId: z.string().uuid(),
  subListId: z.string().uuid(),
}).strict()

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
