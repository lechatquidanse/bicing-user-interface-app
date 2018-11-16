import { all, put, takeLatest, race } from 'redux-saga/effects';

import { fetchMapSuccess } from 'application/state/flow/map/actions';
import * as Types from 'application/state/flow/map/types';

import { fetchListStart as stationFetchListStart } from 'application/state/query/stations/actions';
import * as StationsTypes from 'application/state/query/stations/types';

import { fetchListStart as lastAvailabilitiesFetchListStart } from 'application/state/query/lastAvailabilities/actions';
import * as LastAvailabilitiesTypes from 'application/state/query/lastAvailabilities/types';

export function* initFetch() {
  try {
    yield all([
      put(stationFetchListStart()),
      put(lastAvailabilitiesFetchListStart()),
    ]);
  } catch (e) {
    console.log('INIT FETCHED LALAL ERROR operations.js', e);
  }
}

// export function* stationDataFailure(action) {
//   console.log(action);
//   // yield put(fetchMapFailure())
// }

export function* dataFetched(action) {
  try {
    yield put(fetchMapSuccess());
  } catch (e) {
    console.log('DATA FETCHED LALAL ERROR operations.js', e);
  }
}

export default function* operation() {
  yield takeLatest(Types.FETCH_MAP.START, initFetch);
  // yield takeLatest(StationsTypes.FETCH_LIST.FAILURE, stationDataFailure);
  yield race({
    stationsSuccess: takeLatest(StationsTypes.FETCH_LIST.SUCCESS, dataFetched),
    lastAvailabilities: takeLatest(LastAvailabilitiesTypes.FETCH_LIST.SUCCESS, dataFetched),
  });
}
