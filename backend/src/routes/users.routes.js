import { Router } from "express";
import { POSTLoginUser } from "../controllers/users.controllers.js";

const router = Router();

router.post("/login", POSTLoginUser);

export default router;