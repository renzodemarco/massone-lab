import * as reportsServices from "../services/reports.services.js";
import { createReportSchema } from "../schemas/reports.schema.js";

export async function POSTReport (req, res, next) {
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