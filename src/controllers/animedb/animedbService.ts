// Firebase
import { firestoreDB } from "./../../firebase";
// Schemas
import { AnimeItem, AnimeSeason } from "./animedb.schema";
import {
  WhereFilterOp,
  QueryDocumentData,
} from "../../firebase/firebase.schemas";
// Functions
import { FetchAnimeDB, FetchAnimeById } from "./animedb.function";
// Services
import { OngoingService } from "./../ongoing/ongoingService";

type FilterParams = Array<{
  by: string;
  entry: WhereFilterOp;
  dependencies: AnimeSeason | string;
}>;

export class AnimeDbService {
  private readonly ongoingService: OngoingService;
  constructor() {
    this.ongoingService = new OngoingService();
  }
  public async getAll(
    limit?: number,
    tags?: string,
    season?: AnimeSeason,
    page?: number
  ) {
    await this.getCountAnimes();
    const limitter = limit ? (limit <= 30 ? limit : 30) : 10;
    const { pageRef, count } = await this.paginate(page ? page : 1, limitter, {
      tags,
      season,
    });
    const animeDbRef = await this.censorshipAnimeFilter(pageRef);

    const animeList = await FetchAnimeDB(animeDbRef, limitter, tags);
    return {
      animeList,
      count,
    };
  }
  public async getOne(animeId: string): Promise<AnimeItem> {
    return new Promise(async (resolve, reject) => {
      try {
        const anime = await FetchAnimeById(animeId);
        anime && resolve(anime);
      } catch (error) {
        try {
          const ongoing = await this.ongoingService.getOngoingById(
            animeId,
            true
          );
          ongoing && resolve(ongoing);
        } catch (error) {
          reject("Anime not found");
        }
      }
    });
  }

  public async paginate(
    page: number,
    limit: number,
    withFilters?: {
      tags?: string;
      season?: AnimeSeason;
    }
  ) {
    const db = async (withCount: boolean) => {
      let count = undefined;
      const doc = await this.applyFilters(
        firestoreDB.collection("animedb"),
        withFilters.tags,
        withFilters.season
      );
      // if ((withFilters.season || withFilters.tags) && withCount) {
      //   count = (await doc.get()).docs.length;
      // }

      return { doc, count };
    };
    const _limit = page === 1 ? page * limit : Number(page * limit) - limit;
    const { doc: docCurrent } = await db(false);
    const currentPage = docCurrent.limit(_limit);

    const snapshot = await currentPage.get();
    // Step 2
    const lastDocumentSnapshot = snapshot.docs[snapshot.docs.length - 1];

    // Step 3
    const { doc: docNext, count } = await db(true);
    const nextPage = docNext.limit(_limit).startAfter(lastDocumentSnapshot);

    const pageRef = page === 1 ? currentPage : nextPage;
    return { pageRef, count };
  }

  private async censorshipAnimeFilter(dbRef?: QueryDocumentData) {
    const ref = dbRef ? dbRef : firestoreDB.collection("animedb");
    // Block anime with rating 18 +
    return await ref.where("unacceptable", "==", false);
  }
  private async applyFilters(
    dbRef: QueryDocumentData,
    tags?: string,
    season?: AnimeSeason
  ): Promise<QueryDocumentData> {
    return new Promise(async (resolve, reject) => {
      try {
        const filters: FilterParams = [
          tags && {
            by: "tags",
            entry: "array-contains-any",
            dependencies: JSON.parse(tags),
          },
          season && {
            by: "animeSeason.season",
            entry: "==",
            dependencies: season,
          },
        ];
        const result = await filters.reduce((ref, filter) => {
          if (filter) {
            ref = ref.where(filter.by, filter.entry, filter.dependencies);
          }
          return ref;
        }, dbRef);
        resolve(result);
      } catch (error) {
        reject({ message: `Bad JSON or firebase error [${error}]`, code: 400 });
      }
    });
  }

  public async getCountAnimes() {
    const ref = await firestoreDB.collection("animedb").doc("count");
    const count = await (await ref.get()).data();
    return count?.total;
  }
  private async addAnime(prevCount: number) {
    const res =
      prevCount &&
      prevCount > 0 &&
      (await firestoreDB
        .collection("animedb")
        .doc("count")
        .set({ total: prevCount + 1 }));
  }
  private async removeAnime(prevCount: number) {
    const res =
      prevCount &&
      prevCount > 0 &&
      (await firestoreDB
        .collection("animedb")
        .doc("count")
        .set({ total: prevCount - 1 }));
  }
}
