import { CONFIGURE } from 'application/state/command/configureMap/types';

describe('application/state/command/configureMap/types', () => {
  test('it can return expected CONFIGURE types', () => {
    expect(CONFIGURE.START).toEqual('command/configureMap/CONFIGURE_START');
    expect(CONFIGURE.SUCCESS).toEqual('command/configureMap/CONFIGURE_SUCCESS');
    expect(CONFIGURE.FAILURE).toEqual('command/configureMap/CONFIGURE_FAILURE');
  });
});
