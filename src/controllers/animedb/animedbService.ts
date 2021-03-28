// Firebase
import { firestoreDB } from "./../../firebase";
// Schemas
import {
  AnimeSeason,
  QueryDocumentData,
  WhereFilterOp,
} from "./animedb.schema";
// Functions
import { FetchAnimeDB, FetchAnimeById, FetchOngoing } from "./animedb.function";

type FilterParams = Array<{
  by: string;
  entry: WhereFilterOp;
  dependencies: AnimeSeason | string;
}>;

export class AnimeDbService {
  public async getAll(limit?: number, tags?: string, season?: AnimeSeason) {
    const animeDbRef = await this.censorshipAnimeFilter();
    const refFiltered = await this.applyFilters(animeDbRef, tags, season);
    const limitter = limit ? (limit <= 30 ? limit : 30) : 10;
    return await FetchAnimeDB(refFiltered, limitter, tags);
  }
  public async getOne(animeId: string) {
    return await FetchAnimeById(animeId);
  }
  public async getOngoing() {
    const ref = await this.censorshipAnimeFilter();
    return await FetchOngoing(ref);
  }

  private async censorshipAnimeFilter() {
    // Block anime with rating 18 +
    return await firestoreDB
      .collection("animedb")
      .where("unacceptable", "==", false);
  }
  private async applyFilters(
    dbRef: QueryDocumentData,
    tags?: string,
    season?: AnimeSeason
  ) {
    const filters: FilterParams = [
      tags && {
        by: "tags",
        entry: "array-contains-any",
        dependencies: JSON.parse(tags),
      },
      season && { by: "animeSeason.season", entry: "==", dependencies: season },
    ];

    return await filters.reduce((ref, filter) => {
      if (filter) {
        ref = ref.where(filter.by, filter.entry, filter.dependencies);
      }
      return ref;
    }, dbRef);
  }
}
