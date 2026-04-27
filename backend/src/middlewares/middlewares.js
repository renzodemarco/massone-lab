import ClientModel from "../models/clients.model.js";
import multer from "multer";
import CustomError from "../utils/custom.error.js";
import dictionary from "../utils/error.dictionary.js";

const REPORT_IMAGE_MAX_FILES = 6;
const REPORT_IMAGE_MAX_SIZE = 5 * 1024 * 1024;

export async function validateClient(req, res, next) {
  try {
    const { client } = req.body;

    if (!client) {
      if (req.method === "POST") CustomError.new(dictionary.clientRequired);
      return next();
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
