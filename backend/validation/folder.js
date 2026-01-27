import { z } from "zod";

// POST Data //

// - - - Only allow an object - - - //
export const folderCreate = z.object({

  // - - - Value must be a string and have atleats 1 charcter - - - //
  name: z.string().min(1, "Name required"),
});


// PUT Data //

// - - - Allow folderCreate to be optional - - - //
export const folderUpdate = folderCreate.partial();

// - - - Allow folderCreate to be optional - - - //
export const folderUpdateWithId = folderUpdate

// - - - Add an id field  - - - //
  .extend({ id: z.string().uuid() })

// - - - If name doesn't have a value, don't update field  - - - //
  .refine((d) => {
    return d.name !== undefined;
  }, { message: "No fields to update" });


// DELETE Data //

// - - - Only allow an object - - - //
export const folderDelete = z.object({

  // - - - Id value must be a string and be a uuid - - - //
  id: z.string().uuid(),
});

// - - - Allow delete to be optional - - - //
export const optionalFolderDelete = folderDelete.partial();


export default {
  folderCreate,
  folderUpdate,
  folderUpdateWithId,
  folderDelete,
  optionalFolderDelete,
};