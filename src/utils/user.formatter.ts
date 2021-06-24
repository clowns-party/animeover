import firebase from "firebase";

export const userFormatter = (user: firebase.User) => {
  const extendedUser = user;

  return extendedUser
    ? {
        displayName: extendedUser?.displayName,
        photoURL: extendedUser?.photoURL,
        email: extendedUser?.email,
        emailVerified: extendedUser?.emailVerified,
        // @ts-ignore
        accessToken: extendedUser?.za || "",
        refreshToken: extendedUser?.refreshToken || "",
      }
    : null;
};
