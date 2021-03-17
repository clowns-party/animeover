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
}
