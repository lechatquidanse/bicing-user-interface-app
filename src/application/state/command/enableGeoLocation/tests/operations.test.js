import operation, { enable } from 'application/state/command/enableGeoLocation/operations';
import { ENABLE } from 'application/state/command/enableGeoLocation/types';
import { testSaga } from 'redux-saga-test-plan';

describe('application/state/command/enableGeoLocation/operations', () => {
  test('should wait for a start event to enable with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(ENABLE.START, enable);
  });
});
