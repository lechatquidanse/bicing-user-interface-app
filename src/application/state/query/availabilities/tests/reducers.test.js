import * as actions from 'application/state/query/availabilities/actions';
import reducer from 'application/state/query/availabilities/reducers';
import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import ItineraryStepBuilder
  from 'application/state/query/availabilities/tests/support/ItineraryStepBuilder';
import StateBuilder from 'application/state/query/availabilities/tests/support/StateBuilder';
import moment from 'moment';

let stateBuilder; let itineraryStepBuilder; let
  availabilityBuilder;

describe('application/state/query/availabilities/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder.withItinerarySteps().build());
  });
  test('should not affect state for an unknown action type', () => {
    const initialState = stateBuilder.build();

    expect(reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });
  test('should affect state for action with type defining a fetch start', () => {
    const initialState = stateBuilder.withItinerarySteps().build();
    const itineraryStep = 0;
    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withNoAvailabilities()
        .withIsError(false)
        .withIsFetching(false)
        .build(),
    ).build();

    const action = actions.fetchStart(itineraryStep, moment(), moment(), moment(), '5T', []);

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('should affect state for action with type defining a fetch start with step existing', () => {
    const itineraryStep = 0;
    const initialState = stateBuilder
      .withItinerarySteps(
        itineraryStepBuilder
          .withItineraryStep(itineraryStep)
          .withIsError(true)
          .withError(new Error())
          .build(),
      ).build();

    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withNoAvailabilities()
        .withIsError(false)
        .withIsFetching(false)
        .build(),
    ).build();

    const action = actions.fetchStart(itineraryStep, moment(), moment(), moment(), '5T', []);

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('should affect state for action with type defining a fetch pending for existing step', () => {
    const itineraryStep = 2;
    const initialState = stateBuilder
      .withItinerarySteps(
        itineraryStepBuilder
          .withItineraryStep(itineraryStep)
          .withIsFetching(false)
          .withIsError(true)
          .withError(new Error())
          .build(),
      ).build();

    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withNoAvailabilities()
        .withIsError(false)
        .withIsFetching(true)
        .build(),
    ).build();
    const action = actions.fetchPending(itineraryStep);

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('should affect state for action with type success a fetch success for existing step', () => {
    const itineraryStep = 2;
    const initialState = stateBuilder
      .withItinerarySteps(
        itineraryStepBuilder
          .withItineraryStep(itineraryStep)
          .withNoAvailabilities()
          .build(),
      ).build();

    const availability = availabilityBuilder.build();

    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withAvailabilities(availability)
        .withIsError(false)
        .withIsFetching(false)
        .build(),
    ).build();
    const action = actions.fetchSuccess(itineraryStep, [availability]);

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('should affect state for action with type error a fetch error for existing step', () => {
    const itineraryStep = 2;
    const initialState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withAvailabilities(availabilityBuilder.build(), availabilityBuilder.build())
        .withIsError(false)
        .withIsFetching(false)
        .build(),
    ).build();

    const error = new Error('An error occurred');
    const action = actions.fetchFailure(itineraryStep, error);

    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withNoAvailabilities()
        .withError(error)
        .withIsError(true)
        .withIsFetching(false)
        .build(),
    ).build();

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  beforeEach(() => {
    stateBuilder = StateBuilder.create().withIsReduced(true);
    itineraryStepBuilder = ItineraryStepBuilder.create();
    availabilityBuilder = AvailabilityBuilder.create();
  });
});
