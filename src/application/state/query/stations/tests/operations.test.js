import * as actions from 'application/state/query/stations/actions';
import operation, { fetch } from 'application/state/query/stations/operations';
import StationsProvider from 'application/state/query/stations/provider/StationsProvider';
import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';
import { FETCH } from 'application/state/query/stations/types';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

let stationBuilder;

describe('application/state/query/stations/operations', () => {
  test('should wait for a fetch start event to fetch with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FETCH.START, fetch);
  });

  test('should dispatch a fetchListPending action with fetch() generator', () => {
    const itineraryStep = 5;
    const action = actions.fetchStart(itineraryStep, 41.3244, 2.345, 5000);

    testSaga(fetch, action)
      .next()
      .put(actions.fetchPending(itineraryStep));
  });
  test('it can list expected availabilities with fetch() generator', () => {
    const stations = [stationBuilder.build(), stationBuilder.build()];

    const itineraryStep = 5;
    const action = actions.fetchStart(itineraryStep, 41.3244, 2.345, 5000);

    return expectSaga(fetch, action)
      .provide([[matchers.call.fn(StationsProvider.provide), stations]])
      .put(actions.fetchSuccess(itineraryStep, stations))
      .run();
  });
  test('it can handle error', () => {
    const error = new Error('An error occurred');
    const itineraryStep = 5;
    const action = actions.fetchStart(itineraryStep, 41.3244, 2.345, 5000);

    return expectSaga(fetch, action)
      .provide([[matchers.call.fn(StationsProvider.provide), throwError(error)]])
      .put(actions.fetchFailure(itineraryStep, error))
      .run();
  });

  beforeEach(() => {
    stationBuilder = StationBuilder.create();
  });
});
