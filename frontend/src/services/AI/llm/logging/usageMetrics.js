import api from "../../../../api";

export async function listUsageMetrics() {
  const { data } = await api.get("/AI/llm/logging/usageMetrics");
  return data;
}

export async function getUsageMetricsById(id) {
  const { data } = await api.get(
    `/AI/llm/logging/usageMetrics?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createUsageMetrics(payload) {
  const { data } = await api.post("/AI/llm/logging/usageMetrics", payload);
  return data;
}

export async function updateUsageMetrics(payload) {
  const { data } = await api.put("/AI/llm/logging/usageMetrics", payload);
  return data;
}

export async function deleteUsageMetrics(id) {
  const { data } = await api.delete(
    `/AI/llm/logging/usageMetrics?id=${encodeURIComponent(id)}`
  );
  return data;
}

