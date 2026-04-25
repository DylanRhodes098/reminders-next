import api from "../../../../api";

export async function listToolCalls(params = {}) {
  const qs = new URLSearchParams();
  if (params.runId) qs.set("runId", params.runId);
  if (params.requestedByMessageId)
    qs.set("requestedByMessageId", params.requestedByMessageId);
  if (params.toolName) qs.set("toolName", params.toolName);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  const { data } = await api.get(`/AI/llm/loop/toolCall${suffix}`);
  return data;
}

export async function getToolCallById(id) {
  const { data } = await api.get(
    `/AI/llm/loop/toolCall?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createToolCall(payload) {
  const { data } = await api.post("/AI/llm/loop/toolCall", payload);
  return data;
}

export async function updateToolCall(payload) {
  const { data } = await api.put("/AI/llm/loop/toolCall", payload);
  return data;
}

export async function deleteToolCall(id) {
  const { data } = await api.delete(
    `/AI/llm/loop/toolCall?id=${encodeURIComponent(id)}`
  );
  return data;
}

