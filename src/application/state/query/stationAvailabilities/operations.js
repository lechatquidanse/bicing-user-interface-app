import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchPending, fetchSuccess, fetchFailure } from 'application/state/query/stationAvailabilities/actions';
import * as Types from 'application/state/query/stationAvailabilities/types';
import HttpStationAvailabilityQuery from 'infrastructure/bicingApi/HttpStationAvailabilityQuery';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const stationAvailabilities = yield call(HttpStationAvailabilityQuery.find, action.payload.stationId);

    yield put(fetchSuccess(stationAvailabilities));
  } catch (e) {
    yield put(fetchFailure(e));
  }
}

export default function* operation() {
  yield takeLatest(Types.FETCH.START, fetch);
}
