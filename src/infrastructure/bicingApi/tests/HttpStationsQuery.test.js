import ByItineraryGeoLocationFilter from 'application/state/filter/ByItineraryGeoLocationFilter';
import mockAxios from 'axios';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';
import HttpStationsQuery from 'infrastructure/bicingApi/HttpStationsQuery';

describe('infrastructure/bicingApi/HttpStationsQuery', () => {
  test('should find stations by filter', async () => {
    const expectedStations = [{ name: 'station 1' }, { name: 'station 2' }, { name: 'station 3' }];
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        '@context': '/api/contexts/stationView',
        '@id': '/api/stations',
        '@type': 'hydra:Collection',
        'hydra:member': expectedStations,
      },
      status: OK,
    }));

    const latitude = 41.12;
    const longitude = 2.12;
    const limit = 500;
    const filter = await ByItineraryGeoLocationFilter.fromRawValues(latitude, longitude, limit);
    const stations = await HttpStationsQuery.find(filter);

    expect(stations).toEqual(expectedStations);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/stations?geo_location_filter=${latitude},${longitude},${limit}`);
  });
  test('should not found stations when response status is not OK and throw an HttpStationQueryError', async () => {
    const status = INTERNAL_SERVER_ERROR;
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        '@context': '/api/contexts/stationView',
        '@id': '/api/stations',
        '@type': 'hydra:Collection',
        'hydra:member': [{ name: 'station 1' }, { name: 'station 2' }, { name: 'station 3' }],
      },
      status,
    }));

    const latitude = 41.12;
    const longitude = 2.12;
    const limit = 500;
    const filter = await ByItineraryGeoLocationFilter.fromRawValues(latitude, longitude, limit);

    await expect(HttpStationsQuery.find(filter))
      .rejects
      .toEqual(HttpStationQueryError.withUnexpectedResponseStatus(status));
  });
  test('should not found stations when response format is not valid and throw an HttpStationQueryError', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        '@context': '/api/contexts/stationView',
        '@id': '/api/stations',
        '@type': 'hydra:Collection',
        'bad_key_hydra:member': [{ name: 'station 1' }],
      },
      status: OK,
    }));

    const latitude = 41.12;
    const longitude = 2.12;
    const limit = 500;
    const filter = await ByItineraryGeoLocationFilter.fromRawValues(latitude, longitude, limit);

    await expect(HttpStationsQuery.find(filter))
      .rejects
      .toEqual(HttpStationQueryError.withResponseFormatValidationErrors('"hydra:member" is required'));
  });
  test('should not found stations when no response and throw an HttpStationQueryError', async () => {
    const error = 'error during request';
    mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

    const latitude = 41.12;
    const longitude = 2.12;
    const limit = 500;
    const filter = await ByItineraryGeoLocationFilter.fromRawValues(latitude, longitude, limit);

    await expect(HttpStationsQuery.find(filter))
      .rejects
      .toEqual(HttpStationQueryError.withRequestError(error));
  });
});
