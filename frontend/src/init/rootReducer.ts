// Core
import { combineReducers } from "redux";

// Reducers
import { AuthReducer as auth } from "../components/authForm/reducer";

export const rootReducer = combineReducers({
  auth,
});

export type AppState = ReturnType<typeof rootReducer>;
