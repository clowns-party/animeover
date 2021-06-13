// This import loads the firebase namespace along with all its type information.
import firebase from "firebase/app";
import * as admin from "firebase-admin";
// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
//ADMIN-FB
const serviceAccount = require("./../../keys/firebase/admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://animeover-737d6-default-rtdb.firebaseio.com",
});
//FB
export const fb = firebase.initializeApp({
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  messagingSenderId: process.env.FB_SENDERID,
  appId: process.env.FB_APPID,
  measurementId: process.env.FB_MEASUREMENTID,
});

export const firebaseDB = fb.database();
export const firestoreDB = fb.firestore();
export const firebaseAuth = fb.auth();
export const AdminFBAuth = admin.auth();

// Types
export type User = firebase.User;
