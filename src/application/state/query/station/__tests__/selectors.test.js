import * as selectors from 'application/state/query/station/selectors';

describe('application/state/query/station/selectors', () => {
  test('it can return error flag', () => {
    const state = { query: { station: { error: true } } };

    expect(selectors.error(state)).toBeTruthy();
  });
  test('it can return isFetching flag', () => {
    const state = { query: { station: { isFetching: true } } };

    expect(selectors.isFetching(state)).toBeTruthy();
  });
  test('it can return station data', () => {
    const data = ['station'];
    const state = { query: { station: { data } } };

    expect(selectors.data(state)).toEqual(data);
  });
});
