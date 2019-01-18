import * as actions from 'application/state/query/stationAvailabilities/actions';
import operation, { fetch } from 'application/state/query/stationAvailabilities/operations';
import StationAvailabilitiesProvider from 'application/state/query/stationAvailabilities/provider/StationAvailabilitiesProvider';
import { FETCH } from 'application/state/query/stationAvailabilities/types';
import AvailabilityBuilder from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import moment from 'moment';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { v4 as uuid } from 'uuid';

let availabilityBuilder;

describe('application/state/query/stationAvailabilities/operations', () => {
  test('should wait for a fetch start event to fetch with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FETCH.START, fetch);
  });

  test('should dispatch a fetchListPending action with fetch() generator', () => {
    testSaga(fetch, actions.fetchStart(uuid(), moment(), moment(), '5 min'))
      .next()
      .put(actions.fetchPending());
  });
  test('it can list expected availabilities with fetch() generator', () => {
    const availabilities = [availabilityBuilder.build(), availabilityBuilder.build()];

    return expectSaga(fetch, actions.fetchStart(uuid(), moment(), moment(), '5 min'))
      .provide([[matchers.call.fn(StationAvailabilitiesProvider.provide), availabilities]])
      .put(actions.fetchSuccess(availabilities))
      .run();
  });
  test('it can handle error', () => {
    const error = new Error('An error occurred');

    return expectSaga(fetch, actions.fetchStart())
      .provide([[matchers.call.fn(StationAvailabilitiesProvider.provide), throwError(error)]])
      .put(actions.fetchFailure(error))
      .run();
  });

  beforeEach(() => {
    availabilityBuilder = AvailabilityBuilder.create();
  });
});
