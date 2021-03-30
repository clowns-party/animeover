import { AnimeListService } from "./animelistService";
import { Route, Get, Controller, Security, Header, Request } from "tsoa";

@Route("/animelist")
export class AnimeListController extends Controller {
  @Security("api_key")
  @Get("/")
  public async userAnimelist(
    @Header("Authorization")
    token?: string,
    @Request() request?: any
  ): Promise<any> {
    try {
      const animelist = await new AnimeListService(token, request).getAll();
      this.setStatus(200);
      return animelist;
    } catch (error) {
      this.setStatus(401);
      return error;
    }
  }
}
