import { z } from "zod";

export const memoryCreate = z.object({
  agentId: z.string().uuid().optional(),
  runId: z.string().uuid().optional(),
  kind: z.string().min(1).optional(),
  config: z.any().optional(),
});

export const memoryUpdate = memoryCreate.partial();

export const memoryUpdateWithId = memoryUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const memoryDelete = z.object({
  id: z.string().uuid(),
});

export default {
  memoryCreate,
  memoryUpdate,
  memoryUpdateWithId,
  memoryDelete,
};

