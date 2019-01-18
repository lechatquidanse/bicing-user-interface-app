import * as actions from 'application/state/query/availabilities/actions';
import operation, { fetch } from 'application/state/query/availabilities/operations';
import AvailabilitiesProvider
  from 'application/state/query/availabilities/provider/AvailabilitiesProvider';
import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import { FETCH } from 'application/state/query/availabilities/types';
import moment from 'moment';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

let availabilityBuilder;

describe('application/state/query/availabilities/operations', () => {
  test('it can wait for a fetch start event to fetch with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FETCH.START, fetch);
  });
  test('it can dispatch a fetchPending action with fetch() generator', () => {
    const itineraryStep = 5;
    const action = actions.fetchStart(itineraryStep, moment(), moment(), moment(), '5T', []);

    testSaga(fetch, action)
      .next()
      .put(actions.fetchPending(itineraryStep));
  });
  test('it can list expected availabilities with fetch() generator', () => {
    const availabilities = [availabilityBuilder.build(), availabilityBuilder.build()];

    const itineraryStep = 2;
    const action = actions.fetchStart(itineraryStep, moment(), moment(), moment(), '5T', []);

    return expectSaga(fetch, action)
      .provide([[matchers.call.fn(AvailabilitiesProvider.provide), availabilities]])
      .put(actions.fetchSuccess(itineraryStep, availabilities))
      .run();
  });
  test('it can handle error', () => {
    const error = new Error('An error occurred');
    const itineraryStep = 2;
    const action = actions.fetchStart(itineraryStep, moment(), moment(), moment(), '5T', []);

    return expectSaga(fetch, action)
      .provide([[matchers.call.fn(AvailabilitiesProvider.provide), throwError(error)]])
      .put(actions.fetchFailure(itineraryStep, error))
      .run();
  });

  beforeEach(() => {
    availabilityBuilder = AvailabilityBuilder.create();
  });
});
