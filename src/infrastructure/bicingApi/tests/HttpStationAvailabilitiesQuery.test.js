import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import mockAxios from 'axios';
import { DATE_TIME_FORMAT } from 'domain/definitions/byIntervalInPeriodDefinition';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';
import HttpStationAvailabilitiesQuery
  from 'infrastructure/bicingApi/HttpStationAvailabilitiesQuery';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

describe('infrastructure/bicingApi/HttpStationAvailabilitiesQuery', () => {
  test('should find stationAvailabilities by stationId', async () => {
    const stationId = uuid();
    const periodStart = moment().subtract(2, 'weeks');
    const periodEnd = moment().subtract(1, 'weeks');
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

    const filter = await ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval);
    const station = await HttpStationAvailabilitiesQuery.find(stationId, filter);

    expect(station).toEqual(expectedStationAvailabilities);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/stations/${stationId}/availabilities?periodStart=${periodStart.format(DATE_TIME_FORMAT)}&periodEnd=${periodEnd.format(DATE_TIME_FORMAT)}&interval=${interval}`);
  });
  test('should not found station when response status is not OK and throw an HttpStationQueryError', async () => {
    const status = INTERNAL_SERVER_ERROR;
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {},
      status,
    }));

    const periodStart = moment().subtract(2, 'weeks');
    const periodEnd = moment().subtract(1, 'weeks');
    const filter = await ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, '5 min');

    expect(HttpStationAvailabilitiesQuery.find(uuid(), filter))
      .rejects
      .toEqual(HttpStationQueryError.withUnexpectedResponseStatus(status));
  });
  test('should not found stations when no response and throw an HttpStationQueryError', async () => {
    const error = 'error during request';
    mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

    const periodStart = moment().subtract(2, 'weeks');
    const periodEnd = moment().subtract(1, 'weeks');
    const filter = await ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, '5 min');

    expect(HttpStationAvailabilitiesQuery.find(uuid(), filter))
      .rejects
      .toEqual(HttpStationQueryError.withRequestError(error));
  });
});
