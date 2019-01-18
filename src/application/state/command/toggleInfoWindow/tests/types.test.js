import { TOGGLE } from 'application/state/command/toggleInfoWindow/types';

describe('application/state/command/toggleInfoWindow/types', () => {
  test('it can return expected TOGGLE types', () => {
    expect(TOGGLE.START).toEqual('command/toggleInfoWindow/TOGGLE_START');
  });
});
