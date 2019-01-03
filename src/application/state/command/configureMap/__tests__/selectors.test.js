import * as selectors from 'application/state/command/configureMap/selectors';

describe('application/state/command/configureMap/selectors', () => {
  test('it can return error flag', () => {
    const state = { command: { configureMap: { error: true } } };

    expect(selectors.error(state)).toBeTruthy();
  });
  test('it can return latitude', () => {
    const latitude = 41.234;
    const state = { command: { configureMap: { latitude } } };

    expect(selectors.latitude(state)).toEqual(latitude);
  });
  test('it can return longitude', () => {
    const longitude = 2.1234;
    const state = { command: { configureMap: { longitude } } };

    expect(selectors.longitude(state)).toEqual(longitude);
  });
  test('it can return limit', () => {
    const limit = 2000;
    const state = { command: { configureMap: { limit } } };

    expect(selectors.limit(state)).toEqual(limit);
  });
  test('it can return limit', () => {
    const zoom = 15;
    const state = { command: { configureMap: { data: zoom } } };

    expect(selectors.zoom(state)).toEqual(zoom);
  });
});
