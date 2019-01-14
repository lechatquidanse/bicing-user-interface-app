import StateBuilder from 'application/state/command/configureMap/tests/support/StateBuilder';
import * as selectors from 'application/state/command/configureMap/selectors';


describe('application/state/command/configureMap/selectors', () => {
  test('it can return isError flag', () => {
    expect(selectors.isError(StateBuilder.create().withError(true).build())).toBeTruthy();
  });
  test('it can return error message', () => {
    const error = new Error('An error occurred');

    expect(selectors.error(StateBuilder.create().withData(error).build())).toEqual('An error occurred');
  });
  test('it can not return error message if error is not an Error', () => {
    const error = 'An error occurred as a string but not object Error';

    expect(selectors.error(StateBuilder.create().withData(error).build())).toBeUndefined();
  });
  test('it can return latitude', () => {
    const latitude = 41.234;

    expect(selectors.latitude(StateBuilder.create().withLatitude(latitude).build()))
      .toEqual(latitude);
  });
  test('it can return longitude', () => {
    const longitude = 2.1234;

    expect(selectors.longitude(StateBuilder.create().withLongitude(longitude).build()))
      .toEqual(longitude);
  });
  test('it can return limit', () => {
    const limit = 2000;

    expect(selectors.limit(StateBuilder.create().withLimit(limit).build()))
      .toEqual(limit);
  });
  test('it can return limit', () => {
    const zoom = 15;

    expect(selectors.zoom(StateBuilder.create().withData(zoom).build()))
      .toEqual(zoom);
  });
});
