import availabilitiesClientFactory
  from 'application/state/query/availabilities/provider/availabilitiesClientFactory';
import { HttpAvailabilitiesForecastQuery } from 'infrastructure/bicingForecastApi';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/provider/availabilitiesClientFactory', () => {
  test('should create a specific client if filter parameters', () => {
    const periodStartAt = '2017-12-12 12:12:12';
    const itineraryAt = '2017-12-12 12:32:12';
    const periodEndAt = '2017-12-12 12:52:12';
    const interval = '5T';
    const stationIds = [uuid(), uuid(), uuid()];

    const client = availabilitiesClientFactory(
      itineraryAt,
      periodStartAt,
      periodEndAt,
      interval,
      stationIds,
    );

    expect(client).toBeInstanceOf(HttpAvailabilitiesForecastQuery);
    expect(client.stationIds).toEqual(stationIds);
  });
  test('should not create a specific client if filter parameters are bad and should throw an error', () => {
    expect(() => availabilitiesClientFactory(
      '2017-12-12 12:52:12',
      'bad_value',
      '2017-12-12 12:52:12',
      '5T',
      [uuid(), uuid(), uuid()],
    )).toThrowErrorMatchingSnapshot();
  });
});
