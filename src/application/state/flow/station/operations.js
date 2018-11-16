import { all, put, takeLatest, race } from 'redux-saga/effects';

import { fetchStationSuccess } from 'application/state/flow/station/actions';
import * as Types from 'application/state/flow/station/types';

import { fetchStart as stationFetchStart } from 'application/state/query/station/actions';
import * as StationTypes from 'application/state/query/station/types';

import { fetchStart as stationAvailabilitiesFetchStart } from 'application/state/query/stationAvailabilities/actions';
import * as stationAvailabilitiesTypes from 'application/state/query/stationAvailabilities/types';

export function* initFetch(action) {
  try {
    const stationId = action.payload.stationId;

    yield all([
      put(stationFetchStart(stationId)),
      put(stationAvailabilitiesFetchStart(stationId)),
    ]);
  } catch (e) {
    console.log('INIT FETCHED LALAL ERROR operations.js', e);
  }
}
export function* dataFetched(action) {
  try {
    yield put(fetchStationSuccess());
  } catch (e) {
    console.log('DATA FETCHED LALAL ERROR operations.js', e);
  }
}

export default function* operation() {
  yield takeLatest(Types.FETCH_STATION.START, initFetch);
  yield race({
    station: takeLatest(StationTypes.FETCH.SUCCESS, dataFetched),
    stationAvailabilities: takeLatest(stationAvailabilitiesTypes.FETCH.SUCCESS, dataFetched),
  });
}
