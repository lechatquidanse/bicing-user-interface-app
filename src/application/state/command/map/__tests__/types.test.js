import { DISPLAY } from 'application/state/command/map/types';

describe('application/state/command/map/types', () => {
  test('it can return expected DISPLAY types', () => {
    expect(DISPLAY.START).toEqual('command/map/DISPLAY_START');
    expect(DISPLAY.CANCELLED).toEqual('command/map/DISPLAY_CANCELLED');
    expect(DISPLAY.SUCCESS).toEqual('command/map/DISPLAY_SUCCESS');
    expect(DISPLAY.FAILURE).toEqual('command/map/DISPLAY_FAILURE');
  });
});
