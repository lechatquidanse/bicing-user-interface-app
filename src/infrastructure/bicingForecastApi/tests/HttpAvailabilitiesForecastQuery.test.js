import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import mockAxios from 'axios';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import HttpStationAvailabilitiesForecastError
  from 'infrastructure/bicingForecastApi/errors/HttpStationAvailabilitiesForecastError';
import HttpAvailabilitiesForecastQuery
  from 'infrastructure/bicingForecastApi/HttpAvailabilitiesForecastQuery';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

describe('infrastructure/bicingForecastApi/HttpAvailabilitiesForecastQuery', () => {
  test('should find availabilities for many stationIds', async () => {
    const stationId1 = uuid();
    const stationId2 = uuid();
    const periodStart = moment().subtract(2, 'week');
    const periodEnd = moment().subtract(1, 'week');
    const interval = '5T';

    mockAxios.get
      .mockImplementationOnce(() => Promise.resolve({
        data: {
          station_id: stationId1.toString(),
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
      }))
      .mockImplementationOnce(() => Promise.resolve({
        data: {
          station_id: stationId2.toString(),
          predictions: [
            {
              available_bike_number: '55.5',
              available_slot_number: '52',
              status: 'OPENED',
              forecast_at: '2018-12-24 16:10:00',
            },
            {
              available_bike_number: '54.5',
              available_slot_number: '52.667',
              status: 'OPENED',
              forecast_at: '2018-12-24 16:15:00',
            },
          ],
        },
        status: OK,
      }));

    const filter = await ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval);
    const query = new HttpAvailabilitiesForecastQuery([stationId1, stationId2], filter);

    expect(await query.find()).toEqual([
      {
        id: stationId1.toString(),
        availableBikeNumber: 13.5,
        availableSlotNumber: 12,
        status: 'OPENED',
        statedAt: '2018-12-24 16:10:00',
      },
      {
        id: stationId1.toString(),
        availableBikeNumber: 14.5,
        availableSlotNumber: 12.667,
        status: 'CLOSED',
        statedAt: '2018-12-24 16:15:00',
      },
      {
        id: stationId2.toString(),
        availableBikeNumber: 55.5,
        availableSlotNumber: 52,
        status: 'OPENED',
        statedAt: '2018-12-24 16:10:00',
      },
      {
        id: stationId2.toString(),
        availableBikeNumber: 54.5,
        availableSlotNumber: 52.667,
        status: 'OPENED',
        statedAt: '2018-12-24 16:15:00',
      },
    ]);
  });
  test('should not found availabilities when one response status is not OK and throw an HttpStationAvailabilitiesForecastError', async () => {
    const stationId1 = uuid();
    const stationId2 = uuid();
    const periodStart = moment().subtract(2, 'week');
    const periodEnd = moment().subtract(1, 'week');
    const interval = '5T';
    const status = INTERNAL_SERVER_ERROR;

    mockAxios.get
      .mockImplementationOnce(() => Promise.resolve({
        data: {
          station_id: stationId1.toString(),
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
      }))
      .mockImplementationOnce(() => Promise.resolve({
        data: {},
        status,
      }));

    const filter = await ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval);
    const query = new HttpAvailabilitiesForecastQuery([stationId1, stationId2], filter);

    await expect(query.find())
      .rejects
      .toEqual(HttpStationAvailabilitiesForecastError.withUnexpectedResponseStatus(status));
  });
});
