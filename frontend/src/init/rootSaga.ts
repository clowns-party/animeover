// Core
import { all } from "redux-saga/effects";

// Watchers
import { watchAuthForm } from "../components/authForm/saga/watchAuthForm";

export function* rootSaga(): Generator {
  yield all([watchAuthForm()]);
}
