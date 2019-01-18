import * as actions from 'application/state/query/geoSuggestions/actions';
import reducer from 'application/state/query/geoSuggestions/reducers';
import StateBuilder from 'application/state/query/geoSuggestions/tests/support/StateBuilder';
import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';

let stateBuilder; let
  stationBuilder;

describe('application/state/query/geoSuggestions/reducers', () => {
  test('should have initial state', () => {
    expect(reducer()).toEqual(stateBuilder
      .withNoGeoSuggestions()
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
      .withNoGeoSuggestions()
      .withIsError(false)
      .withIsFetching(false)
      .build();

    expect(reducer(initialState, actions.fetchStart())).toEqual(expectedState);
  });
  test('should affect state for action with type defining a fetch pending for existing step', () => {
    const initialState = stateBuilder
      .withIsFetching(false)
      .build();
    const expectedState = stateBuilder
      .withNoGeoSuggestions()
      .withIsError(false)
      .withIsFetching(true)
      .build();

    expect(reducer(initialState, actions.fetchPending())).toEqual(expectedState);
  });
  test('should affect state for action with type success a fetch success for existing step', () => {
    const initialState = stateBuilder
      .withNoGeoSuggestions()
      .withIsFetching(true)
      .build();

    const geoSuggestion1 = stationBuilder.build();
    const geoSuggestion2 = stationBuilder.build();

    const expectedState = stateBuilder
      .withGeoSuggestions(geoSuggestion1, geoSuggestion2)
      .withIsError(false)
      .withIsFetching(false)
      .build();

    const action = actions.fetchSuccess([geoSuggestion1, geoSuggestion2]);

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  test('should affect state for action with type error a fetch error for existing step', () => {
    const initialState = stateBuilder
      .withGeoSuggestions(stationBuilder.build(), stationBuilder.build())
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
