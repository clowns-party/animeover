import { RequstAuth } from "./auth.schema";
import { User } from "./../../firebase/index";
import {
  FirebaseSignUp,
  FirebaseSignIn,
  FirebaseMe,
  FirebaseRefreshToken,
} from "./auth.functions";

export class AuthService {
  public async signup(email: string, password: string) {
    return await FirebaseSignUp(email, password);
  }

  public async signin(email: string, password: string) {
    return await FirebaseSignIn(email, password);
  }

  public async me(accessToken: string, refreshToken: string) {
    return await FirebaseMe(accessToken, refreshToken);
  }

  public async refresh(refresh_token: string) {
    return await FirebaseRefreshToken(refresh_token);
  }

  public async isAuth(
    access_token: string,
    refresh_token: string,
    request: RequstAuth
  ): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = access_token ?? request?.query?.access_token;
        const refreshToken = refresh_token ?? request?.query?.refresh_token;
        const user = await this.me(accessToken, refreshToken);
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
