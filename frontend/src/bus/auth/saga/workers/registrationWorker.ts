import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { push } from "connected-react-router";
import { startFetching, stopFetching, setFetchingError } from "../../actions";
import { signUpAsyncType } from "../../types";
import { service } from "../../../../Services";

export function* signUpWorker(action: signUpAsyncType): SagaIterator {
  const { payload } = action;
  try {
    yield put(startFetching());
    const result = yield call(service.signUp, payload);
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
