import { AnimeListService } from "./animelistService";
import {
  Route,
  Get,
  Controller,
  Security,
  Header,
  Request,
  Post,
  Query,
  Example,
  Patch,
} from "tsoa";
// Types
import {
  UserAnimeStatuses,
  UserAnimeStars,
  UserAnimeValues,
  UserAnime,
} from "./animelist.schema";

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

  @Example({
    animeId: "animeid not be check of exist!",
    data: '{"review": "test","status":"view","star":"8"}',
  })
  @Security("api_key")
  @Patch("/setanime")
  public async setAnime(
    @Query() animeId: string,
    @Query() status: UserAnimeStatuses,
    @Query() review?: string,
    @Query() star?: UserAnimeStars,
    @Header("Authorization")
    token?: string,
    @Request() request?: any
  ): Promise<UserAnime> {
    try {
      const data: UserAnimeValues = {
        status,
        review: review ?? "",
        star: star ?? "0",
      };

      const res = await new AnimeListService(token, request).setAnime(
        animeId,
        data
      );
      this.setStatus(200);
      return res;
    } catch (error) {
      this.setStatus(401);
      return error;
    }
  }
}
