// Firebase
import { User, firebaseAuth, AdminFBAuth } from "./../../firebase/index";

// /auth/signup
export const FirebaseSignUp = (email, password): Promise<User> => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          resolve(user);
        } else {
          reject({
            message: "required fields are not filled in",
            code: 500,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject({
          message: errorMessage ?? "required fields are not filled in",
          code: errorCode ?? 400,
        });
      });
  });
};

// /auth
export type ResponseSignIn = {
  user: User;
  token: string;
};
const createToken = (uid): Promise<string> => {
  return new Promise((resolve, reject) => {
    AdminFBAuth.createCustomToken(uid)
      .then((customToken) => {
        resolve(customToken);
      })
      .catch((error) => {
        console.log("Error creating custom token:", error);
        reject({
          message: "Token can't be created!",
          code: 500,
        });
      });
  });
};
export const FirebaseSignIn = (email, password): Promise<ResponseSignIn> => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          createToken(user.uid).then((token) => {
            resolve({
              user,
              token,
            });
          });
        } else {
          reject({
            message: "invalid password or email address",
            code: 500,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject({
          message: errorMessage ?? "invalid password or email address",
          code: errorCode ?? 400,
        });
      });
  });
};

// /auth/me
export const FirebaseMe = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .signInWithCustomToken(token)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          resolve(user);
        } else {
          reject({
            message: "invalid password or email address",
            code: 500,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject({
          message: errorMessage ?? "invalid token",
          code: errorCode ?? 400,
        });
      });
  });
};
