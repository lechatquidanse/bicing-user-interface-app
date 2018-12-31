import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/lastAvailabilities/actions';
import { FETCH } from 'application/state/query/lastAvailabilities/types';
import HttpAvailabilitiesQuery from 'infrastructure/bicingApi/HttpAvailabilitiesQuery';
import Joi from 'joi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { availabilitiesType } from 'domain/types/availabilityType';

export function* fetch() {
  yield put(fetchPending());

  try {
    const lastAvailabilities = yield call(HttpAvailabilitiesQuery.find);

    Joi.assert(lastAvailabilities, availabilitiesType);

    yield put(fetchSuccess(lastAvailabilities));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
