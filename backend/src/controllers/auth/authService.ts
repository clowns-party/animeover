import { FirebaseSignUp, FirebaseSignIn } from "./auth.functions";

export class AuthService {
  public async signup(email: string, password: string) {
    return await FirebaseSignUp(email, password);
  }

  public async signin(email: string, password: string) {
    return await FirebaseSignIn(email, password);
  }
}
