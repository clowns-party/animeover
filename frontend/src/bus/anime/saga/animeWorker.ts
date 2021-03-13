import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { getAnime } from "../../../Services/api";
import { setAnimeList } from "../actions";

export function* animeWorker(): SagaIterator {
  const result = yield call(getAnime);
  yield put(setAnimeList(result.data));
}
