import { z } from "zod";

export const userCreate = z.object({
    full_name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

export const userUpdate = userCreate.partial();

export const userUpdateWithId = userUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    if (d.full_name !== undefined) return true;
    if (d.email !== undefined) return true;
    if (d.password !== undefined) return true;
    return false;
  }, { message: "No fields to update" })  

export const userDelete = z.object({
    id: z.string().uuid(),
})

export const optionalUserDelete = userDelete.partial();

export default {
    userCreate, 
    userDelete, 
    userUpdate, 
    optionalUserDelete,
    userUpdateWithId
};