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
} from "tsoa";

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
  @Post("/setanime")
  public async setAnime(
    @Query() animeId: string,
    @Query() data: string,
    @Header("Authorization")
    token?: string,
    @Request() request?: any
  ): Promise<any> {
    try {
      const res = await new AnimeListService(token, request).setAnime(
        animeId,
        JSON.parse(data)
      );
      this.setStatus(201);
      return res;
    } catch (error) {
      this.setStatus(401);
      return error;
    }
  }
}
