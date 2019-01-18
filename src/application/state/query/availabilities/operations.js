import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/availabilities/actions';
import AvailabilitiesProvider
  from 'application/state/query/availabilities/provider/AvailabilitiesProvider';
import { FETCH } from 'application/state/query/availabilities/types';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  const {
    meta: { itineraryStep },
    payload: {
      itineraryAt, periodStartAt, periodEndAt, interval, stationIds,
    },
  } = action;

  yield put(fetchPending(itineraryStep));

  try {
    const availabilities = yield call(AvailabilitiesProvider.provide,
      itineraryAt,
      periodStartAt,
      periodEndAt,
      interval,
      stationIds);

    yield put(fetchSuccess(itineraryStep, availabilities));
  } catch (exception) {
    yield put(fetchFailure(itineraryStep, exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
