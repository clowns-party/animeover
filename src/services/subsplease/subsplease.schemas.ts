import { AnimeItem } from "./../../controllers/animedb/animedb.schema";

interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

interface Images {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
}

interface Title {
  type: string;
  title: string;
}

interface Aired {
  from: string;
  to: string | null;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
  };
  string: string;
}

interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string | null;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string | null;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Producer[];
  licensors: string[];
  studios: Producer[];
  genres: Genre[];
  explicit_genres: string[];
  themes: string[];
  demographics: string[];
}

interface AnimeData {
  pagination: Pagination;
  data: Anime[];
}

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
  monday: Anime[];
  tuesday: Anime[];
  wednesday: Anime[];
  thursday: Anime[];
  friday: Anime[];
  saturday: Anime[];
  sunday: Anime[]
}


export type JikanScheduleMultipleResponse = AnimeData[];

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
