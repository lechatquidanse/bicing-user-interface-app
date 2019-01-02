import { FLOW } from 'application/state/flow/station/types';

describe('application/state/flow/station/types', () => {
  test('it can return expected FLOW types', () => {
    expect(FLOW.START).toEqual('flow/station/FLOW_START');
  });
});
