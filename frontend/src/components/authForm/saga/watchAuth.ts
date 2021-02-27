  
// Core
import { SagaIterator } from "@redux-saga/core";
import { takeEvery, all, call } from "redux-saga/effects";
import { authWorker } from './workers/authWorker'
// Types
import { AUTH_FETCH_ASYNC } from "../types";

function* watchFetchAuth(): SagaIterator {
  yield takeEvery(AUTH_FETCH_ASYNC, authWorker);
}

export function* watchAuth(): SagaIterator {
  yield all([call(watchFetchAuth)]);
}

