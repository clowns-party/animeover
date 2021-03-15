import * as fs from "fs";
import * as path from "path";

import { AnimeList } from "./../controllers/animedb/animedb.schema";
interface AnimeJsonDB {
  data: AnimeList;
}

export const getFile = async (): Promise<AnimeJsonDB> => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "dummy", "./anime-offline-database_v2.json"),
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
      const data: AnimeJsonDB = JSON.parse(content);
      resolve(data);
    }
  });
};
