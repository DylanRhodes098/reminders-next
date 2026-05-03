import { z } from "zod";

export const toolsCreate = z.object({
  agentConfigId: z.string().uuid().optional(),
  name: z.string().min(1, "Name required"),
  description: z.string().optional(),
  terminal: z.boolean().optional(),
  toolRegistryId: z.string().uuid().optional(),
  promptInputId: z.string().uuid().optional(),
  builtPromptToLlmId: z.string().uuid().optional(),
});

export const toolsUpdate = toolsCreate.partial();

export const toolsUpdateWithId = toolsUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const toolsDelete = z.object({
  id: z.string().uuid(),
});

export const optionalToolsDelete = toolsDelete.partial();

export default {
  toolsCreate,
  toolsUpdate,
  toolsUpdateWithId,
  toolsDelete,
  optionalToolsDelete,
};
