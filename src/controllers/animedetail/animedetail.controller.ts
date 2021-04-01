import { AnimeDetailService } from "./animedetailService";
import { Route, Get, Controller, Path } from "tsoa";
// Schemas
import { AnimeDetailList } from "./animedetail.schema";

@Route("/animedetail")
export class AnimedetailController extends Controller {
  @Get("/{animeId}")
  public async getOneDetail(@Path() animeId: string): Promise<AnimeDetailList> {
    try {
      const doc = await new AnimeDetailService().getOne(animeId);
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
}
