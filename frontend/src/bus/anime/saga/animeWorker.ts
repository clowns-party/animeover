import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { service } from "../../../Services";
import { setAnimeList } from "../actions";

export function* animeWorker(): SagaIterator {
  const result = yield call(service.animeList);
  yield put(setAnimeList(result.data));
}
