import firebase from "firebase/app";

export type RefPromise = Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
>;
export type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export type UserAnimeStatuses =
  | "viewed"
  | "abandoned"
  | "postponed"
  | "planned"
  | "reviewing"
  | "look";
export type UserAnimeStars =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";
export type UserAnimeValues = {
  status: UserAnimeStatuses;
  review: string;
  star: UserAnimeStars;
};
export type UserAnime = {
  [key: string]: UserAnimeValues;
};
export type UserAnimeList = UserAnime | undefined;
