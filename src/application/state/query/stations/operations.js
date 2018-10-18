import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchListPending, fetchListSuccess, fetchListFailure } from 'application/state/query/stations/actions';
import * as Types from 'application/state/query/stations/types';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';

export function* list(action) {
  yield put(fetchListPending());

  try {
    const stations = yield call(HttpStationQuery.findAll);

    yield put(fetchListSuccess(stations));
  } catch (e) {
    yield put(fetchListFailure(e));
  }
}

export default function* operation() {
  yield takeLatest(Types.FETCH_LIST.START, list);
}
