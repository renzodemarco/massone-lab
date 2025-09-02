import * as reportsServices from "../services/reports.services.js";
import { createReportSchema, updateReportSchema } from "../schemas/reports.schema.js";

export async function POSTReport(req, res, next) {
  try {
    const { error, value } = createReportSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    const report = await reportsServices.createReport(value);
    res.status(201).json({ success: true, payload: report });
  }
  catch (e) {
    next(e)
  }
}

export async function GETReports(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { query = '{}' } = req.query;
    const parsedQuery = JSON.parse(query);

    const reports = await reportsServices.getReports({ ...parsedQuery, page, limit });
    res.status(200).json({ success: true, payload: reports })
  }
  catch (e) {
    next(e)
  }
}

export async function GETReportById(req, res, next) {
  try {
    const report = await reportsServices.getReportById(req.params.id)
    res.status(200).json({ success: true, payload: report })
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
    res.status(200).json({ success: true, payload: report });
  }
  catch (e) {
    next(e)
  }
}

export async function DELETEReport(req, res, next) {
  try {
    const { id } = req.params;
    const report = await reportsServices.deleteReport(id);
    res.status(200).json({ success: true, payload: report });
  }
  catch (e) {
    next(e);
  }
}

export async function GETpdfReport(req, res, next) {
  try {
    const pdfBuffer = await reportsServices.generateReport(req.params.id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=reporte-${req.params.id}.pdf`);
    res.send(pdfBuffer);
  } 
  catch (e) {
    next(e);
  }
};