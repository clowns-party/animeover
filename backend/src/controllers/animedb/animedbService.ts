import { FetchAnimeDB, FetchAnimeById } from "./animedb.function";

export class AnimeDbService {
  public async getAll(limit?: number) {
    return await FetchAnimeDB(limit);
  }
  public async getOne(animeId: string) {
    return await FetchAnimeById(animeId);
  }
}
