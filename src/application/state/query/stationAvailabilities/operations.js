import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/stationAvailabilities/actions';
import { FETCH } from 'application/state/query/stationAvailabilities/types';
import HttpStationAvailabilityQuery from 'infrastructure/bicingApi/HttpStationAvailabilityQuery';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  yield put(fetchPending());

  const { stationId, byIntervalInPeriodFilter } = action.payload;
  // @todo add check stationID and byFilter
  try {
    const stationAvailabilities = yield call(
      HttpStationAvailabilityQuery.find,
      stationId,
      byIntervalInPeriodFilter,
    );
    yield put(fetchSuccess(stationAvailabilities));
  } catch (e) {
    yield put(fetchFailure(e));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
