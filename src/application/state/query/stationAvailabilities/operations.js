import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import {
  fetchFailure,
  fetchPending,
  fetchSuccess,
} from 'application/state/query/stationAvailabilities/actions';
import { FETCH } from 'application/state/query/stationAvailabilities/types';
import { stationAvailabilitiesType } from 'domain/types/stationAvailabilitiesType';
import { stationIdType } from 'domain/types/stationType';
import HttpStationAvailabilitiesQuery
  from 'infrastructure/bicingApi/HttpStationAvailabilitiesQuery';
import Joi from 'joi';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const {
      stationId, periodStart, periodEnd, interval,
    } = action.payload;

    Joi.assert(stationId, stationIdType);

    const stationAvailabilities = yield call(
      HttpStationAvailabilitiesQuery.find,
      stationId,
      ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval),
    );

    Joi.assert(stationAvailabilities, stationAvailabilitiesType);

    yield put(fetchSuccess(stationAvailabilities));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
