// Core
import { SagaIterator } from "redux-saga";
import { all, call, takeEvery } from "redux-saga/effects";

import { SIGN_IN_ASYNC } from "../types";
import { authWorker } from "./workers/authWorker";

function* watchFetchAuth(): SagaIterator {
  yield takeEvery(SIGN_IN_ASYNC, authWorker);
}

export function* watchAuth(): SagaIterator {
  yield all([call(watchFetchAuth)]);
}
