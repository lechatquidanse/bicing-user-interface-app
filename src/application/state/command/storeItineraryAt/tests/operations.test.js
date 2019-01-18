import * as actions from 'application/state/command/storeItineraryAt/actions';
import operation, { store } from 'application/state/command/storeItineraryAt/operations';
import { STORE } from 'application/state/command/storeItineraryAt/types';
import ByItineraryAtFilterFactory from 'application/state/filter/ByItineraryAtFilterFactory';
import ByItineraryAtFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryAtFilterBuilder';
import moment from 'moment';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

let filterBuilder;

describe('application/state/command/storeItineraryAt/operations', () => {
  test('it can wait for a store start event to store with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(STORE.START, store);
  });
  test('it can store itineraryAt and notify it', async () => {
    const itineraryAt = moment();
    const filter = await filterBuilder
      .withItineraryAt(itineraryAt)
      .withPeriodStartAt(itineraryAt.clone())
      .withPeriodEndAt(itineraryAt.clone())
      .withInterval('5T')
      .build();

    return expectSaga(store, actions.storeStart(itineraryAt))
      .provide([[matchers.call.fn(ByItineraryAtFilterFactory.create), filter]])
      .put(actions.storeSuccess(filter))
      .run();
  });
  test('it can not store itineraryAt if an error occurred and notify it', async () => {
    const itineraryAt = moment();
    const error = new Error('An error occurred');

    return expectSaga(store, actions.storeStart(itineraryAt))
      .provide([[matchers.call.fn(ByItineraryAtFilterFactory.create), throwError(error)]])
      .put(actions.storeFailure(error))
      .run();
  });
  beforeEach(async () => {
    filterBuilder = await ByItineraryAtFilterBuilder.create();
  });
});
