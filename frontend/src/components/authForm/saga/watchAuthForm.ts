// Core
import { SagaIterator } from "@redux-saga/core";
import { takeEvery, all, call } from "redux-saga/effects";
import { authFormWorker } from "./workers/authFormWorker";
// Types
import { AUTH_FETCH_ASYNC } from "../types";

function* watchFetchAuthForm(): SagaIterator {
  yield takeEvery(AUTH_FETCH_ASYNC, authFormWorker);
}

export function* watchAuthForm(): SagaIterator {
  yield all([call(watchFetchAuthForm)]);
}
