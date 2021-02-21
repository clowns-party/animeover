import * as express from "express";
import * as cors from "cors";
import * as bodyparser from "body-parser";

import { requestLoggerMiddleware } from "./middlewares/request.logger.middleware";
import * as swaggerUi from "swagger-ui-express";
import "./todo/todo.controller";

import { RegisterRoutes } from "./routes/routes";

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(requestLoggerMiddleware);
RegisterRoutes(app);

try {
  const swaggerDocument = require("./routes/swagger.json");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.log("Unable to load swagger.json", err);
}

export { app };