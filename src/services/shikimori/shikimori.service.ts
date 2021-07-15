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
import { AbstractIntegrate } from "../AbstractIntegrate";
// Utils
var fetch = require("node-fetch");

export class ShikimoriService extends AbstractIntegrate {
  private shikimoriURL: string = "https://shikimori.one/api/";
  private ongoing = "animes?status=ongoing&season=2021&order=ranked&limit=10";
  private animes = "animes/";
  private season: AnimeSeason = "SPRING";
  private year: number = 2021;
  constructor(collection: string) {
    super({
      collectionName: collection,
      baseUrl: "https://shikimori.one/api/",
    });
  }

  // Форматированные аниме от шикимори, добавляем их в fb коллекцию
  async firebaseSetter(ongoing: AnimeList): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await setOngoingList(ongoing);
        if (result?.length) {
          await this.dateLogger();
          resolve(true);
        } else {
          reject("cant't be set shikimori ongoing");
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  // Форматирование
  async toSingleFormat(
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
  async callEndpoint(uri?: string): Promise<AnimeList> {
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
}
