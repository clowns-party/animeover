import { SagaIterator } from "redux-saga";
import { takeEvery, all, call } from "redux-saga/effects";
import { animeWorker } from "./animeWorker";
import { GET_ANIME_LIST } from "../types";

function* watchFetchAnime(): SagaIterator {
  yield takeEvery(GET_ANIME_LIST, animeWorker);
}

export function* watchAnime(): SagaIterator {
  yield all([call(watchFetchAnime)]);
}
