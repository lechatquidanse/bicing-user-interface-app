import * as selectors from 'application/state/query/availabilities/selectors';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/selectors', () => {
  test('it can return error flag', () => {
    const state = { query: { availabilities: { error: true } } };

    expect(selectors.error(state)).toBeTruthy();
  });
  test('it can return isFetching flag', () => {
    const state = { query: { availabilities: { isFetching: true } } };

    expect(selectors.isFetching(state)).toBeTruthy();
  });
  test('it can return availabilities data', () => {
    const data = ['last availabilities 1', 'last availabilities 2'];
    const state = { query: { availabilities: { data } } };

    expect(selectors.data(state)).toEqual(data);
  });
  test('it can return a last availability by its stationId', () => {
    const stationId = uuid();
    const lastAvailability = { id: stationId, status: 'OPENED' };

    const data = [
      lastAvailability,
      { id: uuid(), status: 'CLOSED' },
    ];
    const state = { query: { availabilities: { data } } };

    expect(selectors.lastAvailabilityById(state, stationId)).toEqual(lastAvailability);
  });
  test('it can return a last availability status by its stationId', () => {
    const stationId = uuid();
    const status = 'CLOSED';
    const data = [
      { id: stationId, status },
      { id: uuid(), status: 'OPENED' },
    ];
    const state = { query: { availabilities: { data } } };

    expect(selectors.statusByStationId(state, stationId)).toEqual(status);
  });
  test('it can return a last availability available bike number by its stationId', () => {
    const stationId = uuid();
    const availableBikeNumber = 23;
    const data = [
      { id: uuid(), availableBikeNumber: 12 },
      { id: stationId, availableBikeNumber },
    ];
    const state = { query: { availabilities: { data } } };

    expect(selectors.availableBikeNumberByStationId(state, stationId)).toEqual(availableBikeNumber);
  });
  test('it can return a last availability available slot number by its stationId', () => {
    const stationId = uuid();
    const availableSlotNumber = 2;
    const data = [
      { id: uuid(), availableSlotNumber: 12 },
      { id: stationId, availableSlotNumber },
    ];
    const state = { query: { availabilities: { data } } };

    expect(selectors.availableSlotNumberByStationId(state, stationId)).toEqual(availableSlotNumber);
  });
});
