// Core
import { all } from "redux-saga/effects";

// Watchers
import { watchAuth } from "../components/authForm/saga/watchAuth";

export function* rootSaga(): Generator {
  yield all([watchAuth()]);
}
