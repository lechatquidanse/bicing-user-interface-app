import * as actions from 'application/state/query/station/actions';
import operation, { fetch } from 'application/state/query/station/operations';
import StationProvider from 'application/state/query/station/provider/StationProvider';
import { FETCH } from 'application/state/query/station/types';
import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { v4 as uuid } from 'uuid';

let stationBuilder;

describe('application/state/query/station/operations', () => {
  test('should wait for a fetch start event to fetch with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(FETCH.START, fetch);
  });

  test('should dispatch a fetchListPending action with fetch() generator', () => {
    testSaga(fetch, actions.fetchStart(uuid()))
      .next()
      .put(actions.fetchPending());
  });
  test('it can list expected availabilities with fetch() generator', () => {
    const station = stationBuilder.build();

    return expectSaga(fetch, actions.fetchStart(uuid()))
      .provide([[matchers.call.fn(StationProvider.provide), station]])
      .put(actions.fetchSuccess(station))
      .run();
  });
  test('it can handle error', () => {
    const error = new Error('An error occurred');

    return expectSaga(fetch, actions.fetchStart())
      .provide([[matchers.call.fn(StationProvider.provide), throwError(error)]])
      .put(actions.fetchFailure(error))
      .run();
  });

  beforeEach(() => {
    stationBuilder = StationBuilder.create();
  });
});
