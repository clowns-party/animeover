// Core
import { all } from "redux-saga/effects";

// Watchers
import { watchAuthForm } from "../components/authForm/saga/watchAuthForm";
import { watchAuth } from "../components/bus/user/saga/watcherAuth";

export function* rootSaga(): Generator {
  yield all([watchAuthForm(), watchAuth()]);
}
