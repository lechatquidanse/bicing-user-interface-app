import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchListSuccess } from './actions';
import * as Types from './types';
import HttpAvailabilityQuery from './../../../../infrastructure/bicingApi/HttpAvailabilityQuery';

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
