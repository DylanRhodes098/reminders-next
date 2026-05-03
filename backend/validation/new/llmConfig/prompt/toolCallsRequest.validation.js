import { z } from "zod";

export const toolCallsRequestCreate = z.object({
  promptId: z.string().uuid().optional(),
  toolId: z.string().uuid().optional(),
  toolName: z.string().optional(),
  args: z.record(z.any()).or(z.array(z.any())).or(z.any()).optional(),
  promptOutputId: z.string().uuid().optional(),
  llmResponseId: z.string().uuid().optional(),
});

export const toolCallsRequestUpdate = toolCallsRequestCreate.partial();

export const toolCallsRequestUpdateWithId = toolCallsRequestUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const toolCallsRequestDelete = z.object({
  id: z.string().uuid(),
});

export const optionalToolCallsRequestDelete = toolCallsRequestDelete.partial();

export default {
  toolCallsRequestCreate,
  toolCallsRequestUpdate,
  toolCallsRequestUpdateWithId,
  toolCallsRequestDelete,
  optionalToolCallsRequestDelete,
};
