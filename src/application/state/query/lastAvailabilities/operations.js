import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchListSuccess } from 'application/state/query/lastAvailabilities/actions';
import * as Types from 'application/state/query/lastAvailabilities/types';
import HttpAvailabilityQuery from 'infrastructure/bicingApi/HttpAvailabilityQuery';

export function* list(action) {
  try {
    const response = yield call(HttpAvailabilityQuery.findAll);
    yield put(fetchListSuccess(response.data));

    // return response.data;
  } catch (e) {
    console.log('LALAL ERROR operations.js', e);
  }
}

export default function* operation() {
  yield takeLatest(Types.FETCH_LIST.START, list);
}
