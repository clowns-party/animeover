import { firestoreDB } from "./../../firebase/index";
import {
  AnimeList,
  AnimeItem,
} from "./../../controllers/animedb/animedb.schema";
import { DocumentReference } from "./../../firebase/firebase.schemas";
import { AnimeSeason } from "../../controllers/animedb/animedb.schema";
import { setOngoingList, singleAnimeFormatter } from "./shikimori.functions";

import { ShikimoriAnimeItem } from "./shikimori.schemas";
// Schemas
import { ShikimoriAnimeList } from "./shikimori.schemas";
// Utils
var fetch = require("node-fetch");

export class ShikimoriService {
  private shikimoriURL: string = "https://shikimori.one/api/";
  private ongoing = "animes?status=ongoing&season=2021&order=ranked&limit=10";
  private animes = "animes/";
  private season: AnimeSeason = "SPRING";
  private year: number = 2021;
  private interval = 86400000;
  private collection: string;
  constructor(collection: string) {
    this.collection = collection;
  }

  // Обновление списков
  public async update(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const triggerResult = await this.triggerUpdate();
        if (triggerResult) {
          const data = await this.getShikimoriOngoing();
          await this.setOngoingByShikimori(data);
        }
      } catch (error) {
        reject(error);
      } finally {
        resolve(true);
      }
    });
  }

  // Нужно ли обновить списки?
  private async triggerUpdate() {
    return new Promise(async (resolve) => {
      const ref = await this.firebaseService("date");
      const data = (await ref.get()).data();
      if (data?.nextUpdate) {
        const next = new Date(data.nextUpdate);
        resolve(new Date() >= next);
      } else {
        resolve(true);
      }
    });
  }
  // Логирование последнего обновления
  private async dateLogger() {
    return new Promise(async (resolve, reject) => {
      try {
        const now = new Date();
        const nextUpdate = new Date(
          now.valueOf() + this.interval
        ).toISOString();
        const updateIn = now.toISOString();
        const ref = await this.firebaseService("date");
        await ref.set({ nextUpdate, updateIn });
        console.log("---------ONGOING LOGGER END WORK-----------");
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }
  // Форматированные аниме от шикимори, добавляем их в fb коллекцию
  private async setOngoingByShikimori(
    ongoing: AnimeList
  ): Promise<AnimeItem[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await setOngoingList(ongoing);
        if (result?.length) {
          await this.dateLogger();
          resolve(result);
        } else {
          reject("cant't be set shikimori ongoing");
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  // Форматирование
  private async toSingleFormat(
    shikimoriAnimeList: ShikimoriAnimeList
  ): Promise<AnimeList> {
    return shikimoriAnimeList.reduce(
      (animeList, anime) =>
        (animeList = [
          ...animeList,
          singleAnimeFormatter(anime, this.season, this.year),
        ]),
      []
    );
  }
  // Проверка есть ли в firebase
  public async existInFB(doc: DocumentReference): Promise<AnimeItem> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = (await doc.get()).data();
        resolve(data as AnimeItem);
      } catch (error) {
        resolve(undefined);
      }
    });
  }
  // API SHIKIMORI
  private async getShikimoriOngoing(uri?: string): Promise<AnimeList> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = !uri ? this.shikimoriURL + this.ongoing : uri;
        const data: ShikimoriAnimeList = await this.fetching(url);
        resolve(this.toSingleFormat(data));
      } catch (error) {
        reject(error);
      }
    });
  }
  public getShikimoriOngoingById(id: string): Promise<AnimeItem> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = this.shikimoriURL + this.animes + id;
        const data: ShikimoriAnimeItem = await this.fetching(url);
        //@ts-ignore
        const hasError = !data || data?.code?.toString() === "404";
        if (hasError) {
          throw new Error("Not found");
        }
        const format = singleAnimeFormatter(data, this.season, this.year);
        resolve(format);
      } catch (error) {
        reject(error);
      }
    });
  }
  // Utils
  private async fetching(url: string) {
    const jsondata = await fetch(url);
    const text: string = await jsondata.text();
    return text && JSON.parse(text);
  }
  protected async refCollection() {
    return await firestoreDB.collection(this.collection);
  }
  private async firebaseService(doc: string) {
    const ref = await this.refCollection();
    return await ref.doc(doc);
  }
}
