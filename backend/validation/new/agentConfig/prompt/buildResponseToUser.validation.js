import { z } from "zod";

export const buildResponseToUserCreate = z.object({
  promptId: z.string().uuid().optional(),
  languageId: z.string().uuid().optional(),
});

export const buildResponseToUserUpdate = buildResponseToUserCreate.partial();

export const buildResponseToUserUpdateWithId = buildResponseToUserUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const buildResponseToUserDelete = z.object({
  id: z.string().uuid(),
});

export const optionalBuildResponseToUserDelete = buildResponseToUserDelete.partial();

export default {
  buildResponseToUserCreate,
  buildResponseToUserUpdate,
  buildResponseToUserUpdateWithId,
  buildResponseToUserDelete,
  optionalBuildResponseToUserDelete,
};
