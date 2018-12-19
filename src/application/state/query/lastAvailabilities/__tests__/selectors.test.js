import * as selectors from 'application/state/query/lastAvailabilities/selectors';

describe('application/state/query/lastAvailabilities/selectors', () => {
  test('it can return error flag', () => {
    const state = { query: { lastAvailabilities: { error: true } } };

    expect(selectors.error(state)).toBeTruthy();
  });
  test('it can return isFetching flag', () => {
    const state = { query: { lastAvailabilities: { isFetching: true } } };

    expect(selectors.isFetching(state)).toBeTruthy();
  });
  test('it can return lastAvailabilities data', () => {
    const data = ['last availabilities 1', 'last availabilities 2'];
    const state = { query: { lastAvailabilities: { data: { 'hydra:member': data } } } };

    expect(selectors.lastAvailabilities(state)).toEqual(data);
  });
});
