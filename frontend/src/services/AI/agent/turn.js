import api from "../../../api";

export async function runAgentTurn(payload) {
  const { data } = await api.post("/AI/agent/turn", payload);
  return data;
}

