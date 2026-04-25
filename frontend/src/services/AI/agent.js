import api from "../../api";

export async function listAgents() {
  const { data } = await api.get("/AI/agent");
  return data;
}

export async function getAgentById(id) {
  const { data } = await api.get(`/AI/agent?id=${encodeURIComponent(id)}`);
  return data;
}

export async function createAgent(payload) {
  const { data } = await api.post("/AI/agent", payload);
  return data;
}

export async function updateAgent(payload) {
  const { data } = await api.put("/AI/agent", payload);
  return data;
}

export async function deleteAgent(id) {
  const { data } = await api.delete(`/AI/agent?id=${encodeURIComponent(id)}`);
  return data;
}

