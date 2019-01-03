import * as selectors from 'application/state/query/stationAvailabilities/selectors';
import { v4 as uuid } from 'uuid';

describe('application/state/query/stationAvailabilities/selectors', () => {
  test('it can return error flag', () => {
    const state = { query: { stationAvailabilities: { error: true } } };

    expect(selectors.error(state)).toBeTruthy();
  });
  test('it can return isFetching flag', () => {
    const state = { query: { stationAvailabilities: { isFetching: true } } };

    expect(selectors.isFetching(state)).toBeTruthy();
  });
  test('it can return station data', () => {
    const data = ['station'];
    const state = { query: { stationAvailabilities: { data } } };

    expect(selectors.data(state)).toEqual(data);
  });
  test('it can return periodStart', () => {
    const periodStart = '2017-08-12 15:56:00';
    const state = { query: { stationAvailabilities: { periodStart } } };

    expect(selectors.periodStart(state)).toEqual(periodStart);
  });
  test('it can return periodEnd', () => {
    const periodEnd = '2017-08-12 15:56:00';
    const state = { query: { stationAvailabilities: { periodEnd } } };

    expect(selectors.periodEnd(state)).toEqual(periodEnd);
  });
  test('it can return interval', () => {
    const interval = '15 min';
    const state = { query: { stationAvailabilities: { interval } } };

    expect(selectors.interval(state)).toEqual(interval);
  });
  test('it can return stationId', () => {
    const stationId = uuid();
    const state = { query: { stationAvailabilities: { stationId } } };

    expect(selectors.stationId(state)).toEqual(stationId);
  });
  // @todo add last selector test
});
