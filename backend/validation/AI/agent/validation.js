import { z } from "zod";

export const agentCreate = z.object({
  name: z.string().min(1, "Name required"),
  maxIterations: z.number().int().positive().optional(),
  defaultRunTimeoutMs: z.number().int().positive().optional(),
});

export const agentUpdate = agentCreate.partial();

export const agentUpdateWithId = agentUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const agentDelete = z.object({
  id: z.string().uuid(),
});

export default {
  agentCreate,
  agentUpdate,
  agentUpdateWithId,
  agentDelete,
};

