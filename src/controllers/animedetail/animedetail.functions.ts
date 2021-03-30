import {
  DocumentReference,
  UserAnime,
  UserAnimeList,
} from "./../animelist/animelist.schema";

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
