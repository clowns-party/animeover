var fetch = require("node-fetch");
// Schemas
import { ShikimoriAnimeItem, ShikimoriAnimeList } from "./ongoing.schema";
import { AnimeSeason } from "./../animedb/animedb.schema";
import { AnimeList, AnimeItem } from "./../animedb/animedb.schema";
// Functions
import { setOngoingList, singleAnimeFormatter } from "./ongoing.functions";
// Firebase
import { firestoreDB } from "./../../firebase/index";

export class OngoingService {
  private shikimoriURL: string = "https://shikimori.one/api/";
  private ongoing = "animes?status=ongoing&season=2021&order=ranked&limit=10";
  private animes = "animes/";
  private season: AnimeSeason = "SPRING";
  private year: number = 2021;
  private interval = 86400000;

  public async getOngoing(): Promise<AnimeList> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.update();
        const data = await this.refCollectionAllDocsData();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async getOngoingById(id: string): Promise<AnimeItem> {
    return new Promise(async (resolve, reject) => {
      try {
        const fbData = await this.existOngoingInFB(id);
        const data = !fbData ? await this.getShikimoriOngoingById(id) : fbData;
        console.log("FIND IN", fbData ? "FIREBASE" : "SHIKI");
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async existOngoingInFB(id: string): Promise<AnimeItem> {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await firestoreDB.collection("ongoing").doc(id);
        const data = (await doc.get()).data();
        resolve(data as AnimeItem);
      } catch (error) {
        resolve(undefined);
      }
    });
  }

  // Обновление списков
  private async update(): Promise<boolean> {
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
    return new Promise(async (resolve, reject) => {
      const ref = await this.refCollectionDoc("date");
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
        const ref = await this.refCollectionDoc("date");
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
  // API SHIKIMORI
  private async fetching(url: string) {
    const jsondata = await fetch(url);
    const text: string = await jsondata.text();
    return text && JSON.parse(text);
  }
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
  private getShikimoriOngoingById(id: string): Promise<AnimeItem> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = this.shikimoriURL + this.animes + id;
        const data: ShikimoriAnimeItem = await this.fetching(url);
        const format =
          data && singleAnimeFormatter(data, this.season, this.year);
        resolve(format);
      } catch (error) {
        reject(error);
      }
    });
  }
  // Getters FB
  private async refCollection() {
    return await firestoreDB.collection("ongoing");
  }
  private async refCollectionAllDocsData(): Promise<AnimeList> {
    const ref = await (await this.refCollection()).get();
    const docs = [];
    ref?.docs.forEach((doc) => {
      docs.push(doc.data());
    });
    return docs;
  }
  private async refCollectionDoc(doc: string) {
    const ref = await this.refCollection();
    return await ref.doc(doc);
  }
}
