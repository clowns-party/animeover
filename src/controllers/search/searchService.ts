import { QueryDocumentData } from "./../../firebase/firebase.schemas";
// Firebase
import { firestoreDB } from "./../../firebase";
// Schemas
import { AnimeList } from "../animedb/animedb.schema";

export class SearchService {
  public async search(queryText: string): Promise<AnimeList> {
    return new Promise(async (resolve, reject) => {
      try {
        const ref = await this.ref();
        const resultSearchRef = await ref
          .where("title", ">=", queryText)
          .where("title", "<=", queryText + "\uf8ff")
          .limit(20);
        const data: AnimeList = await this.refDocsData(resultSearchRef);
        const censoredFilter = data.filter((anime) => !anime.unacceptable);
        resolve(censoredFilter);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async refDocsData(ref: QueryDocumentData) {
    const docs = (await ref.get()).docs;
    const result = [];
    docs.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  }

  public async ref() {
    return await firestoreDB.collection("animedb");
  }
}
