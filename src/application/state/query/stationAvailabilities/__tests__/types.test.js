import { FETCH } from 'application/state/query/stationAvailabilities/types';

describe('application/state/query/stationAvailabilities/types', () => {
  test('it can return expected FETCH types', () => {
    expect(FETCH.START).toEqual('query/stationAvailabilities/FETCH_START');
    expect(FETCH.PENDING).toEqual('query/stationAvailabilities/FETCH_PENDING');
    expect(FETCH.SUCCESS).toEqual('query/stationAvailabilities/FETCH_SUCCESS');
    expect(FETCH.FAILURE).toEqual('query/stationAvailabilities/FETCH_FAILURE');
  });
});
