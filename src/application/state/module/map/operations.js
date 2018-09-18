import { call, put, takeLatest } from "redux-saga/effects";

import { fetchStationListReceived } from "./actions";
import { FETCH_STATION_LIST_REQUESTED } from "./types";
import HttpStationQuery from "./../../../../infrastructure/bicingApi/HttpStationQuery";

function* getApiData(action) {
  try {
    const stations = yield call(HttpStationQuery.findAll);
    yield put(fetchStationListReceived(stations.data));
  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga() {
  yield takeLatest(FETCH_STATION_LIST_REQUESTED, getApiData);
}