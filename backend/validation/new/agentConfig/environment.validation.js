import { z } from "zod";

export const environmentCreate = z.object({
  agentConfigId: z.string().uuid().optional(),
  name: z.string().min(1, "Name required"),
  workingDirectory: z.string().optional(),
  context: z.record(z.any()).or(z.array(z.any())).or(z.any()).optional(),
});

export const environmentUpdate = environmentCreate.partial();

export const environmentUpdateWithId = environmentUpdate
  .extend({ id: z.string().uuid() })
  .refine((d) => {
    return Object.keys(d).some((k) => k !== "id" && d[k] !== undefined);
  }, { message: "No fields to update" });

export const environmentDelete = z.object({
  id: z.string().uuid(),
});

export const optionalEnvironmentDelete = environmentDelete.partial();

export default {
  environmentCreate,
  environmentUpdate,
  environmentUpdateWithId,
  environmentDelete,
  optionalEnvironmentDelete,
};
