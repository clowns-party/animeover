import * as fs from "fs";
import * as path from "path";

import { AnimeList } from "../types/defaults";

export const getFile = async (): Promise<AnimeList> => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "dummy", "./anime-offline-database.json"),
      "utf8",
      function read(err, data) {
        if (err) {
          reject(err);
          throw err;
        }
        const content = data;

        processFile(content);
      }
    );
    function processFile(content: string) {
      console.log("Good read");
      const data: AnimeList = JSON.parse(content);
      resolve(data);
    }
  });
};
