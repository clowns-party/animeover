import firebase from "firebase/app";
import { firestoreDB } from "./../../firebase/index";

type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
type UserAnime = {
  [key: string]: {
    status: string;
    review: string;
    star: number;
  };
};
type UserAnimeList = UserAnime | undefined;

export const animeListRef = async (userId: string) => {
  return await firestoreDB.collection("animelist").doc(userId);
};
export const animeListData = async (
  ref: DocumentReference
): Promise<UserAnimeList> => {
  const referenceGet = await ref.get();
  return (await referenceGet.data()) as UserAnimeList;
};

export const animeDetailRef = async (animeId: string, userId: string) => {
  return await firestoreDB
    .collection("animedetail")
    .doc(animeId)
    .collection("users")
    .doc(userId);
};
export const animeDetailData = async (ref: DocumentReference) => {
  const referenceGet = await ref.get();
  return (await referenceGet.data()) as UserAnime;
};

// setter animelist
const setAnimeList = (userId: string, data: UserAnime) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ref = await animeListRef(userId);
      const res = await animeListData(ref);
      if (!res) {
        await ref.set(data);
      } else {
        await ref.update({
          ...res,
          ...data,
        });
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
const setAnimeDetail = (userId: string, animeId, data: UserAnime) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ref = await animeDetailRef(animeId, userId);
      const res = await animeDetailData(ref);
      if (!res) {
        await ref.set(data);
      } else {
        await ref.update(data);
      }
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const setDataInCollection = (userId: string, animeId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataForAnimeList = {
        [animeId]: {
          review: "test",
          status: "view",
          star: 8,
        },
      };
      const dataForDetail = {
        [userId]: {
          review: "test",
          status: "view",
          star: 10,
        },
      };
      const res = await setAnimeList(userId, dataForAnimeList);
      res && (await setAnimeDetail(userId, animeId, dataForDetail));

      resolve("all good");
    } catch (error) {
      reject(error);
    }
  });
};
