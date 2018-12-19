import { fetchFailure, fetchPending, fetchSuccess } from 'application/state/query/stations/actions';
import { FETCH } from 'application/state/query/stations/types';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  yield put(fetchPending());
  const { byGeoLocationFilter } = action.payload;

  try {
    const stations = yield call(HttpStationQuery.findAll, byGeoLocationFilter);

    yield put(fetchSuccess(stations));
  } catch (e) {
    yield put(fetchFailure(e));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
