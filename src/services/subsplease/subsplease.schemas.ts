import { AnimeItem } from "./../../controllers/animedb/animedb.schema";
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
