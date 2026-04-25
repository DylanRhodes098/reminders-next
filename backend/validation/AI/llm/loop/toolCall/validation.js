import { z } from "zod";

export const toolCallCreate = z.object({
  toolName: z.string().min(1),
  arguments: z.any().optional(),
  requestedByMessageId: z.string().uuid().optional().nullable(),
  status: z.string().min(1).optional(),
  runId: z.string().uuid().optional().nullable(),
});

export const toolCallUpdate = toolCallCreate.partial();

export const toolCallUpdateWithId = toolCallUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => Object.keys(d).some((k) => k !== "id"), {
    message: "No fields to update",
  });

export const toolCallDelete = z.object({
  id: z.string().uuid(),
});

export default {
  toolCallCreate,
  toolCallUpdate,
  toolCallUpdateWithId,
  toolCallDelete,
};

