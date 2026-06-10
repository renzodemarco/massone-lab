import api from "./api";

export async function login(data) {
  try {
    const res = await api.post('/auth/login', data);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e)
    throw e;
  }
}