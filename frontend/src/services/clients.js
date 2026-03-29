import api from "./api";

export async function getClients() {
  try {
    const res = await api.get("/clients");
    return res.data.payload;
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