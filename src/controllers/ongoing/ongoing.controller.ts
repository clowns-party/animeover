import { Route, Get, Controller, Path } from "tsoa";
// Schemas
import { AnimeList } from "../animedb/animedb.schema";
// Service
import { OngoingService } from "./ongoingService";

@Route("/ongoing")
export class OngoingController extends Controller {
  service: OngoingService;
  constructor() {
    super();
    this.service = new OngoingService();
  }
  @Get("/")
  public async getOngoing(): Promise<AnimeList> {
    try {
      const ongoing = await this.service.getOngoing();
      this.setStatus(200);
      return ongoing;
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }
  @Get("{ongoingId}")
  public async getOneDetail(@Path() ongoingId: string) {
    try {
      const ongoing = await this.service.getOngoingById(ongoingId);
      this.setStatus(200);
      return ongoing;
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }
}
