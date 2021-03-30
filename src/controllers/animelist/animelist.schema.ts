import firebase from "firebase/app";

export type RefPromise = Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
>;
export type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export type UserAnimeValues = {
  status: string;
  review: string;
  star: number;
};
export type UserAnime = {
  [key: string]: UserAnimeValues;
};
export type UserAnimeList = UserAnime | undefined;
