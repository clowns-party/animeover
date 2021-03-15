import { Route, Get, Controller, Query, Path } from "tsoa";

// type
import { AnimeItem, AnimeList, animeTags } from "./animedb.schema";

// Service
import { AnimeDbService } from "./animedbService";

@Route("/animedb")
export class AnimeDbController extends Controller {
  @Get("/")
  public async getAll(@Query() limit?: number): Promise<AnimeList> {
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

  @Get("/anime/{animeId}")
  public async getOne(@Path() animeId: string): Promise<AnimeItem> {
    try {
      const doc = await new AnimeDbService().getOne(animeId);
      if (doc) {
        this.setStatus(200);
        return doc;
      } else {
        this.setStatus(404);
      }
    } catch (error) {
      this.setStatus(404);
      return error;
    }
  }

  @Get("/tags")
  public async getAnimeTags(): Promise<string[]> {
    try {
      if (animeTags) {
        this.setStatus(200);
        return animeTags;
      } else {
        this.setStatus(404);
      }
    } catch (error) {
      this.setStatus(404);
      return error;
    }
  }
}
