import { z } from "zod";

export const agentErrorCreate = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  retryable: z.boolean().optional(),
  source: z.string().min(1).optional(),
  details: z.any().optional(),
  occurredAt: z.union([z.string().datetime(), z.date()]).optional(),
});

export const agentErrorUpdate = agentErrorCreate.partial();

export const agentErrorUpdateWithId = agentErrorUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const agentErrorDelete = z.object({
  id: z.string().uuid(),
});

export default {
  agentErrorCreate,
  agentErrorUpdate,
  agentErrorUpdateWithId,
  agentErrorDelete,
};

