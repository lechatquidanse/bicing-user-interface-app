import { fetchFailure, fetchPending, fetchSuccess } from 'application/state/query/station/actions';
import { FETCH } from 'application/state/query/station/types';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  yield put(fetchPending());

  const { stationId } = action.payload;
  // @todo add check stationId
  try {
    const station = yield call(HttpStationQuery.find, stationId);

    yield put(fetchSuccess(station));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
