import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import mockAxios from 'axios';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';
import HttpStationAvailabilitiesQuery
  from 'infrastructure/bicingApi/HttpStationAvailabilitiesQuery';
import { v4 as uuid } from 'uuid';

describe('infrastructure/bicingApi/HttpStationAvailabilitiesQuery', () => {
  test('should find stationAvailabilities by stationId', async () => {
    const stationId = uuid();
    const periodStart = '2017-08-12 12:12:12';
    const periodEnd = '2017-09-12 12:12:12';
    const interval = '5 min';

    const expectedStationAvailabilities = {
      '@context': '/api/contexts/collection%20of%20availabilities%20by%20time%20interval%20filter%20for%20a%20station',
      '@id': '/api/stations/cc90eb4e-4988-4443-aedf-6464f79eeb12/availabilities',
      '@type': 'collection of availabilities by time interval filter for a station',
      id: 'cc90eb4e-4988-4443-aedf-6464f79eeb12',
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
          available_bike_avg: '12.0000000000000000',
          available_bike_min: 12,
          available_bike_max: 12,
          available_slot_avg: '13.0000000000000000',
          available_slot_min: 13,
          available_slot_max: 13,
        },
      ],
    };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: expectedStationAvailabilities,
      status: OK,
    }));

    const station = await HttpStationAvailabilitiesQuery.find(
      stationId,
      ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval),
    );

    expect(station).toEqual(expectedStationAvailabilities);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/stations/${stationId}/availabilities?periodStart=${periodStart}&periodEnd=${periodEnd}&interval=${interval}`);
  });
  test('should not found station when response status is not OK and throw an HttpStationQueryError', () => {
    const status = INTERNAL_SERVER_ERROR;
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {},
      status,
    }));

    expect(HttpStationAvailabilitiesQuery.find(uuid(), ByIntervalInPeriodFilter.fromRawValues('2017-08-12 12:12:12', '2017-09-12 12:12:12', '5 min')))
      .rejects
      .toEqual(HttpStationQueryError.withUnexpectedResponseStatus(status));
  });
  test('should not found stations when no response and throw an HttpStationQueryError', () => {
    const error = 'error during request';
    mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

    expect(HttpStationAvailabilitiesQuery.find(uuid(), ByIntervalInPeriodFilter.fromRawValues('2017-08-12 12:12:12', '2017-09-12 12:12:12', '5 min')))
      .rejects
      .toEqual(HttpStationQueryError.withRequestError(error));
  });
});
