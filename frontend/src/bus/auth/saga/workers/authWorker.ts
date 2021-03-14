import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import Cookies from "js-cookie";
import { push } from "connected-react-router";
import {
  set,
  setFetchingError,
  startFetching,
  stopFetching,
} from "../../actions";
import { signInAsyncType } from "../../types";
import { service } from "../../../../Services";

export function* authWorker(action: signInAsyncType): SagaIterator {
  try {
    yield put(startFetching());
    const result = yield call(service.auth, action.payload);
    if (result?.data) {
      yield put(set(result.data));
      // Пересмотри этот сеттер куки, будто иногда не отрабатывает
      Cookies.set("token", result.data.token, { expires: 7 });
      yield put(push("/home"));
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
