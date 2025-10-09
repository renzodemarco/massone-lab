import api from "./api";

export async function postReport(data) {
  try {
    const res = await api.post("/reports", data);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response.data)
    throw e;
  }
}

export async function getReports() {
  try {
    const res = await api.get("/reports");
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response.data)
    throw e;
  }
}

export async function getReportById(id) {
  try {
    const res = await api.get(`/reports/${id}`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response.data)
    throw e;
  }
}

export async function getReportByNumber(n) {
  try {
    const res = await api.get(`/reports/number/${n}`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response.data)
    throw e
  }
}

export async function getLastReportNumber() {
  try {
    const res = await api.get(`/reports/number/last`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response.data);
    throw e;
  }
}

export async function updateReport(id, data) {
  try {
    const res = await api.put(`/reports/${id}`, data);
    return res.data.payload;
  } catch (e) {
    console.error(e.response.data);
    throw e;
  }
}

export async function destroyReport(id) {
  try {
    const res = await api.delete(`/reports/${id}`);
    return res.data.payload;
  } catch (e) {
    console.error(e.response.data);
    throw e;
  }
}