import { Router } from "express";
import * as clientsControllers from "../controllers/clients.controllers.js";

const router = Router();

router.post("/", clientsControllers.POSTClient);

export default router;