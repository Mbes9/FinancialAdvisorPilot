import { all, fork } from "redux-saga/effects";
import risksSaga from "./risks_saga";

export default function* rootSaga() {
  yield all([fork(risksSaga)]);
}
