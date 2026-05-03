import { z } from "zod";

export const memoryCreate = z.object({
  communicationId: z.string().uuid().optional(),
  key: z.string().optional(),
  value: z.record(z.any()).or(z.array(z.any())).or(z.any()).optional(),
  buildPromptToLlmId: z.string().uuid().optional(),
  inputId: z.string().uuid().optional(),
});

export const memoryUpdate = memoryCreate.partial();

export const memoryUpdateWithId = memoryUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const memoryDelete = z.object({
  id: z.string().uuid(),
});

export const optionalMemoryDelete = memoryDelete.partial();

export default {
  memoryCreate,
  memoryUpdate,
  memoryUpdateWithId,
  memoryDelete,
  optionalMemoryDelete,
};
