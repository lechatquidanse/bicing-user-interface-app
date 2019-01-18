import availabilitiesClientFactory
  from 'application/state/query/availabilities/provider/availabilitiesClientFactory';
import { HttpAvailabilitiesQuery } from 'infrastructure/bicingApi';
import { HttpAvailabilitiesForecastQuery } from 'infrastructure/bicingForecastApi';
import moment from 'moment';

describe('application/state/query/availabilities/provider/availabilitiesClientFactory', () => {
  test('it can create a client to query with a forecasting filter', async () => {
    const now = moment();

    const client = await availabilitiesClientFactory(
      now.clone().add(1, 'minute'),
      now.clone(),
      now.clone().add(5, 'minute'),
      '5T',
      [],
    );

    expect(client).toBeInstanceOf(HttpAvailabilitiesForecastQuery);
  });
  test('it can create a client to query with a an actual filter', async () => {
    const now = moment();

    const client = await availabilitiesClientFactory(now.clone(), now.clone(), now.clone(), '5T', []);

    expect(client).toBeInstanceOf(HttpAvailabilitiesQuery);
  });
});
