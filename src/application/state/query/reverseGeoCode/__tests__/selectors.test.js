import * as selectors from 'application/state/query/reverseGeoCode/selectors';

describe('application/state/query/reverseGeoCode/selectors', () => {
  test('it can return error flag', () => {
    const state = { query: { reverseGeoCode: { error: true } } };

    expect(selectors.error(state)).toBeTruthy();
  });
  test('it can return isFetching flag', () => {
    const state = { query: { reverseGeoCode: { isFetching: true } } };

    expect(selectors.isFetching(state)).toBeTruthy();
  });
  test('it can return station data', () => {
    const data = ['address'];
    const state = { query: { reverseGeoCode: { data } } };

    expect(selectors.data(state)).toEqual(data);
  });
});
