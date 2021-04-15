import { ShikimoriService } from "../../services/shikimori/shikimori.service";
import { AnimeList, AnimeItem } from "./../animedb/animedb.schema";
// Firebase
import { firestoreDB } from "./../../firebase/index";

export class OngoingService {
  private readonly shikimoriService: ShikimoriService;
  constructor() {
    this.shikimoriService = new ShikimoriService("ongoing");
  }
  public async getOngoing(): Promise<AnimeList> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.shikimoriService.update();
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
        const data = !fbData
          ? await this.shikimoriService.getShikimoriOngoingById(id)
          : fbData;
        console.log("FIND IN", fbData ? "FIREBASE" : "SHIKI");
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async existOngoingInFB(id: string): Promise<AnimeItem> {
    const doc = await firestoreDB.collection("ongoing").doc(id);
    return this.shikimoriService.existInFB(doc);
  }

  // Getters FB
  protected async refCollection() {
    return await firestoreDB.collection("ongoing");
  }
  protected async refCollectionAllDocsData(): Promise<AnimeList> {
    const ref = await (await this.refCollection()).get();
    const docs = [];
    ref?.docs.forEach((doc) => {
      docs.push(doc.data());
    });
    return docs;
  }
}
