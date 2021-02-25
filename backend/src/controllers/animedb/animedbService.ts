import { FetchAnimeDB } from "./animedb.function";

export class AnimeDbService {
  public async getAll(limit?: number) {
    return await FetchAnimeDB(limit);
  }
}
