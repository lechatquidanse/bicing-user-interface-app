import * as selectors from 'application/state/command/map/selectors';
import byGeoLocationFilter from 'application/state/filter/byGeoLocationFilter';

describe('application/state/command/map/selectors', () => {
  test('it can return displayConfiguration', () => {
    const filter = byGeoLocationFilter(41.234, 2.1234, 200);
    const state = { command: { map: { filter } } };

    expect(selectors.displayConfiguration(state)).toEqual(filter);
  });
});
