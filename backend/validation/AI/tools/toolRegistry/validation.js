import { z } from "zod";

export const toolRegistryCreate = z.object({
  name: z.string().min(1),
  tags: z.any().optional(),
});

export const toolRegistryUpdate = toolRegistryCreate.partial();

export const toolRegistryUpdateWithId = toolRegistryUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const toolRegistryDelete = z.object({
  id: z.string().uuid(),
});

export default {
  toolRegistryCreate,
  toolRegistryUpdate,
  toolRegistryUpdateWithId,
  toolRegistryDelete,
};

