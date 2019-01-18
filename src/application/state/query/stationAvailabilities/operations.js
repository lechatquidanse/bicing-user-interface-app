import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/stationAvailabilities/actions';
import { FETCH } from 'application/state/query/stationAvailabilities/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import StationAvailabilitiesProvider from 'application/state/query/stationAvailabilities/provider/StationAvailabilitiesProvider';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const {
      stationId, periodStart, periodEnd, interval,
    } = action.payload;

    const stationAvailabilities = yield call(
      StationAvailabilitiesProvider.provide,
      stationId,
      periodStart,
      periodEnd,
      interval,
    );

    yield put(fetchSuccess(stationAvailabilities));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
