// Core
import { all } from "redux-saga/effects";

// Watchers
import { watchAuth } from "../bus/user/saga/watcherAuth";

export function* rootSaga(): Generator {
  yield all([watchAuth()]);
}
