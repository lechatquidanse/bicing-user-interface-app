import byIntervalInPeriodFilter from 'application/state/filter/byIntervalInPeriodFilter';
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
  test('it can return byIntervalInPeriodFilter', () => {
    const filter = byIntervalInPeriodFilter('2017-08-12 15:56:00', '2018-08-12 15:56:00', '5 min');
    const state = { query: { stationAvailabilities: { data: { filter } } } };

    expect(selectors.byIntervalInPeriodFilter(state)).toEqual(filter);
  });
  test('it can return stationId', () => {
    const stationId = uuid();
    const state = { query: { stationAvailabilities: { stationId } } };

    expect(selectors.stationId(state)).toEqual(stationId);
  });
  // @todo add last selector test
});
