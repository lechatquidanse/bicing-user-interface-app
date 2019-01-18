import { fetchFailure, fetchPending, fetchSuccess } from 'application/state/query/station/actions';
import StationProvider from 'application/state/query/station/provider/StationProvider';
import { FETCH } from 'application/state/query/station/types';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const { stationId } = action.payload;

    const station = yield call(StationProvider.provide, stationId);

    yield put(fetchSuccess(station));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
