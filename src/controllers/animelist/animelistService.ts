import { setDataInCollection } from "./animelist.functions";
import { AuthService } from "./../auth/authService";
import { RequstAuth } from "./../auth/auth.schema";
// Firebase
import { firestoreDB, User } from "./../../firebase";

export class AnimeListService {
  token: string;
  request: RequstAuth;
  user: User;
  constructor(token: string, request: RequstAuth) {
    this.token = token;
    this.request = request;
  }
  private clear() {
    this.token = null;
    this.request = null;
    this.user = null;
  }
  private async secure() {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await new AuthService().isAuth(this.token, this.request);
        this.user = user;
        resolve(user);
      } catch (error) {
        this.clear();
        reject(error);
      }
    });
  }

  public async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.secure();
        await setDataInCollection(
          this.user.uid,
          "0010beea-25f0-427e-b833-34c38f92d4fe"
        );
        resolve({ data: "all good!" });
      } catch (error) {
        reject(error);
      }
    });
  }
}
