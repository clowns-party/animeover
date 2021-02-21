import { app } from "./app";
import * as http from "http";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
server.on("error", (err) => {
  console.error(err);
});
server.on("listening", () => {
  console.info(`Listening on port ${port}`);
});
