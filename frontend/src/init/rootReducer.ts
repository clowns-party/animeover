// Core
import { combineReducers } from "redux";

// Reducers
import { AuthFormReducer as authForm } from "../components/authForm/reducer";
import { AuthReducer as auth } from "../components/bus/user/reducer";

export const rootReducer = combineReducers({
  authForm,
  auth
});

export type AppState = ReturnType<typeof rootReducer>;
