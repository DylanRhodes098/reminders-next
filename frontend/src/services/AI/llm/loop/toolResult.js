import api from "../../../../api";

export async function listToolResults(params = {}) {
  const qs = new URLSearchParams();
  if (params.toolCallId) qs.set("toolCallId", params.toolCallId);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  const { data } = await api.get(`/AI/llm/loop/toolResult${suffix}`);
  return data;
}

export async function getToolResultById(id) {
  const { data } = await api.get(
    `/AI/llm/loop/toolResult?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createToolResult(payload) {
  const { data } = await api.post("/AI/llm/loop/toolResult", payload);
  return data;
}

export async function updateToolResult(payload) {
  const { data } = await api.put("/AI/llm/loop/toolResult", payload);
  return data;
}

export async function deleteToolResult(id) {
  const { data } = await api.delete(
    `/AI/llm/loop/toolResult?id=${encodeURIComponent(id)}`
  );
  return data;
}

