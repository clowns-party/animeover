import { Route, Get, Controller, Query } from "tsoa";
import { AnimeList } from "./../animedb/animedb.schema";
import { SearchService } from "./searchService";

// Service

@Route("/search")
export class SearchController extends Controller {
  @Get("/")
  public async searchByQuery(@Query() queryText: string): Promise<AnimeList> {
    try {
      const docs = await new SearchService().search(queryText);
      this.setStatus(200);
      return docs;
    } catch (error) {
      this.setStatus(500);
      return error;
    }
  }
}
