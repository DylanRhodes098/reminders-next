import api from "../../../api";

export async function listAgentRuns(params = {}) {
  const qs = new URLSearchParams();
  if (params.agentId) qs.set("agentId", params.agentId);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  const { data } = await api.get(`/AI/agent/agentRun${suffix}`);
  return data;
}

export async function getAgentRunById(id) {
  const { data } = await api.get(
    `/AI/agent/agentRun?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createAgentRun(payload) {
  const { data } = await api.post("/AI/agent/agentRun", payload);
  return data;
}

export async function updateAgentRun(payload) {
  const { data } = await api.put("/AI/agent/agentRun", payload);
  return data;
}

export async function deleteAgentRun(id) {
  const { data } = await api.delete(
    `/AI/agent/agentRun?id=${encodeURIComponent(id)}`
  );
  return data;
}

