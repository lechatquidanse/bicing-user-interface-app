import { FETCH } from 'application/state/query/availabilities/types';

describe('application/state/query/availabilities/types', () => {
  test('it can return expected FETCH types', () => {
    expect(FETCH.START).toEqual('query/availabilities/FETCH_START');
    expect(FETCH.PENDING).toEqual('query/availabilities/FETCH_PENDING');
    expect(FETCH.SUCCESS).toEqual('query/availabilities/FETCH_SUCCESS');
    expect(FETCH.FAILURE).toEqual('query/availabilities/FETCH_FAILURE');
  });
});
