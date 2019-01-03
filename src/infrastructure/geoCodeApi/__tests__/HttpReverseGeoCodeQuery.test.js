import HttpReverseGeoCodeQueryError
  from 'infrastructure/geoCodeApi/errors/HttpReverseGeoCodeQueryError';
import httpClient from 'infrastructure/geoCodeApi/httpClient';
import HttpReverseGeoCodeQuery from 'infrastructure/geoCodeApi/HttpReverseGeoCodeQuery';

jest.mock('infrastructure/geoCodeApi/httpClient');

describe('infrastructure/geoCodeApi/HttpReverseGeoCodeQuery', () => {
  test('should find address by latitude and longitude', async () => {
    const expectedAddress = {
      address: 'Roger de Flor/ Gran Vía',
      addressNumber: '126',
      zipCode: '08010',
    };

    httpClient.reverse.mockImplementationOnce(() => Promise.resolve(expectedAddress));

    const address = await HttpReverseGeoCodeQuery.find(41.32, 2.12);

    expect(address).toEqual(expectedAddress);
    expect(httpClient.reverse).toHaveBeenCalledTimes(1);
  });
  test('should not found stations when no response and throw an HttpStationQueryError', () => {
    const error = 'error during request';
    httpClient.reverse.mockImplementationOnce(() => Promise.reject(error));

    expect(HttpReverseGeoCodeQuery.find(41.32, 2.12))
      .rejects
      .toEqual(HttpReverseGeoCodeQueryError.withRequestError(error));
  });
});
