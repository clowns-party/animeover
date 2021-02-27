export interface UserSchema {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: null | string;
  isAnonymous: boolean;
  tenantId: null | string;
}

export type User = {
  token: string;
  user: UserSchema;
};

export type AuthFormData = {
  email: string;
  password: string;
  repassword: string;
};

export type ErrorHttpAction = {
  message: string;
  code: string;
};
// Sync
export const AUTH_START_FETCHING = "AUTH_START_FETCHING";
type AuthStartFechingAction = {
  type: typeof AUTH_START_FETCHING;
};

export const AUTH_STOP_FETCHING = "AUTH_STOP_FETCHING";
type AuthStopFechingAction = {
  type: typeof AUTH_STOP_FETCHING;
};

export const AUTH_SET = "AUTH_SET";
export type AuthSetAction = {
  type: typeof AUTH_SET;
  payload: User;
};

export const AUTH_SET_FETCHING_ERROR = "AUTH_SET_FETCHING_ERROR";
export type AuthSetError = {
  type: typeof AUTH_SET_FETCHING_ERROR;
  error: true;
  payload: ErrorHttpAction;
};

// Async

export const AUTH_FETCH_ASYNC = "AUTH_FETCH_ASYNC";
export type AuthFecthAsync = {
  type: typeof AUTH_FETCH_ASYNC;
  payload: AuthFormData;
};

export type AuthActionTypes =
  | AuthStartFechingAction
  | AuthStopFechingAction
  | AuthFecthAsync
  | AuthSetError
  | AuthSetAction;
