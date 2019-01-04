import { actions as commandConfigureMapActions } from 'application/state/command/configureMap';
import { FLOW } from 'application/state/flow/map/types';
import { actions as queryAvailabilitiesActions } from 'application/state/query/availabilities';
import { actions as queryStationsActions } from 'application/state/query/stations';
import { all, put, takeLatest } from 'redux-saga/effects';

export function* flow(action) {
  const { latitude, longitude, limit } = action.payload;

  yield all([
    put(queryAvailabilitiesActions.fetchStart()),
    put(queryStationsActions.fetchStart(latitude, longitude, limit)),
    put(commandConfigureMapActions.configureStart(latitude, longitude, limit)),
  ]);
}

export default function* operation() {
  yield takeLatest(FLOW.START, flow);
}
