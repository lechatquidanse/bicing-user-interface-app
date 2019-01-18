import mockAxios from 'axios';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';
import { v4 as uuid } from 'uuid';

describe('infrastructure/bicingApi/HttpStationQuery', () => {
  test('should find station by stationId', async () => {
    const stationId = uuid();

    const expectedStation = {
      '@context': '/api/contexts/station',
      '@id': `/api/stations/${stationId}`,
      '@type': 'station',
      id: `${stationId}`,
      name: '02 - C/ ROGER DE FLOR, 126',
      type: 'BIKE',
      address: 'Roger de Flor/ Gran Vía',
      addressNumber: '126',
      zipCode: '08010',
      latitude: 41.39553,
      longitude: 2.17706,
    };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: expectedStation,
      status: OK,
    }));

    const station = await HttpStationQuery.find(stationId);

    expect(station).toEqual(expectedStation);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/stations/${stationId}`);
  });
  test('should not found station when response status is not OK and throw an HttpStationQueryError', () => {
    const status = INTERNAL_SERVER_ERROR;
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {},
      status,
    }));

    expect(HttpStationQuery.find(uuid()))
      .rejects
      .toEqual(HttpStationQueryError.withUnexpectedResponseStatus(status));
  });
  test('should not found stations when no response and throw an HttpStationQueryError', () => {
    const error = 'error during request';
    mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

    expect(HttpStationQuery.find(uuid()))
      .rejects
      .toEqual(HttpStationQueryError.withRequestError(error));
  });
});
