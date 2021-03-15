import { animebanTags, AnimeItem } from "./animedb.schema";
// Firebase
import { firestoreDB } from "./../../firebase/index";
//types
import { AnimeList } from "./animedb.schema";

export const FetchAnimeDB = (_limit?: number): Promise<AnimeList> => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = _limit ? (_limit <= 30 ? _limit : 30) : 10;

      const animeRef = await censorshipAnimeFilter();
      const snapshot = await animeRef.limit(limit).get();

      const docs = [];
      snapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      resolve(docs);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      reject({
        message: errorMessage ?? "An error occurred",
        code: errorCode ?? 500,
      });
    }
  });
};
// Blocked tags filter
const censorshipAnimeFilter = async () => {
  return await firestoreDB
    .collection("animedb")
    .where("tags", "not-in", animebanTags);
};

export const FetchAnimeById = (animeId: string): Promise<AnimeItem> => {
  return new Promise(async (resolve, reject) => {
    try {
      const animeDbRef = firestoreDB.collection("animedb").doc(animeId);
      const doc = await animeDbRef.get();
      if (!doc.exists) {
        reject({
          message: "Anime not found!",
          code: 404,
        });
      } else {
        resolve(doc.data() as AnimeItem);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      reject({
        message: errorMessage ?? "An error occurred",
        code: errorCode ?? 500,
      });
    }
  });
};
