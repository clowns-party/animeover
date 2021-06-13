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
    try {
      const isAuth = await new AuthService().me(access_token, refresh_token);
      return await FirebaseUserUpdate(isAuth, fields);
    } catch (error) {
      return error;
    }
  }
}
