import { AuthFecthAsync } from "../../authForm/types";
import {
  setType,
  singInAsyncType,
  SING_IN_ASYNC,
  User,
  AUTH_SET,
} from "./types";

export function singInAsync(action: AuthFecthAsync): singInAsyncType {
  const { payload } = action;
  return {
    type: SING_IN_ASYNC,
    payload,
  };
}

export function set(payload: User): setType {
  return {
    type: AUTH_SET,
    payload,
  };
}
