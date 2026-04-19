import ReportsModel from '../models/reports.model.js';
import ClientsModel from '../models/clients.model.js';
import * as pdf from '../utils/pdf.generator.js'
import CustomError from '../utils/custom.error.js';
import dictionary from '../utils/error.dictionary.js';
import { calculateDueDate } from '../utils/calculateDueDate.js';

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function createReport(data) {
  const existing = await ReportsModel.findOne({ protocolNumber: data.protocolNumber }).lean();
  if (existing) CustomError.new(dictionary.protocolNumberExists);
  return await ReportsModel.create(data);
}

export async function getReports(filters) {
  const { limit = 20, page = 1, field, q, status, ...query } = filters;
  const options = { page, limit, sort: { createdAt: -1 }, lean: true, populate: { path: "client", select: "name email" } };

  if (status) {
    query.status = status;
  }

  if (q && field) {
    const regex = new RegExp(escapeRegex(q), 'i');

    if (field === 'protocolNumber') {
      query.protocolNumber = regex;
    }

    if (field === 'ownerName') {
      query['patient.owner'] = regex;
    }

    if (field === 'clientName') {
      const matchingClients = await ClientsModel.find({ name: regex }).select('_id').lean();
      const matchingClientIds = matchingClients.map(client => client._id);
      query.client = { $in: matchingClientIds };
    }
  }

  return await ReportsModel.paginate(query, options);
}

export async function getReportById(id) {
  const report = await ReportsModel.findById(id).populate("client", "name email");
  if (!report) CustomError.new(dictionary.reportNotFound);
  return report;
}

export async function getReportByNumber(n) {
  const report = await ReportsModel.findOne({ protocolNumber: n }).populate("client", "name email");
  if (!report) CustomError.new(dictionary.reportNotFound);
  return report;
}

export async function getLastReportNumber() {
  const last = await ReportsModel.findOne().sort({ protocolNumber: -1 }).select("protocolNumber").lean();
  return last?.protocolNumber || "00000";
}

export async function updateReport(id, data) {
  const existing = await ReportsModel.findById(id);
  if (!existing) CustomError.new(dictionary.reportNotFound);

  const finalEntryDate = data.entryDate ?? existing.entryDate;
  const finalStudyType = data.studyType ?? existing.studyType;

  if (data.entryDate || data.studyType) {
    data.dueDate = calculateDueDate(finalEntryDate, finalStudyType);
  }

  if (data.protocolNumber) {
    const existingProtocol = await ReportsModel.findOne({
      _id: { $ne: id },
      protocolNumber: data.protocolNumber
    }).lean();

    if (existingProtocol) CustomError.new(dictionary.protocolNumberExists);
  }

  const report = await ReportsModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });

  return report;
}

export async function deleteReport(id) {
  const report = await ReportsModel.findByIdAndDelete(id)
  if (!report) CustomError.new(dictionary.reportNotFound);
  return report;
}

export async function generateReport(id) {
  const report = await ReportsModel.findById(id)
  if (!report) CustomError.new(dictionary.reportNotFound);
  const pdfBuffer = await pdf.generateCitoPDF(report);
  return pdfBuffer;
}
