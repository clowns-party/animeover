import { AnimeItem } from "./animedb.schema";
// Firebase
import { firestoreDB } from "./../../firebase/index";
//types
import { AnimeList, QueryDocumentData } from "./animedb.schema";

export const FetchAnimeDB = (
  dbRef: QueryDocumentData,
  limit: number,
  tags?: string
): Promise<AnimeList> => {
  return new Promise(async (resolve, reject) => {
    try {
      const hardFilter =
        tags && tags.length >= 2 ? JSON.parse(tags) : undefined;
      const snapshot = await dbRef.limit(limit).get();

      const docs = [];
      snapshot.forEach((doc) => {
        const document = doc.data();
        if (hardFilter) {
          console.log("HARD FILTER ACTIVE");

          const isHardExact = hardFilter.reduce((exact, filter) => {
            if (!document.tags.includes(filter)) {
              exact = false;
            }
            return exact;
          }, true);
          if (isHardExact) {
            docs.push(document);
          }
        } else {
          docs.push(document);
        }
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

export const FetchOngoing = async (
  dbRef: QueryDocumentData
): Promise<AnimeList> => {
  const snapshot = await dbRef
    .where("status", "==", "CURRENTLY")
    .where("animeSeason.year", "==", 2021)
    .limit(10)
    .get();
  const docs = [];
  snapshot.forEach((doc) => {
    const document = doc.data();
    docs.push(document);
  });
  return docs;
};
