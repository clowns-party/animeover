import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { service } from "../../../Services";
import {
  setAnimeList,
  setErrorAnimeList,
  startAnimeList,
  stopAnimeList,
} from "../actions";

export function* animeWorker(): SagaIterator {
  yield put(startAnimeList());
  try {
    const result = yield call(service.animeList);
    yield put(setAnimeList(result.data));
  } catch (err) {
    yield put(setErrorAnimeList(err?.response?.data));
  } finally {
    yield put(stopAnimeList());
  }
}
