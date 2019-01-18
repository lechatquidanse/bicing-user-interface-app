import * as selectors from 'application/state/query/geoSuggestions/selectors';
import StationBuilder
  from 'application/state/query/stations/tests/support/StationBuilder';
import StateBuilder from 'application/state/query/geoSuggestions/tests/support/StateBuilder';
import AppError from 'domain/errors/AppError';

let stateBuilder; let
  stationBuilder;
describe('application/state/query/geoSuggestions/selectors', () => {
  test('it can return isError flag', () => {
    expect(selectors.isError(stateBuilder.withIsError(true).build())).toEqual(true);
  });
  test('it can return AppError public message if error is error type and isError true', () => {
    const error = new AppError('error', 'an error occurred during storage.');

    expect(selectors.error(stateBuilder.withIsError(true).withError(error).build()))
      .toEqual('an error occurred during storage.');
  });
  test('it can not return AppError public message if error is not AppError type ', () => {
    expect(selectors.error(stateBuilder.withIsError(true).withError('error').build())).toBeUndefined();
  });
  test('it can not return AppError public message if isError not true ', () => {
    const error = new AppError('error', 'an error occurred during storage.');

    expect(selectors.error(stateBuilder.withIsError(false).withError(error).build()))
      .toBeUndefined();
  });
  test('it can return geoSuggestions', () => {
    const latitude1 = 41.12;
    const longitude1 = 1.12;
    const name1 = 'geoSuggestion 1';
    const latitude2 = 43.55;
    const longitude2 = 2.55;
    const name2 = 'geoSuggestion 2';

    const state = stateBuilder
      .withGeoSuggestions(
        stationBuilder.withLatitude(latitude1).withLongitude(longitude1).withName(name1).build(),
        stationBuilder.withLatitude(latitude2).withLongitude(longitude2).withName(name2).build(),
      ).build();

    expect(selectors.geoSuggestions(state)).toEqual([
      { label: name1, location: { lat: latitude1, lng: longitude1 } },
      { label: name2, location: { lat: latitude2, lng: longitude2 } },
    ]);
  });
  test('it can not return geoSuggestions if no data', () => {
    const state = stateBuilder.withNoGeoSuggestions().build();

    expect(selectors.geoSuggestions(state)).toEqual([]);
  });

  beforeEach(() => {
    stationBuilder = StationBuilder.create();
    stateBuilder = StateBuilder.create();
  });
});
