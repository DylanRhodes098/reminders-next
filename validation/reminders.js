import { z } from "zod";

export const reminderCreate = z.object({
  note: z.string().min(1, "Note required"),
  date_of_reminder: z.coerce.date().refine(
    (d) => d > new Date(),
    { message: "Date must be in the future" }
  ),
  subListId: z.string().uuid(),
});

export const reminderUpdate = reminderCreate
  .partial()
  .omit({ subListId: true });

export const reminderUpdateWithId = reminderUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.note !== undefined) return true;
    if (d.date_of_reminder !== undefined) return true;
    return false;
  }, { message: "No fields to update" });

export const reminderDelete = z.object({
  id: z.string().uuid(),
});

export const optionalReminderDelete = reminderDelete.partial();

export default {
  reminderCreate,
  reminderUpdate,
  reminderUpdateWithId,
  reminderDelete,
  optionalReminderDelete,
};
