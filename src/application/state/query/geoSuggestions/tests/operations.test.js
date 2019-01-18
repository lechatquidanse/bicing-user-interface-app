import * as actions from 'application/state/query/geoSuggestions/actions';
import operation, { fetch } from 'application/state/query/geoSuggestions/operations';
import GeoSuggestionsProvider from 'application/state/query/geoSuggestions/provider/GeoSuggestionsProvider';
import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';
import { FETCH } from 'application/state/query/geoSuggestions/types';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

let stationBuilder;

describe('application/state/query/geoSuggestions/operations', () => {
  test('should wait for a fetch start event to fetch with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FETCH.START, fetch);
  });

  test('should dispatch a fetchListPending action with fetch() generator', () => {
    const action = actions.fetchStart();

    testSaga(fetch, action)
      .next()
      .put(actions.fetchPending());
  });
  test('it can list expected availabilities with fetch() generator', () => {
    const geoSuggestions = [stationBuilder.build(), stationBuilder.build()];

    return expectSaga(fetch, actions.fetchStart())
      .provide([[matchers.call.fn(GeoSuggestionsProvider.provide), geoSuggestions]])
      .put(actions.fetchSuccess(geoSuggestions))
      .run();
  });
  test('it can handle error', () => {
    const error = new Error('An error occurred');

    return expectSaga(fetch, actions.fetchStart())
      .provide([[matchers.call.fn(GeoSuggestionsProvider.provide), throwError(error)]])
      .put(actions.fetchFailure(error))
      .run();
  });

  beforeEach(() => {
    stationBuilder = StationBuilder.create();
  });
});
