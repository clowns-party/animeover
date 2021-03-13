// Core
import { all } from "redux-saga/effects";
import { watchAnime } from "../bus/anime/saga/watchAnime";

// Watchers
import { watchAuth } from "../bus/auth/saga/watcherAuth";
import { watchRegistration } from "../bus/auth/saga/watcherRegistration";

export function* rootSaga(): Generator {
  yield all([watchAuth(), watchRegistration(), watchAnime()]);
}
