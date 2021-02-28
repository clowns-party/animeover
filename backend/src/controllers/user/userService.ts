// Schema
import { FieldsUser } from "./user.schema";
import { User } from "./../../firebase/index";
// Services
import { AuthService } from "./../auth/authService";
// Functions
import { FirebaseUserUpdate } from "./user.function";

export class UserService {
  public async update(token: string, fields?: FieldsUser): Promise<User> {
    try {
      const isAuth = await new AuthService().me(token);
      return await FirebaseUserUpdate(isAuth, fields);
    } catch (error) {
      return error;
    }
  }
}
