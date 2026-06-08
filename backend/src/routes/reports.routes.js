import { Router } from "express";
import * as reportsControllers from "../controllers/reports.controllers.js";
import * as middlewares from "../middlewares/middlewares.js"

const router = Router();

const validateReportId = middlewares.validateObjectIdParam("id", "invalidReportId");
const validateReportImageId = middlewares.validateObjectIdParam("imageId", "invalidReportImageId");

router.post("/", middlewares.validateClient, reportsControllers.POSTReport)
.get("/due-date", reportsControllers.GETDueDate)
.post("/:id/images", validateReportId, middlewares.uploadReportImages, reportsControllers.POSTReportImages)
.delete("/:id/images/:imageId", validateReportId, validateReportImageId, reportsControllers.DELETEReportImage)
.get("/", reportsControllers.GETReports)
.get("/number/last", reportsControllers.GETLastReportNumber)
.get("/number/:n", reportsControllers.GETReportByNumber)
.get("/pdf/:id", validateReportId, reportsControllers.GETpdfReport)
.get("/:id", validateReportId, reportsControllers.GETReportById)
.put("/:id", validateReportId, middlewares.validateClient, reportsControllers.PUTReport)
.delete("/:id", validateReportId, reportsControllers.DELETEReport);

export default router;
