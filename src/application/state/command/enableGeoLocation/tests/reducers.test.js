import * as actions from 'application/state/command/enableGeoLocation/actions';
import reducer from 'application/state/command/enableGeoLocation/reducers';
import StateBuilder from 'application/state/command/enableGeoLocation/tests/support/StateBuilder';

let stateBuilder;

describe('application/state/command/enableGeoLocation/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder.withEnabled(false).withItineraryStep(0).build());
  });

  test('should not affect state for an unknown action type', () => {
    const initialState = stateBuilder.withEnabled(true).withItineraryStep(2).build();

    expect(reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });

  test('should affect state for action with type defining a enabled start', () => {
    const initialState = stateBuilder.withEnabled(true).withItineraryStep(2).build();
    const itineraryStep = 1;
    const expectedState = stateBuilder.withEnabled(true).withItineraryStep(itineraryStep).build();

    expect(reducer(initialState, actions.enable(itineraryStep))).toEqual(expectedState);
  });

  beforeEach(() => {
    stateBuilder = StateBuilder.create().withIsReduced(true);
  });
});
