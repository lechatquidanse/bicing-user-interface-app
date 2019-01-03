import ByGeoLocationFilter from 'application/state/filter/ByGeoLocationFilter';
import mockAxios from 'axios';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import HttpAvailabilitiesQueryError
  from 'infrastructure/bicingApi/errors/HttpAvailabilitiesQueryError';
import HttpAvailabilitiesQuery from 'infrastructure/bicingApi/HttpAvailabilitiesQuery';

describe('infrastructure/bicingApi/HttpAvailabilitiesQuery', () => {
  test('should find availabilities', async () => {
    const expectedAvailabilities = [{ name: 'availability 1' }, { name: 'availability 2' }];
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        '@context': '/api/contexts/last%20availability%20by%20station',
        '@id': '/api/stations',
        '@type': 'hydra:Collection',
        'hydra:member': expectedAvailabilities,
      },
      status: OK,
    }));

    const availabilities = await HttpAvailabilitiesQuery.find();

    expect(availabilities).toEqual(expectedAvailabilities);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith('/last-availabilities-by-station');
  });
  test('should not found availabilities when response status is not OK and throw an HttpAvailabilitiesQueryError', () => {
    const status = INTERNAL_SERVER_ERROR;
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        '@context': '/api/contexts/last%20availability%20by%20station',
        '@id': '/api/stations',
        '@type': 'hydra:Collection',
        'hydra:member': [{ name: 'availability 1' }, { name: 'availability 2' }],
      },
      status,
    }));

    expect(HttpAvailabilitiesQuery.find())
      .rejects
      .toEqual(HttpAvailabilitiesQueryError.withUnexpectedResponseStatus(status));
  });
  test('should not found availabilities when response format is not valid and throw an HttpAvailabilitiesQueryError', () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        '@context': '/api/contexts/last%20availability%20by%20station',
        '@id': '/api/stations',
        '@type': 'hydra:Collection',
        'bad_key_hydra:member': [{ name: 'station 1' }],
      },
      status: OK,
    }));

    expect(HttpAvailabilitiesQuery.find(ByGeoLocationFilter.fromRawValues(41.12, 2.12, 10)))
      .rejects
      .toEqual(HttpAvailabilitiesQueryError.withResponseFormatValidationErrors('"hydra:member" is required'));
  });
  test('should not found availabilities when no response and throw an HttpAvailabilitiesQueryError', () => {
    const error = 'error during request';
    mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

    expect(HttpAvailabilitiesQuery.find(ByGeoLocationFilter.fromRawValues(41.12, 2.12, 10)))
      .rejects
      .toEqual(HttpAvailabilitiesQueryError.withRequestError(error));
  });
});
