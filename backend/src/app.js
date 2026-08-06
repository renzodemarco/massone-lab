import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from "./config/env.config.js";
import connectDB from './config/mongo.config.js';
import clientsRouter from "./routes/clients.routes.js";
import reportsRouter from "./routes/reports.routes.js";
import usersRouter from "./routes/users.routes.js";
import notFoundHandler from "./middlewares/not.found.handler.js";
import errorHandler from "./middlewares/error.handler.js";
import { authenticate } from "./middlewares/middlewares.js";
import env from "./config/env.config.js";

const app = express();
const PORT = config.PORT || 8081;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." }
});

app.use(helmet());
app.use(apiLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({ origin: env.FRONTEND_URL, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));

app.use("/api/auth", usersRouter);
app.use("/api/clients", authenticate, clientsRouter);
app.use("/api/reports", authenticate, reportsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});