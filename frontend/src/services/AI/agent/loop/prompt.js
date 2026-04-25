import api from "../../../../api";

export async function listPrompts() {
  const { data } = await api.get("/AI/agent/loop/prompt");
  return data;
}

export async function getPromptById(id) {
  const { data } = await api.get(
    `/AI/agent/loop/prompt?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createPrompt(payload) {
  const { data } = await api.post("/AI/agent/loop/prompt", payload);
  return data;
}

export async function updatePrompt(payload) {
  const { data } = await api.put("/AI/agent/loop/prompt", payload);
  return data;
}

export async function deletePrompt(id) {
  const { data } = await api.delete(
    `/AI/agent/loop/prompt?id=${encodeURIComponent(id)}`
  );
  return data;
}

