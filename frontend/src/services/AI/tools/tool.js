import api from "../../../api";

export async function listTools(params = {}) {
  const qs = new URLSearchParams();
  if (params.name) qs.set("name", params.name);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  const { data } = await api.get(`/AI/tools/tool${suffix}`);
  return data;
}

export async function getToolById(id) {
  const { data } = await api.get(`/AI/tools/tool?id=${encodeURIComponent(id)}`);
  return data;
}

export async function createTool(payload) {
  const { data } = await api.post("/AI/tools/tool", payload);
  return data;
}

export async function updateTool(payload) {
  const { data } = await api.put("/AI/tools/tool", payload);
  return data;
}

export async function deleteTool(id) {
  const { data } = await api.delete(
    `/AI/tools/tool?id=${encodeURIComponent(id)}`
  );
  return data;
}

