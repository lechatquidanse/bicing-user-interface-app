import { FETCH } from 'application/state/query/stations/types';

describe('application/state/query/stations/types', () => {
  test('it can return expected FETCH types', () => {
    expect(FETCH.START).toEqual('query/stations/FETCH_START');
    expect(FETCH.PENDING).toEqual('query/stations/FETCH_PENDING');
    expect(FETCH.SUCCESS).toEqual('query/stations/FETCH_SUCCESS');
    expect(FETCH.FAILURE).toEqual('query/stations/FETCH_FAILURE');
  });
});
