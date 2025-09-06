import api from "./api";

export async function getReports() {
  try {
    const res = await api.get("/reports");
    return res.data.payload;
  }
  catch (e) {
    console.error(e.message)
    return e
  }
}

export async function getReportById(id) {
  try {
    const res = await api.get(`/reports/${id}`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.message)
    return e
  }
}

export async function getReportByNumber(n) {
  try {
    const res = await api.get(`/reports/number/${n}`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.message)
    return e
  }
}


export async function updateReport(id, reportData) {
  try {
    const res = await api.put(`/reports/${id}`, reportData);
    return res.data.payload;
  } catch (e) {
    console.error(e.message);
    return e;
  }
}