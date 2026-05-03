import { z } from "zod";

export const toolRegistryCreate = z.object({
  agentConfigId: z.string().uuid().optional(),
});

export const toolRegistryUpdate = toolRegistryCreate.partial();

export const toolRegistryUpdateWithId = toolRegistryUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const toolRegistryDelete = z.object({
  id: z.string().uuid(),
});

export const optionalToolRegistryDelete = toolRegistryDelete.partial();

export default {
  toolRegistryCreate,
  toolRegistryUpdate,
  toolRegistryUpdateWithId,
  toolRegistryDelete,
  optionalToolRegistryDelete,
};
