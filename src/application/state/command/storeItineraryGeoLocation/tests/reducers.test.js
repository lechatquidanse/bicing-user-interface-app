import * as actions from 'application/state/command/storeItineraryGeoLocation/actions';
import reducer from 'application/state/command/storeItineraryGeoLocation/reducers';
import ItineraryStepBuilder
  from 'application/state/command/storeItineraryGeoLocation/tests/support/ItineraryStepBuilder';
import StateBuilder
  from 'application/state/command/storeItineraryGeoLocation/tests/support/StateBuilder';
import ByItineraryGeoLocationFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryGeoLocationFilterBuilder';

let itineraryStepBuilder;
let stateBuilder;

describe('application/state/query/storeItineraryGeoLocation/reducers', () => {
  test('it should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder.withItinerarySteps(
      itineraryStepBuilder.withItineraryStep(0).withIsError(false).withFilter(undefined).build(),
      itineraryStepBuilder.withItineraryStep(1).withIsError(false).withFilter(undefined).build(),
    ).build());
  });
  test('it can not affect state for an unknown action type', () => {
    const initialState = stateBuilder.build();
    expect(reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });
  test('it can  affect state for action with type defining a storeStart', async () => {
    const itineraryStep = 1;
    const initialState = stateBuilder.withItinerarySteps().build();

    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(false)
        .withFilter(undefined)
        .build(),
    ).build();

    const action = actions.storeStart(itineraryStep, 41.123, 2.12, 1000);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('it can  affect state for action with type defining a storeStart for an existing itinerary step', async () => {
    const itineraryStep = 1;
    const filter = await ByItineraryGeoLocationFilterBuilder.create().build();

    const initialState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(true)
        .withFilter(filter)
        .build(),
    ).build();

    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(false)
        .withFilter(undefined)
        .build(),
    ).build();

    const action = actions.storeStart(itineraryStep, 41.123, 2.12, 1000);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('it can affect state for action with type defining a storeSuccess with an existing itineraryStep', async () => {
    const itineraryStep = 1;
    const initialState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(true)
        .withFilter(undefined)
        .build(),
    ).build();

    const filter = await ByItineraryGeoLocationFilterBuilder.create().build();

    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(false)
        .withFilter(filter)
        .build(),
    ).build();

    const action = actions.storeSuccess(itineraryStep, filter);
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('it can affect state for action with type defining a storeFailure with an existing itineraryStep', async () => {
    const itineraryStep = 0;
    const initialState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(false)
        .withError(undefined)
        .withFilter(undefined)
        .build(),
    ).build();

    const error = new Error('An error occurred');

    const expectedState = stateBuilder.withItinerarySteps(
      itineraryStepBuilder
        .withItineraryStep(itineraryStep)
        .withIsError(true)
        .withError(error)
        .build(),
    ).build();
    const action = actions.storeFailure(itineraryStep, error);

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  beforeEach(async () => {
    stateBuilder = (await StateBuilder.create()).withIsReduced(true);
    itineraryStepBuilder = await ItineraryStepBuilder.create();
  });
});
