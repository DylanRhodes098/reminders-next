import api from "../../../../api";

export async function listAgentErrors() {
  const { data } = await api.get("/AI/agent/logging/agentError");
  return data;
}

export async function getAgentErrorById(id) {
  const { data } = await api.get(
    `/AI/agent/logging/agentError?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createAgentError(payload) {
  const { data } = await api.post("/AI/agent/logging/agentError", payload);
  return data;
}

export async function updateAgentError(payload) {
  const { data } = await api.put("/AI/agent/logging/agentError", payload);
  return data;
}

export async function deleteAgentError(id) {
  const { data } = await api.delete(
    `/AI/agent/logging/agentError?id=${encodeURIComponent(id)}`
  );
  return data;
}

