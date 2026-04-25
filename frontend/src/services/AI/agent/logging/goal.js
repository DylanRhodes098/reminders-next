import api from "../../../../api";

export async function listGoals() {
  const { data } = await api.get("/AI/agent/logging/goal");
  return data;
}

export async function getGoalById(id) {
  const { data } = await api.get(
    `/AI/agent/logging/goal?id=${encodeURIComponent(id)}`
  );
  return data;
}

export async function createGoal(payload) {
  const { data } = await api.post("/AI/agent/logging/goal", payload);
  return data;
}

export async function updateGoal(payload) {
  const { data } = await api.put("/AI/agent/logging/goal", payload);
  return data;
}

export async function deleteGoal(id) {
  const { data } = await api.delete(
    `/AI/agent/logging/goal?id=${encodeURIComponent(id)}`
  );
  return data;
}

