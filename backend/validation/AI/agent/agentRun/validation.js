import { z } from "zod";

export const agentRunCreate = z.object({
  agentId: z.string().uuid(),
  status: z.string().min(1).optional(),
  startedAt: z.union([z.string().datetime(), z.date()]).optional(),
  endedAt: z.union([z.string().datetime(), z.date()]).nullable().optional(),
  iterations: z.number().int().nonnegative().optional(),
  input: z.any().optional(),
  output: z.any().optional(),
  error: z.any().optional(),
  usage: z.any().optional(),
  trace: z.any().optional(),
});

export const agentRunUpdate = agentRunCreate.partial();

export const agentRunUpdateWithId = agentRunUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const agentRunDelete = z.object({
  id: z.string().uuid(),
});

export default {
  agentRunCreate,
  agentRunUpdate,
  agentRunUpdateWithId,
  agentRunDelete,
};

