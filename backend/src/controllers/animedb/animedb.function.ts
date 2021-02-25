// Firebase
import { firestoreDB } from "./../../firebase/index";
//types
import { AnimeList } from "./animedb.schema";

export const FetchAnimeDB = (limit?: number): Promise<AnimeList> => {
  return new Promise(async (resolve, reject) => {
    try {
      const citiesRef = firestoreDB.collection("animedb");
      const snapshot = limit
        ? await citiesRef.limit(limit).get()
        : await citiesRef.limit(10).get();
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
