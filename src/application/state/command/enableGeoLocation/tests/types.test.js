import { ENABLE } from 'application/state/command/enableGeoLocation/types';

describe('application/state/command/enableGeoLocation/types', () => {
  test('it can return expected ENABLE types', () => {
    expect(ENABLE.START).toEqual('command/enableGeoLocation/ENABLE_START');
  });
});
