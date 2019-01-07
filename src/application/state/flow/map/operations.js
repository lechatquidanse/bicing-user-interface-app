import { actions as commandConfigureMapActions } from 'application/state/command/configureMap';
import { FLOW } from 'application/state/flow/map/types';
import { actions as queryAvailabilitiesActions } from 'application/state/query/availabilities';
import { actions as queryStationsActions } from 'application/state/query/stations';
import { all, put, takeLatest } from 'redux-saga/effects';

export function * flow (action) {
  const {
    itineraryStep,
    itineraryAt,
    periodStartAt,
    periodEndAt,
    interval,
    stationIds,
    latitude,
    longitude,
    limit
  } = action.payload;

  yield all([
    put(queryAvailabilitiesActions.fetchStart(
      itineraryStep,
      itineraryAt,
      periodStartAt,
      periodEndAt,
      interval,
      stationIds
    )),
    put(queryStationsActions.fetchStart(itineraryStep, latitude, longitude, limit)),
    put(commandConfigureMapActions.configureStart(latitude, longitude, limit))
  ]);
}

export default function * operation () {
  yield takeLatest(FLOW.START, flow);
}
