import firebase from "firebase/app";

export type CollectionDocumentData = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
export type QueryDocumentData = firebase.firestore.Query<firebase.firestore.DocumentData>;
export type WhereFilterOp = firebase.firestore.WhereFilterOp;
export type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
