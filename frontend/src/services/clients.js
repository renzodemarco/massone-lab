import api from "./api";

export async function getClients() {
  try {
    const res = await api.get("/clients");
    return res.data.payload;
  }
  catch (e) {
    console.error(e.message)
    return e
  }
}