import { Router } from "express";
import * as reportsControllers from "../controllers/reports.controllers.js";

const router = Router();

router.post("/", reportsControllers.POSTReport);

export default router;