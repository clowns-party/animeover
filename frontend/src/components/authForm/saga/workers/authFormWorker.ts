import { SagaIterator } from "redux-saga";
import { put } from "redux-saga/effects";
import { AuthFecthAsync } from "../../types";
import { singInAsync } from "../../../bus/user/actions";

export function* authFormWorker(action: AuthFecthAsync): SagaIterator {
  yield put(singInAsync(action));
}
