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
  test('it can return stationAvailabilitiesSorted', () => {
    const data = {
      stationId: 'cc90eb4e-4988-4443-aedf-6464f79eeb12',
      availabilities: [
        {
          interval: '2018-12-24 16:10:00',
          available_bike_avg: '11.5000000000000000',
          available_bike_min: 11,
          available_bike_max: 12,
          available_slot_avg: '13.5000000000000000',
          available_slot_min: 13,
          available_slot_max: 14,
        },
        {
          interval: '2018-12-24 16:15:00',
          available_bike_avg: '12.5000000000000000',
          available_bike_min: 12,
          available_bike_max: 13,
          available_slot_avg: '12.5000000000000000',
          available_slot_min: 12,
          available_slot_max: 13,
        },
      ],
    };
    const state = { query: { stationAvailabilities: { data } } };

    expect(selectors.stationAvailabilitiesSorted(state)).toEqual({
      datasetsAvailableBikeAvg: ['11.5000000000000000', '12.5000000000000000'],
      datasetsAvailableBikeMax: [12, 13],
      datasetsAvailableBikeMin: [11, 12],
      datasetsAvailableSlotAvg: ['13.5000000000000000', '12.5000000000000000'],
      datasetsAvailableSlotMax: [14, 13],
      datasetsAvailableSlotMin: [13, 12],
      datasetslabels: ['2018-12-24 16:10:00', '2018-12-24 16:15:00'],
    });
  });
});
