import StationProviderError
  from 'application/state/query/stations/provider/error/StationsProviderError';
import StationProvider
  from 'application/state/query/station/provider/StationProvider';
import StationBuilder
  from 'application/state/query/stations/tests/support/StationBuilder';
import HttpStationQuery from 'infrastructure/bicingApi/HttpStationQuery';
import { v4 as uuid } from 'uuid';

let stationBuilder;

jest.mock('infrastructure/bicingApi/HttpStationQuery');

describe('application/state/query/station/provider/StationProvider', () => {
  test('it can provide a station', async () => {
    const fakeStation = stationBuilder.build();

    HttpStationQuery.find.mockReturnValueOnce(fakeStation);

    const station = await StationProvider.provide(uuid());

    expect(station).toEqual(fakeStation);
  });

  test('it can not provide a station if response is not valid', async () => {
    const fakeStation = 'not valid response';

    HttpStationQuery.find.mockReturnValueOnce(fakeStation);

    await expect(StationProvider.provide(uuid()))
      .rejects
      .toEqual(StationProviderError.withInvalidResponseSchema('"value" must be an object'));
  });
  beforeEach(() => {
    stationBuilder = StationBuilder.create();
  });
});
