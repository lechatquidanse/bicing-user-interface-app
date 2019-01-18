import { STORE } from 'application/state/command/storeItineraryAt/types';

describe('application/state/command/storeItineraryAt/types', () => {
  test('it can return expected STORE types', () => {
    expect(STORE.START).toEqual('command/storeItineraryAt/STORE_START');
    expect(STORE.SUCCESS).toEqual('command/storeItineraryAt/STORE_SUCCESS');
    expect(STORE.FAILURE).toEqual('command/storeItineraryAt/STORE_FAILURE');
  });
});
