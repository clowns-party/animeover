import { Route, Get, Controller, Query } from "tsoa";

// type
import { AnimeList } from "./animedb.schema";

// Service
import { AnimeDbService } from "./animedbService";

@Route("/animedb")
export class AnimeDbController extends Controller {
  @Get("/")
  public async getAll(
    @Query() limit?: number
  ): Promise<AnimeList> {
    try {
      const docs = await new AnimeDbService().getAll(limit);
      if (docs && docs.length) {
        this.setStatus(200);
        return docs;
      } else {
        this.setStatus(500);
      }
    } catch (error) {
      this.setStatus(500);
      return error;
    }
  }
}
