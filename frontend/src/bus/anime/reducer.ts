import {
  GET_ANIME_LIST,
  animeActionsTypes,
  SET_ANIME_LIST,
  AnimeList,
} from "./types";

export type AnimeState = {
  anime: AnimeList | null;
  isFetching: boolean;
  error: boolean;
};

const initialState: AnimeState = {
  anime: null,
  isFetching: false,
  error: false,
};

export const animeReducer = (
  state = initialState,
  action: animeActionsTypes
): AnimeState => {
  switch (action.type) {
    case GET_ANIME_LIST:
      return {
        ...state,
      };
    case SET_ANIME_LIST:
      return {
        ...state,
        anime: [...action.payload],
      };

    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
