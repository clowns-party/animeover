import {
  ErrorHttpAction,
  User,
  AUTH_SET_FETCHING_ERROR,
  AUTH_FETCH_ASYNC,
  AUTH_SET,
  AUTH_START_FETCHING,
  AUTH_STOP_FETCHING,
  AuthActionTypes,
  AuthFormData
} from "./types";

export type AuthState = {
  data: User | null;
  formData: AuthFormData
  isFetching: boolean;
  error: false | ErrorHttpAction;
};

const initialState: AuthState = {
  data: null,
  formData: {
    email: '',
    password: '',
    repassword: ''
  },
  isFetching: false,
  error: false,
};

export const AuthReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
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
        error: false,
      };
    case AUTH_SET_FETCHING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AUTH_SET:
      return {
        ...state,
        data: {
          ...action.payload,
        },
        error: false,
      };
    case AUTH_FETCH_ASYNC:
      return {
        ...state
      }
    default:
      // проверяем используются ли все экшены
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};