import api from "./api";

export async function postReport(data) {
  try {
    const res = await api.post("/reports", data);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e)
    throw e;
  }
}

export async function getReports(searchParams = {}) {
  try {
    const params = {
      page: searchParams.page || 1,
      limit: searchParams.limit || 4
    };

    if (searchParams.q) params.q = searchParams.q;
    if (searchParams.field && searchParams.q) params.field = searchParams.field;
    if (searchParams.status) params.status = searchParams.status;

    const res = await api.get("/reports", { params });
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e)
    throw e;
  }
}

export async function getReportById(id) {
  try {
    const res = await api.get(`/reports/${id}`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e)
    throw e;
  }
}

export async function getReportByNumber(n) {
  try {
    const res = await api.get(`/reports/number/${n}`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e)
    throw e
  }
}

export async function getLastReportNumber() {
  try {
    const res = await api.get(`/reports/number/last`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    throw e;
  }
}

export async function getReportDueDate(entryDate, studyType) {
  try {
    const res = await api.get("/reports/due-date", {
      params: { entryDate, studyType }
    });
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    throw e;
  }
}

export async function updateReport(id, data) {
  try {
    const res = await api.put(`/reports/${id}`, data);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    throw e;
  }
}

export async function uploadReportImages(reportId, files) {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const res = await api.post(`/reports/${reportId}/images`, formData);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    throw e;
  }
}

export async function deleteReportImage(reportId, imageId) {
  try {
    const res = await api.delete(`/reports/${reportId}/images/${imageId}`);
    return res.data.payload;
  }
  catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    throw e;
  }
}

export async function destroyReport(id) {
  try {
    const res = await api.delete(`/reports/${id}`);
    return res.data.payload;
  } catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    throw e;
  }
}

export async function generatePDF(id) {
  try {
    const res = await api.get(`/reports/pdf/${id}`, { responseType: 'blob' });
    const file = new Blob([res.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function sendTestMail(reportId) {
  try {
    const res = await api.get(`/reports/mail/test/${reportId}`);
    return res.data;
  } catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    throw e;
  }
}

export async function finishReport(id) {
  try {
    const res = await api.post(`/reports/finish/${id}`);
    return res.data.payload;
  } catch (e) {
    console.error(e.response?.data ?? e.message ?? e);
    throw e;
  }
}
