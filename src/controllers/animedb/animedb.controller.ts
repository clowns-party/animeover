import { Route, Get, Controller, Query, Path, Example } from "tsoa";
import { CollectionDataSchedule } from "../../services/subsplease/subsplease.schemas";

// type
import { AnimeItem, AnimeList, animeTags, AnimeSeason } from "./animedb.schema";

// Service
import { AnimeDbService } from "./animedbService";

@Route("/animedb")
export class AnimeDbController extends Controller {
  service: AnimeDbService;
  constructor() {
    super();
    this.service = new AnimeDbService();
  }
  @Example({
    limit: "1",
    tags: '["comedy"]',
    season: "WINTER",
    page: "1",
  })
  @Get("/")
  public async getAll(
    @Query() limit?: number,
    @Query() tags?: string,
    @Query() season?: AnimeSeason,
    @Query() page?: number
  ): Promise<{ animeList: AnimeList; count: number }> {
    try {
      const { animeList: docs, count: animeCount } = await this.service.getAll(
        limit,
        tags,
        season,
        page
      );
      const count = await this.service.getCountAnimes();
      if (docs && docs.length) {
        this.setStatus(200);
        return { animeList: docs, count: animeCount || count };
      } else {
        this.setStatus(200);
        return { animeList: [], count: animeCount || count };
      }
    } catch (error) {
      this.setStatus(500);
      return error;
    }
  }

  @Get("/anime/{animeId}")
  public async getOne(@Path() animeId: string): Promise<AnimeItem> {
    try {
      const doc = await this.service.getOne(animeId);
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

  @Get("/schedule")
  public async getSchedule(): Promise<CollectionDataSchedule> {
    try {
      const list = await this.service.getSchedule();
      this.setStatus(200);
      return list;
    } catch (error) {
      this.setStatus(400);
      return error;
    }
  }
}
