import ByGeoLocationFilter from 'application/state/filter/ByGeoLocationFilter';
import { fetchFailure, fetchPending, fetchSuccess } from 'application/state/query/stations/actions';
import { FETCH } from 'application/state/query/stations/types';
import { stationsType } from 'domain/types/stationType';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';
import Joi from 'joi';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetch(action) {
  yield put(fetchPending());

  try {
    const { latitude, longitude, limit } = action.payload;

    const stations = yield call(
      HttpStationQuery.findAll,
      ByGeoLocationFilter.fromRawValues(latitude, longitude, limit),
    );

    Joi.assert(stations, stationsType);

    yield put(fetchSuccess(stations));
  } catch (exception) {
    yield put(fetchFailure(exception));
  }
}

export default function* operation() {
  yield takeLatest(FETCH.START, fetch);
}
