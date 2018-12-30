import { FETCH } from 'application/state/query/lastAvailabilities/types';

describe('application/state/query/lastAvailabilities/types', () => {
  test('it can return expected FETCH types', () => {
    expect(FETCH.START).toEqual('query/lastAvailabilities/FETCH_START');
    expect(FETCH.PENDING).toEqual('query/lastAvailabilities/FETCH_PENDING');
    expect(FETCH.SUCCESS).toEqual('query/lastAvailabilities/FETCH_SUCCESS');
    expect(FETCH.FAILURE).toEqual('query/lastAvailabilities/FETCH_FAILURE');
  });
});
