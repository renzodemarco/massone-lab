import ReportsModel from '../models/reports.model.js';
import ClientsModel from '../models/clients.model.js';
import * as pdf from '../utils/pdf.generator.js'
import CustomError from '../utils/custom.error.js';
import dictionary from '../utils/error.dictionary.js';
import { calculateDueDate } from '../utils/calculate.due.date.js';
import cloudinary from '../config/cloudinary.config.js';
import mongoose from 'mongoose';
import { Readable } from 'stream';
import { isValidImageBuffer } from '../utils/is.valid.image.buffer.js';

const REPORT_IMAGE_MAX_FILES = 4;

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()<>|[\]\\]/g, '\\$&');
}

async function uploadFileToCloudinary(file, reportId) {
  const options = {
    folder: `massone-lab/reports/${reportId}`,
    resource_type: "image"
  };

  if (file.buffer) {
    return await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  CustomError.new(dictionary.reportImageUploadFailed);
}

async function destroyCloudinaryImage(publicId) {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image"
    });

    if (result.result !== "ok" && result.result !== "not found") {
      CustomError.new(dictionary.reportImageDeleteFailed);
    }
  } catch {
    CustomError.new(dictionary.reportImageDeleteFailed);
  }
}

export async function createReport(data) {
  const existing = await ReportsModel.findOne({ protocolNumber: data.protocolNumber }).lean();
  if (existing) CustomError.new(dictionary.protocolNumberExists);
  return await ReportsModel.create({ ...data, status: data.status || 'entered' });
}

export async function getReports(filters) {
  const { limit = 4, page = 1, field, q, status, ...query } = filters;
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

export function calculateReportDueDate(entryDate, studyType) {
  return calculateDueDate(entryDate, studyType);
}

export async function updateReport(id, data) {
  const existing = await ReportsModel.findById(id);
  if (!existing) CustomError.new(dictionary.reportNotFound);

  const finalEntryDate = data.entryDate ?? existing.entryDate;
  const finalStudyType = data.studyType ?? existing.studyType;

  if (data.entryDate || data.studyType) {
    data.dueDate = calculateDueDate(finalEntryDate, finalStudyType);
  }

  if (existing.status === 'entered' && (!data.status || data.status === 'entered')) {
    const hasEditableChanges = Object.keys(data).some((key) => key !== 'status');
    if (hasEditableChanges) {
      data.status = 'started';
    }
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

export async function uploadReportImages(id, files = []) {
  const report = await ReportsModel.findById(id);
  if (!report) CustomError.new(dictionary.reportNotFound);
  if (!files.length) CustomError.new(dictionary.reportImagesRequired);
  if (report.images.length + files.length > REPORT_IMAGE_MAX_FILES) {
    CustomError.new(dictionary.reportImagesLimitExceeded);
  }
  if (files.some(file => !isValidImageBuffer(file.buffer))) {
    CustomError.new(dictionary.reportInvalidImageType);
  }

  const uploadedPublicIds = [];
  try {
    const uploads = await Promise.all(
      files.map(async (file) => {
        const uploaded = await uploadFileToCloudinary(file, report._id);
        uploadedPublicIds.push(uploaded.public_id);

        return {
          _id: new mongoose.Types.ObjectId(),
          secureUrl: uploaded.secure_url,
          publicId: uploaded.public_id
        };
      })
    );

    report.images.push(...uploads);
    await report.save();
    return report.images;
  } catch (error) {
    await Promise.allSettled(uploadedPublicIds.map(publicId => destroyCloudinaryImage(publicId)));
    if (error.status) throw error;
    CustomError.new(dictionary.reportImageUploadFailed);
  }
}

export async function deleteReportImage(id, imageId) {
  const report = await ReportsModel.findById(id);
  if (!report) CustomError.new(dictionary.reportNotFound);

  const image = report.images.find(item => item._id.toString() === imageId);
  if (!image) CustomError.new(dictionary.reportImageNotFound);

  await destroyCloudinaryImage(image.publicId);
  report.images = report.images.filter(item => item._id.toString() !== imageId);
  await report.save();

  return report.images;
}

export async function deleteReport(id) {
  const report = await ReportsModel.findById(id);
  if (!report) CustomError.new(dictionary.reportNotFound);

  await Promise.all(report.images.map(image => destroyCloudinaryImage(image.publicId)));
  await report.deleteOne();

  return report;
}

export async function generateReport(id) {
  const report = await ReportsModel.findById(id)
  if (!report) CustomError.new(dictionary.reportNotFound);
  const pdfBuffer = await pdf.generateCitoPDF(report);
  return pdfBuffer;
}
