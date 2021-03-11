// core
import { SagaIterator } from "redux-saga";
import { all, call, takeEvery } from "redux-saga/effects";
// types
import { SIGN_UP_ASYNC } from "../types";
// worker
import { signUpWorker } from "./workers/registrationWorker";

function* watchFetchRegistration(): SagaIterator {
  yield takeEvery(SIGN_UP_ASYNC, signUpWorker);
}

export function* watchRegistration(): SagaIterator {
  yield all([call(watchFetchRegistration)]);
}
