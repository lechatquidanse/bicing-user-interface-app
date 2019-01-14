import { actions as commandConfigureMapActions } from 'application/state/command/configureMap';
import { FLOW } from 'application/state/flow/map/types';
import { actions as queryAvailabilitiesActions } from 'application/state/query/availabilities';
import {
  actions as queryStationsActions,
  selectors as queryStationsSelectors,
} from 'application/state/query/stations';
import STATIONS_FETCH from 'application/state/query/stations/types';
import {
  all, put, select, take, takeLatest,
} from 'redux-saga/effects';

export function* flow(action) {
  const {
    itineraryStep,
    itineraryAt,
    periodStartAt,
    periodEndAt,
    interval,
    latitude,
    longitude,
    limit,
  } = action.payload;

  yield put(queryStationsActions.fetchStart(itineraryStep, latitude, longitude, limit));
  yield take(STATIONS_FETCH.SUCCESS);

  const stationIds = yield select(queryStationsSelectors.stationIdsByItineraryStep(itineraryStep));

  yield all([
    put(queryAvailabilitiesActions.fetchStart(
      itineraryStep,
      itineraryAt,
      periodStartAt,
      periodEndAt,
      interval,
      stationIds,
    )),
    put(commandConfigureMapActions.configureStart(latitude, longitude, limit)),
  ]);
}

export default function* operation() {
  yield takeLatest(FLOW.START, flow);
}
