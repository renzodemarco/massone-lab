import api from "./api";

export async function getClients({ query = "", page = 1, limit = 20, paginated = false } = {}) {
  try {
    const res = await api.get("/clients", {
      params: {
        ...(query ? { q: query } : {}),
        page,
        limit: paginated ? limit : 1000
      }
    });
    return paginated ? res.data.payload : (res.data.payload.docs || []);
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e)
    throw e;
  }
}

export async function getClientById(id) {
  try {
    const res = await api.get(`/clients/${id}`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e)
    throw e;
  }
}

export async function updateClient(id, data) {
  try {
    const res = await api.put(`/clients/${id}`, data);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e)
    throw e;
  }
}
