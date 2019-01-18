import operation, { store } from 'application/state/command/storeItineraryStepActive/operations';
import { STORE } from 'application/state/command/storeItineraryStepActive/types';
import { testSaga } from 'redux-saga-test-plan';

describe('application/state/command/enableGeoLocation/operations', () => {
  test('should wait for a start event to enable with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(STORE.START, store);
  });
});
