import { FLOW } from 'application/state/flow/map/types';

describe('application/state/flow/map/types', () => {
  test('it can return expected FLOW types', () => {
    expect(FLOW.START).toEqual('flow/map/FLOW_START');
  });
});
