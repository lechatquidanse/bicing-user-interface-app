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
  const {
    meta: { itineraryAt, itineraryStep },
    payload: {
      periodStartAt, periodEndAt, interval, stationIds,
    },
  } = action;

  yield put(fetchPending(itineraryStep));

  try {
    const availabilities = yield call(availabilitiesProvider,
      itineraryAt,
      periodStartAt,
      periodEndAt,
      interval,
      stationIds);

    Joi.assert(availabilities, availabilitiesType);

    yield put(fetchSuccess(itineraryStep, availabilities));
  } catch (exception) {
    yield put(fetchFailure(itineraryStep, exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
