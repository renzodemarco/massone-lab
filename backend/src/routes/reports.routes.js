import { Router } from "express";
import * as reportsControllers from "../controllers/reports.controllers.js";
import * as middlewares from "../middlewares/middlewares.js"

const router = Router();

router.post("/", middlewares.validateClient, reportsControllers.POSTReport)
.get("/", reportsControllers.GETReports)
.get("/:id", reportsControllers.GETReportById)
.get("/pdf/:id", reportsControllers.GETpdfReport)
.put("/:id", reportsControllers.PUTReport)
.delete("/:id", reportsControllers.DELETEReport);

export default router;