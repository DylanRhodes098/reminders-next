import { z } from "zod";

export const agentFolderCreate = z.object({
  name: z.string().min(1, "Name required"),
});

export const agentFolderUpdate = agentFolderCreate.partial();

export const agentFolderUpdateWithId = agentFolderUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return d.name !== undefined;
  }, { message: "No fields to update" });

export const agentFolderDelete = z.object({
  id: z.string().uuid(),
});

export const optionalAgentFolderDelete = agentFolderDelete.partial();

export default {
  agentFolderCreate,
  agentFolderUpdate,
  agentFolderUpdateWithId,
  agentFolderDelete,
  optionalAgentFolderDelete,
};
