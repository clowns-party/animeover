// Schema
import { FieldsUser } from "./user.schema";
import { User } from "./../../firebase/index";
// Services
import { AuthService } from "./../auth/authService";
// Functions
import { FirebaseUserUpdate } from "./user.function";

export class UserService {
  public async update(
    access_token: string,
    refresh_token: string,
    fields?: FieldsUser
  ): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await new AuthService().me(access_token, refresh_token);
        if (user) {
          const updated = await FirebaseUserUpdate(user, fields);
          resolve(updated);
        } else {
          reject({
            code: 401,
            message: "Error with data or auth",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
