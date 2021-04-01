import { DocumentReference } from "../../firebase/firebase.schemas";
import { UserAnime, UserAnimeList } from "./animelist.schema";
export const setAnimeList = (
  data: UserAnime,
  ref: DocumentReference,
  refData: UserAnimeList
): Promise<UserAnime> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!refData) {
        await ref.set(data);
      } else {
        await ref.update({
          ...refData,
          ...data,
        });
      }
      resolve({
        ...refData,
        ...data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteAnimeItem = (
  animeId: string,
  ref: DocumentReference,
  refData: UserAnimeList
): Promise<UserAnime> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = refData;
      if (data) {
        delete data[animeId];
      } else {
        reject({ code: 404, message: "Anime not found in list!" });
      }
      await ref.set(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
