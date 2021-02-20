import express from "express";
import log4js from "log4js";
require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.get("/", (request, response) => {
  response.send("Hello world!");
});

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

logger.info("log4js log info");
logger.debug("log4js log debug");
logger.error("log4js log error");

app.listen(port, () => console.log(`Running on port ${port}`));
