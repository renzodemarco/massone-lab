import { Router } from "express";
import * as clientsControllers from "../controllers/clients.controllers.js";

const router = Router();

router.post("/", clientsControllers.POSTClient)
.get("/", clientsControllers.GETAllClients)
.get("/:id", clientsControllers.GETClientById)
.put("/:id", clientsControllers.PUTClient)
.delete("/:id", clientsControllers.DELETEClient);

export default router;