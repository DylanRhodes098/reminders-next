import api from "../../../api";

export async function listPolicies() {
  const { data } = await api.get("/AI/tools/policy");
  return data;
}

export async function getPolicyById(id) {
  const { data } = await api.get(
    `/AI/tools/policy?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createPolicy(payload) {
  const { data } = await api.post("/AI/tools/policy", payload);
  return data;
}

export async function updatePolicy(payload) {
  const { data } = await api.put("/AI/tools/policy", payload);
  return data;
}

export async function deletePolicy(id) {
  const { data } = await api.delete(
    `/AI/tools/policy?id=${encodeURIComponent(id)}`
  );
  return data;
}

