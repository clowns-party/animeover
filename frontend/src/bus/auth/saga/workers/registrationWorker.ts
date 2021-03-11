import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  startFetching,
  stopFetching,
  setFetchingError,
  set,
} from "../../actions";
import { signUpAsyncType } from "../../types";
import { sendSignUpData } from "../../../../Services/api";

export function* signUpWorker(action: signUpAsyncType): SagaIterator {
  const { payload } = action;
  try {
    yield put(startFetching());
    const result = yield call(sendSignUpData, payload);
    if (result?.data) {
      // yield put(set({ user: result.data, token: '' }));
      yield put(push("/signIn"));
    } else {
      yield put(
        setFetchingError({
          message: "unresolved",
          code: "500",
        })
      );
    }
  } catch (error) {
    yield put(setFetchingError(error?.response?.data ?? "Some error"));
  } finally {
    yield put(stopFetching());
  }
}
