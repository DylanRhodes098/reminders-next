import { z } from "zod";

export const policyCreate = z.object({
  allowedTools: z.any().optional(),
  blockedTools: z.any().optional(),
  maxToolCalls: z.number().int().positive().optional(),
  maxRuntimeMs: z.number().int().positive().optional(),
  requiresHumanApprovalFor: z.any().optional(),
  dataHandling: z.any().optional(),
  budgetLimit: z.number().nonnegative().optional().nullable(),
});

export const policyUpdate = policyCreate.partial();

export const policyUpdateWithId = policyUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const policyDelete = z.object({
  id: z.string().uuid(),
});

export default {
  policyCreate,
  policyUpdate,
  policyUpdateWithId,
  policyDelete,
};

