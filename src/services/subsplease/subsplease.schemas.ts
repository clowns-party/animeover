import { AnimeItem } from "./../../controllers/animedb/animedb.schema";

export type JikanScheduleAnimeItem = {
  mal_id: number;
  url: string;
  title: string;
  image_url: string;
  synopsis: string;
  type: string;
  airing_start: string;
  episodes: number;
  members: number;
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];

  source: string;
  producers: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  score: number;
  licensors: any[];
  r18: number;
  kids: number;
};
export interface JikanScheduleDatesItem {
  monday: JikanScheduleAnimeItem[];
  tuesday: JikanScheduleAnimeItem[];
  wednesday: JikanScheduleAnimeItem[];
  thursday: JikanScheduleAnimeItem[];
  friday: JikanScheduleAnimeItem[];
  saturday: JikanScheduleAnimeItem[];
  sunday: JikanScheduleAnimeItem[];
}

export type JikanScheduleBodyResponse = {
  request_hash: string;
  request_cached: boolean;
  request_cache_expiry: number;
};

export type JikanScheduleResponse = {
  [key in keyof JikanScheduleDatesItem]: JikanScheduleAnimeItem[];
};

export type JikanScheduleMultipleResponse = JikanScheduleResponse[];

export type ScheduleSubspleaseResponse = {
  tz: "Europe/Moscow";
  schedule: ScheduleDateItems;
};
export type ScheduleAnimeItem = {
  image_url: string;
  page: string;
  time: string;
  title: string;
};
export type ScheduleDateItems = {
  Friday: ScheduleAnimeItem;
  Monday: ScheduleAnimeItem;
  Saturday: ScheduleAnimeItem;
  Sunday: ScheduleAnimeItem;
  Thursday: ScheduleAnimeItem;
  Tuesday: ScheduleAnimeItem;
  Wednesday: ScheduleAnimeItem;
};

export interface AnimeItemExtended extends AnimeItem {
  date: string;
}

export type ScheduleAnimeItemFormatted = AnimeItemExtended[];

export type ScheduleDateItemsFormatted = {
  Friday: ScheduleAnimeItemFormatted;
  Monday: ScheduleAnimeItemFormatted;
  Saturday: ScheduleAnimeItemFormatted;
  Sunday: ScheduleAnimeItemFormatted;
  Thursday: ScheduleAnimeItemFormatted;
  Tuesday: ScheduleAnimeItemFormatted;
  Wednesday: ScheduleAnimeItemFormatted;
};

export type ScheduleSubspleaseType = {
  tz: "Europe/Moscow";
  schedule: ScheduleDateItemsFormatted;
};

export type CollectionDateSchedule = {
  nextUpdate: string;
  updateIn: string;
};

export type CollectionDataSchedule = ScheduleDateItemsFormatted;
