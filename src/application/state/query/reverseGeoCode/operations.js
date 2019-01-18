import HttpReverseGeoCodeQuery from 'infrastructure/geoCodeApi';
import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/reverseGeoCode/actions';
import { FETCH } from 'application/state/query/reverseGeoCode/types';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const { latitude, longitude } = action.payload;

    const address = yield call(HttpReverseGeoCodeQuery.find, latitude, longitude);

    yield put(fetchSuccess(address));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
