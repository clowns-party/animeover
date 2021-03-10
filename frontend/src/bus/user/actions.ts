import {
  setType,
  AuthActionTypes,
  SIGN_IN_ASYNC,
  User,
  AUTH_SET,
  AUTH_START_FETCHING,
  AUTH_STOP_FETCHING,
  AUTH_SET_FETCHING_ERROR,
  AuthFormData,
  ErrorHttpAction
} from "./types";

export function signInAsync(payload: AuthFormData): AuthActionTypes {
  return {
    type: SIGN_IN_ASYNC,
    payload,
  };
}

export function set(payload: User): setType {
  return {
    type: AUTH_SET,
    payload,
  };
}

export function startFetching(): AuthActionTypes {
  return {
    type: AUTH_START_FETCHING,
  };
}

export function stopFetching(): AuthActionTypes {
  return {
    type: AUTH_STOP_FETCHING,
  };
}

export function setFetchingError(payload: ErrorHttpAction): AuthActionTypes {
  return {
    type: AUTH_SET_FETCHING_ERROR,
    payload,
  };
}
