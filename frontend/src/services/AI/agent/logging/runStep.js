import api from "../../../../api";

export async function listRunSteps(params = {}) {
  const qs = new URLSearchParams();
  if (params.runId) qs.set("runId", params.runId);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  const { data } = await api.get(`/AI/agent/logging/runStep${suffix}`);
  return data;
}

export async function getRunStepById(id) {
  const { data } = await api.get(
    `/AI/agent/logging/runStep?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createRunStep(payload) {
  const { data } = await api.post("/AI/agent/logging/runStep", payload);
  return data;
}

export async function updateRunStep(payload) {
  const { data } = await api.put("/AI/agent/logging/runStep", payload);
  return data;
}

export async function deleteRunStep(id) {
  const { data } = await api.delete(
    `/AI/agent/logging/runStep?id=${encodeURIComponent(id)}`
  );
  return data;
}

