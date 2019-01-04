import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/availabilities/actions';
import availabilitiesProvider
  from 'application/state/query/availabilities/provider/availabilitiesProvider';
import { FETCH } from 'application/state/query/availabilities/types';
import { availabilitiesType } from 'domain/types/availabilityType';
import Joi from 'joi';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const {
      periodStart, periodEnd, interval, stationIds,
    } = action;

    const availabilities = yield call(availabilitiesProvider,
      periodStart,
      periodEnd,
      interval,
      stationIds);

    Joi.assert(availabilities, availabilitiesType);

    yield put(fetchSuccess(availabilities));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
