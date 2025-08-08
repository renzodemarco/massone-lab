import ReportsModel from '../models/reports.model.js';
import CustomError from '../utils/custom.error.js';
import dictionary from '../utils/error.dictionary.js';

export async function createReport(data) {
  const existing = await ReportsModel.findOne({ protocolNumber: data.protocolNumber }).lean();
  if (existing) CustomError.new(dictionary.protocolNumberExists);
  return await ReportsModel.create(data)
}

export async function getReports(filters) {
  const { limit = 20, page = 1, ...query } = filters;
  const options = { page, limit, sort: { createdAt: -1 }, lean: true };
  return await ReportsModel.paginate(query, options);
}

export async function getReportById(id) {
  const report = await ReportsModel.findById(id);
  if (!report) CustomError.new(dictionary.reportNotFound);
  return report;
}

export async function updateReport(id, data) {
  const report = await ReportsModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!report) CustomError.new(dictionary.reportNotFound);
  return report;
}