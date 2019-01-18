import * as actions from 'application/state/query/station/actions';
import reducer from 'application/state/query/station/reducers';
import StateBuilder from 'application/state/query/station/tests/support/StateBuilder';
import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';
import { v4 as uuid } from 'uuid';

let stateBuilder; let
  stationBuilder;

describe('application/state/query/station/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder
      .withStation(undefined)
      .withIsError(false)
      .withIsFetching(false)
      .build());
  });
  test('should not affect state for an unknown action type', () => {
    const initialState = stateBuilder.build();

    expect(reducer(initialState, { type: 'NOT_EXISTING' })).toEqual(initialState);
  });
  test('should affect state for action with type defining a fetch start', () => {
    const initialState = stateBuilder.build();
    const expectedState = stateBuilder
      .withStation(undefined)
      .withIsError(false)
      .withIsFetching(false)
      .build();

    expect(reducer(initialState, actions.fetchStart(uuid()))).toEqual(expectedState);
  });
  test('should affect state for action with type defining a fetch pending for existing step', () => {
    const initialState = stateBuilder
      .withIsFetching(false)
      .build();
    const expectedState = stateBuilder
      .withStation(undefined)
      .withIsError(false)
      .withIsFetching(true)
      .build();

    expect(reducer(initialState, actions.fetchPending())).toEqual(expectedState);
  });
  test('should affect state for action with type success a fetch success for existing step', () => {
    const initialState = stateBuilder
      .withStation(undefined)
      .withIsFetching(true)
      .build();

    const station = stationBuilder.build();

    const expectedState = stateBuilder
      .withStation(station)
      .withIsError(false)
      .withIsFetching(false)
      .build();

    const action = actions.fetchSuccess(station);

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('should affect state for action with type error a fetch error for existing step', () => {
    const initialState = stateBuilder
      .withStation(stationBuilder.build())
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
    stationBuilder = StationBuilder.create();
  });
});
