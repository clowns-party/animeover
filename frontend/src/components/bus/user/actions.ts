import { AuthFecthAsync } from "../../authForm/types";
import { setType, singInAsyncType, SING_IN_ASYNC, User, AUTH_SET } from "./types";

export function singInAsync(payload: AuthFecthAsync): singInAsyncType {
  return {
    type: SING_IN_ASYNC,
    payload,
  };
}

export function set(payload: User): setType {
  return {
    type: AUTH_SET,
    payload
  };
}
