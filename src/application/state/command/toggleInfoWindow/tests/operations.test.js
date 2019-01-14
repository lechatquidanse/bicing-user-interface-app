import operation, { toggle } from 'application/state/command/toggleInfoWindow/operations';
import { TOGGLE } from 'application/state/command/toggleInfoWindow/types';
import { testSaga } from 'redux-saga-test-plan';

describe('application/state/command/toggleInfoWindow/operations', () => {
  test('should wait for a display start event to toggle with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(TOGGLE.START, toggle);
  });
});
