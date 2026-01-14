import api from "../api";

export async function login({ email, password }) {
  const { data } = await api.post("/user/login", { email, password });
  return data;
}

export async function register({ full_name, email, password }) {
  const { data } = await api.post("/user/register", { full_name, email, password });
  return data;
}

export function logout() {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("id");
}
