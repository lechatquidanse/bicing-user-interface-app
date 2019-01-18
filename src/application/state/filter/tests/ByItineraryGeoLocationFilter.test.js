import ByItineraryGeoLocationFilter from 'application/state/filter/ByItineraryGeoLocationFilter';
import { DEFAULT_ZOOM, ZOOM } from 'domain/definitions/configurationMapDefinition';
import ByItineraryGeoLocationFilterError from 'application/state/filter/error/ByItineraryGeoLocationFilterError';

describe('application/state/filter/ByItineraryGeoLocationFilter', () => {
  test('it can create a ByItineraryGeoLocationFilter from raw values', async () => {
    const latitude = 41.3244;
    const longitude = 2.345;
    const limit = 5000;

    const filter = await ByItineraryGeoLocationFilter.fromRawValues(latitude, longitude, limit);

    expect(filter.latitude).toEqual(latitude);
    expect(filter.longitude).toEqual(longitude);
    expect(filter.limit).toEqual(limit);
    expect(filter.zoom()).toEqual(DEFAULT_ZOOM);
  });
  test('it can return a zoom value from a ByItineraryGeoLocationFilter if its limit is under 1000', async () => {
    const filter = await ByItineraryGeoLocationFilter.fromRawValues(40.321144, 2.2222, 200);

    expect(filter.zoom()).toEqual(ZOOM);
  });
  test('it can not create a filter if latitude is not a number between -90 and 90', async () => {
    await expect(ByItineraryGeoLocationFilter.fromRawValues(91, 2.2222, 200))
      .rejects
      .toEqual(ByItineraryGeoLocationFilterError.withInvalidValueFilter('"latitude" must be less than or equal to 90'));
  });
  test('it can not create a filter if latitude is not a number > -90', async () => {
    await expect(ByItineraryGeoLocationFilter.fromRawValues(-91, 2.2222, 200))
      .rejects
      .toEqual(ByItineraryGeoLocationFilterError.withInvalidValueFilter('"latitude" must be larger than or equal to -90'));
  });
  test('it can not create a filter if longitude is not a number > 180', async () => {
    await expect(ByItineraryGeoLocationFilter.fromRawValues(40.321144, 181, 200))
      .rejects
      .toEqual(ByItineraryGeoLocationFilterError.withInvalidValueFilter('"longitude" must be less than or equal to 180'));
  });
  test('it can not create a filter if longitude is not a number < -180', async () => {
    await expect(ByItineraryGeoLocationFilter.fromRawValues(40.321144, -181, 200))
      .rejects
      .toEqual(ByItineraryGeoLocationFilterError.withInvalidValueFilter('"longitude" must be larger than or equal to -180'));
  });
  test('it can not create a filter if limit is not a number < 0', async () => {
    await expect(ByItineraryGeoLocationFilter.fromRawValues(40.321144, 2.2222, -1))
      .rejects
      .toEqual(ByItineraryGeoLocationFilterError.withInvalidValueFilter('"limit" must be larger than or equal to 0'));
  });
  test('it can not create a filter if limit is not a number < 10000', async () => {
    await expect(ByItineraryGeoLocationFilter.fromRawValues(40.321144, 2.2222, 10001))
      .rejects
      .toEqual(ByItineraryGeoLocationFilterError.withInvalidValueFilter('"limit" must be less than or equal to 10000'));
  });
});
