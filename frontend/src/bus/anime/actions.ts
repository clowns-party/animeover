import {
  getAnimeListType,
  GET_ANIME_LIST,
  setAnimeListType,
  SET_ANIME_LIST,
  AnimeList,
} from "./types";

export function getAnimeList(): getAnimeListType {
  return {
    type: GET_ANIME_LIST,
  };
}

export function setAnimeList(payload: AnimeList): setAnimeListType {
  return {
    type: SET_ANIME_LIST,
    payload,
  };
}
