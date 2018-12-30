import { fetchFailure, fetchPending, fetchSuccess } from 'application/state/query/station/actions';
import { FETCH } from 'application/state/query/station/types';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';
import Joi from 'joi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { stationType, stationIdType } from 'domain/types/stationType';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const { stationId } = action.payload;

    Joi.assert(stationId, stationIdType);

    const station = yield call(HttpStationQuery.find, stationId);

    Joi.assert(station, stationType);

    yield put(fetchSuccess(station));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
