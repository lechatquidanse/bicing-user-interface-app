import { all, put, takeLatest, select } from 'redux-saga/effects';

import { fetchMapSuccess } from './actions';
import * as Types from './types';

import { fetchListStart as stationFetchListStart } from '../../query/stations/actions';
import { stations as stationsSelector } from '../../query/stations/selectors';
import * as StationsTypes from '../../query/stations/types';

import { fetchListStart as lastAvailabilitiesFetchListStart } from '../../query/lastAvailabilities/actions';
import { lastAvailabilities as lastAvailabilitiesSelector } from '../../query/lastAvailabilities/selectors';
import * as LastAvailabilitiesTypes from '../../query/lastAvailabilities/types';

function* initFetch() {
  try {
    yield all([
      put(stationFetchListStart()),
      put(lastAvailabilitiesFetchListStart()),
    ]);
  } catch (e) {
    console.log('INIT FETCHED LALAL ERROR operations.js', e);
  }
}

function* dataFetched() {
  try {
    const [stations, lastAvailabilities] = yield all([
      select(stationsSelector),
      select(lastAvailabilitiesSelector),
    ]);

    yield put(fetchMapSuccess(stations, lastAvailabilities));
  } catch (e) {
    console.log('DATA FETCHED LALAL ERROR operations.js', e);
  }
}

export default function* operation() {
  yield takeLatest(Types.FETCH_MAP.START, initFetch);
  yield takeLatest(StationsTypes.FETCH_LIST.SUCCESS, dataFetched);
  yield takeLatest(LastAvailabilitiesTypes.FETCH_LIST.SUCCESS, dataFetched);
}
