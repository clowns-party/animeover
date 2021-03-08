// Core
import { combineReducers } from "redux";

// Reducers
import { AuthReducer as auth } from "../bus/user/reducer";

export const rootReducer = combineReducers({
  auth
});

export type AppState = ReturnType<typeof rootReducer>;
