import { z } from "zod";

export const agentConfigCreate = z.object({
  name: z.string().min(1, "Name required"),
});

export const agentConfigUpdate = agentConfigCreate.partial();

export const agentConfigUpdateWithId = agentConfigUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const agentConfigDelete = z.object({
  id: z.string().uuid(),
});

export const optionalAgentConfigDelete = agentConfigDelete.partial();

export default {
  agentConfigCreate,
  agentConfigUpdate,
  agentConfigUpdateWithId,
  agentConfigDelete,
  optionalAgentConfigDelete,
};
