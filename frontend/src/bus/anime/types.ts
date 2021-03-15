export type AnimeList = Array<Anime>;
export type Anime = {
  _id: string;
  sources: Array<string>;
  title: string;
  type: string;
  episodes: number;
  status: string;
  animeSeason: {
    season: string;
    year: number;
  };
  picture: string;
  thumbnail: string;
  synonyms: Array<string>;
  relations: Array<string>;
  tags: Array<string>;
};

export type AnimeError = {
  message: string,
  code: number | string
}

export const GET_ANIME_LIST = "GET_ANIME_LIST";
export type getAnimeListType = {
  type: typeof GET_ANIME_LIST;
};

export const STOP_ANIME_LIST = "STOP_ANIME_LIST";
export type stopAnimeListType = {
  type: typeof STOP_ANIME_LIST;
};

export const SET_ERROR_ANIME_LIST = "SET_ERROR_ANIME_LIST";
export type setErrorAnimeListType = {
  type: typeof SET_ERROR_ANIME_LIST;
  payload: AnimeError
};

export const START_ANIME_LIST = "START_ANIME_LIST";
export type startAnimeListType = {
  type: typeof START_ANIME_LIST;
};

export const SET_ANIME_LIST = "SET_ANIME_LIST";
export type setAnimeListType = {
  type: typeof SET_ANIME_LIST;
  payload: AnimeList;
};

export type animeActionsTypes =
  | getAnimeListType
  | setAnimeListType
  | startAnimeListType
  | stopAnimeListType
  | setErrorAnimeListType;
