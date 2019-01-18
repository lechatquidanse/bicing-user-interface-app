import * as actions from 'application/state/command/storeItineraryGeoLocation/actions';
import operation, { store } from 'application/state/command/storeItineraryGeoLocation/operations';
import { STORE } from 'application/state/command/storeItineraryGeoLocation/types';
import ByItineraryGeoLocationFilter from 'application/state/filter/ByItineraryGeoLocationFilter';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import ByItineraryGeoLocationFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryGeoLocationFilterBuilder';

let filterBuilder;

describe('application/state/command/storeItineraryGeoLocation/operations', () => {
  test('it can wait for a store start event to store with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(STORE.START, store);
  });
  test('it can store geoLocation and notify it', async () => {
    const itineraryStep = 2;
    const latitude = 41.12;
    const longitude = 2.12;
    const limit = 500;

    const filter = await filterBuilder
      .withLatitude(latitude)
      .withLongitude(longitude)
      .withLimit(limit)
      .build();

    return expectSaga(store, actions.storeStart(itineraryStep, latitude, longitude, limit))
      .provide([[matchers.call.fn(ByItineraryGeoLocationFilter.fromRawValues), filter]])
      .put(actions.storeSuccess(itineraryStep, filter))
      .run();
  });
  test('it can not store geoLocation if an error occurred and notify it', () => {
    const itineraryStep = 2;
    const error = new Error('An error occurred');

    return expectSaga(store, actions.storeStart(itineraryStep, -180, 2.12, 500))
      .provide([[matchers.call.fn(ByItineraryGeoLocationFilter.fromRawValues), throwError(error)]])
      .put(actions.storeFailure(itineraryStep, error))
      .run();
  });
  beforeEach(async () => {
    filterBuilder = await ByItineraryGeoLocationFilterBuilder.create();
  });
});
