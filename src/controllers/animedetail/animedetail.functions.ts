import { DocumentReference } from "../../firebase/firebase.schemas";
import { UserAnime, UserAnimeList } from "./../animelist/animelist.schema";

export const setAnimeDetail = (
  data: UserAnime,
  ref: DocumentReference,
  refData: UserAnimeList
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!refData) {
        await ref.set(data);
      } else {
        await ref.update(data);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteAnimeDetail = (
  animeId: string,
  ref: DocumentReference,
  refData: UserAnimeList
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = refData;
      if (data) {
        await ref.delete();
      } else {
        reject({ code: 404, message: "User review in detail not found" });
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
