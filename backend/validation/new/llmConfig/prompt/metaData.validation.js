import { z } from "zod";

export const metaDataCreate = z.object({
  promptId: z.string().uuid().optional(),
  temperature: z.number().optional(),
  maxTokens: z.number().int().optional(),
  requestId: z.string().optional(),
  promptInputId: z.string().uuid().optional(),
  builtPromptToLlmId: z.string().uuid().optional(),
});

export const metaDataUpdate = metaDataCreate.partial();

export const metaDataUpdateWithId = metaDataUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const metaDataDelete = z.object({
  id: z.string().uuid(),
});

export const optionalMetaDataDelete = metaDataDelete.partial();

export default {
  metaDataCreate,
  metaDataUpdate,
  metaDataUpdateWithId,
  metaDataDelete,
  optionalMetaDataDelete,
};
