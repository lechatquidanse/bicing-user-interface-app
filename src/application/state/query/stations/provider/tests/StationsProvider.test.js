import StationsProviderError
  from 'application/state/query/stations/provider/error/StationsProviderError';
import StationsProvider
  from 'application/state/query/stations/provider/StationsProvider';
import StationBuilder
  from 'application/state/query/stations/tests/support/StationBuilder';
import HttpStationsQuery from 'infrastructure/bicingApi/HttpStationsQuery';

let stationBuilder;

jest.mock('infrastructure/bicingApi/HttpStationsQuery');

describe('application/state/query/stations/provider/StationsProvider', () => {
  test('it can provide stations', async () => {
    const fakeStations = [stationBuilder.build(), stationBuilder.build()];

    HttpStationsQuery.find.mockReturnValueOnce(fakeStations);

    const stations = await StationsProvider.provide(41.123, 2.13, 500);

    expect(stations).toEqual(fakeStations);
  });

  test('it can not provide stations if response is not valid', async () => {
    const fakeStations = 'not valid response';

    HttpStationsQuery.find.mockReturnValueOnce(fakeStations);

    await expect(StationsProvider.provide(41.123, 2.13, 500))
      .rejects
      .toEqual(StationsProviderError.withInvalidResponseSchema('"value" must be an array'));
  });
  beforeEach(() => {
    stationBuilder = StationBuilder.create();
  });
});
