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