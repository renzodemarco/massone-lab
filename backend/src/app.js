import express from "express";
import cors from 'cors';
import config from "./config/env.config.js";
import connectDB from './config/mongo.config.js';
import clientsRouter from "./routes/clients.routes.js";
import reportsRouter from "./routes/reports.routes.js";
import notFoundHandler from "./middlewares/not.found.handler.js";
import errorHandler from "./middlewares/error.handler.js";

const app = express();
const PORT = config.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/clients", clientsRouter);
app.use("/api/reports", reportsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});