import { Router } from "express";
import * as reportsControllers from "../controllers/reports.controllers.js";

const router = Router();

router.post("/", reportsControllers.POSTReport)
.get("/", reportsControllers.GETReports)
.get("/:id", reportsControllers.GETReportById)
.put("/:id", reportsControllers.PUTReport)
.delete("/:id", reportsControllers.DELETEReport);

export default router;