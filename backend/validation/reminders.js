import { z } from "zod";

// Handle optional date - can be undefined, null, empty string, or a valid future date
const optionalDate = z.preprocess(
  (v) => {
    if (v === null || v === undefined || v === "") return null;
    // If it's already a Date object, check if it's valid
    if (v instanceof Date && isNaN(v.getTime())) return null;
    // If it's a string, try to parse it
    if (typeof v === "string") {
      const parsed = new Date(v);
      if (isNaN(parsed.getTime())) return null;
      return parsed;
    }
    return v;
  },
  z.union([
    z.null(),
    z.coerce.date().refine(
      (d) => {
        // Check if date is valid
        if (isNaN(d.getTime())) return false;
        return d.getTime() > Date.now() + 30_000;
      },
      { message: "Date must be at least 30 seconds in the future" }
    )
  ]).transform((val) => val === null ? undefined : val)
).optional();

export const remindersCreate = z.object({
  note: z.string().min(1, "Note required"),
  date_of_reminder: optionalDate,
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
