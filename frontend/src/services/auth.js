import api from "./api";

export function logout() {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("auth:changed"));
}

export async function login(data) {
  try {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.payload.token);
    window.dispatchEvent(new Event("auth:changed"));
    return res.data.payload;
  } catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth:changed"));
    throw e;
  }
}