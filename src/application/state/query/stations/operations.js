import { fetchFailure, fetchPending, fetchSuccess } from 'application/state/query/stations/actions';
import { FETCH } from 'application/state/query/stations/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import StationsProvider from './provider/StationsProvider';

export function* fetch(action) {
  const {
    meta: { itineraryStep },
    payload: { latitude, longitude, limit },
  } = action;

  yield put(fetchPending(itineraryStep));

  try {
    const stations = yield call(StationsProvider.provide, latitude, longitude, limit);

    yield put(fetchSuccess(itineraryStep, stations));
  } catch (exception) {
    yield put(fetchFailure(itineraryStep, exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
