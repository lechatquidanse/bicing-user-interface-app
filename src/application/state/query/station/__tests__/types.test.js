import { FETCH } from 'application/state/query/station/types';

describe('application/state/query/station/types', () => {
  test('it can return expected FETCH types', () => {
    expect(FETCH.START).toEqual('query/station/FETCH_START');
    expect(FETCH.PENDING).toEqual('query/station/FETCH_PENDING');
    expect(FETCH.CANCELLED).toEqual('query/station/FETCH_CANCELLED');
    expect(FETCH.SUCCESS).toEqual('query/station/FETCH_SUCCESS');
    expect(FETCH.FAILURE).toEqual('query/station/FETCH_FAILURE');
  });
});
