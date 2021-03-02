import {
  ErrorHttpAction,
  AUTH_SET_FETCHING_ERROR,
  AUTH_FETCH_ASYNC,
  AUTH_START_FETCHING,
  AUTH_STOP_FETCHING,
  AuthFormActionTypes,
  AuthFormData,
} from "./types";

export type AuthFormState = {
  formData?: AuthFormData;
  isFetching: boolean;
  error: ErrorHttpAction | false;
};

const initialState: AuthFormState = {
  formData: {
    email: "",
    password: "",
    repassword: "",
  },
  isFetching: false,
  error: false,
};

export const AuthFormReducer = (
  state = initialState,
  action: AuthFormActionTypes
): AuthFormState => {
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
      };
    case AUTH_SET_FETCHING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AUTH_FETCH_ASYNC:
      return {
        ...state,
      };
    default:
      // проверяем используются ли все экшены
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
