import {
  actions as commandStoreItineraryAtActions,
  selectors as commandStoreItineraryAtSelectors,
  types as commandStoreItineraryAtTypes,
} from 'application/state/command/storeItineraryAt';
import {
  actions as commandStoreItineraryGeoLocationActions,
  selectors as commandStoreItineraryGeoLocationSelectors,
  types as commandStoreItineraryGeoLocationTypes,
} from 'application/state/command/storeItineraryGeoLocation';
import {
  actions as commandStoreItineraryStepActiveActions,
  selectors as commandStoreItineraryStepActiveSelectors,
} from 'application/state/command/storeItineraryStepActive';
import { FLOW } from 'application/state/flow/map/types';
import { actions as queryAvailabilitiesActions } from 'application/state/query/availabilities';
import { actions as queryGeoSuggestionsActions } from 'application/state/query/geoSuggestions';
import {
  actions as queryStationsActions,
  selectors as queryStationsSelectors,
  types as queryStationTypes,
} from 'application/state/query/stations';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LIMIT,
  DEFAULT_LONGITUDE,
} from 'domain/definitions/configurationMapDefinition';
import moment from 'moment';
import {
  call, all, fork, put, select, takeLatest,
} from 'redux-saga/effects';

export function* queryAvailabilities() {
  const itineraryStep = yield select(commandStoreItineraryStepActiveSelectors.itineraryStep);

  const [itineraryAt, periodStartAt, periodEndAt, interval, stationIds] = yield all([
    select(commandStoreItineraryAtSelectors.itineraryAt),
    select(commandStoreItineraryAtSelectors.periodStartAt),
    select(commandStoreItineraryAtSelectors.periodEndAt),
    select(commandStoreItineraryAtSelectors.interval),
    select(queryStationsSelectors.stationIdsByItineraryStep(itineraryStep)),
  ]);

  yield put(queryAvailabilitiesActions.fetchStart(
    itineraryStep,
    itineraryAt,
    periodStartAt,
    periodEndAt,
    interval,
    stationIds,
  ));
}

function selectLatitudeAndLongitudeAndLimit(itineraryStep) {
  return all([
    select(commandStoreItineraryGeoLocationSelectors.latitudeByItineraryStep(itineraryStep)),
    select(commandStoreItineraryGeoLocationSelectors.longitudeByItineraryStep(itineraryStep)),
    select(commandStoreItineraryGeoLocationSelectors.limitByItineraryStep(itineraryStep)),
  ]);
}

export function* queryStations() {
  const itineraryStep = yield select(commandStoreItineraryStepActiveSelectors.itineraryStep);
  const [latitude, longitude, limit] = yield selectLatitudeAndLongitudeAndLimit(itineraryStep);

  yield put(queryStationsActions.fetchStart(itineraryStep, latitude, longitude, limit));
}

export function* queryGeoSuggestions() {
  yield put(queryGeoSuggestionsActions.fetchStart());
}

export function* init() {
  const now = moment();
  const itineraryStep = 0;

  yield all([
    yield put(commandStoreItineraryStepActiveActions.store(itineraryStep)),
    yield put(commandStoreItineraryAtActions.storeStart(now)),
    yield put(commandStoreItineraryGeoLocationActions.storeStart(
      itineraryStep,
      DEFAULT_LATITUDE,
      DEFAULT_LONGITUDE,
      DEFAULT_LIMIT,
    )),
    yield fork(queryGeoSuggestions),
  ]);
}

export function* flow() {
  yield call(init);

  yield all([
    yield takeLatest(
      [
        commandStoreItineraryAtTypes.STORE.SUCCESS,
        queryStationTypes.FETCH.SUCCESS,
      ],
      queryAvailabilities,
    ),
    yield takeLatest(commandStoreItineraryGeoLocationTypes.STORE.SUCCESS, queryStations),
  ]);
}

export default function* operation() {
  yield takeLatest(FLOW.START, flow);
}
