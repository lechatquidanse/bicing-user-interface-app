import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchPending, fetchSuccess, fetchFailure } from 'application/state/query/station/actions';
import * as Types from 'application/state/query/station/types';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const station = yield call(HttpStationQuery.find, action.payload.stationId);

    yield put(fetchSuccess(station));
  } catch (e) {
    yield put(fetchFailure(e));
  }
}

export default function* operation() {
  yield takeLatest(Types.FETCH.START, fetch);
}
