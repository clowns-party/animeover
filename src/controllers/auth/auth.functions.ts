// Firebase
import { User, firebaseAuth, AdminFBAuth } from "./../../firebase/index";
import * as requestP from "request-promise";

// /auth/signup
export const FirebaseSignUp = (email, password): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { user } = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        resolve(user);
      } else {
        reject({
          message: "required fields are not filled in",
          code: 400,
        });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      reject({
        message: errorMessage ?? "required fields are not filled in",
        code: errorCode ?? 400,
      });
    }
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
export const FirebaseMe = (
  accessToken: string,
  refreshToken: string
): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    let refreshVerify;
    try {
      refreshVerify = await FirebaseRefreshToken(refreshToken);
    } catch (error) {
      reject({
        message: "Refresh token not provided or wrong!",
        code: 400,
      });
    }

    try {
      const user = await signWithCustomToken(accessToken);
      resolve(user);
    } catch (error) {
      try {
        const user = await signWithCustomToken(refreshVerify);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    }
  });
};

const signWithCustomToken = async (token: string): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await firebaseAuth.signInWithCustomToken(token);
      const user = userCredential.user;
      if (user) {
        resolve(user);
      } else {
        reject({
          message: "unresolved exception",
          code: 500,
        });
      }
    } catch (error) {
      const errorMessage = error.message;
      reject({
        message: errorMessage ?? "invalid token",
        code: 400,
      });
    }
  });
};

// /auth/refresh
export const FirebaseRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkToken: { access_token: string } = await requestP.post({
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url:
          "https://securetoken.googleapis.com/v1/token?key=" +
          process.env.SECURETOKEN_API,
        body: "grant_type=refresh_token&refresh_token=" + refreshToken,
        json: true,
      });
      const token = await verifyToken(checkToken?.access_token);
      resolve(token);
    } catch (error) {
      const err = {
        message: "INVALID_REFRESH_TOKEN",
        code: 400,
      };
      reject(err);
    }
  });
};

const verifyToken = async (token: string) => {
  try {
    const decodedToken = await AdminFBAuth.verifyIdToken(token);
    const customToken = await AdminFBAuth.createCustomToken(decodedToken.uid);
    return customToken;
  } catch (e) {
    throw new Error(e);
  }
};
