import * as actions from 'application/state/command/storeItineraryAt/actions';
import reducer from 'application/state/command/storeItineraryAt/reducers';
import StateBuilder from 'application/state/command/storeItineraryAt/tests/support/StateBuilder';
import ByItineraryAtFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryAtFilterBuilder';
import moment from 'moment';

let stateBuilder; let
  filterBuilder;

describe('application/state/query/storeItineraryAt/reducers', () => {
  test('it should have initial state', () => {
    expect(reducer()).toEqual({ data: undefined, error: false });
  });

  test('it can not affect state for an unknown action type', () => {
    const state = stateBuilder.build();

    expect(reducer(state, { type: 'NOT_EXISTING' })).toEqual(state);
  });
  test('it can  affect state for action with type defining a storeStart', async () => {
    const initialState = stateBuilder
      .withIsError(true)
      .withError(new Error())
      .withFilter(undefined)
      .build();
    const expectedState = stateBuilder
      .withIsError(false)
      .withError(undefined)
      .withFilter(undefined)
      .build();

    expect(reducer(initialState, actions.storeStart(moment()))).toEqual(expectedState);
  });
  test('it can affect state for action with type defining a storeSuccess', async () => {
    const initialState = stateBuilder
      .withIsError(false)
      .withError(undefined)
      .withFilter(undefined)
      .build();

    const filter = await filterBuilder.build();
    const expectedState = stateBuilder
      .withIsError(false)
      .withError(undefined)
      .withFilter(filter)
      .build();

    expect(reducer(initialState, actions.storeSuccess(filter))).toEqual(expectedState);
  });
  test('it can affect state for action with type defining a storeFailure', () => {
    const initialState = stateBuilder
      .withIsError(false)
      .withError(undefined)
      .withFilter(undefined)
      .build();
    const error = new Error('An error occurred');
    const expectedState = stateBuilder
      .withIsError(true)
      .withError(error)
      .withFilter(undefined)
      .build();

    expect(reducer(initialState, actions.storeFailure(error))).toEqual(expectedState);
  });
  beforeEach(async () => {
    filterBuilder = await ByItineraryAtFilterBuilder.create();
    stateBuilder = (await StateBuilder.create()).withIsReduced(true);
  });
});
