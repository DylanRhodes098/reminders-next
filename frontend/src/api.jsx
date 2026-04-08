import axios from 'axios';

// Prefer env var, but fall back to local Next backend in dev
const baseURL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3001/api";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
    if (error.response) {
      const status = error.response.status;
      const requestUrl = error?.config?.url || "";
      const isAuthRequest =
        requestUrl.includes("/user/login") || requestUrl.includes("/user/register");

      if (status === 401 || status === 403) {
        // Clear session
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("id");

        // Don't hard-redirect on expected auth failures (e.g. wrong login).
        // Also avoid redirect loops when we're already on /login.
        if (!isAuthRequest && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;