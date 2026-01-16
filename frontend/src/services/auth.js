import api from "../api";

export async function login({ email, password }) {
  const { data } = await api.post("/user/login", { email, password });
  // Store token in sessionStorage
  if (data) {
    sessionStorage.setItem("authToken", data);
    // Optionally store user ID if available
    try {
      // Decode token to get user ID (simple base64 decode for JWT payload)
      const payload = JSON.parse(atob(data.split('.')[1]));
      if (payload.id) {
        sessionStorage.setItem("id", payload.id);
      }
    } catch (e) {
      // If token decoding fails, continue anyway
      console.warn("Could not decode token:", e);
    }
  }
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
