import * as selectors from 'application/state/command/enableGeoLocation/selectors';
import StateBuilder from 'application/state/command/enableGeoLocation/tests/support/StateBuilder';

describe('application/state/command/enableGeoLocation/selectors', () => {
  test('it can return enabled flag', () => {
    expect(selectors.isEnabled(StateBuilder.create().withEnabled(false).build())).toEqual(false);
  });
  test('it can return itineraryStep value', () => {
    const itineraryStep = 2;

    expect(selectors.itineraryStep(StateBuilder.create().withItineraryStep(itineraryStep).build()))
      .toEqual(itineraryStep);
  });
});
