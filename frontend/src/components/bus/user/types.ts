import { AuthFormData } from "../../authForm/types";

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

export const SING_IN_ASYNC = "SING_IN_ASYNC";
export type singInAsyncType = {
  type: typeof SING_IN_ASYNC;
  payload: AuthFormData;
};

export type AuthActionTypes = singInAsyncType | setType;
