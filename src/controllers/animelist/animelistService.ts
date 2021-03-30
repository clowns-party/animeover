import { AnimeDetailService } from "./../animedetail/animedetailService";
import { deleteAnimeItem, setAnimeList } from "./animelist.functions";
import { AuthService } from "./../auth/authService";
import { RequstAuth } from "./../auth/auth.schema";
// Firebase
import { firestoreDB, User } from "./../../firebase";
// Types
import {
  RefPromise,
  DocumentReference,
  UserAnimeList,
  UserAnimeValues,
  UserAnime,
} from "./animelist.schema";
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
        const ref = await this.ref();
        const data = await this.refData(ref);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async setAnime(
    animeId: string,
    data: UserAnimeValues
  ): Promise<UserAnime> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.secure();
        const dataForAnimeList: UserAnime = {
          [animeId]: data,
        };
        const ref = await this.ref();
        const refData = await this.refData(ref);
        const responseAnimeList = await setAnimeList(
          dataForAnimeList,
          ref,
          refData
        );
        const responseAnimeDetail = await new AnimeDetailService().setDetail(
          this.user?.uid,
          animeId,
          data
        );

        if (responseAnimeList && responseAnimeDetail) {
          resolve(responseAnimeList);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  public async deleteAnime(animeId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.secure();
        const ref = await this.ref();
        const refData = await this.refData(ref);
        const resultAnimeDetail = await new AnimeDetailService().deleteDetail(
          this.user?.uid,
          animeId
        );
        const resultAnimeList = await deleteAnimeItem(animeId, ref, refData);
        resolve(resultAnimeList);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async ref(): RefPromise {
    return await firestoreDB.collection("animelist").doc(this.user?.uid);
  }
  private async refData(ref: DocumentReference): Promise<UserAnimeList> {
    const referenceGet = await ref.get();
    return (await referenceGet.data()) as UserAnimeList;
  }
}
