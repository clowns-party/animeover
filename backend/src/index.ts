import express from "express";
require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.get("/", (request, response) => {
  response.send("Hello world!");
});
app.listen(port, () => console.log(`Running on port ${port}`));
