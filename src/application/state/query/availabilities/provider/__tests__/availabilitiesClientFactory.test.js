import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import availabilitiesClientFactory
  from 'application/state/query/availabilities/provider/availabilitiesClientFactory';
import { HttpAvailabilitiesQuery } from 'infrastructure/bicingApi';
import { HttpAvailabilitiesForecastQuery } from 'infrastructure/bicingForecastApi';
import { v4 as uuid } from 'uuid';

describe('application/state/query/availabilities/provider/availabilitiesClientFactory', () => {
  test('should create a default client if no filter parameters', () => {
    const client = availabilitiesClientFactory(null, null, null, null);

    expect(client).toBeInstanceOf(HttpAvailabilitiesQuery);
    expect(client).toEqual(new HttpAvailabilitiesQuery());
  });
  test('should create a specific client if filter parameters', () => {
    const periodStart = '2017-12-12 12:12:12';
    const periodEnd = '2017-12-12 12:52:12';
    const interval = '5T';
    const stationIds = [uuid(), uuid(), uuid()];
    const filter = ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval);

    const client = availabilitiesClientFactory(periodStart, periodEnd, interval, stationIds);

    expect(client).toBeInstanceOf(HttpAvailabilitiesForecastQuery);
    expect(client.stationIds).toEqual(stationIds);
    expect(client.byFilter).toEqual(filter);
  });
  test('should not create a specific client if filter parameters are bad and should throw an error', () => {
    expect(() => availabilitiesClientFactory(
      'bad_value',
      '2017-12-12 12:52:12',
      '5T',
      [uuid(), uuid(), uuid()],
    )).toThrowErrorMatchingSnapshot();
  });
});
