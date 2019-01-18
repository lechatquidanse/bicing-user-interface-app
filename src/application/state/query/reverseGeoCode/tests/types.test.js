import { FETCH } from 'application/state/query/reverseGeoCode/types';

describe('application/state/query/reverseGeoCode/types', () => {
  test('it can return expected FETCH types', () => {
    expect(FETCH.START).toEqual('query/reverseGeoCode/FETCH_START');
    expect(FETCH.PENDING).toEqual('query/reverseGeoCode/FETCH_PENDING');
    expect(FETCH.SUCCESS).toEqual('query/reverseGeoCode/FETCH_SUCCESS');
    expect(FETCH.FAILURE).toEqual('query/reverseGeoCode/FETCH_FAILURE');
  });
});
