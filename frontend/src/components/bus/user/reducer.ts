import { AuthActionTypes, User, AUTH_SET, SING_IN_ASYNC } from "./types";

export type AuthState = {
  data: User | null;
};

const initialState: AuthState = {
  data: null,
};

export const AuthReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AUTH_SET:
      return {
        ...state,
        data: {
          ...action.payload,
        },
      };
    case SING_IN_ASYNC:
      return {
        ...state,
      };
    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
