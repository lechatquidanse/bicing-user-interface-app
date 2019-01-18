import * as actions from 'application/state/command/storeItineraryStepActive/actions';
import reducer from 'application/state/command/storeItineraryStepActive/reducers';
import StateBuilder
  from 'application/state/command/storeItineraryStepActive/tests/support/StateBuilder';

let stateBuilder;
describe('application/state/command/storeItineraryStepActive/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder.withItineraryStep(0).build());
  });
  test('should not affect state for an unknown action type', () => {
    const initialState = stateBuilder.withItineraryStep(1).build();

    expect(reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });
  test('should affect state for action with type defining a enabled start', () => {
    const initialState = stateBuilder.withItineraryStep(1).build();
    const itineraryStep = 12;
    const expectedState = stateBuilder.withItineraryStep(itineraryStep).build();

    expect(reducer(initialState, actions.store(itineraryStep))).toEqual(expectedState);
  });
  beforeEach(() => {
    stateBuilder = StateBuilder.create().withIsReduced(true);
  });
});
