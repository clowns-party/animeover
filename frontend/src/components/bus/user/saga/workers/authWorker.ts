import axios from "axios";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { setFetchingError, startFetching, stopFetching } from "../../../../authForm/action";
import { AuthFecthAsync } from "../../../../authForm/types";
import { set } from "../../actions";
import { User } from "../../types";

export function* authWorker(action: AuthFecthAsync): SagaIterator {
  const { payload } = action;
  const fetchAuth = () => {
    return axios.post<User>("https://animeover-api.herokuapp.com/auth", null, {
      params: {
        email: payload.email,
        password: payload.password,
      },
    });
  };

  try {
    yield put(startFetching());
    const result = yield call(fetchAuth);
    if (result?.data) {
      yield put(set(result.data));
    } else {
      yield put(
        setFetchingError({
          message: "unresolved",
          code: "500",
        })
      );
    }
  } catch (error) {
    yield put(setFetchingError(error));
  } finally {
    yield put(stopFetching());
  }
}
