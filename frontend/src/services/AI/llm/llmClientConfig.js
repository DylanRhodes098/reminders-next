import api from "../../../api";

export async function listLLMClientConfigs(params = {}) {
  const qs = new URLSearchParams();
  if (params.provider) qs.set("provider", params.provider);
  if (params.model) qs.set("model", params.model);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  const { data } = await api.get(`/AI/llm/llmClientConfig${suffix}`);
  return data;
}

export async function getLLMClientConfigById(id) {
  const { data } = await api.get(
    `/AI/llm/llmClientConfig?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createLLMClientConfig(payload) {
  const { data } = await api.post("/AI/llm/llmClientConfig", payload);
  return data;
}

export async function updateLLMClientConfig(payload) {
  const { data } = await api.put("/AI/llm/llmClientConfig", payload);
  return data;
}

export async function deleteLLMClientConfig(id) {
  const { data } = await api.delete(
    `/AI/llm/llmClientConfig?id=${encodeURIComponent(id)}`
  );
  return data;
}

