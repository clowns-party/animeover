import { User } from "./../../firebase/index";
// Firebase
import { AdminFBAuth } from "./../../firebase/index";
// Schema
import { UserSchema } from "./../auth/auth.schema";
import { FieldsUser } from "./user.schema";

export const FirebaseUserUpdate = (
  isAuth: UserSchema,
  fields: FieldsUser
): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRecord = await AdminFBAuth.updateUser(isAuth.uid, {
        displayName: fields.displayName ?? isAuth.displayName,
        photoURL: fields.photoURL ?? isAuth.photoURL,
      });
      resolve(userRecord.toJSON() as User);
    } catch (error) {
      reject(error);
    }
  });
};
