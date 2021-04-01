import { firestoreDB } from "./../../firebase";
import { setAnimeDetail, deleteAnimeDetail } from "./animedetail.functions";
// Schemas
import {
  RefPromise,
  UserAnime,
  UserAnimeList,
  UserAnimeValues,
} from "./../animelist/animelist.schema";
import { AnimeDetailList } from "./animedetail.schema";
import {
  CollectionDocumentData,
  DocumentReference,
} from "./../../firebase/firebase.schemas";
export class AnimeDetailService {
  public async getOne(animeId: string): Promise<AnimeDetailList> {
    return new Promise(async (resolve, reject) => {
      try {
        const ref = await this.ref(animeId);
        const data = await this.refData(ref);
        const result = [];
        data.forEach((doc) => {
          result.push(doc.data());
        });
        result?.length ? resolve(result) : resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  }
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

  public async deleteDetail(userId: string, animeId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const ref = await this.refByUserId(animeId, userId);
        const refData = await this.refDataByUserId(ref);
        const res = await deleteAnimeDetail(animeId, ref, refData);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async ref(animeId: string) {
    return await firestoreDB
      .collection("animedetail")
      .doc(animeId)
      .collection("users");
  }
  private async refData(ref: CollectionDocumentData) {
    const referenceGet = await ref.get();
    return await referenceGet.docs;
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
