import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import mockAxios from 'axios';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import HttpStationAvailabilitiesForecastError
  from 'infrastructure/bicingForecastApi/errors/HttpStationAvailabilitiesForecastError';
import HttpStationAvailabilitiesForecastQuery
  from 'infrastructure/bicingForecastApi/HttpStationAvailabilitiesForecastQuery';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { DATE_TIME_FORMAT } from 'domain/definitions/byIntervalInPeriodDefinition';

describe('infrastructure/bicingForecastApi/HttpStationAvailabilitiesForecastQuery', () => {
  test('should find stationAvailabilities by stationId', async () => {
    const stationId = uuid();
    const periodStart = moment().subtract(2, 'week');
    const periodEnd = moment().subtract(1, 'week');
    const interval = '5T';

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        station_id: '76fc88f9-aa4e-4fbf-9852-f23a8cc7c525',
        predictions: [
          {
            available_bike_number: '13.5',
            available_slot_number: '12',
            status: 'OPENED',
            forecast_at: '2018-12-24 16:10:00',
          },
          {
            available_bike_number: '14.5',
            available_slot_number: '12.667',
            status: 'CLOSED',
            forecast_at: '2018-12-24 16:15:00',
          },
        ],

      },
      status: OK,
    }));

    const filter = await ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval);
    const results = await HttpStationAvailabilitiesForecastQuery.find(stationId, filter);

    expect(results).toEqual([
      {
        id: '76fc88f9-aa4e-4fbf-9852-f23a8cc7c525',
        availableBikeNumber: 13.5,
        availableSlotNumber: 12,
        status: 'OPENED',
        statedAt: '2018-12-24 16:10:00',
      },
      {
        id: '76fc88f9-aa4e-4fbf-9852-f23a8cc7c525',
        availableBikeNumber: 14.5,
        availableSlotNumber: 12.667,
        status: 'CLOSED',
        statedAt: '2018-12-24 16:15:00',
      },
    ]);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`/stations/${stationId}?filter=${periodStart.format(DATE_TIME_FORMAT)},${periodEnd.format(DATE_TIME_FORMAT)},${interval}`);
  });
  test('should not found station when response status is not OK and throw an HttpStationAvailabilitiesForecastError', async () => {
    const status = INTERNAL_SERVER_ERROR;
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: {},
      status,
    }));

    const periodStart = moment().subtract(2, 'week');
    const periodEnd = moment().subtract(1, 'week');
    const filter = await ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, '5 min');

    await expect(HttpStationAvailabilitiesForecastQuery.find(uuid(), filter))
      .rejects
      .toEqual(HttpStationAvailabilitiesForecastError.withUnexpectedResponseStatus(status));
  });
  test('should not found stations when no response and throw an HttpStationAvailabilitiesForecastError', async () => {
    const error = 'error during request';
    mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

    const periodStart = moment().subtract(2, 'week');
    const periodEnd = moment().subtract(1, 'week');
    const filter = await ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, '5 min');

    await expect(HttpStationAvailabilitiesForecastQuery.find(uuid(), filter))
      .rejects
      .toEqual(HttpStationAvailabilitiesForecastError.withRequestError(error));
  });
});
