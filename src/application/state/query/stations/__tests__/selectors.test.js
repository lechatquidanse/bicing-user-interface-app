import * as selectors from 'application/state/query/stations/selectors';

describe('application/state/query/stations/selectors', () => {
  test('it can return error flag', () => {
    const state = { query: { stations: { error: true } } };

    expect(selectors.error(state)).toBeTruthy();
  });
  test('it can return isFetching flag', () => {
    const state = { query: { stations: { isFetching: true } } };

    expect(selectors.isFetching(state)).toBeTruthy();
  });
  test('it can return stations', () => {
    const data = ['station 1', 'station 2'];
    const state = { query: { stations: { data: { 'hydra:member': data } } } };

    expect(selectors.stations(state)).toEqual(data);
  });
});
