import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchListPending, fetchListSuccess, fetchListFailure } from 'application/state/query/lastAvailabilities/actions';
import * as Types from 'application/state/query/lastAvailabilities/types';
import HttpAvailabilityQuery from 'infrastructure/bicingApi/HttpAvailabilityQuery';

export function* list(action) {
  yield put(fetchListPending());

  try {
    const lastAvailabilities = yield call(HttpAvailabilityQuery.findAll);

    yield put(fetchListSuccess(lastAvailabilities));
  } catch (e) {
    yield put(fetchListFailure(e));
  }
}

export default function* operation() {
  yield takeLatest(Types.FETCH_LIST.START, list);
}
