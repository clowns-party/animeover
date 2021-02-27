import {
  ErrorHttpAction,
  User,
  AUTH_SET_FETCHING_ERROR,
  AUTH_FETCH_ASYNC,
  AUTH_SET,
  AUTH_START_FETCHING,
  AUTH_STOP_FETCHING,
  AuthActionTypes,
  AuthFormData,
  AuthSetError,
  AuthFecthAsync,
} from "./types";

// Sync
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

export function set(payload: User): AuthActionTypes {
  return {
    type: AUTH_SET,
    payload,
  };
}

export function setFetchingError(payload: ErrorHttpAction): AuthSetError {
  return {
    type: AUTH_SET_FETCHING_ERROR,
    payload,
  };
}

// Async
export function fetchAsync(payload: AuthFormData): AuthFecthAsync {
  return {
    type: AUTH_FETCH_ASYNC,
    payload,
  };
}
