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

export const AUTH_SET = "AUTH_SET";
export type setType = {
  type: typeof AUTH_SET;
  payload: User;
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

export const AUTH_SET_FETCHING_ERROR = "AUTH_SET_FETCHING_ERROR";
export type AuthSetError = {
  type: typeof AUTH_SET_FETCHING_ERROR;
  payload: ErrorHttpAction;
};

// Async

export const SIGN_IN_ASYNC = "SIGN_IN_ASYNC";
export type signInAsyncType = {
  type: typeof SIGN_IN_ASYNC;
  payload: AuthFormData;
};

export const INIT_AUTH_ASYNC = "INIT_AUTH_ASYNC";
export type initAuthAsync = {
  type: typeof INIT_AUTH_ASYNC
}

export type AuthActionTypes = signInAsyncType | setType |
  AuthStartFechingAction
  | AuthStopFechingAction
  | AuthSetError;
