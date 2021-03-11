// Core
import { connectRouter } from "connected-react-router";
import { BrowserHistory, State } from 'history';

import { combineReducers } from "redux";

// Reducers
import { AuthReducer as auth } from "../bus/auth/reducer";
// History
import history from './history';

const reducers = (historyCreated: BrowserHistory<State>) =>
  combineReducers({
    router: connectRouter(historyCreated),
    auth,
  });

export const rootReducer = reducers(history);

export type AppState = ReturnType<typeof rootReducer>;
