import { z } from "zod";

export const languageCreate = z.object({
  agentConfigId: z.string().uuid().optional(),
  name: z.string().min(1, "Name required"),
});

export const languageUpdate = languageCreate.partial();

export const languageUpdateWithId = languageUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const languageDelete = z.object({
  id: z.string().uuid(),
});

export const optionalLanguageDelete = languageDelete.partial();

export default {
  languageCreate,
  languageUpdate,
  languageUpdateWithId,
  languageDelete,
  optionalLanguageDelete,
};
