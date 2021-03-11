import {
  AuthActionTypes,
  User,
  AUTH_SET,
  SIGN_IN_ASYNC,
  SIGN_UP_ASYNC,
  AUTH_START_FETCHING,
  AUTH_STOP_FETCHING,
  AUTH_SET_FETCHING_ERROR,
  ErrorHttpAction,
} from "./types";

export type AuthState = {
  data: User | null;
  isFetching: boolean;
  error: ErrorHttpAction | false;
};

const initialState: AuthState = {
  data: null,
  isFetching: false,
  error: false,
};

export const AuthReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AUTH_SET:
      return {
        ...state,
        data: {
          ...action.payload,
        },
      };
    case SIGN_IN_ASYNC:
      return {
        ...state,
      };
    case AUTH_START_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case AUTH_STOP_FETCHING:
      return {
        ...state,
        isFetching: false,
      };
    case AUTH_SET_FETCHING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SIGN_UP_ASYNC:
      return {
        ...state,
      };

    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
