import ClientModel from "../models/clients.model.js";
import multer from "multer";
import CustomError from "../utils/custom.error.js";
import dictionary from "../utils/error.dictionary.js";
import mongoose from "mongoose";
import env from "../config/env.config.js";

const REPORT_IMAGE_MAX_FILES = 4;
const REPORT_IMAGE_MAX_SIZE = 5 * 1024 * 1024;

export function validateObjectIdParam(paramName, errorKey = "invalidQuery") {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.isValidObjectId(value)) {
      return next(CustomError.from(dictionary[errorKey]));
    }

    next();
  };
}

export async function validateClient(req, res, next) {
  try {
    const { client } = req.body;

    if (!client) {
      if (req.method === "POST") CustomError.new(dictionary.clientRequired);
      return next();
    }

    if (!mongoose.isValidObjectId(client)) {
      CustomError.new(dictionary.invalidClientId);
    }

    const exists = await ClientModel.findById(client).lean();

    if (!exists) CustomError.new(dictionary.clientNotFound);

    next()
  }
  catch (e) {
    next(e);
  }
}

const uploadReportImagesHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: REPORT_IMAGE_MAX_FILES,
    fileSize: REPORT_IMAGE_MAX_SIZE
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype?.startsWith("image/")) {
      return cb(CustomError.from(dictionary.reportInvalidImageType));
    }

    cb(null, true);
  }
}).array("images", REPORT_IMAGE_MAX_FILES);

export function uploadReportImages(req, res, next) {
  uploadReportImagesHandler(req, res, (error) => {
    if (!error) return next();

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return next(CustomError.from(dictionary.reportImageTooLarge));
      }

      if (error.code === "LIMIT_FILE_COUNT") {
        return next(CustomError.from(dictionary.reportImagesLimitExceeded));
      }
    }

    next(error);
  });
}

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) CustomError.new(dictionary.authorization);
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, env.JWT_SECRET);

    req.user = payload;

    next();

  } catch (error) {
    next(error);
  }
}