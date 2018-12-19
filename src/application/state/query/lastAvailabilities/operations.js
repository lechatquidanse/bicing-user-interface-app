import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/lastAvailabilities/actions';
import { FETCH } from 'application/state/query/lastAvailabilities/types';
import HttpAvailabilityQuery from 'infrastructure/bicingApi/HttpAvailabilityQuery';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch() {
  yield put(fetchPending());

  try {
    const lastAvailabilities = yield call(HttpAvailabilityQuery.findAll);

    yield put(fetchSuccess(lastAvailabilities));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
