import { AnimeDbService } from "./../animedb/animedbService";
import { AnimeListService } from "./animelistService";
import {
  Route,
  Get,
  Controller,
  Security,
  Header,
  Request,
  Query,
  Example,
  Patch,
  Delete,
} from "tsoa";
// Types
import {
  UserAnimeStatuses,
  UserAnimeStars,
  UserAnimeValues,
  UserAnime,
} from "./animelist.schema";

@Route("/user/animelist")
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
    status: "viewed",
    review: "awesome!",
    star: "1-10",
  })
  @Security("api_key")
  @Patch("/")
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
      const doc = await new AnimeDbService().getOne(animeId);
      if (doc) {
        const res = await new AnimeListService(token, request).setAnime(
          animeId,
          data
        );
        this.setStatus(200);
        return res;
      } else {
        this.setStatus(404);
      }
    } catch (error) {
      this.setStatus(401);
      return error;
    }
  }

  @Security("api_key")
  @Delete("/")
  public async deleteAnime(
    @Query() animeId: string,
    @Header("Authorization")
    token?: string,
    @Request() request?: any
  ) {
    try {
      const res = await new AnimeListService(token, request).deleteAnime(
        animeId
      );
      this.setStatus(200);
      return res;
    } catch (error) {
      this.setStatus(404);
      return error;
    }
  }
}
