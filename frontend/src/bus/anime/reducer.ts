import {
  GET_ANIME_LIST,
  animeActionsTypes,
  SET_ANIME_LIST,
  AnimeList,
  START_ANIME_LIST,
  STOP_ANIME_LIST,
  SET_ERROR_ANIME_LIST,
  AnimeError,
} from "./types";

export type AnimeState = {
  anime: AnimeList | null;
  isFetching: boolean;
  error: AnimeError | false;
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
    case START_ANIME_LIST:
      return {
        ...state,
        isFetching: true,
      };
    case STOP_ANIME_LIST:
      return {
        ...state,
        isFetching: false,
      };
    case SET_ERROR_ANIME_LIST:
      return {
        ...state,
        error: action.payload,
      };

    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
