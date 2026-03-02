// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import Library - > //
import { z } from "zod";

// - - - Post Data - - - //

// »« - »« »« - »« »« - »« //
// Create Folder Security
// »« - »« »« - »« »« - »« //
// < - Only allow an object - > //
export const folderCreate = z.object({

  // < - Value must be a string and have atleats 1 charcter - > //
  name: z.string().min(1, "Name required"),
});

// - - - PUT Data - - - //

// »« - »« »« - »« »« - »« //
// Update Folder Security
// »« - »« »« - »« »« - »« //
// < - Allow folderCreate to be optional - > //
export const folderUpdate = folderCreate.partial();

// »« - »« »« - »« »« - »« //
// Update Folder with ID Security
// »« - »« »« - »« »« - »« //
// < - Equivelant to folderUpdate - > //
export const folderUpdateWithId = folderUpdate

// < - Add to Allow an id field - > //
  .extend({ id: z.string().uuid() })

// < - If name doesn't have a value, don't update field - > //
  .refine((d) => {
    return d.name !== undefined;
  }, { message: "No fields to update" });


// - - - DELETE Data - - - //

// »« - »« »« - »« »« - »« //
// Delete Folder Security
// »« - »« »« - »« »« - »« //
// < - Only allow an object - > //
export const folderDelete = z.object({

  // < - Id value must be a string and be a uuid - > //
  id: z.string().uuid(),
});

// »« - »« »« - »« »« - »« //
// Optoinal Delete Folder Security
// »« - »« »« - »« »« - »« //
// < - Allow delete to be optional - > //
export const optionalFolderDelete = folderDelete.partial();

export default {
  folderCreate,
  folderUpdate,
  folderUpdateWithId,
  folderDelete,
  optionalFolderDelete,
};