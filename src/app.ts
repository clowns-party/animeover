import * as express from "express";
import * as cors from "cors";
import * as bodyparser from "body-parser";

import * as dotenv from "dotenv";
dotenv.config();

import { requestLoggerMiddleware } from "./middlewares/request.logger.middleware";
import * as swaggerUi from "swagger-ui-express";
// Controllers
import "./controllers/animedb/animedb.controller";
import "./controllers/auth/auth.controller";
import "./controllers/user/user.controller";

import { RegisterRoutes } from "./routes/routes";

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(requestLoggerMiddleware);
RegisterRoutes(app);

try {
  const swaggerDocument = require("../tsoa/swagger.json");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.log("Unable to load swagger.json", err);
}

export default app;
