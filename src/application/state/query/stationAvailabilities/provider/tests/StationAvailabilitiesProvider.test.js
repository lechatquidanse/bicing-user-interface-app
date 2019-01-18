import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import StationAvailabilitiesProviderError
  from 'application/state/query/stationAvailabilities/provider/error/StationAvailabilitiesProviderError';
import StationAvailabilitiesProvider
  from 'application/state/query/stationAvailabilities/provider/StationAvailabilitiesProvider';
import HttpStationAvailabilitiesQuery
  from 'infrastructure/bicingApi/HttpStationAvailabilitiesQuery';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

let availabilitiesBuilder;

jest.mock('infrastructure/bicingApi/HttpStationAvailabilitiesQuery');

describe('application/state/query/station/provider/StationProvider', () => {
  test('it can provide a station', async () => {
    const fakeAvailabilities = [availabilitiesBuilder.build(), availabilitiesBuilder.build()];

    HttpStationAvailabilitiesQuery.find.mockReturnValueOnce(fakeAvailabilities);

    const stationAvailabilities = await StationAvailabilitiesProvider.provide(
      uuid(),
      moment(),
      moment(),
      '5 min',
    );

    expect(stationAvailabilities).toEqual(fakeAvailabilities);
  });

  test('it can not provide a station if response is not valid', async () => {
    const fakeAvailabilities = 'not valid response';

    HttpStationAvailabilitiesQuery.find.mockReturnValueOnce(fakeAvailabilities);

    await expect(StationAvailabilitiesProvider.provide(uuid(), moment(), moment(), '5 min'))
      .rejects
      .toEqual(StationAvailabilitiesProviderError.withInvalidResponseSchema('"value" must be an array'));
  });
  beforeEach(() => {
    availabilitiesBuilder = AvailabilityBuilder.create();
  });
});
