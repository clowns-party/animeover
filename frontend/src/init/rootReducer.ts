// Core
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

// Reducers
import { AuthReducer as auth } from "../bus/auth/reducer";
import { animeReducer } from "../bus/anime/reducer";
// History
import history from "./history";

const reducers = (historyCreated: any) =>
  combineReducers({
    router: connectRouter(historyCreated),
    auth,
    animeReducer,
  });

export const rootReducer = reducers(history);

export type AppState = ReturnType<typeof rootReducer>;
