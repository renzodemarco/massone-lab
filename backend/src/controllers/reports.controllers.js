import * as reportsServices from "../services/reports.services.js";
import { createReportSchema, updateReportSchema } from "../schemas/reports.schema.js";

export async function POSTReport(req, res, next) {
  try {
    const { error, value } = createReportSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const report = await reportsServices.createReport(value);
    return res.status(201).json({ success: true, payload: report });
  }
  catch (e) {
    next(e)
  }
}

export async function GETReports(req, res, next) {
  try {
    let { page = 1, limit = 4, field, q, status, ...filters } = req.query;
    page = Number(page);
    limit = Number(limit);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 4;
    const reports = await reportsServices.getReports({
      ...filters,
      field: field?.trim(),
      q: q?.trim(),
      status: status?.trim(),
      page,
      limit
    });
    return res.status(200).json({ success: true, payload: reports })
  }
  catch (e) {
    next(e)
  }
}

export async function GETReportById(req, res, next) {
  try {
    const report = await reportsServices.getReportById(req.params.id)
    return res.status(200).json({ success: true, payload: report })
  }
  catch (e) {
    next(e)
  }
}

export async function GETReportByNumber(req, res, next) {
  try {
    const report = await reportsServices.getReportByNumber(req.params.n)
    return res.status(200).json({ success: true, payload: report })
  }
  catch (e) {
    next(e)
  }
}

export async function GETLastReportNumber(req, res, next) {
  try {
    const number = await reportsServices.getLastReportNumber();
    return res.status(200).json({ success: true, payload: number })
  }
  catch (e) {
    next(e)
  }
}

export async function PUTReport(req, res, next) {
  try {
    const { id } = req.params;
    const { error, value } = updateReportSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const report = await reportsServices.updateReport(id, value);
    return res.status(200).json({ success: true, payload: report });
  }
  catch (e) {
    next(e)
  }
}

export async function POSTReportImages(req, res, next) {
  try {
    const { id } = req.params;
    const images = await reportsServices.uploadReportImages(id, req.files);
    return res.status(201).json({ success: true, payload: images });
  }
  catch (e) {
    next(e);
  }
}

export async function DELETEReport(req, res, next) {
  try {
    const { id } = req.params;
    const report = await reportsServices.deleteReport(id);
    return res.status(200).json({ success: true, payload: report });
  }
  catch (e) {
    next(e);
  }
}

export async function GETpdfReport(req, res, next) {
  try {
    const pdfBuffer = await reportsServices.generateReport(req.params.id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${req.params.id}.pdf"`);
    return res.send(pdfBuffer);
  }
  catch (e) {
    next(e);
  }
};
