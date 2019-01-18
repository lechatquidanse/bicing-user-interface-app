import { STORE } from 'application/state/command/storeItineraryStepActive/types';

describe('application/state/command/storeItineraryStepActive/types', () => {
  test('it can return expected STORE types', () => {
    expect(STORE.START).toEqual('command/storeItineraryStepActive/STORE_START');
  });
});
