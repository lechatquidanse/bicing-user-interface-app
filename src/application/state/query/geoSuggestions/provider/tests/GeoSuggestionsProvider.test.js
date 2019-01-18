import GeoSuggestionsProviderError
  from 'application/state/query/geoSuggestions/provider/error/GeoSuggestionsProviderError';
import GeoSuggestionsProvider
  from 'application/state/query/geoSuggestions/provider/GeoSuggestionsProvider';
import StationBuilder
  from 'application/state/query/stations/tests/support/StationBuilder';
import HttpStationsQuery from 'infrastructure/bicingApi/HttpStationsQuery';

let stationBuilder;

jest.mock('infrastructure/bicingApi/HttpStationsQuery');

describe('application/state/query/geoSuggestions/provider/GeoSuggestionsProvider', () => {
  test('it can provide geoSuggestions', async () => {
    const fakeGeoSuggestions = [stationBuilder.build(), stationBuilder.build()];

    HttpStationsQuery.find.mockReturnValueOnce(fakeGeoSuggestions);

    const geoSuggestions = await GeoSuggestionsProvider.provide();

    expect(geoSuggestions).toEqual(fakeGeoSuggestions);
  });

  test('it can not provide geoSuggestions if response is not valid', async () => {
    const fakeGeoSuggestions = 'not valid response';

    HttpStationsQuery.find.mockReturnValueOnce(fakeGeoSuggestions);

    await expect(GeoSuggestionsProvider.provide())
      .rejects
      .toEqual(GeoSuggestionsProviderError.withInvalidResponseSchema('"value" must be an array'));
  });
  beforeEach(() => {
    stationBuilder = StationBuilder.create();
  });
});
