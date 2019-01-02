import { FLOW } from 'application/state/flow/station/types';
import { actions as queryStationActions } from 'application/state/query/station';
import { actions as queryStationAvailabilitiesActions } from 'application/state/query/stationAvailabilities';
import { all, put, takeLatest } from 'redux-saga/effects';

export function* flow(action) {
  const {
    stationId, periodStart, periodEnd, interval,
  } = action.payload;

  yield all([
    put(queryStationActions.fetchStart(stationId)),
    put(queryStationAvailabilitiesActions.fetchStart(stationId, periodStart, periodEnd, interval)),
  ]);
}

export default function* operation() {
  yield takeLatest(FLOW.START, flow);
}
