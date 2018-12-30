import ByGeoLocationFilter from 'application/state/filter/ByGeoLocationFilter';

describe('application/state/filter/ByGeoLocationFilter', () => {
  test('it can create a ByGeoLocationFilter from raw values', () => {
    const latitude = 41.3244;
    const longitude = 2.345;
    const limit = 5000;

    const filter = ByGeoLocationFilter.fromRawValues(latitude, longitude, limit);

    expect(filter.latitude).toEqual(latitude);
    expect(filter.longitude).toEqual(longitude);
    expect(filter.limit).toEqual(limit);
    expect(filter.zoom()).toEqual(12);
  });
  test('it can return a zoom value from a ByGeoLocationFilter if its limit is under 1000', () => {
    const filter = ByGeoLocationFilter.fromRawValues(40.321144, 2.2222, 200);

    expect(filter.zoom()).toEqual(15);
  });
  test('it can not create a filter if latitude is not a number between -90 and 90', () => {
    expect(() => ByGeoLocationFilter.fromRawValues(91, 2.2222, 200))
      .toThrowErrorMatchingSnapshot();
    expect(() => ByGeoLocationFilter.fromRawValues(-91, 2.2222, 200))
      .toThrowErrorMatchingSnapshot();
  });
  test('it can not create a filter if longitude is not a number between -180 and 180', () => {
    expect(() => ByGeoLocationFilter.fromRawValues(40.321144, 181, 200))
      .toThrowErrorMatchingSnapshot();
    expect(() => ByGeoLocationFilter.fromRawValues(40.321144, -181, 200))
      .toThrowErrorMatchingSnapshot();
  });
  test('it can not create a filter if longitude is not a number between 0 and 10000', () => {
    expect(() => ByGeoLocationFilter.fromRawValues(40.321144, 2.2222, 10001))
      .toThrowErrorMatchingSnapshot();
    expect(() => ByGeoLocationFilter.fromRawValues(40.321144, 2.2222, -1))
      .toThrowErrorMatchingSnapshot();
  });
});
