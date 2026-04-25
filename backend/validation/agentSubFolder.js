import { z } from "zod";

export const agentSubFolderCreate = z.object({
  name: z.string().min(1, "Name required"),
  /** Omit or null for a standalone row (stored as SQL NULL) */
  agentFolderId: z.string().uuid().optional().nullable(),
  /** Optional link to an AI Agent row */
  agentId: z.string().uuid().optional().nullable(),
});

export const agentSubFolderUpdate = z.object({
  name: z.string().min(1, "Name required").optional(),
  agentFolderId: z.string().uuid().nullish().optional(),
  agentId: z.string().uuid().nullish().optional(),
});

export const agentSubFolderUpdateWithId = agentSubFolderUpdate
  .extend({ id: z.string().uuid() })
  .refine(
    (d) =>
      d.name !== undefined || d.agentFolderId !== undefined || d.agentId !== undefined,
    { message: "No fields to update" }
  );

export const agentSubFolderDelete = z.object({
  id: z.string().uuid(),
});

export const optionalAgentSubFolderDelete = agentSubFolderDelete.partial();

export default {
  agentSubFolderCreate,
  agentSubFolderUpdate,
  agentSubFolderUpdateWithId,
  agentSubFolderDelete,
  optionalAgentSubFolderDelete,
};
