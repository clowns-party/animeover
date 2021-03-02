import {
  ErrorHttpAction,
  AUTH_SET_FETCHING_ERROR,
  AUTH_FETCH_ASYNC,
  AUTH_START_FETCHING,
  AUTH_STOP_FETCHING,
  AuthFormActionTypes,
  AuthFormData,
  AuthSetError,
  AuthFecthAsync,
} from "./types";

// Sync
export function startFetching(): AuthFormActionTypes {
  return {
    type: AUTH_START_FETCHING,
  };
}

export function stopFetching(): AuthFormActionTypes {
  return {
    type: AUTH_STOP_FETCHING,
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
