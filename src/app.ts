import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./app/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./app/config/swagger";
import globalErrorHandler from "./app/errors/globalErrorHandler";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", routes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get("/", (req, res) => {
  res.send("RentNest API Running");
});

app.use(globalErrorHandler);

export default app;