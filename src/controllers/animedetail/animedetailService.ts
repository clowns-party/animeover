import { firestoreDB } from "./../../firebase";
import { setAnimeDetail } from "./animedetail.functions";
// Types
import {
  RefPromise,
  UserAnime,
  DocumentReference,
  UserAnimeList,
  UserAnimeValues,
} from "./../animelist/animelist.schema";

export class AnimeDetailService {
  public async setDetail(
    userId: string,
    animeId: string,
    data: UserAnimeValues
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const dataForAnimeList: UserAnime = {
          [userId]: data,
        };
        const ref = await this.refByUserId(animeId, userId);
        const refData = await this.refDataByUserId(ref);
        const res = await setAnimeDetail(dataForAnimeList, ref, refData);
        if (res) {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  private async refByUserId(animeId: string, userId: string): RefPromise {
    return await firestoreDB
      .collection("animedetail")
      .doc(animeId)
      .collection("users")
      .doc(userId);
  }
  private async refDataByUserId(
    ref: DocumentReference
  ): Promise<UserAnimeList> {
    const referenceGet = await ref.get();
    return (await referenceGet.data()) as UserAnime;
  }
}
