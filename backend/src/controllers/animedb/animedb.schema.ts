export type AnimeList = Array<AnimeItem>;

export interface AnimeItem {
  _id: string;
  sources: Array<string>;
  title: string;
  type: AnimeTypes;
  episodes: number;
  status: AnimeStatuses;
  animeSeason: {
    season: AnimeSeason;
    year: number;
  };
  picture: string;
  thumbnail: string;
  synonyms: Array<string>;
  relations: Array<string>;
  tags: Array<AnimeTags>;
}

export type AnimeTypes = "Special" | "Movie" | "OVA" | "ONA" | "TV" | "";
export type AnimeStatuses =
  | "FINISHED"
  | "UPCOMING"
  | "UNKNOWN"
  | "CURRENTLY"
  | "";
export type AnimeSeason =
  | "SUMMER"
  | "UNDEFINED"
  | "WINTER"
  | "SPRING"
  | "FALL"
  | "";
export type AnimeTags =
  | "alternative present"
  | "amnesia"
  | "anti-hero"
  | "asia"
  | "based on a manga"
  | "contemporary fantasy"
  | "cops"
  | "crime"
  | "criminals"
  | "demons"
  | "detective"
  | "detectives"
  | "drama"
  | "earth"
  | "espionage"
  | "gods"
  | "japan"
  | "male protagonist"
  | "manga"
  | "mind games"
  | "mystery"
  | "overpowered main characters"
  | "philosophy"
  | "plot continuity"
  | "police"
  | "present"
  | "primarily adult cast"
  | "primarily male cast"
  | "psychological"
  | "psychopaths"
  | "revenge"
  | "rivalries"
  | "secret identity"
  | "serial killers"
  | "shinigami"
  | "shounen"
  | "supernatural"
  | "thriller"
  | "time skip"
  | "tragedy"
  | "urban"
  | "urban fantasy"
  | "vigilantes"
  | "work";

export const animetypes = ["Special", "Movie", "OVA", "ONA", "TV"];
export const animeStatuses = ["FINISHED", "UPCOMING", "UNKNOWN", "CURRENTLY"];
export const animeSeasons = ["SUMMER", "UNDEFINED", "WINTER", "SPRING", "FALL"];
export const animeTags = [
  "alternative present",
  "amnesia",
  "anti-hero",
  "asia",
  "based on a manga",
  "contemporary fantasy",
  "cops",
  "crime",
  "criminals",
  "demons",
  "detective",
  "detectives",
  "drama",
  "earth",
  "espionage",
  "gods",
  "japan",
  "male protagonist",
  "manga",
  "mind games",
  "mystery",
  "overpowered main characters",
  "philosophy",
  "plot continuity",
  "police",
  "present",
  "primarily adult cast",
  "primarily male cast",
  "psychological",
  "psychopaths",
  "revenge",
  "rivalries",
  "secret identity",
  "serial killers",
  "shinigami",
  "shounen",
  "supernatural",
  "thriller",
  "time skip",
  "tragedy",
  "urban",
  "urban fantasy",
  "vigilantes",
  "work",
];

export const animebanTags = ["hentai"];
