import { z } from "zod";

// POST Data //

// - - - Only allow an object - - - //
export const remindersCreate = z.object({

  // - - - Content of Object - - - //
    // - - - - - Required note needs to be string and min 1 charcter - - - - - //
  note: z.string().min(1, "Note required"),

      // - - - - - Value replicates optionalDate function - - - - - //
  date_of_reminder: optionalDate,

      // - - - - - Required Id needs tobe a string and valid uuid - - - - - //
  reminderFolderId: z.string().uuid(),

      // - - - - - Required subList Id needs tobe a string and valid uuid - - - - - //
  subListId: z.string().uuid(),
}).strict()

// PUT Data //

// - - - The following object is optional - - - //
export const remindersUpdate = remindersCreate
  .partial()

  // - - - Replace the sublist key with true - - - //
  .omit({ subListId: true });

  // - - - Add fields to remindersUpdate - - - //
export const remindersUpdateWithId = remindersUpdate

// - - - Add Id field  - - - //
  .extend({ id: z.string().uuid() })

  // - - - Create a rule  - - - //
  .refine((d) => {

     // - - - If note is provided  - - - //
    if (d.note !== undefined) return true;

    // - - - If date is provided  - - - //
    if (d.date_of_reminder !== undefined) return true;

    // - - - If both are false, return a no field to update message  - - - //
    return false;
  }, { message: "No fields to update" });

// PUT Data //

// - - - Delete reminder id  - - - //
export const remindersDelete = z.object({
  id: z.string().uuid(),
});


// PUT Data //

// - - - The following object is optional to delete - - - //
export const optionalRemindersDelete = remindersDelete.partial();

// OTHER //

// - - - The following object retrieves raw data to normalize - - - //
const optionalDate = z.preprocess(

  // - - - Map through each field - - - //
  (v) => {

    // - - - If field is null, undefined or an empty string, return null - - - //
    if (v === null || v === undefined || v === "") return null;
    
    // - - - If value is a Date object but represents an invalid date, return null - - - //
    if (v instanceof Date && isNaN(v.getTime())) return null;

    // - - - If field is a string, translate it into a date - - - // 
    if (typeof v === "string") {
      const parsed = new Date(v);

      // - - - If newly defined date is still not a valid date, return null - - - //
      if (isNaN(parsed.getTime())) return null;

        // - - - Else return newly defined date  - - - //
      return parsed;
    }
    // - - - If data prases all rules, return original data - - - //
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

export default {
  remindersCreate,
  remindersUpdate,
  remindersUpdateWithId,
  remindersDelete,
  optionalRemindersDelete,
};
