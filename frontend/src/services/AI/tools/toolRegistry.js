import api from "../../../api";

export async function listToolRegistries(params = {}) {
  const qs = new URLSearchParams();
  if (params.name) qs.set("name", params.name);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  const { data } = await api.get(`/AI/tools/toolRegistry${suffix}`);
  return data;
}

export async function getToolRegistryById(id) {
  const { data } = await api.get(
    `/AI/tools/toolRegistry?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createToolRegistry(payload) {
  const { data } = await api.post("/AI/tools/toolRegistry", payload);
  return data;
}

export async function updateToolRegistry(payload) {
  const { data } = await api.put("/AI/tools/toolRegistry", payload);
  return data;
}

export async function deleteToolRegistry(id) {
  const { data } = await api.delete(
    `/AI/tools/toolRegistry?id=${encodeURIComponent(id)}`
  );
  return data;
}

