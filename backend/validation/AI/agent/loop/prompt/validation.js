import { z } from "zod";

export const promptCreate = z.object({
  messages: z.any().optional(),
  tools: z.any().optional(),
  metadata: z.any().optional(),
  responseSchema: z.any().optional(),
});

export const promptUpdate = promptCreate.partial();

export const promptUpdateWithId = promptUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const promptDelete = z.object({
  id: z.string().uuid(),
});

export default {
  promptCreate,
  promptUpdate,
  promptUpdateWithId,
  promptDelete,
};

