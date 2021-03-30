import { RequstAuth } from "./auth.schema";
import { User } from "./../../firebase/index";
import { FirebaseSignUp, FirebaseSignIn, FirebaseMe } from "./auth.functions";

export class AuthService {
  public async signup(email: string, password: string) {
    return await FirebaseSignUp(email, password);
  }

  public async signin(email: string, password: string) {
    return await FirebaseSignIn(email, password);
  }

  public async me(token: string) {
    return await FirebaseMe(token);
  }

  public async isAuth(token: string, request: RequstAuth): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const access_token = token ?? request?.query?.access_token;
        const user = await this.me(access_token);
        if (user) {
          resolve(user);
        } else {
          reject({ message: "user not found or not auth" });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
