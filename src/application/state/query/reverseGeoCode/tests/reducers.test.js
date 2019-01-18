import * as actions from 'application/state/query/reverseGeoCode/actions';
import reducer from 'application/state/query/reverseGeoCode/reducers';
import StateBuilder from 'application/state/query/reverseGeoCode/tests/support/StateBuilder';

let stateBuilder;

describe('application/state/query/station/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder
      .withAddress(undefined)
      .withIsError(false)
      .withIsFetching(false)
      .build());
  });
  test('should not affect state for an unknown action type', () => {
    const initialState = stateBuilder
      .withAddress(undefined)
      .withIsError(false)
      .withIsFetching(true)
      .build();

    expect(reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });
  test('should affect state for action with type defining a fetch start', () => {
    const initialState = stateBuilder
      .withAddress('an address')
      .withIsError(false)
      .withIsFetching(true)
      .build();

    const expectedState = stateBuilder
      .withAddress(undefined)
      .withIsError(false)
      .withIsFetching(false)
      .build();

    expect(reducer(initialState, actions.fetchStart(41.12, 2.12))).toEqual(expectedState);
  });
  test('should affect state for action with type defining a fetch pending', () => {
    const initialState = stateBuilder
      .withAddress('an address')
      .withIsError(false)
      .withIsFetching(false)
      .build();

    const expectedState = stateBuilder
      .withAddress(undefined)
      .withIsError(false)
      .withIsFetching(true)
      .build();

    expect(reducer(initialState, actions.fetchPending())).toEqual(expectedState);
  });
  test('should affect state for action with type defining a fetch success', () => {
    const initialState = stateBuilder
      .withAddress(undefined)
      .withIsError(false)
      .withIsFetching(true)
      .build();

    const address = 'an address';

    const expectedState = stateBuilder
      .withAddress(address)
      .withIsError(false)
      .withIsFetching(false)
      .build();

    expect(reducer(initialState, actions.fetchSuccess(address))).toEqual(expectedState);
  });
  test('should affect state for action with type defining a fetch failure', () => {
    const initialState = stateBuilder
      .withAddress(undefined)
      .withIsError(false)
      .withIsFetching(true)
      .build();

    const error = new Error('An error occurred');

    const expectedState = stateBuilder
      .withError(error)
      .withIsError(true)
      .withIsFetching(false)
      .build();

    expect(reducer(initialState, actions.fetchFailure(error))).toEqual(expectedState);
  });
  beforeEach(() => {
    stateBuilder = StateBuilder.create().withIsReduced(true);
  });
});
