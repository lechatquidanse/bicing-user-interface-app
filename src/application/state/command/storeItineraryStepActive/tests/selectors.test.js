import * as selectors from 'application/state/command/storeItineraryStepActive/selectors';
import StateBuilder from 'application/state/command/storeItineraryStepActive/tests/support/StateBuilder';

describe('application/state/command/storeItineraryStepActive/selectors', () => {
  test('it can return itineraryStep value', () => {
    const itineraryStep = 2;

    expect(selectors.itineraryStep(StateBuilder.create().withItineraryStep(itineraryStep).build()))
      .toEqual(itineraryStep);
  });
});
