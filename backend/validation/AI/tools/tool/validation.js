import { z } from "zod";

export const toolCreate = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  parametersSchema: z.any().optional(),
  resultSchema: z.any().optional(),
  tags: z.any().optional(),
  terminal: z.boolean().optional(),
  timeoutMs: z.number().int().positive().optional(),
  idempotent: z.boolean().optional(),
  sideEffectLevel: z.string().min(1).optional(),
  version: z.string().min(1).optional(),
});

export const toolUpdate = toolCreate.partial();

export const toolUpdateWithId = toolUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const toolDelete = z.object({
  id: z.string().uuid(),
});

export default {
  toolCreate,
  toolUpdate,
  toolUpdateWithId,
  toolDelete,
};

