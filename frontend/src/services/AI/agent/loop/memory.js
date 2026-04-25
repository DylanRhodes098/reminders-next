import api from "../../../../api";

export async function listMemory() {
  const { data } = await api.get("/AI/agent/loop/memory");
  return data;
}

export async function getMemoryById(id) {
  const { data } = await api.get(
    `/AI/agent/loop/memory?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createMemory(payload) {
  const { data } = await api.post("/AI/agent/loop/memory", payload);
  return data;
}

export async function updateMemory(payload) {
  const { data } = await api.put("/AI/agent/loop/memory", payload);
  return data;
}

export async function deleteMemory(id) {
  const { data } = await api.delete(
    `/AI/agent/loop/memory?id=${encodeURIComponent(id)}`
  );
  return data;
}

