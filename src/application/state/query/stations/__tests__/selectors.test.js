import * as selectors from 'application/state/query/stations/selectors';
import { v4 as uuid } from 'uuid';

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
    const data = [
      { id: uuid(), name: 'station 1' },
      { id: uuid(), name: 'station 2' },
    ];
    const state = { query: { stations: { data } } };

    expect(selectors.data(state)).toEqual(data);
  });
  test('it can return latitude', () => {
    const latitude = 41.342;
    const state = { query: { stations: { latitude } } };

    expect(selectors.latitude(state)).toEqual(latitude);
  });
  test('it can return longitude', () => {
    const longitude = 1.342;
    const state = { query: { stations: { longitude } } };

    expect(selectors.longitude(state)).toEqual(longitude);
  });
  test('it can return limit', () => {
    const limit = 5000;
    const state = { query: { stations: { limit } } };

    expect(selectors.limit(state)).toEqual(limit);
  });
  test('it can return a station name by its stationId', () => {
    const stationId = uuid(); const
      name = 'station 1';
    const data = [
      { id: stationId, name },
      { id: uuid(), name: 'station 2' },
    ];
    const state = { query: { stations: { data } } };

    expect(selectors.nameByStationId(state, stationId)).toEqual(name);
  });
  test('it can return a station zipCode by its stationId', () => {
    const stationId = uuid(); const
      zipCode = '08028';
    const data = [
      { id: stationId, zipCode },
      { id: uuid(), zipCode: '08001' },
    ];
    const state = { query: { stations: { data } } };

    expect(selectors.zipCodeByStationId(state, stationId)).toEqual(zipCode);
  });
  test('it can return a station type by its stationId', () => {
    const stationId = uuid(); const
      type = 'BIKE';
    const data = [
      { id: uuid(), type: 'ELECTRIC_BIKE' },
      { id: stationId, type },
    ];
    const state = { query: { stations: { data } } };

    expect(selectors.typeByStationId(state, stationId)).toEqual(type);
  });
  test('it can return a station latitude by its stationId', () => {
    const stationId = uuid(); const
      latitude = 41.45663;
    const data = [
      { id: uuid(), latitude: 38.456 },
      { id: stationId, latitude },
    ];
    const state = { query: { stations: { data } } };

    expect(selectors.latitudeByStationId(state, stationId)).toEqual(latitude);
  });
  test('it can return a station longitude by its stationId', () => {
    const stationId = uuid(); const
      longitude = 1.45663;
    const data = [
      { id: uuid(), longitude: 3.456 },
      { id: stationId, longitude },
    ];
    const state = { query: { stations: { data } } };

    expect(selectors.longitudeByStationId(state, stationId)).toEqual(longitude);
  });
});
