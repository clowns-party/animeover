import { Route, Get, Controller } from "tsoa";
// Schemas
import { AnimeList } from "../animedb/animedb.schema";
// Service
import { OngoingService } from "./ongoingService";

@Route("/ongoing")
export class OngoingController extends Controller {
  @Get("/")
  public async getOngoing(): Promise<AnimeList> {
    try {
      const ongoing = await new OngoingService().getOngoing();
      this.setStatus(200);
      return ongoing;
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }
}
