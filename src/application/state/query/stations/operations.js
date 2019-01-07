import ByGeoLocationFilter from 'application/state/filter/ByGeoLocationFilter';
import { fetchFailure, fetchPending, fetchSuccess } from 'application/state/query/stations/actions';
import { FETCH } from 'application/state/query/stations/types';
import { stationsType } from 'domain/types/stationType';
import HttpStationsQuery from 'infrastructure/bicingApi/HttpStationsQuery';
import Joi from 'joi';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  const {
    meta: { itineraryStep },
    payload: { latitude, longitude, limit },
  } = action;

  yield put(fetchPending(itineraryStep));

  try {
    const stations = yield call(
      HttpStationsQuery.find,
      ByGeoLocationFilter.fromRawValues(latitude, longitude, limit),
    );

    Joi.assert(stations, stationsType);

    yield put(fetchSuccess(itineraryStep, stations));
  } catch (exception) {
    yield put(fetchFailure(itineraryStep, exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
