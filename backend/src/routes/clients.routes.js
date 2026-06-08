import { Router } from "express";
import * as clientsControllers from "../controllers/clients.controllers.js";
import * as middlewares from "../middlewares/middlewares.js";

const router = Router();
const validateClientId = middlewares.validateObjectIdParam("id", "invalidClientId");

router.post("/", clientsControllers.POSTClient)
.get("/", clientsControllers.GETAllClients)
.get("/:id", validateClientId, clientsControllers.GETClientById)
.put("/:id", validateClientId, clientsControllers.PUTClient)
.delete("/:id", validateClientId, clientsControllers.DELETEClient);

export default router;
